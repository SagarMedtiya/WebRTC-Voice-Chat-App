import React,{useState} from 'react'
import Card from '../../../components/shared/Card/Card';
import Button from '../../../components/shared/Button/Button';
import TextInput from '../../../components/shared/TextInput/TextInput';
import styles from './StepOtp.module.css'
const StepOtp = ({onNext}) => {
    const [otp,setOtp] = useState('');
  return (
    <>
        <div className={styles.cardWrapper}>
            <Card title="Enter the otp" icon="Lock">
                <div>
                    <TextInput value={otp} onChange={(e)=>setOtp(e.target.value)}/>
                </div>
                <div className={styles.actionButtonWrap}>
                    <Button onClick={onNext} text="Next"/>
                </div>
                    <p className={styles.para}>By entering your number, you are agreeing to out Terms of Service and Privacy Policy. Thanks!</p>
                
            </Card>
        </div>
       
    </>
  )
}

export default StepOtp