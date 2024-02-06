import React, { useRef, useState } from 'react';
import styles from './ChatChoice.module.scss';
import { toast } from 'react-toastify';
import axios from 'axios';
import axiosInstance from '../../utils/axiosinstance';

const ChatChoice = (props) => {
    const audioRef = useRef(new Audio());
    const host = process.env.REACT_APP_BACKEND;
    const [formData, setFormData] = useState({
        name: '',
        voice:'',
        language: '',
        personality: '',
        location:'',
        atmosphere:'',
        proficiency:''
      });
      const headers = {
        'authorization': localStorage.getItem('token')
      }

      const handleChange = (e) => {
        //check if voice
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value, 
        });
        if ((e.target.name === 'voice' && formData.language !== '') || (e.target.name === 'language' && formData.voice !== '')  ) {
            const get_audio = async () =>{
                try{
                    let voice = formData.voice;
                    let language=formData.language;
                if (e.target.name === 'voice') {
                    voice = e.target.value;
                    language = formData.language;
                }
                else if (e.target.name === 'language') {
                    language = e.target.value;
                    voice = formData.voice;
                }
                  const response = await axiosInstance.get(host+'/chat/get_greeting?voice='+voice+'&language='+language, {
                    responseType: 'blob', // This tells Axios to expect a binary response
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
    
      const handleSubmit = (e) => {
        if (formData.name === '' || formData.voice === '' || formData.language === '' || formData.personality === '' || formData.location === '' || formData.atmosphere === '' || formData.proficiency === '') {
          toast.error('Please fill in all fields');
          return;
        }
        const sendFormData = async () => {
            try {
                const payload = {
                    ...formData
                };
                props.sendScenario(payload);
                setFormData({
                    name: '',
                    voice:'',
                    language: '',
                    personality: '',
                    location:'',
                    atmosphere:'',
                    proficiency:''
                    });
            }
            catch (error) {
                console.log(error);
            }
        };
        sendFormData();
        toast.success('Form data submitted');
        e.preventDefault(); 
        console.log('Form data submitted:', formData);
      };
  return (
    <div className={styles.ChatChoice}>
        <form className={styles.Form}onSubmit={handleSubmit}>
            <h1>Scenario Builder</h1>
      <div>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Voice:
          <select className={styles.Select} name="voice" value={formData.voice} onChange={handleChange}>
            <option value="">Select Voice</option>
            <option value="alloy">Rachel</option>
            <option value="echo">Eric</option>
            <option value="fable">Fibby</option>
            <option value="onyx">James</option>
            <option value="nova">Emily</option>
            <option value="shimmer">Macy</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Language:
          <select name="language" value={formData.language} onChange={handleChange}>
            <option value="">Select Language</option>
            <option value="english">English</option>
            <option value="chinese">Chinese</option>
            <option value="malay">Malay</option>
            <option value="tamil">Tamil</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Personality:
          <select name="personality" value={formData.personality} onChange={handleChange}>
            <option value="">Select Personality</option>
            <option value="Friendly">Friendly</option>
            <option value="Professional">Professional</option>
            <option value="Humorous">Humorous</option>
            {/* Add more personalities as needed */}
          </select>
        </label>
      </div>
      <div>
        <label>
          Atmosphere:
          <select name="atmosphere" value={formData.atmosphere} onChange={handleChange}>
            <option value="">Select Atmosphere</option>
            <option value="calm">Calm</option>
            <option value="energetic">Energetic</option>
            <option value="energetic">Corporate</option>
            <option value="mysterious">Mysterious</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Proficiency:
          <select name="proficiency" value={formData.proficiency} onChange={handleChange}>
            <option value="">Select Atmosphere</option>
            <option value="no-proficiency">no proficiency</option>
            <option value="elementary">elementary</option>
            <option value="professional">professional</option>
            <option value="native speaker">native speaker</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Location:
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </label>
      </div>
      
      <div className={styles.SubmitButton} onClick={handleSubmit}>Submit</div>
    </form>
    <img src='https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt="Voice" className={styles.BackImage} />
    </div>
  )
}

export default ChatChoice