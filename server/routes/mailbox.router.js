const express = require('express');
const pool = require('../modules/pool');

const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

const router = express.Router();
  
//GET to fetch incoming messages
router.get("/incoming", rejectUnauthenticated, (req, res) => {
  
  const userId = req.user.id;
  
  const queryText = `SELECT u.username AS "sender", 
                    recipient.username AS "to", 
                    messages.message_content AS "message",
                    messages.id AS "id",
                    TO_CHAR(messages.timestamp, 'MM-DD-YYYY') AS "timestamp"
                    FROM "user" AS u
                    JOIN "messages" ON u.id = messages.sender_id
                    JOIN "user" AS recipient ON messages.recipient_id = recipient.id
                    WHERE recipient.id = $1
                    AND messages.deleted_by_recipient = FALSE
                    ORDER BY messages.id ASC;`;
    pool.query(queryText,[userId])
    .then((results) => {
      res.send(results.rows);
    })
    .catch((err) => {
      console.log("err in api/mailbox GET", err);
      res.sendStatus(400);
    });
});
  
//GET to fetch sent messages
router.get("/sent", rejectUnauthenticated, (req, res) => {
  
  const userId = req.user.id;
  
  const queryText = `SELECT u.username AS "sender", 
                    recipient.username AS "to", 
                    messages.message_content AS "message",
                    messages.id AS "id",
                    TO_CHAR(messages.timestamp, 'MM-DD-YYYY') AS "timestamp"
                    FROM "user" AS u
                    JOIN "messages" ON u.id = messages.sender_id
                    JOIN "user" AS recipient ON messages.recipient_id = recipient.id
                    WHERE u.id = $1 
                    AND messages.deleted_by_sender = FALSE
                    ORDER BY messages.id ASC;`;
    pool.query(queryText,[userId])
    .then((results) => {
      res.send(results.rows);
    })
    .catch((err) => {
      console.log("err in api/mailbox GET", err);
      res.sendStatus(400);
    });
});

//POST to create new message
router.post("/", rejectUnauthenticated,  (req, res) => {
  const userId = req.user.id
  const {  recipient_id, message_content } = req.body;
  console.log("sending message");
  const queryText = `INSERT INTO "messages" ("sender_id", "recipient_id", "message_content")
                     VALUES ($1, $2, $3);`;
    pool.query(queryText, [ userId, recipient_id, message_content ])
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log("error in post.mailbox.router", err);
    });
});

//PUT to handle deleting messages
router.put("/delete/", rejectUnauthenticated, async(req,res)=>{
  const userId = req.user.id;
  const {messageId} = req.body;

  console.log("deleting the message", messageId);

  const client = await pool.connect();

  //this query tests whether the user is the sender or recipient
  try{
    await client.query("BEGIN");
    const queryUserRole = `SELECT sender_id, 
                           recipient_id, 
                           deleted_by_sender,
                           deleted_by_recipient
                           FROM "messages"
                           WHERE id = $1;`;

    const result = await client.query(queryUserRole, [messageId]);
    
    if(result.rows.length === 0){
      console.log("message not found");
      await client.query("ROLLBACK");
      return res.status(404).send("message not found");
    }

    let {sender_id, recipient_id}=result.rows[0]
   
    // once the user role is defined we can do a soft delete
    let updateQuery;
    if (userId === sender_id){
      updateQuery = `UPDATE "messages"
                     SET deleted_by_sender = TRUE WHERE id=$1;`;
    } else if (userId === recipient_id){
      updateQuery = `UPDATE "messages"
                     SET deleted_by_recipient = TRUE WHERE id=$1;`;
    } else {
      await client.query("ROLLBACK");
      return res.status(403).send("you are not authorized to delete this message");
    }
    //this will mark the message to be soft deleted by the respective user
    await client.query(updateQuery, [ messageId ]);

    //check to see if both sender and recipient have soft deleted the message
    const checkQuery = `SELECT deleted_by_sender,
                        deleted_by_recipient
                        FROM "messages"
                        WHERE id = $1;`;
    const checkResult = await client.query(checkQuery, [messageId]);
    
    //this will check to see if the row exists for the given message
    if(checkResult.rows.length > 0){
      const { deleted_by_sender, deleted_by_recipient}= checkResult.rows[0];

      //this will check if the message has been soft deleted by user and recipient
      //if so it will delete the message from the database
      if(deleted_by_recipient === true && deleted_by_sender === true){
        const deleteQuery = `DELETE FROM "messages" WHERE id = $1;`;
        await client.query(deleteQuery, [messageId]);
        console.log("message was hard deleted from database");
      }
    }   
    await client.query("COMMIT");
    res.sendStatus(200);
  } catch( err ){
    await client.query("ROLLBACK");
    console.log("error in delete route mailbox.router", err );
    res.sendStatus(500);
  } finally {
    client.release();
  }                     
  });

  module.exports = router;

