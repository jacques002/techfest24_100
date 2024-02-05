import React from 'react';
import styles from './ContextMenu.module.scss';

const ContextMenu = ({ isVisible, position, onCopy, onRead }) => {
  if (!isVisible) return null;

  const style = {
    position: 'absolute',
    top: position.y,
    left: position.x,
    zIndex: 1000, // Ensure it appears above other content
    borderRadius: '5px',
    padding: '10px',
  };

  return (
    <div className={styles.context_box} style={style}>
      <div className={styles.button} onClick={onCopy}>Define</div>
      <div className={styles.button} onClick={onRead}>Read</div>
      <div className={styles.button} onClick={onCopy}>Copy</div>
      {/* Add more buttons/options as needed */}
    </div>
  );
};

export default ContextMenu;
