import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUserId } from "../../slices/auth";
import TextContainer from "../TextContainer/TextContainer";
import Messages from "../Messages/Messages";
import InfoBar from '../InfoBar/InfoBar';
import Input from "../Input/Input";
import "./chat.css";

import { getUsers } from "./../../services/user.service";
import { sendMessage, getMessages } from "./../../services/chat.service";

function Message() {
  //let activeUser;
  const [activeUser, setActiveUser] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [lastMessage, setlastMessage] = useState("");
  const [chatUser, setChatUser] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  //const [flag, setFlag]=useState(0);
  //const ENDPOINT = 'https://localhost:3000/';

  // const isLoggedIn  = useSelector((state) => {
  //   console.log("state==>", state);
  //   console.log("state==>", state.auth.user._id);
  //    setFrom(state.auth.user._id);
  //   console.log("from", from);
  //  setFrom(state.auth.user._id);

  //   //return   (state.hasOwnProperty('auth')) ?  state.auth.isLoggedIn : localStorage.getItem('isLoggedIn')
  //   })

  const userId = useSelector(selectUserId);
  const messageHandler = (event) => {
    event.preventDefault();
    let messageBody = { message, to: to };
    sendMessage(messageBody).then((result) => {
         //call get message
      setlastMessage(result.id);
      setMessage("")
    });
  };
  const clickHandler =(user)=>{
   // console.log(user);
   setMessages([])
    setChatUser(user.first_name+' '+user.last_name)

    setTo(user._id)
    getMessages(user._id).then((result) => {
      // console.log("Chat Message", result);
      setMessages(result.message);
    });
  }
  useEffect(() => {
    getUsers().then((result) => {
      setUsers(result);
      
  });
  return () => {
      //cleanup
    };
  }, []);
  useEffect(() => {
    if (users.length > 0) {
      setActiveUser(<TextContainer users={users} clickHandler = {clickHandler} />)
    } else {
      //activeUser = "Waiting...";
      setActiveUser("waiting")
    }
    return () => {
     
    }
  }, [users?.length])

  useEffect(() => {
    setFrom(userId);

    return () => {
      //cleanup
    };
  }, [userId]);

  useEffect(() => {
    if (chatUser) {
      getMessages(to).then((result) => {
        setMessages(result.message);
      });
    }

    return () => {
      //cleanup
    };
  }, [lastMessage]);

  useEffect(() => {
    let fetchMessage
   if(chatUser) {
     fetchMessage=  setInterval(function () { getMessages(to).then((result) => {
      setMessages(result.message);
    })}, 5000);
   }
  


    return () => {
      clearInterval(fetchMessage)
    };
  }, [chatUser]);
  
  return (
    <>
      <div className="outerContainer">
        {activeUser}
        <div className="container-chat">
          <InfoBar room={chatUser} />
          <Messages messages={messages} name={from} />
          <Input
            message={message}
            setMessage={setMessage}
            sendMessage={messageHandler}
            selectFrd={chatUser}
          />
        </div>
      </div>
    </>
  );
}

export default Message;
