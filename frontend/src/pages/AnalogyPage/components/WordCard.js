import React, { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { Card, Box } from '@mui/material';
import styles from './WordCard.module.scss';
import Grid from '@mui/material/Grid';
import TextBox from '../../../components/text_box/TextBox.js';

const WordCard = ({ imgLink, analogy, definition }) => {
    const [newWord, setNewWord] = React.useState(null);

    // Function to update the state with the user input
    const handleNewWord = (input) => {
      setNewWord(input);
    };
    return (
        <div> 
            <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <div>
                        <Card sx={{ margin: '1rem' }}>
                            <TextBox onUserInput={handleNewWord} />
                        </Card>
                        <Card sx={{ margin: '1rem' }}>
                            <img className={styles.image_container} src={imgLink} alt="Generated Image" />
                        </Card>
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <div>

                        <Card sx={{ margin: '1rem' }}>
                            <h4>{definition}</h4>
                        </Card>
                        <Card sx={{ margin: '1rem' }}>
                            <p>{analogy}</p>
                        </Card>
                    </div>
                </Grid>
            </Grid>
        </Box>
        </div>
    )
}

export default WordCard