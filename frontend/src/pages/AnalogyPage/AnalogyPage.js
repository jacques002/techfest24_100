import React, { useEffect, useRef, useState } from 'react';
import styles from './AnalogyPage.module.scss';
import axios from 'axios';
import TextBox from '../../components/text_box/TextBox.js';
import { GiSpellBook } from "react-icons/gi";
import axiosInstance from '../../utils/axiosinstance.js';
import { MdReadMore } from "react-icons/md";
import Modal from './components/Modal.js';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const AnalogyPage = () => {
    const host = process.env.REACT_APP_BACKEND;
    const [newWord, setNewWord] = React.useState('');
    const [article,setArticle] = React.useState('');
    const [imgLink, setImgLink] = React.useState('');
    const [definitionList, setDefinitionList] = React.useState([]);
    const [openWordCard, setOpenWordCard] = React.useState(false);
    const [openModal, setOpenModal] = React.useState(false);
    const [selectedDefinitionIndex, setSelectedDefinitionIndex] = useState(null);
    const [loading, setLoading] = useState(false);
    const hasRunOnce = useRef(false);
    const headers={headers:
        {
            'Authorization':localStorage.getItem('token')
        }}       
    const word_dictionary = {}

    const location = useLocation();
    useEffect(()=>{
        if (hasRunOnce.current || location.search.length === 0) {
            return;
          }
          hasRunOnce.current = true;
        const queryParams = new URLSearchParams(location.search);
        const query = queryParams.get('query');
        if (query.length > 0) {

        toast.info(query);
        setNewWord(query);
        handleClick(query);
        }
    },[location])

    const getDefinition = async (newWord) => {
        try {
            setLoading(true);
const response = await axiosInstance.get(host+`/explain/get_definition?query=${newWord}`,headers);
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
            setArticle(newWord);
            setDefinitionList(word_dictionary[newWord]);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const getImgLink = async (newWord) => {
        try {
            setLoading(true);
            const response = await axiosInstance.get(host+`/explain/get_image?query=${newWord}`,headers);
            console.log(response);

            if (response.data.status === "success") {            
                console.log(response.data.url);
                setImgLink(response.data.url);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    const handleNewWord = (input) => {
        setNewWord(input);
    };

    const handleClick = async (newWord) => {
        setOpenWordCard(true); // Open the word card
        await getImgLink(newWord);
        await getDefinition(newWord); // Fetch the definition
    };

    const handleOpenModal = (index) => {
        setOpenModal(!openModal);
        setSelectedDefinitionIndex(index);
    }

    return (
        <div>
      
                <div className={styles.searchContainer}>
                    <div className={styles.searchbar} >
                        
                        <div className={styles.searchStack}>
                        <label style={{color:'white'}}>Search for a word</label>
                        <input type="text" placeholder="Search for a word" value={newWord} onChange={(e) => handleNewWord(e.target.value)} />
                        </div>
                        <GiSpellBook className={styles.search_button} onClick={() => handleClick(newWord)} />
                    </div>
                </div>
                {loading===true && <div className={styles.Loader}>
        <div className={styles.LoadGroup}>
          <div className={styles.Backdrop}/>
          <div className={styles.DotGroup}>
          <div className={styles.Dot}/>
          <div className={styles.Dot}/>
          <div className={styles.Dot}/>
          </div>
          <h3>Loading...</h3>
        </div>
      </div>}
             (
                <div className={styles.container}>
                    <div className={styles.image_container}>
                        {imgLink!=='' && <img className={styles.image} src={imgLink} alt="Generated Image" />}
                    </div>
                    <div className={styles.box}>
                        
                        <h3>Query: {article}</h3>
                    </div>
                    <div>
                    </div>
                    <div>
                        {definitionList.map((item, index) => (
                            <div key={index}> {/* Ensure the key is at the top level of the map callback */}
                                <div className={styles.card}>
                                    <p>{index+1}. {item.definition}</p>
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
            )
            <div className={styles.Darkener}></div>
                  <img className={styles.Backdrop} src="https://images.unsplash.com/photo-1536147116438-62679a5e01f2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
       
                  
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