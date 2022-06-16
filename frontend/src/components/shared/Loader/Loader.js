import React from 'react'
import styles from './Loader.module.css';
import Card from '../Card/Card';
const Loader=({message})=> {
  return (
    <div className={styles.cardWrapper}>
        <Card>
            <span className={styles.message}>{message}</span>   
        </Card>
    </div>
  )
}

export default Loader