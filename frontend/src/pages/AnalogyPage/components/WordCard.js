import React, { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { Card, Box } from '@mui/material';
import styles from './WordCard.module.scss';
import TextBox from '../../../components/text_box/TextBox.js';
import axios from 'axios';

const WordCard = ({ newWord, imgLink, analogy, definition }) => {
    return (
        <div>
            <div>
                <div className={styles.card}>
                    <definition>{definition}</definition>
                </div>
                <div className={styles.card}>
                    <p>{analogy}</p>
                </div>
            </div>
        </div>
    )
}

export default WordCard