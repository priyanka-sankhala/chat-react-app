import React from 'react';
import './Input.css';

const Input = ({message, setMessage, sendMessage,selectFrd}) => (
    <form className="chat-form">
        <input disabled={!selectFrd} className="chat-input" placeholder="Type a message..."  
        value={message}
        onChange={(event) => setMessage(event.target.value)} 
        onKeyPress={event => event.key==='Enter' ? sendMessage(event) : null}
        />
        <button className="sendButton" onClick={(event) => sendMessage(event)}>Send</button>
    </form>
)

export default Input;