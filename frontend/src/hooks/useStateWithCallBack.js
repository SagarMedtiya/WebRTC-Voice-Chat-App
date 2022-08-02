import {useState} from 'react'
import { useCallback, useRef } from 'react'
export const useStateWithCallBack=(initialState)=>{
    const [state, setState] = useState(initialState)
    const cbRef  = useRef();
    const updateState = useCallback((newState,cb)=>{
        cbRef.current = cb;
        setState((prev)=>{
            return typeof newState==='function' ?newState(prev) :newState
        })
    },[state, updateState]) //dependency array
            
}