import React, { useEffect, useState } from 'react';
import styles from './AnalogyPage.module.scss';
import axios from 'axios';
import TextBox from '../../components/text_box/TextBox.js';
import { GiSpellBook } from "react-icons/gi";
import axiosInstance from '../../utils/axiosinstance.js';
import { MdReadMore } from "react-icons/md";
import Modal from './components/Modal.js';

const AnalogyPage = () => {
    const host = process.env.REACT_APP_BACKEND;
    const [newWord, setNewWord] = React.useState('');
    const [imgLink, setImgLink] = React.useState('');
    const [definitionList, setDefinitionList] = React.useState([]);
    const [openWordCard, setOpenWordCard] = React.useState(false);
    const [openModal, setOpenModal] = React.useState(false);
    const [selectedDefinitionIndex, setSelectedDefinitionIndex] = useState(null);

    const word_dictionary = {}

    const getDefinition = async () => {
        try {
const headers={headers:
    {
        'Authorization':localStorage.getItem('token')
    }}            
const response = await axiosInstance.get(`https://techfest24-100-backend.onrender.com/explain/get_definition?query=${newWord}`,headers);
            const def_array = response.data.content.map(item => item.definition);
            // all definitions in an array
            // console.log(def_array);
            // output each definition
            if (!word_dictionary[newWord]) word_dictionary[newWord] = [];
            def_array.forEach((def) => {
                word_dictionary[newWord].push({ "definition": def, "analogy": "" }); // Assuming analogy is blank for new definitions
            });
            // console.log('here');
            // console.log(word_dictionary[newWord][0].definition);
            setDefinitionList(word_dictionary[newWord]);
        } catch (error) {
            console.log(error);
        }
    };

    const getImgLink = async () => {
        try {
            const response = await axios.get(`https://techfest24-100-backend.onrender.com/explain/get_image?query=${newWord}`);
            console.log(response);

            if (response.data.status === "success") {            
                console.log(response.data.url);
                setImgLink(response.data.url);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleNewWord = (input) => {
        setNewWord(input);
    };

    const handleClick = async () => {
        setOpenWordCard(true); // Open the word card
        await getImgLink();
        await getDefinition(); // Fetch the definition
    };

    const handleOpenModal = (index) => {
        setOpenModal(!openModal);
        setSelectedDefinitionIndex(index);
    }

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
                    </div>
                    <div>
                        {definitionList.map((item, index) => (
                            <div key={index}> {/* Ensure the key is at the top level of the map callback */}
                                <div className={styles.card}>
                                    <p>{item.definition}</p>
                                    <div className={styles.button_box}>
                                        <MdReadMore className={styles.icon_button} onClick={() => handleOpenModal(index)} />
                                    </div>
                                </div>
                                {openModal && selectedDefinitionIndex === index && (
                                    <div className={styles.modal_backdrop} onClick={() => setOpenModal(false)}>
                                        <div className={styles.modal_container} onClick={(event) => event.stopPropagation()}>
                                            {/* Directly pass the selected definition to the Modal */}
                                            <Modal definition={definitionList[selectedDefinitionIndex].definition} />
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}

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