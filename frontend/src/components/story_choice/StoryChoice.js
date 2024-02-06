import React, { useRef, useState } from 'react'
import styles from './StoryChoice.module.scss'
import axios from 'axios';
import { toast } from 'react-toastify';
const StoryChoice = (props) => {
    const [formData, setFormData] = useState({
        typeOfStory: '',
        nameOfStory: '',
        narratorVoice: '',
        language: '',
        genre: '',
        length: '',
        additions: ''
      });
      const host = process.env.REACT_APP_BACKEND;
        const audioRef = useRef(new Audio());
        const headers = {
            'authorization': localStorage.getItem('token')
        }
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
          ...prevState,
          [name]: value
        }));
        if ((e.target.name === 'narratorVoice' && formData.language !== '') || (e.target.name === 'language' && formData.narratorVoice !== '')  ) {
            const get_audio = async () =>{
                try{
                    let voice = formData.narratorVoice;
                    let language=formData.language;
                if (e.target.name === 'narratorVoice') {
                    voice = e.target.value;
                    language = formData.language;
                }
                else if (e.target.name === 'language') {
                    language = e.target.value;
                    voice = formData.narratorVoice;
                }
                  const response = await axios.get(host+'/chat/get_greeting?voice='+voice+'&language='+language, {
                    responseType: 'blob', // This tells Axios to expect a binary response
                    // place the token in the headers
                    headers: headers
                  });
                  const mp3Blob = response.data;
                  const url = URL.createObjectURL(mp3Blob);
                  if (audioRef.current.src) {
                    URL.revokeObjectURL(audioRef.current.src);
                  }
                  audioRef.current.src = url;
                  console.log(url)
                  audioRef.current.play().catch(error => console.error('Error playing audio:', error));
                  toast.success('Audio playing');
                }
                catch (error) {
                  toast.error('Error fetching audio');
                }
              }
              get_audio();
        }
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);
        if (formData.typeOfStory === '' || formData.nameOfStory === '' || formData.narratorVoice === '' || formData.language === '' || formData.genre === '' || formData.length === '') {
          toast.error('Please fill in all fields');
          return;
        }
        const sendFormData = async () => {
            try {
                const payload = {
                    ...formData
                };
                props.sendScenario(payload);
        //         setFormData({
        //             typeOfStory: '',
        // nameOfStory: '',
        // narratorVoice: '',
        // language: '',
        // genre: '',
        // length: '',
        // additions: ''
        //             });
            }
            catch (error) {
                console.log(error);
            }
        };
        sendFormData();

      };
    
  return (
    <div className={styles.ChatChoice}>
        <form className={styles.Form} onSubmit={handleSubmit}>
        <h1>Story Crafter</h1>
      <label>
        Type of Story:
        <select name="typeOfStory" value={formData.typeOfStory} onChange={handleChange}>
          {/* Replace options with your specific types */}
          <option value="">Select</option>
          <option value="fiction">Fiction</option>
          <option value="non-fiction">Non-Fiction</option>
          <option value="learn">Learn New Vocabulary</option>
          <option value="poetry">Poetry</option>
          <option value="rhyme">Rhyme</option>
        </select>
      </label>
      <br />
      <label>
        Name of Story:
        <input type="text" name="nameOfStory" value={formData.nameOfStory} onChange={handleChange} />
      </label>
      <br />
      <label>
        Narrator Voice:
        <select name="narratorVoice" value={formData.narratorVoice} onChange={handleChange}>
          {/* Replace options with your specific voices */}
          <option value="">Select Voice</option>
            <option value="alloy">Rachel</option>
            <option value="echo">Eric</option>
            <option value="fable">Fibby</option>
            <option value="onyx">James</option>
            <option value="nova">Emily</option>
            <option value="shimmer">Macy</option>
        </select>
      </label>
      <br />
      <label>
        Language:
        <select name="language" value={formData.language} onChange={handleChange}>
          {/* Replace options with your specific languages */}
          <option value="">Select Language</option>
            <option value="english">English</option>
            <option value="chinese">Chinese</option>
            <option value="malay">Malay</option>
            <option value="tamil">Tamil</option>
        </select>
      </label>
      <br />
      <label>
        Genre:
        <select name="genre" value={formData.genre} onChange={handleChange}>
          {/* Replace options with your specific genres */}
          <option value="">Select</option>
          <option value="horror">Horror</option>
          <option value="comedy">Comedy</option>
          <option value="action">Action</option>
          <option value="adventure">Adventure</option>
        </select>
      </label>
      <br />
      <label>
        Length:
        <select name="length" value={formData.length} onChange={handleChange}>
          {/* Replace options with your specific lengths */}
          <option value="">Select</option>
          <option value="5">Short</option>
          <option value="10">Medium</option>
          <option value="20">Long</option>
        </select>
      </label>
      <br />
      <label>
       Additions:
        <input type="text" name="Additions" value={formData.additions} onChange={handleChange} />
      </label>
      <br />
      
      <div className={styles.SubmitButton} onClick={handleSubmit}>Submit</div>
    </form>
    <img src='https://images.unsplash.com/photo-1604856420566-576ba98b53cd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt="Voice" className={styles.BackImage} />
    </div>
  )
}

export default StoryChoice