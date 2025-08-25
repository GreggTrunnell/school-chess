const express = require('express');
const pool = require('../modules/pool');

const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

const router = express.Router();

//GET to list current friends
router.get("/", rejectUnauthenticated, (req, res) => {
    const userId = req.user.id; 
    const queryText = `SELECT friends.user_id AS "user_friend_id", 
                       friends.friend_id AS "friend_id", 
                       u.username AS "username", 
                       u.email AS "email",
                       u.city AS "city",
                       u.zip AS "zip",
                       u.greeting AS "greeting",
                       u.playing_hand AS "playing_hand",
                       u.racquet_brand AS "racquet_brand"
                       FROM "user" AS u
                       JOIN "friends" ON u.id = friends.friend_id
                       WHERE friends.user_id = $1
                       ORDER BY friends.friend_id ASC;`;

      pool.query( queryText, [userId] )
      .then((results) => {
        res.send(results.rows);
      })
      .catch((err) => {
        console.log("err in api/friends_page GET", err);
        res.sendStatus(400);
      });
  });

  //DELETE to delete a friend
  router.delete("/:id", rejectUnauthenticated, ( req, res )=>{
    const friendId = req.params.id;
    const userId = req.user.id;
    const queryText = `DELETE FROM "friends" 
                       WHERE friends.friend_id=$1
                       AND user_id = $2`;

    pool.query( queryText, [ friendId, userId ]).then(( results )=>{
        res.sendStatus( 201  );
    }).catch(( err )=>{
        console.log( err );
        res.sendStatus( 400 );
    })
})

module.exports = router;