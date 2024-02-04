import React from 'react'
import styles from './ChatMessage.module.scss'
const ChatMessage = (props) => {
  return (
    <div className={`${styles.ChatBubble} ${styles[props.entity]}`}>
      <p className={styles.ChatEntity}>{props.entity}</p>
      <p className={styles.ChatMessage}>{props.message}</p>
    </div>
  )
}

export default ChatMessage