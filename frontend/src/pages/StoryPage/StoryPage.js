import React, { useRef, useState } from 'react'
import StoryChoice from '../../components/story_choice/StoryChoice'
import axiosInstance from '../../utils/axiosinstance';
import { toast } from 'react-toastify';
import styles from './StoryPage.module.scss'

const StoryPage = () => {
  const [img, setImg] = useState('')
  const [story,setStory]=useState([])
  const [openChoice, setOpenChoice] = useState(true) 
  const [formData, setFormData] = useState({
    typeOfStory: '',
    nameOfStory: '',
    narratorVoice: '',
    language: '',
    genre: '',
    length: '',
    additions: ''
  });
  const audioRef = useRef(new Audio());
  const ws_host = process.env.REACT_APP_WS_BACKEND;
  const host = process.env.REACT_APP_BACKEND;
  const [actions,setActions] = useState( {
    action1:'-',
    action2:'-',
    action3:'-'
  })
  const [monologue, setMonologue] = useState('')
  const headers = {
    'authorization': localStorage.getItem('token')
  }

  const sendScenario=(payload)=>{
    setFormData(payload)
    let messageData=''
    console.log(ws_host)
    const ws = new WebSocket(ws_host+'/story/begin_story');

    ws.onopen = () => {
      console.log('WebSocket connection established');
      setOpenChoice(false);
      ws.send(JSON.stringify(payload));
    };

    ws.onmessage = (event) => {
      console.log('Message from server: ', event.data);
      messageData=messageData+event.data
      setMonologue(messageData);
    };



    ws.onclose = (event) => {
      if (event.wasClean) {
        console.log(`Connection closed cleanly, code=${event.code}, reason=${event.reason}`);
        const get_audio = async () =>{
          try{
            const response = await axiosInstance.get(host+'/chat/get_audio?id='+'1'+'&text='+messageData+'&voice='+payload.narratorVoice, {
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
        const get_image = async () =>{
          try{
            const response = await axiosInstance.get(host+'/story/get_image?query='+messageData, {
              headers: headers
            });
            const url = response.data.url;
            console.log(url)
            setImg(url);
          }
          catch (error) {
            toast.error('Error fetching image');
          }
        }
        const get_actions = async () => {
          const currentStory = story;
          if (messageData.length>0){
          currentStory.push({
            role: 'assistant',
            content: messageData
          });}
          console.log(story)
          console.log(currentStory)
          setStory(currentStory);
          try {
            const sendLoad={
              typeOfStory: payload.typeOfStory,
              nameOfStory: payload.nameOfStory,
              narratorVoice: payload.narratorVoice,
              language: payload.language,
              genre: payload.genre,
              length: payload.length,
              additions: payload.additions,
              messages: currentStory
            }

            const response = await axiosInstance.post(
              `${host}/story/get_actions`,sendLoad,
              {
                headers: headers
              }
            );
            const data = response.data;
            setActions(data.content)
          } catch (error) {
            console.log(error);
            toast.error('Error fetching actions');
          }
        };
        get_audio();
        get_image();
        get_actions();
      } else {
        console.log('Connection died');
      }
    };

    ws.onerror = (error) => {
      console.log('WebSocket error: ', error);
    };
  }

  const continueStory=(action)=>{
    let messageData=''
    const currentStory = story;
    console.log(currentStory)
    currentStory.push({
      role: 'user',
      content: action
    });
    console.log(currentStory)
    setStory(currentStory);
    console.log(formData)
    const ws = new WebSocket(ws_host+'/story/continue_story');
    ws.onopen = () => {
      console.log('WebSocket connection established');
      formData.messages=currentStory
      console.log(formData)
      console.log(currentStory)
      ws.send(JSON.stringify(formData));
    };
    ws.onmessage = (event) => {
      console.log('Message from server: ', event.data);
      messageData=messageData+event.data
      setMonologue(messageData);
    }
    ws.onclose = (event) => {
      if (event.wasClean) {
        console.log(`Connection closed cleanly, code=${event.code}, reason=${event.reason}`);
        const get_audio = async () =>{
          try{
            const response = await axiosInstance.get(host+'/chat/get_audio?id='+'1'+'&text='+messageData+'&voice='+formData.narratorVoice, {
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
        const get_image = async () =>{
          try{
            const response = await axiosInstance.get(host+'/story/get_image?query='+messageData, {
              headers: headers
            });
            const url = response.data.url;
            console.log(url)
            setImg(url);
          }
          catch (error) {
            toast.error('Error fetching image');
          }
        }
        const get_actions = async () => {
          const currentStory = story;
          if (messageData.length>0){
          currentStory.push({
            role: 'assistant',
            content: messageData
          });}
          console.log(story)
          console.log(currentStory)
          setStory(currentStory);
          try {
            const sendLoad={
              typeOfStory: formData.typeOfStory,
              nameOfStory: formData.nameOfStory,
              narratorVoice: formData.narratorVoice,
              language: formData.language,
              genre: formData.genre,
              length: formData.length,
              additions: formData.additions,
              messages: currentStory
            }

            const response = await axiosInstance.post(
              `${host}/story/get_actions`,sendLoad,
              {
                headers: headers
              }
            );
            const data = response.data;
            setActions(data.content)
          } catch (error) {
            console.log(error);
            toast.error('Error fetching actions');
          }
        };
        get_audio();
        get_image();
        get_actions();
      } else {
        console.log('Connection died');
      }
    };

    ws.onerror = (error) => {
      console.log('WebSocket error: ', error);
    };
  }

  return (
    <div>
      {openChoice===true && <StoryChoice sendScenario={sendScenario} />}
      <div className={styles.Background}/>
      <div className={styles.ImageHolder}>
      <img src={img !== "" ? img : "https://images.unsplash.com/photo-1557683316-973673baf926?ixid=MnwxMjA3fDB8MHxwaG90oy1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"} alt="" />
      </div>
      <div className={styles.Words}>
      <h3>{monologue}</h3>
      </div>
      <div className={styles.ChoiceHolder}>
        <div className={styles.Choice} onClick={()=>{continueStory(actions.action1)}}>{actions.action1}</div>
        <div className={styles.Choice} onClick={()=>{continueStory(actions.action2)}}>{actions.action2}</div>
        <div className={styles.Choice} onClick={()=>{continueStory(actions.action3)}}>{actions.action3}</div>
      </div>

      
    </div>
  )
}

export default StoryPage