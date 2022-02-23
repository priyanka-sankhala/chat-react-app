import React,{useRef, useEffect} from 'react';
import './Messages.css';
import Message from '../Message/Message';
import { css } from '@emotion/css';


import ScrollToBottom from 'react-scroll-to-bottom';

console.log("here in messages ");
const Messages = ({messages, name}) => {
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  
    useEffect(() => {
      scrollToBottom()
    }, [messages]);
  
    return (
        <>
        {messages.map((message, i) => <div key={i}><Message message={message.message} name={message?.from?.first_name} /></div>)}
        <div ref={messagesEndRef} />
       </>
    )
   
   
}

export default Messages;