import React from 'react'
import styles from './AddRoomModel.module.css'
import TextInput from '../shared/TextInput/TextInput'
const AddRoomModel = () => {
  return (
    <div className={styles.modelMask}>
        <div className={styles.modelBody}>
            <div className={styles.modelHeader}>
                <h3>Enter the topic to be discussed</h3>
                <TextInput/>
            </div>
            <div className={styles.modelFooter}></div>
        </div>
    </div>
  )
}

export default AddRoomModel