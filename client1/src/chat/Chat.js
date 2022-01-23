import React, { useEffect, useState } from "react";
import { Button } from "rsuite";
import { loggedInUser, recievingUser} from "../globalStates/globalState";

var stompClient = null;
const Chat = (props) => {
  const currentUser = useState(loggedInUser);
  const [activeContact, setActiveContact] = useState(recievingUser);

  useEffect(() => {
    connect();
  }, []);

  const connect = () => {
    const Stomp = require("stompjs");
    var SockJS = require("sockjs-client");
    SockJS = new SockJS("http://localhost:8080/ws");
    stompClient = Stomp.over(SockJS);
    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    console.log("connected");
    console.log(currentUser);
    stompClient.subscribe(
      "/user/" + currentUser.id + "/queue/messages",
      onMessageReceived
    );
  };

  const onError = (err) => {
    console.log(err);
  };

  const onMessageReceived = (msg) => {
    const notification = JSON.parse(msg.body);
  };

  const sendMessage = (msg) => {
    if (msg.trim() !== "") {
      const message = {
        senderId: currentUser.id,
        recipientId: activeContact.id,
        senderName: currentUser.name,
        recipientName: activeContact.name,
        content: msg,
        timestamp: new Date(),
      };
      stompClient.send("/app/chat", {}, JSON.stringify(message));
      console.log(msg);

    }
  };

  const style = {
    flexDirection: 'column',
    textAlign: 'center',
    marginTop: '20%',
    backgroundColor: '#34495e',
    color: '#ecf0f1',
    borderRadius: '0.9em'
  }
  return (
    <RecoilRoot>
      <div style={style}>
      <h3> Client2 [Student] is Up!  </h3>    
      <Button
          appearance="primary"
          style={{ width: "6rem", margin: "0.5rem", backgroundColor: "#c0392b" }}
          onClick={() => sendMessage('Hi Client-2!')}            
        >
          Send Stuf..
      </Button>
      </div>
    </RecoilRoot>
  );

};

export default Chat;
