import React,{useState} from 'react';
import { useSelector } from "react-redux";
import { selectUserName } from "../../slices/auth";

import onlineIcon from '../../icons/onlineIcon.png';

import './TextContainer.css';




const TextContainer =({users, clickHandler})=>{
  const userName = useSelector(selectUserName);
  

  
  

  return(
    <>
    <div className="textContainer">
    <div>
      <h1>Welcome {userName}  </h1>
   
    </div>
    {
      users
        ? (
          <div>
            <h3>Chat User:</h3>
            <div className="activeContainer">
              <h2>
                   {users.map((user) => (
                     <div id={user._id}  className="activeItem" >
                       <a onClick={() => clickHandler(user)} >{user.first_name + ' '+ user.last_name}</a>
                     </div>
                ))}
              </h2>
            </div>
          </div>
        )
        : null
    }
  </div>
    </>
  )
}

export default TextContainer;