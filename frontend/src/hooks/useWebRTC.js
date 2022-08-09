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
    const addNewClient = useCallback(
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
            addNewClient(user,()=>{
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
                iceServers: freeice()
            })

            // Handle new ice candidate
            connections.current[peerId].onicecandidate = (event)=>{
                socket.current.emit(ACTIONS.RELAY_ICE,{
                    peerId,
                    icecandidate: event.candidate
                })
            }
            //handle on track on this connections
            connections.current[peerId].ontrack=({
                streams:[remoteStream]
            })=>{
                addNewClient(remoteUser,()=>{
                    if(audioElements.current[remoteUser.id]){
                        audioElements.current[remoteUser.id].srcObject = remoteStream
                    }
                    else{
                        let settled = false
                        const interval = setInterval(()=>{
                            if(audioElements.current[remoteUser.id]){
                                audioElements.current[remoteUser.id].srcObject = remoteStream
                                settled = true;
                            }
                            if(settled){
                                clearInterval(interval)
                            }
                        },1000)
                    }
                })
            }
            //ADD local tracks to remote connections
            localMediaStream.current.getTracks().forEach(track=>{
                connections.current[peerId].addTrack(track, localMediaStream.current);
            });
        };
        
        socket.connect.on(ACTIONS.ADD_PEER, handleNewPeer)
    },[])

    return {clients, provideRef}
}