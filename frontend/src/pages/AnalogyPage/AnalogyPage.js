import React, { useEffect } from 'react';
import styles from './AnalogyPage.module.scss';
import axios from 'axios';
import WordCard from './components/WordCard.js';
import TextBox from '../../components/text_box/TextBox.js';
import { GiSpellBook } from "react-icons/gi";
import axiosInstance from '../../utils/axiosinstance.js';

const AnalogyPage = () => {
    const [newWord, setNewWord] = React.useState('happiness');
    const [imgLink, setImgLink] = React.useState('https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=1352&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
    const [analogy, setAnalogy] = React.useState('analogy');
    const [definition, setDefinition] = React.useState('definition');
    const [openWordCard, setOpenWordCard] = React.useState(false);

    const word_dictionary = {}

    const getDefinition = async () => {
        try {
            const headers={headers:
                {
                    'Authorization':localStorage.getItem('token')
                }}            
            const response = await axiosInstance.get(`https://techfest24-100-backend.onrender.com/explain/get_definition?query=${newWord}`,headers);
            console.log(newWord);
            console.log(response.data.content);
            const def_array = response.data.content.map(item => item.definition);
            console.log(def_array);
            if (!word_dictionary[newWord]) word_dictionary[newWord] = [];
            def_array.forEach((def) => {
                word_dictionary[newWord].push({ "definition": def, "analogy": "" }); // Assuming analogy is blank for new definitions
            });
            console.log('here');
            console.log(word_dictionary[newWord][0]['definition']);
            setDefinition(def_array);
        } catch (error) {
            console.log(error);
        }
    };

    //api issue code 200
    const getAnalogy = async () => {
        try {
            const response = await axios.get(`https://techfest24-100-backend.onrender.com/explain/get_analogy?query=${newWord}`);
            setAnalogy(response.data.content[0].analogy);
        } catch (error) {
            console.log(error);
        }
    };


    const handleNewWord = (input) => {
        setNewWord(input);
    };

    const handleClick = async () => {
        setOpenWordCard(true); // Open the word card
        await getDefinition(); // Fetch the definition
        await getAnalogy(); // Fetch the analogy
    };

    return (
        <div>
            {!openWordCard && (
                <div className={styles.searchContainer}>
                    <div className={styles.searchbar} >
                        
                        <div className={styles.searchStack}>
                        <label style={{color:'white'}}>Search for a word</label>
                        <input type="text" placeholder="Search for a word" onChange={(e) => handleNewWord(e.target.value)} />
                        </div>
                        <GiSpellBook className={styles.search_button} onClick={() => handleClick()} />
                    </div>
                </div>
            )}

            {openWordCard && (
                <div className={styles.container}>
                    <div className={styles.image_container}>
                        <img className={styles.image} src={imgLink} alt="Generated Image" />
                    </div>
                    <div className={styles.box}>
                        <TextBox onUserInput={handleNewWord} size='3vw' value={newWord} />
                        <GiSpellBook className={styles.search_button} style={{ width: "5vw" }} onClick={() => handleClick()} />
                    </div>
                    <div>
                        <pre>{JSON.stringify(word_dictionary.newWord, null, 2)}</pre>
                    </div>
                    <div>
                        {word_dictionary[newWord] ? (
                            word_dictionary[newWord].map((item, index) => (
                                <div key={index} className={styles.card}>
                                    <div className={styles.definition}>{item.definition}</div>
                                </div>
                            ))
                        ) : (
                            <p>No definitions found for "{newWord}".</p> // This will show if the condition is false
                        )}
                    </div>

                    <div className={styles.card}>
                        <p>{analogy}</p>
                    </div>
                </div>

            )}
        </div>
    )
}

export default AnalogyPage



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