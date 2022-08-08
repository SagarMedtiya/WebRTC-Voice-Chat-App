import { useCallback, useEffect } from 'react';
import {useRef} from 'react'
import { useStateWithCallBack } from './useStateWithCallBack';
import {socketInit} from '../socket/index'
import { ACTIONS } from '../action';
import freeice from 'freeice'

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
                socket.current.emit(ACTIONS,{roomId, user});
                
            })
        })
    }, []);
    useEffect(()=>{
        const handleNewPeer = async({peerId, createOffer, user:remoteUser})=>{
            //if already connected then give warning
            if(peerId in connections.current){
                return console.warn(`You are already connected with ${peerId} (${user.name})`)
            }

            connections.current[peerId] = new RTCPeerConnection({
                iceServers:
            })
        }

        socket.connect.on(ACTIONS.ADD_PEER, handleNewPeer)
    },[])

    return {clients, provideRef}
}