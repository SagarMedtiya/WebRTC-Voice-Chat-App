const otpService = require('../services/otp-service') 
const hashing = require('../services/hash');


class Authcontroller{
    async sendOtp(req,res){
        //Logic
        const { phone } = req.body;
        if(!phone){
            res.status(400).json({message: 'Mobile number field is required'});
        }
        const otp = await otpService.generateOtp();
        const ttl = 1000*60*2;
        const expires = Date.now() + ttl;
        const data = `${phone}.${otp}.${expires}`
        //hashing the otp

        const hash = hashing.hashOtp(data);
        try{
            await otpService.sendBysms(phone,otp);
            res.json({
                hash:`${hash}.${expires}`,
                phone: `${phone}`,
            });
        }catch(err){
            console.log(err);
            res.send(500).json({msg: 'message sending failed'})
        }

    }
    async verifyOtp(req,res){
        const {phone,otp, hash} = req.body;
        if(!otp || !hash || !phone){
            res.status(400).json({message: "all fields are required."})
        }
        const [hashedotp, expires] = hash.split('.');
        if(Date.now() > expires){
            res.status(500).json({message: "OTP expired"})
        }

        const data = `${phone}.${otp}.${expires}`;
        const isValid = otpService.verifyOtp(hashedotp, data)
        if(!isValid){
            res.status(400).json({message : 'Invalid OTP'})
        }

        let user;
        let accesstoken;
        let refreshToken;
    }
}

module.exports = new  Authcontroller();