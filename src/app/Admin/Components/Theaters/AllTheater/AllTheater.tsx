"use client";
import React, { useEffect, useState } from 'react'
import { viewTheaterAPI } from '../Services/allAPIs';
import Card from '@/Utils/Components/Card/Card';
import { TheaterData } from '@/Utils/Models/theater'
import styles from './alltheater.module.css'
import Button from '@/Utils/Components/Button/Button';
import AddTheater from '../AddTheater/AddTheater';
import address from '../../../../../Themes/Images/address-home-house-svgrepo-com.svg'
import Image from 'next/image';
import location from '../../../../../Themes/Images/location-svgrepo-com.svg'
import capacity from '../../../../../Themes/Images/users-more-svgrepo-com.svg'
import { useRouter } from 'next/navigation';


function AllTheater() {
    const [theaters, setTheaters] = useState<TheaterData[]>([])
    const [show, setShow] = useState(false)
    const router = useRouter()

    const getTheaters = async () => {
        const token = sessionStorage.getItem('token');
        if (token) {
            try{
                const response = await viewTheaterAPI()
                if (response.status == 200) {
                    const details = response.data;
                    setTheaters(details.data)
                }
                else {
                    const details = response.response.data;
                    alert(details)
                
                    router.push('/Login')
                }
            }
            catch(err){
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
        getTheaters()
    }, [show])

    const toggleaddTheater = () => {
        setShow(!show);

    }

    return (
        <div className={styles.allTheater}>

            <div className={styles.addButton}>
                <Button label={show ? "All Theater" : "Add Theater"} onClick={() => toggleaddTheater()} />
            </div>
            {show ?
                <AddTheater />
                :
                <div>
                    <h2>All Theaters</h2>
                    <div className={styles.container}>

                        
                    {theaters.map((theater, index) => (
              <Card
                key={index}
                title={theater.name}
                content={{
                  Address: (
                    <p>
                      <Image src={address} alt='Address' height={20} width={30} />
                      {`: ${theater.address}`}
                    </p>
                  ),
                  City:(
                    <p>
                    <Image src={location} alt='Address' height={20} width={30} />
                    {`: ${theater.city}`}
                  </p>
                  ),
                //   Capacity: theater.capacity,
                Capacity:(
                    <p>
                    <Image src={capacity} alt='Address' height={20} width={30} />
                    {`: ${theater.capacity}`}
                  </p>
                  )
                }}
                className={styles.theaterCard} // Apply additional styles if needed
              />
            ))}
                    </div>
                </div>

            }

        </div>
    )
}

export default AllTheater