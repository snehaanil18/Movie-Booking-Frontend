"use client";
import React, { useEffect, useState } from 'react'
import styles from './navbar.module.css'
import Button from '@/Utils/Components/Button/Button'
import { useRouter } from 'next/navigation';
import Logout from '../logout/Logout';
import menu from '../../../Themes/Images/menu-svgrepo-com.svg'
import Image from 'next/image';

// import { useSession } from 'next-auth/react'

function Navbar() {
    // const token = sessionStorage.getItem('token')
    const [tokenvalue,setTokenvalue]=useState('')
    const router = useRouter()
    // const { data: session } = useSession();
    const [show,setShow] = useState(true)
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

    const handleMenu = () => {
        
        
        setShow(!show)
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

            <div className={styles.menu}>
                <button onClick={() => handleMenu()}>
                    <Image src={menu} alt='menu' height={15} width={17} />
                </button>
            </div>

            {show?
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
                            
                            <li>
                                <Logout />
                            
                            </li>
                        </ul>
                    </div>
        :""
            }

        </div>
    </div>
  )
}

export default Navbar