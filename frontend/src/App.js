import './App.scss';
import Router from './router.js';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './components/nav_bar/NavBar.js';
import ContextMenu from './components/context_menu/ContextMenu.js';
import { useState } from 'react';
// eslint-disable-next-line

function App() {
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
    <div className="App">
      <div onContextMenu={handleRightClick} onClick={handleGlobalClick} style={{ minHeight: '100vh' }}>
        <BrowserRouter>
          <NavBar />
          <Router />
        </BrowserRouter>
        <ContextMenu isVisible={isMenuVisible} position={menuPosition} onCopy={handleCopy} />
      </div>
    </div>
  );
}

export default App;
