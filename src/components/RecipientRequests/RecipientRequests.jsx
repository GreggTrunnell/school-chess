import { useState, useEffect } from 'react';
import axios from 'axios';

function RecipientRequests() {
  useEffect(() => {
    fetchRequests();
  }, []);

  const [friendRequests, setFriendRequest] = useState([]);

  const fetchRequests = () => {
    axios
      .get("/api/friend_request")
      .then((response) => {
        console.log(response.data);
        setFriendRequest(response.data);
      })
      .catch((err) => {
        console.log("error in FriendsPage get", err);
      });
  };

  const acceptFriend = (friendId) => {
    axios
      .post("/api/friend_request", { friendId })
      .then((response) => {
        alert(response.data.message);
        setFriendRequest((prevRequests) =>
          prevRequests.filter((friend) => friend.requester_id !== friendId)
        );
      })
      .catch((err) => {
        console.log("error in homepage.js", err);
        alert(err.response.data.message);
      });
  };

  const declineFriend = (requesterId) => {
    const isConfirmed = window.confirm("They probably didn't want to be friends with you anyway");

    if (isConfirmed) {
    axios
      .delete(`/api/friend_request/${requesterId}`)
      .then((response) => {
        console.log("Friend request declined:", response.data);
        setFriendRequest((prevRequests) =>
          prevRequests.filter((friend) => friend.requester_id !== requesterId)
        );
      })
      .catch((err) => {
        console.log("Error declining friend request", err);
      });
    }
  };

  return (
    <div className="RecipientRequests">
      {friendRequests.length > 0 && (
        <div>
          <h3>Friend Requests:</h3>
          <div>
            {friendRequests.map((friend, index) => (
              <div key={index}>
                <p>
                  <strong>Friend Request From: </strong>
                  {friend.requester_username}
                </p>
                <p>
                  <strong>Sent </strong>
                  {friend.timestamp}
                </p>
                <div>
                  <p>
                    <button onClick={() => acceptFriend(friend.requester_id)}>
                      Accept
                    </button>
                    -
                    <button onClick={() => declineFriend(friend.requester_id)}>
                      Decline
                    </button>
                  </p>
                </div>
                <hr />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};  

export default RecipientRequests;

