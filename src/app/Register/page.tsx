"use client";
import React, { useState, ChangeEvent, FormEvent } from 'react';
import styles from './register.module.css'
import InputField from '../../Utils/Components/InputField/InputField';
import Button from '@/Utils/Components/Button/Button';
import Link from 'next/link';
import { UserState } from '@/Utils/Models/user';
import { registerAPI } from './Services/allAPI'
import Swal from 'sweetalert2'

const Register = () => {
    const [formData, setFormData] = useState<UserState>({
        name: "",
        email: "",
        phone: "",
        role: "user",
        password: ""
    });

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        phone: "",
        password: ""
    })

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
        validateField(name, value);
    };

    const validateField = (name: string, value: string) => {
        let error = "";
        switch (name) {
            case "name":
                if (!value.trim()) error = "Full Name is required";
                else if (!/^[a-zA-Z\s]+$/.test(value)) error = "Full Name must contain only letters and spaces";
                break;
            case "email":
                if (!value.trim()) error = "Email Address is required";
                else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "Email Address is invalid";
                break;
            case "phone":
                if (!value.trim()) error = "Phone Number is required";
                else if (!/^\d{10}$/.test(value)) error = "Phone Number must be exactly 10 digits";
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

    const handleClick = async () => {

        const isAnyFieldEmpty = Object.entries(formData).some(([key, value]) => value.trim() === '');

        // Check if there are any validation errors
        const hasErrors = Object.values(errors).some(error => error);

        // If any field is empty or there are errors, show an alert
        if (isAnyFieldEmpty || hasErrors) {
            alert('Please fill all fields correctly');
            return;
        }

        try {
            const response = await registerAPI(formData);

            if (response.status === 201) {
                const details = response.data;
                // Swal.fire({
                //     title: 'Success',
                //     text: details.message,
                //     icon: 'success',
                //     confirmButtonText: 'OK'
                // })
                alert(details.message);
            }
            else {
                const details = response.response.data;
                // Swal.fire({
                //     title: 'Error',
                //     text: details.message,
                //     icon: 'error',
                //     confirmButtonText: 'OK'
                // })
                alert(details.message);
            }
        } catch (error: any) {
            console.log('An error occured',error);
        }

    };

    return (
        <div className={styles.container}>
            <form className={styles.formContent} action="">
                <h2>REGISTER</h2>
                <div className={styles.divider}></div>
                <InputField label='' type='text' name='name' value={formData.name} onChange={handleInputChange} placeholder="Full Name" />
                {errors.name && <div className={styles.error}>{errors.name}</div>}

                <InputField label='' type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" />
                {errors.email && <div className={styles.error}>{errors.email}</div>}

                <InputField label='' type='text' name='phone' value={formData.phone} onChange={handleInputChange} placeholder='Phone Number' />
                {errors.phone && <div className={styles.error}>{errors.phone}</div>}

                <InputField label='' type="password" name="password" value={formData.password} onChange={handleInputChange} placeholder="Password" />
                {errors.password && <div className={styles.error}>{errors.password}</div>}

                <Button label="Register" onClick={() => handleClick()} />
                <div>Already have an Account? <Link href={'/Login'}>Login</Link> </div>
            </form>
        </div>
    )
}

export default Register