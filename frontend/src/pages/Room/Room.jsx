import React,{useState} from 'react'
import { useWebRTC } from '../../hooks/useWebRTC'
import {useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import styles from './Room.module.css'
const Room = () => {
    const {id: roomId} =  useParams();
    console.log(roomId);
    const user = useSelector(state => state.auth.user)
    const {clients, provideRef} = useWebRTC(roomId,user);
  return (
    <div>
        <div>All connected speakers</div>
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
  )
}

export default Room