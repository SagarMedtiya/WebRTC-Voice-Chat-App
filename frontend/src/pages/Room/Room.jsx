import React,{useState} from 'react'
import { useWebRTC } from '../../hooks/useWebRTC'
import {useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
const Room = () => {
    const {id: roomId} =  useParams();
    const user = useSelector(state => state.auth.user)
    const {clients, provideRef} = useWebRTC(roomId,user);
  return (
    <div>
        <div>All connected speakers</div>
        {
            clients.map((client,index)=>{
                return (
                <div key={index}>
                    <audio ref={(instance)=>provideRef(instance,client.id)}controls autoPlay></audio>
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