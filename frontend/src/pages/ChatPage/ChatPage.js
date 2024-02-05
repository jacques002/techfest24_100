import React, { useEffect, useRef, useState } from 'react'
import NavMenu from '../../components/nav_menu/NavMenu'
import styles from './ChatPage.module.scss'
import ChatMessageHolder from '../../components/chat_message/ChatMessageHolder'
import ChatInput from '../../components/chat_message/ChatInput'
import axios from 'axios'
import { toast } from 'react-toastify'
const ChatPage = () => {
  const ws_host = process.env.REACT_APP_WS_BACKEND;
  const host = process.env.REACT_APP_BACKEND;
  const hasRunOnce = useRef(false);
  const [audioSrc,setAudioSrc]=useState('')
  const audioRef = useRef(new Audio());
  const [playbackPercentage, setPlaybackPercentage] = useState(0);
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
        const get_audio = async () =>{
          const updatePlaybackPercentage = () => {
            if (audioRef.current.duration > 0) {
              const percentage = (audioRef.current.currentTime / audioRef.current.duration) * 100;
              setPlaybackPercentage(percentage);
            }
          };
          try{
            const response = await axios.get(host+'/chat/get_audio?id='+'1'+'&text='+messageData, {
              responseType: 'blob', // This tells Axios to expect a binary response
            });
            const mp3Blob = response.data;
            const url = URL.createObjectURL(mp3Blob);
            if (audioRef.current.src) {
              audioRef.current.removeEventListener('timeupdate', updatePlaybackPercentage);
              URL.revokeObjectURL(audioRef.current.src);
            }
            audioRef.current.src = url;
            audioRef.current.addEventListener('timeupdate', updatePlaybackPercentage);
            console.log(url)
            audioRef.current.play().catch(error => console.error('Error playing audio:', error));
            toast.success('Audio playing');
          }
          catch (error) {
            console.error('Error fetching audio', error);
            toast.error('Error fetching audio');
          }
        }
        console.log('Fetching audio')
        get_audio();
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
      {audioSrc && <audio controls autoPlay src={audioSrc}>Your browser does not support the audio element.</audio>}
      <ChatMessageHolder messages={messages} lastMessage={lastMessage}/>
      <ChatInput sendMessage={sendMessage}/>
    </div>
  )
}

export default ChatPage