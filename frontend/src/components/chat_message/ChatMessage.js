import React, { useState } from 'react'
import styles from './ChatMessage.module.scss'
const ChatMessage = (props) => {
  const [appeared,setAppeared] = useState(props.appeared)
  return (
    <div className={`${styles.ChatBubble} ${styles[props.entity]} ${styles[appeared]}`} onAnimationEnd={()=>{setAppeared(true)}}>
      <p className={styles.ChatEntity}>{props.entity_name}</p>
      <p className={styles.ChatMessage}>{props.message}</p>
    </div>
  )
}

export default ChatMessage