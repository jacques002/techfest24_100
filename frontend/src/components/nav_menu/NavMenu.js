import styles from './nav_menu.module.scss'
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const NavMenu = (props) => {
  const [menuItems, setMenuItems] = useState([]);

  const location = useLocation();

  useEffect(() => {
    // Check the current path using location.pathname
    if (location.pathname.toLowerCase() === '/home/chat') {
      setMenuItems([{ name: 'chat 1' }, { name: 'chat 2'}, { name: 'chat 3' }]);
    } else if (location.pathname.toLowerCase() === '/home/story') {
      setMenuItems([{ name: 'story 1' }, { name: 'story 2' }, { name: 'story 3' }]);
    } else if (location.pathname.toLowerCase() === '/home/analogy') {
      setMenuItems([{ name: 'word 1' }, { name: 'word 2' }, { name: 'word 3' }]);
    }
  }, [location]); // Dependency array includes location to re-run the effect when the path changes


  return (
    <div className={`${styles.nav_memu} ${props.menuOpen?styles.Open:styles.Close}`}>
      {menuItems.map((item, index) => (
        <div className={styles.item_box}>
          <div key={index} className={styles.nav_menu_item}>
            <h3>{item.name}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NavMenu;
