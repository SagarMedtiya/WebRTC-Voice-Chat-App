import { useCallback, useEffect } from 'react';
import {useRef} from 'react'
import { useStateWithCallBack } from './useStateWithCallBack';
import {socketInit} from '../socket/index'

export const useWebRTC=(roomId, user)=>{
    const [clients, setClients] = useStateWithCallBack([]);
    const audioElements = useRef({});
    const connections = useRef({});
    const localMediaStream = useRef(null);
    const socket =useRef(null);
    useEffect(()=>{
        socket.current = socketInit()
    },[])

    const provideRef=(instance, userId)=>{
        audioElements.current[userId] = instance; 
    }
    const addNewClients = useCallback(
        (newClients, cb)=>{
            const lookingFor = clients.find((client)=>client.id === newClients.id)
            if(lookingFor=== undefined){
                setClients((existingClients)=>[...existingClients, newClients], cb)
            }
        },[clients, setClients]
    )
    //capture media
    useEffect(() => {
        const startCapture=async ()=>{
            localMediaStream.current = 
                await navigator.mediaDevices.getUserMedia({
                    audio:true
                })
        }
        startCapture().then(()=>{
            addNewClients(user,()=>{
                const localElement = audioElements.current[user.id];
                if(localElement){
                    localElement.volume = 0;
                    localElement.srcObject = localMediaStream.current;
                }
                //socket emit JSON socket io
                socket.current.emit('join',{});
                
            })
        })
    }, []);

    return {clients, provideRef}
}