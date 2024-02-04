import React, { useState } from 'react';
import './TextBox.module.scss';

const TextBox = ({ onUserInput }) => {
    const handleChange = (event) => {
        // Call the onUserInput function passed as a prop with the new input value
        onUserInput(event.target.value);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleChange(event);
        }
    };

    return (
        <h3
            className="text-box"
            contentEditable={true}
            placeholder="Type something..."
            onInput={handleChange} // Set the handleChange function to be called on input change
            onKeyPress={handleKeyPress} // Set the handleKeyPress function to be called on key press
        ></h3>
    );
};

export default TextBox;
