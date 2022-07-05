import React from 'react'
import styles from './AddRoomModel.module.css'
import TextInput from '../shared/TextInput/TextInput'
const AddRoomModel = () => {
  return (
    <div className={styles.modelMask}>
        <div className={styles.modelBody}>
            <button><img src="/images/close.png" alt="" /></button>
            <div className={styles.modelHeader}>
                <h3 className={styles.heading}>Enter the topic to be discussed</h3>
                <TextInput fullwidth="true"/>
                <h3 className={styles.roomHeading}>Room Types</h3>
                <div className={styles.roomTypes}>
                    <div className={styles.typeBox}>
                        <img src="/images/open.png" alt="" />
                        <span>Open</span>
                    </div>
                    <div className={styles.typeBox}>
                        <img src="/images/social.png" alt="" />
                        <span>Social</span>
                    </div>
                    <div className={styles.typeBox}>
                        <img src="/images/lock1.png" alt="" />
                        <span>Private</span>
                    </div>
                </div>
            </div>
            <div className={styles.modelFooter}>
                <h3>Start a room, open to everyone</h3>
                <button className={styles.footerButton}><img src="/images/party.png" alt="" /><span>Let's Go!</span></button>
            </div>
        </div>
    </div>
  )
}

export default AddRoomModel