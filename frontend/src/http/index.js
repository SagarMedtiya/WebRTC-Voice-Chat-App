import axios from 'axios';


const api = axios.create({
    baseURL : 'http://localhost:4000' || process.env.API_URL ,
    withCredentials:true,
    headers : {
        'Content-type' : 'application/json',
        Accept : 'application/json'
    }
});


//list of all the end points
export const sendOtp = (data)=>api.post('/api/send-otp',data);
export const verifyOtp = (data)=>api.post('/api/verify-otp', data)
export const activate = (data)=>api.post('/api/activate', data);
export const logout = ()=>api.post('/api/logout') 
export const createRoom =(data)=> api.post('/api/rooms')
//interceptors
api.interceptors.response.use(
    (config)=>{
        return config
    },
    async (error)=>{
        const originalRequest = error.config;
        if(error.response.status === 401 && error.config && !error.config._isRetry){
            originalRequest.isRetry =true;
            try{
                await axios.get('http://localhost:4000/api/refresh',
                {
                    withCredentials: true,
                });
                return api.request(originalRequest);
            }catch(err){
                console.log(err.message);
            }
        }
        throw error;
    })

export default api;

