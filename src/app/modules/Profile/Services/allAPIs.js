import axios from 'axios'

const server_url = process.env.NEXT_PUBLIC_SERVER_URL;
const token = sessionStorage.getItem('token')

export const getUserAPI = async () => {    
    return await axios.get(`${server_url}/get-user-profile`, {
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

export const verifyEmailAPI = async(body) => {
    return await axios.post(`${server_url}/verify-email`,body,{
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        withCredentials: true 
    }).then((response) => {
        return response
    })
        .catch((error) => {
            return error
        });
}

export const verifyOtpAPI = async(body) => {
    return await axios.post(`${server_url}/verify-email-otp`,body,{
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        withCredentials: true 
    }).then((response) => {
        return response
    })
        .catch((error) => {
            return error
        });
}

