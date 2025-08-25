import axios from "axios";
import { useState, useEffect } from "react";

function Mailbox() {
  useEffect(() => {
    fetchIncomingMessages();
  }, []);
  useEffect(() => {
    fetchSentMessages();
  }, []);

  const [messageList, setMessageList] = useState([]);
  const [sentMessages, setSentMessages] = useState([]);

  //needed to create another router to handle this get
  const fetchIncomingMessages = () => {
    axios
      .get("/api/mailbox/incoming")
      .then((response) => {
        console.log(response.data);
        setMessageList(response.data);
      })
      .catch((err) => {
        console.log("error in Mailbox.get incoming", err);
      });
  };

  const fetchSentMessages = () => {
    axios
      .get("/api/mailbox/sent")
      .then((response) => {
        console.log(response.data);
        setSentMessages(response.data);
      })
      .catch((err) => {
        console.log("error in Mailbox.get sent", err);
      });
  };

  const deleteRecipientMessage = (messageId) => {
    console.log("message id", messageId);
    axios
      .put(`/api/mailbox/delete`, { messageId })
      .then((response) => {
        console.log("response from update", response.data);
        fetchIncomingMessages();
      })
      .catch((err) => {
        console.log("error in mailbox put", err);
      });
  };

  const deleteSenderMessage = (messageId) => {
    console.log("message id", messageId);
    axios
      .put(`/api/mailbox/delete`, { messageId })
      .then((response) => {
        console.log("response from update", response.data);
        fetchSentMessages();
      })
      .catch((err) => {
        console.log("error in mailbox put", err);
      });
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {messageList.length > 0 && (
          <>
            <h2>Incoming Messages:</h2>
            <div className="row">
              {messageList.map((message, index) => (
                <div className="col-md-6 mb-5" key={index}>
                  <div
                    className="card"
                    style={{ backgroundColor: "#73cc64", color: "white" }}
                  >
                    <div className="card-body">
                      <h5 className="card-title">
                        <div className="blue-text">From: {message.sender}</div>
                        <hr style={{ borderTop: "5px solid #800000" }}/> 
                      </h5>
                      <div className="card-text">
                      <div className="blue-text font-size-25"> {message.message}</div>
                        <strong>Message sent: {message.timestamp}</strong>
                        <br />
                      </div>
                    </div>
                    <button onClick={() => deleteRecipientMessage(message.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <div className="row">
        {sentMessages.length > 0 && (
          <>
            <h2>Sent Messages:</h2>
            <div className="row">
              {sentMessages.map((message, index) => (
                <div className="col-md-6 mb-5" key={index}>
                  <div
                    className="card"
                    style={{ backgroundColor: "#c87b20", color: "white" }}
                  >
                    <div className="card-body">
                      <h5 className="card-title">
                        <div className="green-text">To: {message.to}</div>
                        <hr style={{ borderTop: "5px solid #800000" }}/> 
                      </h5>
                      <div className="green-text font-size-25"> {message.message}</div>
                        <strong>Message sent: {message.timestamp}</strong>
                      <div className="card-text">                 
                        <br />
                      </div>
                    </div>
                    <button onClick={() => deleteSenderMessage(message.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Mailbox;
