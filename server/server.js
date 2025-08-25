require('dotenv').config();
const express = require('express');

// Instantiate an express server:
const app = express();

// Use process.env.PORT if it exists, otherwise use 5001:
const PORT = process.env.PORT || 5001;

// Require auth-related middleware:
const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Apply middleware:
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('build'));
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

// Require router files:
const userRouter = require('./routes/user.router');
const mailboxRouter = require('./routes/mailbox.router');
const updateProfileRouter =require('./routes/update_profile.router');
const findAFriendRouter = require('./routes/findAFriend.router');
const friendsPageRouter = require('./routes/friendsPage.router');
const friendRequestRouter = require('./routes/friendRequest.router');

// Apply router files:
app.use('/api/user', userRouter);
app.use('/api/mailbox', mailboxRouter);
app.use('/api/update_profile', updateProfileRouter );
app.use('/api/find_a_friend', findAFriendRouter );
app.use('/api/friends_page', friendsPageRouter );
app.use('/api/friend_request', friendRequestRouter );

// Start the server:
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});


