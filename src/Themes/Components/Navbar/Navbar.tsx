"use client";
import React, { useEffect, useState } from 'react'
import styles from './navbar.module.css'
import Button from '@/Utils/Components/Button/Button'
import { useRouter } from 'next/navigation';


function Navbar() {
    // const token = sessionStorage.getItem('token')
    const [tokenvalue,setTokenvalue]=useState('')
    const router = useRouter()

    const homeButton = () =>{
        router.push('/')
    }

    const movieButton = () =>{
        router.push('/modules/movies')
    }

    const loginButton = () =>{
        if(tokenvalue == ''){
            router.push('/Login')
        }
        else{
            router.push('/modules/Profile')
        }
        
    }

    useEffect(() => {
        const token = sessionStorage.getItem('token')
        setTokenvalue(token||'')
    },[tokenvalue])

  return (
    <div>
        <div className={styles.navbar}>
            <div className={styles.logo}>
                MovieGo
            </div>
            <div className={styles.navElements}>
                <ul>
                    <li>
                        <Button label='Home' onClick={()  => homeButton()}/>
                    </li>
                    <li>
                        <Button label='Movies' onClick={()  => movieButton()}/>
                    </li>
                    <li>
                        <Button label={tokenvalue?'Profile':'Login'} onClick={()  => loginButton()}/>
                    </li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Navbar