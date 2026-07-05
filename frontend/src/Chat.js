import React, { useState, useEffect, useRef } from "react";
import socket from "./socket";
import "./Chat.css";

function Chat() {
  const [username, setUsername] = useState("");
  const [joined, setJoined] = useState(false);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const [onlineUsers, setOnlineUsers] = useState(0);

  const chatEndRef = useRef(null);

  useEffect(() => {

    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    socket.on("users_online", (count) => {
      setOnlineUsers(count);
    });

    return () => {
      socket.off("receive_message");
      socket.off("users_online");
    };

  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const joinChat = () => {

    if (username.trim() === "") return;

    socket.emit("join_chat", username);

    setJoined(true);
  };

  const sendMessage = () => {

    if (message.trim() === "") return;

    const msg = {
      user: username,
      text: message,
      time: new Date().toLocaleTimeString(),
      system: false,
    };

    socket.emit("send_message", msg);

    setMessage("");

  };

  if (!joined) {

    return (

      <div className="login">

        <h1>💬 Chat Application</h1>

        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <button onClick={joinChat}>
          Join Chat
        </button>

      </div>

    );

  }

  return (

    <div className="chat-container">

      <div className="header">

        <div>
          <h2>💬 Chat Room</h2>
          <p>Welcome {username}</p>
        </div>

        <div>
          👥 {onlineUsers} Online
        </div>

      </div>

      <div className="chat-box">

        {messages.map((msg, index) => (

          msg.system ?

          <div key={index} className="system-message">

            {msg.text}

            <br />

            <small>{msg.time}</small>

          </div>

          :

          <div
            key={index}
            className={
              msg.user === username
                ? "my-message"
                : "other-message"
            }
          >

            <strong>{msg.user}</strong>

            <p>{msg.text}</p>

            <small>{msg.time}</small>

          </div>

        ))}

        <div ref={chatEndRef}></div>

      </div>

      <div className="input-area">

        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e)=>setMessage(e.target.value)}
          onKeyDown={(e)=>{
            if(e.key==="Enter"){
              sendMessage();
            }
          }}
        />

        <button onClick={sendMessage}>
          Send
        </button>

      </div>

    </div>

  );

}

export default Chat;