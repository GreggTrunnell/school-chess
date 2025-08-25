const express = require('express');
const pool = require('../modules/pool');

const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

const router = express.Router();

//GET for search results
router.get("/search", rejectUnauthenticated, (req, res) => {
  const searchQuery = req.query.q || "";
  const userId = req.user.id; 
  const queryText = ` SELECT u.username AS "username",
                      u.email AS "email",
                      u.city AS "city",
                      u.zip AS "zip",
                      u.greeting AS "greeting",
                      u.playing_hand AS "playing_hand",
                      u.racquet_brand AS "racquet_brand",
                      u.id AS "id"
                      FROM "user" u
                      WHERE (u.username ILIKE $1
                      OR u.email ILIKE $1
                      OR u.city ILIKE $1
                      OR CAST(u.zip AS TEXT) ILIKE $1
                      OR u.playing_hand ILIKE $1)
                      AND u.id != $2;`;

  const values = [`%${searchQuery}%`, userId];

  pool.query( queryText, values)
  .then((results)=>{
    
    res.send(results.rows)
  })
  .catch((err)=>{
    console.log('err in ', err)
    res.sendStatus(400)
  })
})

//GET for pending requests
router.get("/pending_requests", rejectUnauthenticated, (req, res) => {
  const userId = req.user.id; 
  const queryText =`SELECT u.id AS "user id", 
                    friends.requester_id AS "requesterId", 
                    friends.recipient_id AS "recipientId", 
                    u.username AS "username", 
                    recipient.username AS "recipientUsername", 
                    friends.id AS "friendsId",
                    TO_CHAR(friends.timestamp, 'MM-DD-YYYY') AS "timestamp"
                    FROM "user" AS "u"
                    JOIN "friends" ON u.id = friends.requester_id
                    JOIN "user" AS recipient ON friends.recipient_id = recipient.id 
                    WHERE u.id = $1;`;

    pool.query( queryText, [userId] )
    .then((results) => {
      res.send(results.rows);
    })
    .catch((err) => {
      console.log("err in api/friends_page GET", err);
      res.sendStatus(400);
    });
});

//POST to send friend requests
router.post("/send_request", rejectUnauthenticated, (req, res) => {
  const userId = req.user.id 
  const { recipient_id, approved } = req.body;
  console.log("requesting friend");
  const queryText = `INSERT INTO "friends" ("requester_id", "recipient_id", "approved")
                     VALUES ($1, $2, $3);`;
    pool.query(queryText, [ userId, recipient_id, approved ])
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log("error in post.findAFriend.router", err);
    });
});

//DELETE to remove a friend request
router.delete("/delete_request/:requestId", rejectUnauthenticated, (req, res) => {
  const requestId = req.params.requestId;
  const deleteQuery = `DELETE FROM "friends" 
                       WHERE id = $1`;
  pool.query(deleteQuery,[requestId])
  .then(( result )=>{
    res.sendStatus(201);
  })
  .catch((err)=>{
    console.log("error in remove friend request findafriend router",err)
  });
});
module.exports = router;
