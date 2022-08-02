import {useState} from 'react'
import { useStateWithCallBack } from './useStateWithCallBack'
export const useWebRTC=()=>{
    const [clients, setClients] = useStateWithCallBack([
        {
            id: 1,
            name: 'Sagar'
        },
        {
            id: 2,
            name: 'abhishek'
        }
    ])
    return {clients}
}