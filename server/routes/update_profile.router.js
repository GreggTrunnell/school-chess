const express = require('express');
const pool = require('../modules/pool');

const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

const router = express.Router();

//PUT to update user's profile
router.put("/", rejectUnauthenticated, ( req, res )=>{
  const profileUpdate = req.body;
  const queryText= `UPDATE "user" 
                    SET username = ($1), 
                    email = ($2),
                    city = ($3),
                    zip = ($4),
                    greeting = ($5),
                    playing_hand = ($6),
                    racquet_brand = ($7)
                    WHERE id=($8);`;

  pool.query( queryText, [ profileUpdate.username, profileUpdate.email, profileUpdate.city, profileUpdate.zip, profileUpdate.greeting, profileUpdate.playing_hand, profileUpdate.racquet_brand, profileUpdate.id ] )
  .then(( results )=>{
    res.sendStatus( 200 )
  })
  .catch(( err )=>{
    console.log("error put router", err );
    res.sendStatus( 400 );
  });
  })

module.exports = router;