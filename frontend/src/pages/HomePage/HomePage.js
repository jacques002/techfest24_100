import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import ContextMenu from '../../components/context_menu/ContextMenu';
import NavBar from '../../components/nav_bar/NavBar';
import styles from './HomePage.module.scss'
const HomePage = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [selectedText, setSelectedText] = useState('');

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

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedText).then(() => {
      setIsMenuVisible(false); // Hide context menu after copying
      // Optionally, show a notification that text has been copied
    });
  };
  return (
    <div className={styles.HomePage}  onContextMenu={handleRightClick} onClick={handleGlobalClick} style={{ minHeight: '100vh' }}>
      <NavBar />
      <div className={styles.Outlet}>
      <Outlet/>
      </div>
      <ContextMenu isVisible={isMenuVisible} position={menuPosition} onCopy={handleCopy} />
    </div>
  )
}

export default HomePage