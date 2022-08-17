import React,{useState, useEffect} from 'react'
import { useWebRTC } from '../../hooks/useWebRTC'
import {useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import styles from './Room.module.css';
import {getRoom} from '../../http/index'

const Room = () => {
    const {id: roomId} =  useParams();
    const history = useNavigate()
    const [room, setRoom ] = useState(null);
    const user = useSelector(state => state.auth.user)
    const {clients, provideRef} = useWebRTC(roomId,user);
    const handleManualLeave=()=>{
        history('/rooms');
    }
    useEffect(() => {
        const fetchRoom = async ()=>{
            const { data } =await getRoom(roomId);
            setRoom(prev=> data);
        }
        fetchRoom();
    }, [roomId]);
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
                    <button onClick={handleManualLeave}className={styles.actionButton}>
                        <img src="/images/Exit.png" alt="" />
                        <span>Leave Quietly</span>
                    </button>
                </div>
            </div>
            <div className={styles.clientsList}>
                {
                    clients.map((client,index)=>{
                        return (
                        <div className={styles.client}>
                            <div className={styles.userHead}key={index}>
                            <audio ref={(instance)=>provideRef(instance,client.id)} ></audio>
                            <img className={styles.userAvatar} src={client.avatar} alt="" />
                            <button className={styles.micBtn}>
                            {/*<img src="/images/mic.png" alt="" />*/}
                            <img src="/images/unmute.png" alt="" />
                            </button>
                        </div>
                        
                        <h4>{client.name}</h4>
                        </div>
                    )})
                }
            </div>
        </div>
    </div>
  )
}

export default Room