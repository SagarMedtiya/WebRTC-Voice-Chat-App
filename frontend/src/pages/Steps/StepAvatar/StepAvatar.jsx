import React,{useState} from 'react';
import styles from './StepAvatar.module.css';
import TextInput from '../../../components/shared/TextInput/TextInput';
import Card from '../../../components/shared/Card/Card';
import Button from '../../../components/shared/Button/Button';
import { useSelector, useDispatch } from 'react-redux';
import { setName, setAvatar } from '../../../store/activationSlice';
import { activate } from '../../../http/index';
import { setAuth } from '../../../store/authSlice'

const StepAvatar = ({onNext}) => {
    const {name, avatar} = useSelector((state)=> state.activate);
    const dispatch = useDispatch();
    const [image, setImage] = useState('/images/monkey.jpg')
    function captureImage(e){
       const file = e.target.files[0];
       const reader = new FileReader();
       reader.readAsDataURL(file)
       reader.onloadend = function(){
            setImage(reader.result);
            dispatch(setAvatar(reader.result))
       }
    }
    async function submit(){
        try{
            const {data} = await activate({name, avatar});
            if(data.auth){
                dispatch(setAuth(data))
            }
            console.log(data);
        }catch(err){
            console.log(err.message);
        }
    }
    return (
        <>
            <div className={styles.cardWrapper}>
                    <Card title={`Okay, ${name}`} icon="Monkey">
                        <p className={styles.para}>How's this photo?</p>
                        <div className={styles.avatarWrapper}>
                            <img className={styles.avatarImage} src={image} alt="avatar" />    
                        </div>
                        <div>
                            <input onChange={captureImage} id="avatarInput" type="file"  className={styles.avatarInput}/>
                            <label className={styles.avatarLabel} htmlFor="avatarInput">Choose a different pic</label>
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