"use client";
import React, { useEffect, useState } from 'react'
import { getShowAPI, addBookingAPI,createRazorpayOrder,verifyPaymentAPI } from '../Services/allAPIs'
import { ShowDetails } from '@/Utils/Models/show';
import styles from './booking.module.css'
import InputField from '@/Utils/Components/InputField/InputField';
import { UserState } from '@/Utils/Models/user';
import { useRouter } from 'next/navigation';
import { getUserAPI } from '../../Profile/Services/allAPIs';
import Button from '@/Utils/Components/Button/Button';


interface RazorpayOptions {
    key: string;
    amount: number;
    currency: string;
    name: string;
    description: string;
    order_id: string;
    handler: (response: { razorpay_payment_id: string; razorpay_signature: string }) => void;
    prefill: {
      name: string;
      email: string;
      contact: string;
    };
    theme: {
      color: string;
    };
  }
  
  interface RazorpayInstance {
    open: () => void;
  }

function Page({ params }: { params: { showId: string } }) {
    const showId = params.showId;
    const [date, setDate] = useState('')
    const [bookedSeats, setBookedSeats] = useState<number[]>([]);
    // const [ticketamount, setticketAmount] = useState(0)
    const [amount, setAmount] = useState(0)
    const [error, setError] = useState('');
    const [showDetails, setShowDetails] = useState<ShowDetails>({
        _id: '',
        theater: {
            name: '',
            capacity: 0,
            address: '',
            city: ''
        },
        movie: '',
        timing: '',
        price: 0,
        showId: '',
        bookedSeats: [],
        __v: 0,
    })

    const [user, setUser] = useState<UserState>({
        name: '',
        email: '',
        phone: '',
        role: 'user',
        password: ''
    });

    const router = useRouter()

    const getShowDetails = async () => {
        const token = sessionStorage.getItem('token');
        if (token) {
            try {
                const response = await getShowAPI(showId);
                console.log(response);
                const details = response.data;
                setShowDetails(details.data);
                setBookedSeats(details.data.bookedSeats || []);
            }
            catch (err) {
                console.log(err);
            }
        }
        else {
            alert('Please Login to continue')
        }
    }

    const getUserProfile = async () => {
        const token = sessionStorage.getItem('token');
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

    const validateForm = () => {
        if (!date || selectedSeats.length === 0) {
            setError('Please select a date and seats');
            return false;
        }
        setError(''); // Clear error if validation passes
        return true;
    };

    const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

    const handleSeatSelection = (seatNumber: number) => {
        if (selectedSeats.includes(seatNumber)) {
            setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber)); // Deselect seat
        } else {
            setSelectedSeats([...selectedSeats, seatNumber]); // Select seat
        }
    };

    const calculateAmount = () => {
        if (selectedSeats.length > 0) {
            const totalamount = selectedSeats.length * showDetails.price;
            // const totalAmountInPaise = totalamount * 100; // Convert to paise
            setAmount(totalamount);
            // setticketAmount(totalamount)
        }
    }
    useEffect(() => {
        getShowDetails()
        getUserProfile()

    }, [])

    useEffect(() => {
        calculateAmount()
    }, [selectedSeats])

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        script.onload = () => {
            console.log('Razorpay SDK loaded');
        };
        document.body.appendChild(script);
    
        return () => {
            document.body.removeChild(script);
        };
    }, []);
    
    



    const handleSubmit = async() => {
        if (!validateForm()) return; 
        const bookingData = {
            movie: showDetails.movie,
            theater: showDetails.theater.name,
            showTimeId: showDetails.showId,
            bookingDate: date,
            seats: selectedSeats,
            ticketPrice: showDetails.price,
            totalAmount: amount,
            userEmail: user.email,
            userPhone: user.phone
        }
        try{
            const bookingResponse = await addBookingAPI(bookingData);
            console.log("Booking response:", bookingResponse);
            const orderResponse = await createRazorpayOrder(bookingData.totalAmount);
            console.log("Order response:", orderResponse);
    
            if (orderResponse) {
                const { id: orderId, amount, currency } = orderResponse;
    
                const options = {
                    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!, // Use Razorpay key
                    amount: amount*100, // Amount in paise
                    currency: currency,
                    name: 'Movie Booking',
                    description: 'Payment for booking movie tickets',
                    order_id: orderId, // Razorpay order ID
                    handler: async (response: { razorpay_payment_id: string; razorpay_signature: string; }) => {
                        
                        const paymentData = {
                            orderId,
                            paymentId: response.razorpay_payment_id,
                            signature: response.razorpay_signature
                        };
    
                        // Verify payment on the server
                        const verifyResponse = await verifyPaymentAPI(paymentData);
                        console.log(verifyResponse);
                        
                        if (verifyResponse.success) {
                            console.log("Payment verified, now proceed with booking");
                            // Make the actual booking after payment is successful
                            // const bookingResponse = await addBookingAPI(bookingData);
                            // console.log("Booking response:", bookingResponse);
                            alert("Booking successful!");
                        } else {
                            alert("Payment verification failed");
                        }
                    },
                    prefill: {
                        name: user.name,
                        email: user.email,
                        contact: user.phone
                    },
                    theme: {
                        color: '#F37254'
                    }
                };
    
                // Open Razorpay checkout
                const razorpayInstance = new (window as unknown as { Razorpay: new (options: RazorpayOptions) => RazorpayInstance }).Razorpay(options);
            razorpayInstance.open();
            } else {
                alert('Failed to create Razorpay order');
            }
        } catch (err) {
            console.log(err);
            alert('Server error');
        }
    };
    


    return (
        <div>
            <div className={styles.container}>
                <h2>Book your Tickets</h2>
                <label className={styles.fieldName}>Name</label>
                <InputField label='' type='text' name='name' value={user.name} />

                <label className={styles.fieldName}>Movie</label>
                <InputField label='' type='text' name='movie' value={showDetails.movie} />

                <label className={styles.fieldName}>Theater</label>
                <InputField label='' type='text' name='theater' value={showDetails.theater.name} />

                <label className={styles.fieldName}>Show Time</label>
                <InputField label='' type='text' name='timing' value={showDetails.timing} />

                <label className={styles.fieldName}>Date</label>
                <InputField label='' type='date' name='date' value={date} onChange={(e) => setDate(e.target.value)} />


                <label className={styles.fieldName}>Price</label>
                <InputField label='' type='text' name='price' value={showDetails.price} />


                <label className={styles.fieldName}>Select seats</label>
                <div className={styles.seatContainer}>
                    {[...Array(showDetails.theater.capacity)].map((_, index) => {
                        const seatNumber = index + 1;
                        const isSelected = selectedSeats.includes(seatNumber);
                        const isBooked = bookedSeats.includes(seatNumber); // Check if seat is already booked
                        return (
                            <button
                                key={seatNumber}
                                onClick={() => !isBooked && handleSeatSelection(seatNumber)} // Only allow selection if seat is not booked
                                className={`${styles.seatButton} ${isSelected ? styles.selected : ''} ${isBooked ? styles.booked : ''}`}
                                disabled={isBooked} // Disable button if seat is booked
                            >
                                {seatNumber}
                            </button>
                        );
                    })}
                </div>

                <div>
                    <p>Selected Seats: {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}</p>
                </div>

                

                <label className={styles.fieldName}>Amount</label>
                <InputField label='' type='text' name='timing' value={amount} />

                {error && <p className={styles.error}>{error}</p>}

                <div className={styles.book}>
                    <Button label='Book Ticket' onClick={handleSubmit} />
                </div>

            </div>
        </div>
    )
}

export default Page