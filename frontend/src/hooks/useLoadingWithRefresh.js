import {useState, useEffect} from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setAuth } from '../store/authSlice';
export function useLoadingWithRefresh (){
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch()
    useEffect(() => {
       (async()=>{
            try{
                const {data}=await axios.get('http://localhost:4000/api/refresh',
                {
                    withCredentials: true
                });
                dispatch(setAuth(data));
                console.log(data);
                setLoading(false);
            }catch(err){
                console.log(err);
                setLoading(false)
            }
       })()
       
    }, []);

    return { loading }
}