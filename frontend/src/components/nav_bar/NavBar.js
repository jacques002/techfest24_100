import React, { useEffect, useState } from 'react'
import styles from './NavBar.module.scss'
import { ReactComponent as MenuIcon } from '../../assets/icons/menu_icon.svg';
import app_logo from '../../assets/icons/app_logo.png'
import NavMenu from '../../components/nav_menu/NavMenu.js';
import { Link, useNavigate } from 'react-router-dom'; // Just import Link
import { FaBook } from "react-icons/fa";
import { GiTalk } from "react-icons/gi";
import { FaBookOpenReader } from "react-icons/fa6";
const NavBar = () => {
    const [activeMenu, setActiveMenu] = useState('Dictionary');
    //useLocation
    const nav = useNavigate();

    const location = window.location.pathname.split('/')[2]
    useEffect(() => {
        setActiveMenu(location)
    }, [location])
    return (
        <div>
            <div className={styles.navbar}>
                <div className={styles.LogoName}>
                <img src={app_logo} alt="App Logo" className={styles.app_logo} />
                <h3>EverLingo</h3>
                </div>
                <div className={styles.LogoName} onClick={()=>{setActiveMenu("Dictionary");nav("/home/Dictionary")}}>
                <FaBook size={36} color={activeMenu==='Dictionary'?'black':'white'}/>
                <Link to="/home/Dictionary" className={`${styles.header_link} ${styles[activeMenu==='Dictionary']}`}><h3>Dictionary</h3></Link>
                </div>
                <div className={styles.LogoName} onClick={()=>{setActiveMenu("Scenarios");nav("/home/Scenarios")}}>
                <GiTalk size={36} color={activeMenu==='Scenarios'?'black':'white'}/>
                <Link to="/home/Scenarios" className={`${styles.header_link} ${styles[activeMenu==='Scenarios']}`}><h3>Scenarios</h3></Link>
                </div>
                <div className={styles.LogoName} onClick={()=>{setActiveMenu("Stories");nav("/home/Stories")}}>
                <FaBookOpenReader size={36} color={activeMenu==='Stories'?'black':'white'}/>
                <Link to="/home/Stories" className={`${styles.header_link} ${styles[activeMenu==='Stories']}`}><h3>Stories</h3></Link>
                </div>
            </div>
        </div>
    )
}

export default NavBar