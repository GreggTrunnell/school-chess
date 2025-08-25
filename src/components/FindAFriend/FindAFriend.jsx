import { useState,useEffect } from 'react';
import axios from 'axios';

function FindAFriend() {

  useEffect(() => {
    pendingRequests();
  }, []);

  const [searchedFriends, setSearchedFriends] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [pendingFriendsRequests, setPendingFriendsRequest] = useState([]);

  const search = () => {
    console.log("getting search results", searchQuery);
    axios
      .get(`/api/find_a_friend/search?q=${searchQuery}`)
      .then((response) => {
        console.log("response from get findafreind", response.data);
        setSearchedFriends(response.data);
      })
      .catch((err) => console.log("error in findafriend get", err));
  };

  const pendingRequests = () =>{
    axios.get("/api/find_a_friend/pending_requests")
    .then(( response )=>{
      console.log("get from pending", response.data)
      setPendingFriendsRequest(response.data )
    })
    .catch((err)=>{
      console.log( "error get pending requests", err )
    })
  }

  const sendRequest=(friendId)=>{
  const requestData = {
    recipient_id: friendId,
    approved: false,
  }
  console.log("sending friend request", requestData )
    axios.post("/api/find_a_friend/send_request", requestData)
    .then(( response )=>{
      alert("Friend request sent");
      pendingRequests();
    })
    .catch(( err )=>{
      console.log("error in findafriend post", err )
    })
  }

  const deleteRequest = (requestId) => {
    const isConfirmed = window.confirm("You probably didn't want to be friends with them any way");
  
    if (isConfirmed) {
      axios
        .delete(`/api/find_a_friend/delete_request/${requestId}`)
        .then((response) => {
          console.log("Friend request declined:", response.data);
          pendingRequests();
        })
        .catch((err) => {
          console.log("Error declining friend request", err);
        });
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      search();
    }
  };

  return (
    <div className="FindAFriend">  
      <div>
        {pendingFriendsRequests.length > 0 && 
        pendingFriendsRequests.map((friend, index) => (
          <div key={index}>
            <h3>Pending: </h3>
            <p>Recipient: {friend.recipientUsername}</p>
            <p>Sent: {friend.timestamp}</p>
            <button onClick={() => deleteRequest(friend.friendsId)}>
              Remove Request
            </button>
            <hr />
          </div>
        ))}
      </div>
      <br />
      <img src="public/images/TennisBallKid.webp" style={{ width: "325px", height: "300px" }} />
      <h3>Search: </h3>
      <input
        type="text"
        placeholder="Find a friend"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={search}>Search</button>
      <div className="container mt-4">
        <div className="row">
        {searchedFriends.length === 0 ? (
          <p className="red-text">No results found.</p>
         ) : searchedFriends.map((friend, index) => (
            <div className="col-md-6 mb-4" key={index}>  
              <div
                    className="card"
                    style={{ backgroundColor: "#73cc64", color: "white" }}
                  >    
              <div className="card-body">
                <h5 className="blue-text">Username: { friend.username}</h5> 
                <hr style={{ borderTop: "5px solid #800000" }}/> 
                <p className="blue-text">Email: {friend.email}</p>
                <p className="blue-text">City: {friend.city}</p>
                <p className="blue-text">Zip: {friend.zip}</p>
                <p className="blue-text">Greeting: {friend.greeting}</p>
                <p className="blue-text">Playing Hand: {friend.playing_hand}</p>
                <p className="blue-text">Racquet Brand: {friend.racquet_brand}</p>   
                <button onClick={() => sendRequest(friend.id)}> Request Friend</button>    
              </div> 
            </div>        
          </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FindAFriend;
