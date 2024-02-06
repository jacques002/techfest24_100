import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import ContextMenu from '../../components/context_menu/ContextMenu';
import NavBar from '../../components/nav_bar/NavBar';
import styles from './HomePage.module.scss'
import { toast } from 'react-toastify';
const HomePage = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [selectedText, setSelectedText] = useState('');
  const nav = useNavigate();

  const handleRightClick = (event) => {
    event.preventDefault(); // Prevent the default context menu from appearing
    const text = window.getSelection().toString().trim();
    if (text.length > 0) {
      setIsMenuVisible(true);
      setMenuPosition({ x: event.clientX, y: event.clientY });
      setSelectedText(text);
    }
  };

  const handleGlobalClick = (event) => {
    // Hide the menu if clicking outside
    if (isMenuVisible) setIsMenuVisible(false);
  };

  const handleDefine=()=>{
    nav('/home/Dictionary?query='+selectedText)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedText).then(() => {
      setIsMenuVisible(false); // Hide context menu after copying
      // Optionally, show a notification that text has been copied
    });
  };

  const handleRead = () =>{
    // Can change to llm call if needed for more variety. From /chat/read_message endpoint
    const utterance = new SpeechSynthesisUtterance(selectedText);
    speechSynthesis.speak(utterance);
  }
  return (
    <div className={styles.HomePage}  onContextMenu={handleRightClick} onClick={handleGlobalClick} style={{ minHeight: '100vh' }}>
       <ContextMenu isVisible={isMenuVisible} position={menuPosition} onCopy={handleCopy} onRead={handleRead} handleDefine={handleDefine}/>
      <NavBar />
      <div onContextMenu={handleRightClick} onClick={handleGlobalClick} className={styles.Outlet}>
      <Outlet/>
      </div>
     
    </div>
  )
}

export default HomePage