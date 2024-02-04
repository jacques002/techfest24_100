import React, { useEffect, useRef, useState } from 'react'
import NavMenu from '../../components/nav_menu/NavMenu'
import styles from './ChatPage.module.scss'
import ChatMessageHolder from '../../components/chat_message/ChatMessageHolder'
import ChatInput from '../../components/chat_message/ChatInput'
import axios from 'axios'
const ChatPage = () => {
  const ws_host = process.env.REACT_APP_WS_BACKEND;
  const hasRunOnce = useRef(false);
  const [initMessages,setInitMessages]=useState([
    {'entity':'bot',
    'message':'hello',
    'appeared':false},
    {'entity':'user',
    'message':'hello',
    'appeared':false},
    {'entity':'bot',
    'message':'helfsefsefefesfselohelfsefsefefesfselo helfsefsefefesfselo helfsefsefefesfselo ',
    'appeared':false},
    {'entity':'user',
    'message':'helfsefsefefesfselohelfsefsefefesfselo helfsefsefefesfselo helfsefsefefesfselo ',
    'appeared':false},{'entity':'bot',
    'message':'hello',
    'appeared':false},
    {'entity':'user',
    'message':'hello',
    'appeared':false},
    {'entity':'bot',
    'message':'helfsefsefefesfselohelfsefsefefesfselo helfsefsefefesfselo helfsefsefefesfselo ',
    'appeared':false},
    {'entity':'user',
    'message':'helfsefsefefesfselohelfsefsefefesfselo helfsefsefefesfselo helfsefsefefesfselo ',
    'appeared':false},{'entity':'bot',
    'message':'hello',
    'appeared':false},
    {'entity':'user',
    'message':'hello',
    'appeared':false},
    {'entity':'bot',
    'message':'helfsefsefefesfselohelfsefsefefesfselo helfsefsefefesfselo helfsefsefefesfselo ',
    'appeared':false},
    {'entity':'user',
    'message':'helfsefsefefesfselohelfsefsefefesfselo helfsefsefefesfselo helfsefsefefesfselo ',
    'appeared':false},{'entity':'bot',
    'message':'hello',
    'appeared':false},
    {'entity':'user',
    'message':'hello',
    'appeared':false},
    {'entity':'bot',
    'message':'helfsefsefefesfselohelfsefsefefesfselo helfsefsefefesfselo helfsefsefefesfselo ',
    'appeared':false},
    {'entity':'user',
    'message':'helfsefsefefesfselohelfsefsefefesfselo helfsefsefefesfselo helfsefsefefesfselo ',
    'appeared':false},
  ])
  const [messages,setMessages]=useState([])
  const [lastMessage,setLastMessage]=useState('')
  

  useEffect(()=>{
    //load effect and initial fetch to initMessage
    if (hasRunOnce.current) return;
    hasRunOnce.current = true;
    function wait(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    async function addMessages(){
      for (let i = 0; i < initMessages.length; i++) {
        await wait(50);
        setMessages(messages=>[...messages,initMessages[i]])
      }
    }
    addMessages()
  },[])

  const sendMessage=(message)=>{
    let messageData=''
    setMessages(messages=>[...messages,{'entity':'user','message':message}])
    const ws = new WebSocket(ws_host+'/chat/stream_response?new_message='+message);

    ws.onopen = () => {
      console.log('WebSocket connection established');
    };

    ws.onmessage = (event) => {
      console.log('Message from server: ', event.data);
      messageData=messageData+event.data
      setLastMessage(messageData);
    };

    ws.onclose = (event) => {
      if (event.wasClean) {
        console.log(`Connection closed cleanly, code=${event.code}, reason=${event.reason}`);
        setTimeout(()=>{
          setMessages(messages=>[...messages,{'entity':'bot','message':messageData,'appeared':true,'audiofetch':true}])
          setLastMessage('');
        },1000)
        
      } else {
        setLastMessage('');
        console.log('Connection died');
      }
    };

    ws.onerror = (error) => {
      console.log('WebSocket error: ', error);
    };
  }

  return (
    <div>
      <ChatMessageHolder messages={messages} lastMessage={lastMessage}/>
      <ChatInput sendMessage={sendMessage}/>
    </div>
  )
}

export default ChatPage