import React,{useState} from 'react';
import Card from '../../../../components/shared/Card/Card';
import Button from '../../../../components/shared/Button/Button';
import TextInput from '../../../../components/shared/TextInput/TextInput';
import styles from '../StepEmail.module.css';
import { sendOtp } from '../../../../http/index';
import { useDispatch } from 'react-redux';
import { setOtp } from '../../../../store/authSlice';
 
const Phone = ({onNext}) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const dispatch = useDispatch();

    async function submit(){
        //server request
        const {data} = await sendOtp({ phone: phoneNumber });
        console.log(data)
        dispatch(setOtp({ phone: data.phone, hash: data.hash}))
        onNext();
    }

  return (
    <Card title="Enter your phone number" icon="Smartphone">
        <div>
            <TextInput value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)}/>
        </div>
        <div className={styles.actionButtonWrap}>
            <Button onClick={submit} text="Next"/>
        </div>
            <p className={styles.para}>By entering your number, you are agreeing to out Terms of Service and Privacy Policy. Thanks!</p>
            
    </Card>
  )
}

export default Phone