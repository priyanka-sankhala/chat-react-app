import React from 'react';
import { useSelector } from "react-redux";
import { selectUserName } from "../../slices/auth";

import './Message.css';

import ReactEmoji from 'react-emoji';

const Message = (props) => {
  console.log("Messages==>", props);
  let name=props.name
  let text =props.message

  const userName = useSelector(selectUserName);
  
  let user =userName;
  let isSentByCurrentUser = false;
  const trimmedName = name.trim().toLowerCase();

  if(user.trim().toLowerCase() === trimmedName) {
    isSentByCurrentUser = true;
  }

  return (
    isSentByCurrentUser
      ? (
        <div className="messageContainer justifyEnd">
          <p className="sentText pr-10">{trimmedName}</p>
          <div className="messageBox backgroundBlue">
            <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
          </div>
        </div>
        )
        : (
          <div className="messageContainer justifyStart">
            <div className="messageBox backgroundLight">
              <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
            </div>
            <p className="sentText pl-10 ">{trimmedName}</p>
          </div>
        )
  );
}

export default Message;