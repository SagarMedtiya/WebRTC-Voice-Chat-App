import React from 'react'
import { Link } from 'react-router-dom';
import style from './Navigation.module.css'
const navigation = () => {
  const brandStyle ={
    color: '#fff',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '22px',
    display: 'flex',
    alignItems: 'center'
  };
  const logoText={
    marginLeft: '10px',
  }

  return (
    <nav className={`${style.navbar} container`}>
      <Link style={brandStyle} to='/'>
        <img  src="/images/Logo.png" alt="" />
        <span style={logoText}>CodersVilla</span>
      </Link>
    </nav>
  )
}

export default navigation