"use client";
import InputField from '@/Utils/Components/InputField/InputField';
import { UserState } from '@/Utils/Models/user';
import React, { useEffect, useState } from 'react'
import { getUserAPI, verifyEmailAPI, verifyOtpAPI } from './Services/allAPIs'
import { useRouter } from 'next/navigation';
import styles from './profile.module.css'
import Button from '@/Utils/Components/Button/Button';


function Page() {
    const [user, setUser] = useState<UserState>({
        name: '',
        email: '',
        phone: '',
        role: 'user',
        password: ''
    });
    const [show, setShow] = useState(false);
    const [verify,setVerify] = useState(false)
    const[otp,setOtp] = useState('')
    const token = sessionStorage.getItem('token');
    const router = useRouter()

    const handleChange = () => {
        console.log('change');
    }

    const getUserProfile = async () => {

        if (token) {
            try {
                const response = await getUserAPI();
                const details = response.data;
                setUser(details.data)
            }
            catch (err) {
                console.log(err);
                alert('Server error')
            }
        }
        else {
            alert('Please login to continue')
            router.push('/Login')
        }
    }

    useEffect(() => {
        getUserProfile()
    }, [])

    const verifyEmail = async () => {
        const reqBody = { email: user.email }
        if (token) {
            try {
                const response = await verifyEmailAPI(reqBody);
                if (response.status == 200) {
                    alert(response.data)
                    setShow(!show)
                }
                else {
                    alert('Error in verifying Email')
                }
            }
            catch (err) {
                console.log(err);
                alert('Server error')
            }
        }
        else {
            alert('Please login to continue')
            router.push('/Login')
        }
    }

    const verifyOTP = async() =>{
        const reqBody = {email: user.email, otp:otp}
        if (token) {
            try {
                const response = await verifyOtpAPI(reqBody);
                console.log(response);
                if (response.status == 200) {
                    alert(response.data.message)
                    setShow(!show)
                    setVerify(!verify)
                }
                else {
                    alert('Error in verifying OTP')
                }
            }
            catch (err) {
                console.log(err);
                alert('Server error')
            }
        }
        else {
            alert('Please login to continue')
            router.push('/Login')
        }
    }

    return (
        <div>
            <div className={styles.container}>
                <label className={styles.fieldName}>Name</label>
                <InputField label='' type='text' name='name' value={user.name} onChange={handleChange} />
                <label className={styles.fieldName}>Email</label>
                <InputField label='' type='text' name='email' value={user.email} onChange={handleChange} />
                {verify?
                <div>Verified</div>:<Button label='Verify Email' onClick={() => verifyEmail()} />
            }
                
                {show ?
                    <div>
                        <InputField label='' type='text' name='otp' value={otp} onChange={(e)=>setOtp(e.target.value)} />
                        <Button label='Verify OTP' onClick={() => verifyOTP()} /></div> : ""
                }
                <label className={styles.fieldName}>Phone</label>
                <InputField label='' type='text' name='phone' value={user.phone} onChange={handleChange} />
            </div>

        </div>
    )
}

export default Page