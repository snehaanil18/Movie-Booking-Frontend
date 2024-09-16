"use client";
import React, { useState, ChangeEvent } from 'react';
import { TheaterData } from '@/Utils/Models/theater'
import styles from './theater.module.css'
import InputField from '@/Utils/Components/InputField/InputField';
import Button from '@/Utils/Components/Button/Button';
import {addTheaterAPI} from '../Services/allAPIs'
import { useRouter } from 'next/navigation';

 
 function AddTheater() {
    const [formData, setFormData] = useState<TheaterData>({
        name: "",
        address: "",
        city: "",
        capacity: 0 
    });

    const [errors, setErrors] = useState({
        name: "",
        address: "",
        city: "",
        capacity: ""
    });

    const router = useRouter()

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        validate()
    };

    const validate = () => {
        const newErrors = {
            name: "",
            address: "",
            city: "",
            capacity: ""
        };

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!formData.address.trim()) {
            newErrors.address = "Address is required";
        }

        if (!formData.city.trim()) {
            newErrors.city = "City is required";
        }

        if (!formData.capacity|| isNaN((formData.capacity))) {
            newErrors.capacity = "Seating Capacity must be a number";
        }

        setErrors(newErrors);

        return Object.values(newErrors).every(error => !error);
    };

    
    const handleSubmit = async () => {
        if(validate()){
            const token = sessionStorage.getItem('token');
            if(token){
                try{
                    const response = await addTheaterAPI(formData)
                    if(response.status==200){
                        const details = response.data;
                        alert(details.message)
                        setFormData({
                            name: "",
                            address: "",
                            city: "",
                            capacity: 0 
                        })
                    }
                    else{
                        const details = response.response.data;
                        alert(details.message)
                    }
                }
                catch (error) {
                    console.log('An error occured',error);
                }
            }
            else{
                alert('Login to continue')
                router.push('/Login');
            }
        }
        else{
            alert('Please fill the fields correctly')
        }
    }

   return (
     <div> 
         <div className={styles.container}>
            <h2>Add Theater</h2>
         <label className={styles.fieldName} htmlFor="">Name of Theater</label>
                <InputField label='' type='text' name='name' value={formData.name} onChange={handleInputChange} placeholder="Name of theater" />
                {errors.name && <p className={styles.error}>{errors.name}</p>}

                <label className={styles.fieldName} htmlFor="">Location</label>
                <InputField label='' type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="Address" />
                {errors.address && <p className={styles.error}>{errors.address}</p>}

                <label className={styles.fieldName} htmlFor="">City</label>
                <InputField label='' type='text' name='city' value={formData.city} onChange={handleInputChange} placeholder="City" />
                {errors.city && <p className={styles.error}>{errors.city}</p>}

                <label className={styles.fieldName} htmlFor="">Seating Capacity</label>
                <InputField label='' type="text" name="capacity" value={formData.capacity} onChange={handleInputChange} placeholder="Capacity" />
                {errors.capacity && <p className={styles.error}>{errors.capacity}</p>}

                <Button label='Add Theater' onClick={() => handleSubmit()} />
         </div>
     </div>
   )
 }
 
 export default AddTheater