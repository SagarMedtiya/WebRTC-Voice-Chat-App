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
        return ()=>{
            
        }
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
            // Create offer
            if(createOffer){
                const offer = await connections.current[peerId].createOffer()

                //send offer to another client
                socket.current.emit(ACTIONS.RELAY_SDP,{
                    peerId,
                    sessionDescription: offer
                 })
            }
        };
        
        socket.connect.on(ACTIONS.ADD_PEER, handleNewPeer);
        return()=>{
            socket.current.off(ACTIONS.ADD_PEER)
        }
    },[]);

    //handle ice candidate
    useEffect(()=>{
        socket.current.on(ACTIONS.ICE_CANDIDATE,({peerId, icecandidate})=>{
            if(icecandidate){
                connections.current[peerId].addIceCandidate(icecandidate);
            }
        })
        return ()=>{
            socket.current.off(ACTIONS.ICE_CANDIDATE)
        }
    })
    //Handle SDP
    useEffect(()=>{
        const handleRemoteSdp = async ({peerId, sessionDescription: remoteSessionDescription})=>{
            connections.current[peerId].setRemoteDescription(
                new RTCSessionDescription(remoteSessionDescription)
            )
            //if session description is type of offer then create an answer
            if(remoteSessionDescription.type === 'offer'){
                const connection = connections.current[peerId];
                const answer = await connection.createAnswer();

                connection.setLocalDescription(answer);
                socket.current.emit(ACTIONS.RELAY_SDP,{
                    peerId,
                    sessionDescription: answer,

                })
            }
        }
        socket.current.on(ACTIONS.SESSION_DESCRIPTION, handleRemoteSdp)
        return ()=>{
            socket.current.off(ACTIONS.SESSION_DESCRIPTION);
        }
    },[])

    //handle remove peer 
    useEffect(()=>{
        const handleRemovePeer =async({peerId, userId})=>{
           if(connections.current[peerId]){
                connections.current[peerId].close();

           } 
           delete connections.current[peerId];
           delete audioElements.current[peerId];
           setClients(list=>list.filter(client=>client.id !== userId))
        }
        socket.current.on(ACTIONS.REMOVE_PEER, handleRemovePeer);
        return ()=>{
            socket.current.off(ACTIONS.REMOVE_PEER);
        }
    },[])

    const provideRef=(instance, userId)=>{
        audioElements.current[userId] = instance; 
    }
    return {clients, provideRef}
}


