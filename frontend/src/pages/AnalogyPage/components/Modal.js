import React, { useEffect, useState } from 'react';
import styles from './Modal.module.scss';
import axios from 'axios';
import { FaLightbulb } from "react-icons/fa";
import { BsFillSunFill } from "react-icons/bs";

const Modal = ({ definition }) => {
    const [imgLink, setImgLink] = React.useState('https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=1352&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
    const [analogy, setAnalogy] = React.useState('analogy');
    const [example, setExample] = React.useState('analogy');
    const [clickExample, setClickExample] = React.useState(false);
    const [clickAnalogy, setClickAnalogy] = React.useState(false);

    const getAnalogy = async () => {
        try {
            const response = await axios.get(`https://techfest24-100-backend.onrender.com/explain/get_analogy?query=${definition}`);
            if (response.data && response.data.content && response.data.content.length > 0) {
                setAnalogy(response.data.content[0].analogy);
            } else {
                setAnalogy('No analogy found.');
            }
        } catch (error) {
            console.error(error);
            setAnalogy('Failed to fetch analogy.');
        }
    };

    const getExample = async () => {
        try {
            const response = await axios.get(`https://techfest24-100-backend.onrender.com/explain/get_example?query=${definition}`);
            if (response.data && response.data.content && response.data.content.length > 0) {
                setExample(response.data.content[0].example);
                console.log(response);
            } else {
                setExample('No example found.');
            }
        } catch (error) {
            console.error(error);
            setExample('Failed to fetch example.');
        }
    };

    const handleClickAnalogy = async () => {
        await getAnalogy();
        setClickExample(false);
        setClickAnalogy(true);
    };

    const handleClickExample = async () => {
        await getExample();
        setClickAnalogy(false);
        setClickExample(true);
    };

    return (
        <div>
            <div className={styles.modal_container}>
                <div className={styles.card} style={{marginBottom:"10px"}}>
                    <p>{definition}</p>
                </div>
                <div className={styles.image_container}>
                    <img className={styles.image} src={imgLink} alt="Generated Image" />
                </div>
                <div className={styles.button_box}>
                    <div className={styles.button} onClick={() => handleClickExample()}>
                        <FaLightbulb className={styles.icon_button}/>
                        Example
                    </div>
                    <div className={styles.button} onClick={() => handleClickAnalogy()}>
                        <BsFillSunFill className={styles.icon_button} />
                        Analogy
                    </div>
                </div>
                <div className={styles.card}>
                {clickAnalogy && (<p>{analogy}</p>)}
                {clickExample && (<p>{example}</p>)}
                </div>

            </div>
        </div >
    )
}

export default Modal