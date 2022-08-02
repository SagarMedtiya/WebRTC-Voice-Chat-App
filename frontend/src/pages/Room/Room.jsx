import React,{useState} from 'react'
import { useWebRTC } from '../../hooks/useWebRTC'

const Room = () => {
    const {clients} = useWebRTC();
  return (
    <div>
        <div>All connected speakers</div>
        {
            clients.map(client=>{
                return (
                <div key={client.id}>
                    <audio controls autoPlay></audio>
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