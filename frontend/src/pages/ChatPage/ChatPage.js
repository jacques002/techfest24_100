import React, { useEffect, useRef, useState } from 'react'
import NavMenu from '../../components/nav_menu/NavMenu'
import styles from './ChatPage.module.scss'
import ChatMessageHolder from '../../components/chat_message/ChatMessageHolder'
import ChatInput from '../../components/chat_message/ChatInput'
import axios from 'axios'
import { toast } from 'react-toastify'
import ChatChoice from '../../components/chat_choice/ChatChoice'
const ChatPage = () => {
  const ws_host = process.env.REACT_APP_WS_BACKEND;
  const host = process.env.REACT_APP_BACKEND;
  const hasRunOnce = useRef(false);
  const audioRef = useRef(new Audio());
  const [openingMessage,setOpeningMessage]=useState('')
  const [initMessages,setInitMessages]=useState([
  ])
  const [messages,setMessages]=useState([])
  const [lastMessage,setLastMessage]=useState('')
  const [openChoice,setOpenChoice]=useState(true)
  const [formData, setFormData] = useState({
    name: '',
    voice:'',
    language: '',
    personality: '',
    location:'',
    atmosphere:'',
    proficiency:''
  });
  const headers ={
    'authorization': localStorage.getItem('token')
  }
  

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
    const newMessages=[...messages,{'entity':'user','message':message}]
    setMessages(messages=>[...messages,{'entity':'user','message':message}])
    const ws = new WebSocket(ws_host+'/chat/stream_response')

    ws.onopen = () => {
      console.log('WebSocket connection established');
      const payload=formData;
      payload['messages']=[]
      payload['messages'].push(
        {
          'role':'assistant',
          'content':openingMessage
        }
      )
      newMessages.forEach((message)=>{
        payload['messages'].push(
          {
            'role':message.entity==='bot'?'assistant':'user',
            'content':message.message
          }
        )
      })
      ws.send(JSON.stringify(payload));
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
          try{
            const response = await axios.get(host+'/chat/get_audio?id='+'1'+'&text='+messageData +'&voice='+formData.voice, {
              responseType: 'blob',
              headers: headers
            });
            const mp3Blob = response.data;
            const url = URL.createObjectURL(mp3Blob);
            if (audioRef.current.src) {
              URL.revokeObjectURL(audioRef.current.src);
            }
            audioRef.current.src = url;
            console.log(url)
            audioRef.current.play().catch(error => console.error('Error playing audio:', error));
            toast.success('Audio playing');
          }
          catch (error) {
            toast.error('Error fetching audio');
          }
        }
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

  const sendScenario=(payload)=>{
    setFormData(payload)
    let messageData=''
    const ws = new WebSocket(ws_host+'/chat/stream_scenario?name='+payload.name+'&voice='+payload.voice+'&language='+payload.language+'&personality='+payload.personality+'&location='+payload.location+'&atmosphere='+payload.atmosphere+'&proficiency='+payload.proficiency);

    ws.onopen = () => {
      console.log('WebSocket connection established');
      setOpenChoice(false);
    };

    ws.onmessage = (event) => {
      console.log('Message from server: ', event.data);
      messageData=messageData+event.data
      setOpeningMessage(messageData);
    };

    ws.onclose = (event) => {
      if (event.wasClean) {
        console.log(`Connection closed cleanly, code=${event.code}, reason=${event.reason}`);
        const get_audio = async () =>{
          try{
            const response = await axios.get(host+'/chat/get_audio?id='+'1'+'&text='+messageData+'&voice='+payload.voice, {
              responseType: 'blob', // This tells Axios to expect a binary response
              headers: headers
            });
            const mp3Blob = response.data;
            const url = URL.createObjectURL(mp3Blob);
            if (audioRef.current.src) {
              URL.revokeObjectURL(audioRef.current.src);
            }
            audioRef.current.src = url;
            console.log(url)
            audioRef.current.play().catch(error => console.error('Error playing audio:', error));
            toast.success('Audio playing');
          }
          catch (error) {
            toast.error('Error fetching audio');
          }
        }
        get_audio();
        
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
      {openChoice===true && <ChatChoice sendScenario={sendScenario} />}
      <ChatMessageHolder messages={messages} lastMessage={lastMessage} openingMessage={openingMessage} formData={formData}/>
      <ChatInput sendMessage={sendMessage} formData={formData}/>
    </div>
  )
}

export default ChatPage