import React from 'react'
import style from './Card.module.css'
const Card = ({title, icon, children}) => {
  return (
    <div className={style.card}>
          <div className={style.headingWrapper}>
            <img src="/images/logo.png " alt="" />
            <h1 className={style.heading}>{title}</h1>
          </div>
          {children}
    </div>
  )
}

export default Card