import React from 'react'
import styles from './AddRoomModel.module.css'
const AddRoomModel = () => {
  return (
    <div className={styles.modelMask}>
        <div className={styles.modelBody}>
            <div className={styles.modelHeader}></div>
            <div className={styles.modelFooter}></div>
        </div>
    </div>
  )
}

export default AddRoomModel