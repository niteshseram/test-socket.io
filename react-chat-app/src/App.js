import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import io from "socket.io-client";

import Home from "./components/Home";
import Chat from "./components/Chat";

let socket ="";
const App = () => {
  const ENDPOINT = "http://localhost:5000";
  useEffect(()=>{
    socket = io(ENDPOINT);
  })
  return (
  <Router>
    <Route path="/" exact component={Home} />
    <Route path="/chat" component={()=> <Chat socket={socket}/>} />
  </Router>
)
};

export default App;
