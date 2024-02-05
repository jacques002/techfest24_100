import React, { useEffect, useState } from 'react';
import styles from './AnalogyPage.module.scss';
import axios from 'axios';
import TextBox from '../../components/text_box/TextBox.js';
import { GiSpellBook } from "react-icons/gi";
import { MdReadMore } from "react-icons/md";
import Modal from './components/Modal.js';

const AnalogyPage = () => {
    const [newWord, setNewWord] = React.useState('happiness');
    const [imgLink, setImgLink] = React.useState('https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=1352&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
    const [definitionList, setDefinitionList] = React.useState([]);
    const [openWordCard, setOpenWordCard] = React.useState(false);
    const [openModal, setOpenModal] = React.useState(false);
    const [selectedDefinitionIndex, setSelectedDefinitionIndex] = useState(null);

    const word_dictionary = {}

    const getDefinition = async () => {
        try {
            const response = await axios.get(`https://techfest24-100-backend.onrender.com/explain/get_definition?query=${newWord}`);
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
                <div className={styles.container}>
                    <div className={styles.box} style={{ marginTop: '30vh' }}>
                        <TextBox onUserInput={handleNewWord} size='5vw' />
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