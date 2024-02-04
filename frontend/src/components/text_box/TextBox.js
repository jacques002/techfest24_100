import React, { useState } from 'react';
import styles from './TextBox.module.scss';

const TextBox = ({ onUserInput, inlineStyle }) => {
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
        <input
            className={styles.text_box}
            style={inlineStyle} // Apply inline styles passed as prop
            contentEditable={true}
        ></input>
    );
};

export default TextBox;
