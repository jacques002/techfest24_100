import styles from './nav_menu.module.scss'
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const NavMenu = (props) => {
  const [menuItems, setMenuItems] = useState([]);


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
