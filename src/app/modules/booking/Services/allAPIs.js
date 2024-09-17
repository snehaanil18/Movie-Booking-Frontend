import axios from 'axios'

const server_url = process.env.NEXT_PUBLIC_SERVER_URL;
const token = sessionStorage.getItem('token')

export const getShowAPI = async (id) => {    
    return await axios.get(`${server_url}/get-show-details/${id}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }).then((response) => {
        return response
    })
        .catch((error) => {
            return error
        });
}

export const addBookingAPI = async(body) => {
    return await axios.post(`${server_url}/add-booking`,body,{
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }).then((response) => {
        return response
    })
        .catch((error) => {
            return error
        });
}

export const createRazorpayOrder = async (amount) => {
    return await axios.post(`${server_url}/create-order`,{ amount },{
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }).then((response) => {
        return response
    })
        .catch((error) => {
            return error
        });
    // try {
    //     const response = await axios.post('/api/createOrder', { amount });
    //     return response.data;
    // } catch (error) {
    //     console.error('Error creating Razorpay order:', error);
    //     return null;
    // }
};

// Call to backend to verify payment
export const verifyPaymentAPI = async (paymentData) => {
    return await axios.post(`${server_url}/verify-payment`,paymentData,{
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }).then((response) => {
        return response
    })
        .catch((error) => {
            return error
        });
    // try {
    //     const response = await axios.post('/api/verifyPayment', paymentData);
    //     return response.data;
    // } catch (error) {
    //     console.error('Error verifying payment:', error);
    //     return { success: false };
    // }
};