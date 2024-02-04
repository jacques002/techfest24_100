import React, { useEffect, useState } from 'react'
import styles from './ChatMessage.module.scss'
import ChatMessage from './ChatMessage'
const ChatMessageHolder = (props) => {
  // scroll to bottom
  const messagesEndRef = React.createRef()
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }
  useEffect(()=>{
    scrollToBottom()
  },[props.messages])
  return (
    <div className={styles.ChatMessageHolder}>
      {props.messages.map((message,index)=>( 
        <ChatMessage key={index} entity={message.entity} message={message.message}/>
      ))}
      <div ref={messagesEndRef} />
    </div>
  )
}

export default ChatMessageHolder