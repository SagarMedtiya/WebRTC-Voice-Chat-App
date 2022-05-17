const router = require('express').Router();
const authcontroller  =require('./controllers/auth-controller')

router.post('/api/send-otp',authcontroller.sendOtp);


module.exports = router;
