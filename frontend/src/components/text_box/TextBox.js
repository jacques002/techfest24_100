import React from 'react';
import styles from './TextBox.module.scss';

const TextBox = ({ onUserInput, size, value }) => {
    const handleChange = (event) => {
        // Call the onUserInput function passed as a prop with the new input value
        onUserInput(event.target.value);
    };

    const fontSize = {
        fontSize: typeof size === 'number' ? `${size}px` : size, 
    };

    return (
        <input
            className={styles.text_box}
            value={value}
            onChange={handleChange}
            style={fontSize} // Apply inline styles with the font size
        />
    );
};

export default TextBox;
