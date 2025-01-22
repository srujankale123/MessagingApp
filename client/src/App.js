import './App.css';
import io from 'socket.io-client';
import {useState,useEffect} from "react";

const socket = io.connect("http://localhost:3001");

function App() {

  const [message,setMessage] = useState("");
  const [messageReceived,setMessageReceived] = useState("");


  const sendmessage = () => {
    socket.emit("sendmessage",{message: message});

  }

  useEffect(() => {
    socket.on("receivemessage",(data) => {
      setMessageReceived(data.message);
    })
  })

  return (
    <div className="App">
      <input placeholder='Message' onChange={(event) => {
        setMessage(event.target.value);
      }}/>
      <button onClick={sendmessage}>Send</button>
      <h1>Message:</h1>
      {messageReceived}
    </div>
  );
}

export default App;
