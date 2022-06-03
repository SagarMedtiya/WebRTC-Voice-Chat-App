import axios from 'axios';


const api = axios.create({
    baseURL : 'http://localhost:4000' || process.env.API_URL ,
    headers : {
        'Content-type' : 'application/json',
        Accept : 'application/json'
    }
});


//list of all the end points
export const sendOtp = (data)=>api.post('/api/send-otp',data)

export default api;