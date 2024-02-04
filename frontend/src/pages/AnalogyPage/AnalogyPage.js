import React, { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { Card, Box } from '@mui/material';
import styles from './AnalogyPage.module.scss';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import WordCard from './components/WordCard.js';
import TextBox from '../../components/text_box/TextBox.js';
import { GiSpellBook } from "react-icons/gi";

const AnalogyPage = () => {
    const [openWordCard, setOpenWordCard] = React.useState(false);
    const theme = useTheme();
    const [imgLink, setImgLink] = React.useState('https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=1352&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
    const [analogy, setAnalogy] = React.useState('analogy');
    const [definition, setDefinition] = React.useState('definition');


    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get(`https://techfest24-100-backend.onrender.com/explain/get_image?query=${newWord}`);
    //             console.log(response);

    //             if (response.status === "success") {
    //                 setImgLink(response.url);
    //             }
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     };
    //     fetchData();
    // }, [newWord]);

    const [newWord, setNewWord] = React.useState('check');

    const handleNewWord = (input) => {
        setNewWord(input);
    };

    return (
        <div>
            {!openWordCard && (
            <div className={styles.flex_box}>
                <div className={styles.search_box}>
                    <TextBox onUserInput={handleNewWord} inlineStyle={{ fontSize: '50px' }} />
                    <GiSpellBook className={styles.search_button} onClick={() => setOpenWordCard(true)} />
                </div>
            </div>
            )}

            {openWordCard && (<WordCard imgLink={imgLink} analogy={analogy} definition={definition} />)}
        </div>
    )
}

export default AnalogyPage