import React, { useEffect, useState } from 'react'
import styles from './ChatMessage.module.scss'
import { TiMicrophoneOutline } from "react-icons/ti";
import { TiMicrophone } from "react-icons/ti";
const ChatInput = (props) => {
    //use webspeech api to listen for speech
    const [isListening, setIsListening] = useState(false);
    const [text, setText] = useState("a");
    useEffect(()=>{
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            console.log('Speech recognition not supported');
            return;
        }

        const recognition = new SpeechRecognition();
        // recognition.lang = 'zh-CN';// for chinese
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.onresult = event => {
            const transcript = Array.from(event.results)
                .map(result => result[0])
                .map(result => result.transcript)
                .join('');
            setText(transcript);
        }
        recognition.onerror = event => {
            console.log('Error occurred in recognition: ' + event.error);
        }

        if (isListening) {
            recognition.start();
        }
        else {
            recognition.stop();
        }

        return () => {
            recognition.stop();
        }
    },[isListening])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.length === 0) {
            return;
        }
        console.log(text);
        props.sendMessage(text);
        setText("");
    }
    const handleOnKeyDown = (e) => {
        // e.preventDefault();
        if (e.key === 'Enter' && e.shiftKey === false) {
            e.preventDefault();
            handleSubmit(e);
        }
    }
  return (
    <div className={styles.ChatInput}>
        <textarea type="text" 
        value={text} 
        onKeyDown={handleOnKeyDown}
        onChange={(e) => setText(e.target.value)}
        className={styles.ChatTextArea} placeholder="Type a message..."/>
        <div className={`${styles.ChatButton} ${styles[isListening]}`} onClick={() => setIsListening(prevState => !prevState)}>
            {isListening===false && <TiMicrophoneOutline size={36}/>}
            {isListening===true && <TiMicrophone size={36}/>}
        </div>
        <div className={styles.ChatButton} onClick={handleSubmit}>
            {isListening===false && <p>Send</p>}
            {isListening===true && <p>Listening</p>}
        </div>
        
    </div>
  )
}

export default ChatInput