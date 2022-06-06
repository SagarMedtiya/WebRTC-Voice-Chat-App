import React,{useState} from 'react';
import styles from './StepAvatar.module.css';
import TextInput from '../../../components/shared/TextInput/TextInput';
import Card from '../../../components/shared/Card/Card';
import Button from '../../../components/shared/Button/Button';
import { useSelector, useDispatch } from 'react-redux';
import { setName, setAvatar } from '../../../store/activationSlice';
const StepAvatar = ({onNext}) => {
    const {name} = useSelector((state)=> state.activate);
    const [image, setImage] = useState('/images/mokey-avatar.jpg')
    function submit(){

    }
    return (
        <>
            <div className={styles.cardWrapper}>
                    <Card title={`Okay, ${name}`} icon="Monkey">
                        <p className={styles.para}>How's this photo?</p>
                        <div className={styles.avatarWrapper}>
                            <img src={image} alt="avatar" />    
                        </div>   
                        <div className={styles.actionButtonWrap}>
                            <Button onClick={submit} text="Next"/>
                        </div>
                            
                    </Card>
                </div>
        </>
    )
}

export default StepAvatar