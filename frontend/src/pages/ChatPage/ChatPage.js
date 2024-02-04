import React, { useState } from 'react'
import NavMenu from '../../components/nav_menu/NavMenu'
import styles from './ChatPage.module.scss'
import ChatMessageHolder from '../../components/chat_message/ChatMessageHolder'
import ChatInput from '../../components/chat_message/ChatInput'
const ChatPage = () => {
  const [messages,setMessages]=useState([
    {'entity':'bot',
    'message':'hello'},
    {'entity':'user',
    'message':'hello'},
    {'entity':'bot',
    'message':'helfsefsefefesfselohelfsefsefefesfselo helfsefsefefesfselo helfsefsefefesfselo '},
    {'entity':'user',
    'message':'helfsefsefefesfselohelfsefsefefesfselo helfsefsefefesfselo helfsefsefefesfselo '}
  ])

  const sendMessage=(message)=>{
    setMessages(messages=>[...messages,{'entity':'user','message':message}])
  }
  return (
    <div>
      <ChatMessageHolder messages={messages}/>
      <ChatInput sendMessage={sendMessage}/>
    </div>
  )
}

export default ChatPage