import React,{useState} from 'react';
import Card from '../../../../components/shared/Card/Card';
import Button from '../../../../components/shared/Button/Button';
import TextInput from '../../../../components/shared/TextInput/TextInput';
import styles from '../StepEmail.module.css';
import { sendOtp } from '../../../../http/index'
const Phone = ({onNext}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
    async function submit(){
        //server request
        const res = await sendOtp({ phone: phoneNumber });
        console.log(res);
        //onNext();
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