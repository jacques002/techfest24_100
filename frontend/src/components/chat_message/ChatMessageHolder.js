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
  },[props.messages,props.lastMessage])
  return (
    <div className={styles.ChatMessageHolder}>
      {props.openingMessage.length>0 && <ChatMessage entity={"narrator"} entity_name={"narrator"} message={props.openingMessage} appeared={true}/>}
      {props.messages.map((message,index)=>( 
        <ChatMessage key={index} entity={message.entity} message={message.message} entity_name={message.entity==='user'?'user':props.formData.name} appeared={message.appeared}/>
      ))}
      {props.lastMessage.length>0 && <ChatMessage entity={"bot"} entity_name={props.formData.name} message={props.lastMessage} appeared={false}/>}
      <div ref={messagesEndRef} />
    </div>
  )
}

export default ChatMessageHolder