import { useState, useEffect } from 'react';
import axios from 'axios';
import Mailbox from '../Mailbox/Mailbox';

function FriendsPage() {
  useEffect(() => {
    fetchFriends();
  }, []);
  
  const [ newMessage, setNewMessage ]=useState({ recipient_id: 0, message_content: ''})
  const [friendsList, setFriendsList] = useState([]);

  const fetchFriends = () => {
    axios
      .get("/api/friends_page")
      .then((response) => {
        console.log(response.data);
        setFriendsList(response.data);
      })
      .catch((err) => {
        console.log("error in FriendsPage get", err);
      });
  };

  const sendDirectMessage=(friendId)=>{
    console.log("sending dm", newMessage )
      axios.post("/api/mailbox", newMessage)
      .then(( response )=>{
        alert("dm sent");
        setNewMessage({ recipient_id: friendId, message_content: "" });
        fetchFriends();
      })
      .catch(( err )=>{
        console.log("error in dm post", err )
      })
  }

  const deleteFriend = (friendId) => {
    const isConfirmed = window.confirm("Are you sure you don't like them anymore?");

    if (isConfirmed) {
      console.log("deleteMe button hit");
      axios
        .delete(`/api/friends_page/${friendId}`)
        .then((response) => {
          console.log("back from delete", response.data);
          fetchFriends();
        })
        .catch((err) => {
          console.log("err in todoitem delete", err);
        });
    }
  };
 
  return (
<div className="container mt-4">
<img src="public/images/two_ball_kids.webp" style={{ width: "325px", height: "300px" }} />
  <h2>Friends:</h2>
  <div className="accordion" id="friendsAccordion">
    {friendsList.map((friend, index) => (
      <div className="accordion-item" key={index}>
        <h2 className="accordion-header" id={`heading${index}`}>
          <button
            className="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#collapse${index}`}
            aria-expanded="true"
            aria-controls={`collapse${index}`}
            style={{ backgroundColor: "#23367e", color: "white" }}
          >
            {friend.username}
          </button>
        </h2>
        <div
          id={`collapse${index}`}
          className="accordion-collapse collapse"
          aria-labelledby={`heading${index}`}
          data-bs-parent="#friendsAccordion"
        >
          <div className="accordion-body">
            <p>
              <strong>Email:</strong> {friend.email} <br />
              <strong>City:</strong> {friend.city} <br />
              <strong>Zip:</strong> {friend.zip} <br />
              <strong>Greeting:</strong> {friend.greeting} <br />
              <strong>Playing Hand:</strong> {friend.playing_hand} <br />
              <strong>Racquet Brand:</strong> {friend.racquet_brand} <br />
            </p>
            <form
              onSubmit={(e) => {
          
                sendDirectMessage(friend.friend_id);
              }}
            >
              <input
                type="text"
                placeholder="New Message"
                onChange={(e) =>
                  setNewMessage({
                    ...newMessage,
                    message_content: e.target.value,
                    recipient_id: friend.friend_id,
                  })
                }
              />
              <button type="submit" className="btn btn-primary mt-2">
               Send Message to {friend.username}
              </button>
            </form>
            <button
              className="btn btn-danger mt-2"
              onClick={() => deleteFriend(friend.friend_id)}
            >
              Delete Friend
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
 <Mailbox />
</div>
  );
}

export default FriendsPage;
