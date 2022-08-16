import React,{useState} from 'react'
import { useWebRTC } from '../../hooks/useWebRTC'
import {useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import styles from './Room.module.css';

const Room = () => {
    const {id: roomId} =  useParams();
    const history = useNavigate()
    console.log(roomId);
    const user = useSelector(state => state.auth.user)
    const {clients, provideRef} = useWebRTC(roomId,user);
    const handleManualLeave=()=>{
        history('/rooms');
    }

  return (
    <div>
        <div className='container'>
            <button onClick={handleManualLeave} className={styles.goBack}>
                <img src="/images/BackArrow.png" alt="" />
                <span>All voice connected</span>
            </button>
        </div>
        <div className={styles.clientsWrap}>
            <div className={styles.header}>
                <h2 className={styles.topic}>Node JS</h2>
                <div className={styles.actions}>
                    <button>
                        <img src="/images/Exit.png" alt="" />
                        <span>Leave Quietly</span>
                    </button>
                </div>
            </div>
            <div className={styles.clientsList}>
                {
                    clients.map((client,index)=>{
                        return (
                        <div className={styles.userHead}key={index}>
                            <audio ref={(instance)=>provideRef(instance,client.id)} controls autoPlay></audio>
                            <img className={styles.userAvatar} src={client.avatar} alt="" />
                            {
                                client.name
                            }
                        </div>)
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default Room