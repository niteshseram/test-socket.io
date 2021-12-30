import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";


let socket;

const Chat = ({ socket }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  let location = useLocation();

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    setRoom(room);
    setName(name);

    socket && socket.emit("join", { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [location.search, socket]);

  useEffect(() => {
    socket && socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });
    // socket.on("roomData", ({ users }) => {
    //   console.log(users);
    //   setUsers(users);
    // });
  }, [socket]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit("sendMessage", { message });
      setMessage("");
    } else alert("empty input");
  };

  return (
    <div>
      {messages.map((val, i) => {
        return (
          <div key={i}>
            {val.text}
            <br />
            <b>{val.user}</b>
          </div>
        );
      })}
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <input type="submit" />
      </form>
    </div>
  );
};

export default Chat;
