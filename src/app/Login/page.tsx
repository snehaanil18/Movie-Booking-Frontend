"use client";
import React, { useState, ChangeEvent } from 'react';
import InputField from '../../Utils/Components/InputField/InputField';
import styles from './login.module.css'
import { useRouter } from 'next/navigation';
import Button from '@/Utils/Components/Button/Button';
import Link from 'next/link';
import {loginAPI}  from './Services/allAPI'


const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({
        email:"",
        password:""
    })

    const router = useRouter()

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setErrors(prevState => ({
            ...prevState,
            [name]: value.trim() === "" ? "This field is required" : ""
        }));

        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
        validateField(name,value)
    };

    const validateField = (name: string, value: string) => {
        let error = "";
        switch (name) {
            case "email":
                if (!value.trim()) error = "Email Address is required";
                else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "Email Address is invalid";
                break;
            case "password":
                if (!value.trim()) error = "Password is required";
                else if (value.length < 6) error = "Password must be at least 6 characters long";
                break;
            default:
                break;
        }
        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: error,
        }));

    };

    const handleClick = async() => {
        // const isAnyFieldEmpty = Object.entries(formData).some(([key, value]) => value.trim() === '');
        // const hasErrors = Object.values(errors).some(error => error);
        // if (isAnyFieldEmpty || hasErrors) {
        //     alert('Please fill all fields correctly');
        //     return;
        // }
        try{            
            const response = await loginAPI(formData)
            
            if(response.status == 200){
                const details = response.data
                const token = details.data.token;
                sessionStorage.setItem('token',token)
                alert(details.message)
                if(details.data.role=='admin'){
                    router.push('/Admin/Dashboard')
                }
                else{
                    router.push('/')
                }
        
            }
            else{
                const details = response.response.data
                alert(details.message)
            }
        }
        catch (error) {
            console.log('An error occured',error);
        }
    };


    return (
        <div className={styles.container}>
            <form className={styles.formContent} action="">
                <h2>USER LOGIN</h2>
                <div className={styles.divider}></div>
                <InputField label='' type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" />
                {errors.email && <div className={styles.error}>{errors.email}</div>}

                <InputField label='' type="password" name="password" value={formData.password} onChange={handleInputChange} placeholder="Password" />
                {errors.password && <div className={styles.error}>{errors.password}</div>}

                <Button label="Login" onClick={() => handleClick()} />
                <div>Don&apos;t have an Account? <Link href={'/Register'}>Register</Link> </div>
            </form>
        </div>


    )
}

export default Login