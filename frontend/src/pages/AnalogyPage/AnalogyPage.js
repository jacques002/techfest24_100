import React, { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { Card, Box } from '@mui/material';
import styles from './AnalogyPage.module.scss';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import TextBox from '../../components/text_box/TextBox.js';

const AnalogyPage = () => {
    const [openWordCard, setOpenWordCard] = React.useState(false);
    const theme = useTheme();
    const [imgLink, setImgLink] = React.useState('https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=1352&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
    const [analogy, setAnalogy] = React.useState('analogy');
    const [definition, setDefinition] = React.useState('definition');
    const [newWord, setNewWord] = React.useState(null);

    // Function to update the state with the user input
    const handleNewWord = (input) => {
      setNewWord(input);
    };
  

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

    return (
        <div>
            {/* {openWordCard && (</WordCard>)} */}
            
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

export default AnalogyPage