const express = require('express');
const pool = require('../modules/pool');

const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

const router = express.Router();

//GET to fetch friend requests
//!query could maybe be refactored to have less code
router.get('/', rejectUnauthenticated, (req, res) => {
      const userId = req.user.id; 
      const queryText =`SELECT friends.requester_id AS "requester_id", 
                        requester.username AS "requester_username",
                        friends.recipient_id AS "recipient_id", 
                        recipient.username AS "recipient_username",
                        friends.approved AS "approval",
                        TO_CHAR(friends.timestamp, 'MM-DD-YYYY') AS "timestamp"
                        FROM "friends"
                        JOIN "user" AS requester ON requester.id = friends.requester_id
                        JOIN "user" AS recipient ON recipient.id = friends.recipient_id
                        WHERE friends.recipient_id = $1;`; 
        pool.query( queryText, [ userId ] )
        .then((results) => {
          res.send(results.rows);
        })
        .catch((err) => {
          console.log("err in api/friends_page GET", err);
          res.sendStatus(400);
        });
    });

//POST to handle incoming friend requests
router.post("/", rejectUnauthenticated, async(req, res)=>{
      const userId = req.user.id;
      const { friendId } = req.body;
    
      const client = await pool.connect();
    
      try{
        await client.query("BEGIN");
        
        const checkQuery = `SELECT * FROM "friends" 
                            WHERE (user_id = $1 AND friend_id = $2) 
                            OR (user_id = $2 AND friend_id = $1);`;
        const checkResult = await client.query(checkQuery, [userId, friendId]);
            if (checkResult.rows.length > 0 ){
              await client.query("ROLLBACK");
              return res.status(409).json({message: "Hmm? It appears you are already friends."})};
    
        const insertQuery = `INSERT INTO "friends" (user_id, friend_id) 
                             VALUES ($1, $2), ($2, $1);`;
          await client.query(insertQuery, [userId, friendId]);      
    
        const deleteRequestQuery = `DELETE FROM "friends" 
                                    WHERE requester_id = $1 AND recipient_id = $2;`;
          await client.query(deleteRequestQuery, [friendId, userId]);
    
        await client.query("COMMIT");
        res.status(201).json({message: "Yay! They'll be so happy!"})
    
      } catch(err) {
          await client.query("ROLLBACK");
          res.status(500).json({message: "Error in Post catch friendRequest.router"});
      } finally {
        client.release();
      }
    });

//DELETE route to handle declining a friend 
router.delete("/:requesterId", rejectUnauthenticated, (req, res)=>{
  const requesterId = req.params.requesterId;
  const recipientId = req.user.id; 
  queryText=`DELETE FROM "friends" 
                         WHERE requester_id = $1
                         AND recipient_id = $2;`;
  pool.query( queryText, [ requesterId, recipientId])
  .then(( results )=>{
    res.sendStatus( 201 )
  })
  .catch((err)=>{
    console.log("Error in delete frienRequestRouter", err)
    res.sendStatus(400);
  });
})

module.exports = router;