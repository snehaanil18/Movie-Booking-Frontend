import axios from 'axios'

const server_url = process.env.NEXT_PUBLIC_SERVER_URL;
const token = sessionStorage.getItem('token')


export const addTheaterAPI = async (theater) => {
    return await axios.post(`${server_url}/add-theater`, theater, {
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

export const viewTheaterAPI = async () => {
    return await axios.get(`${server_url}/all-theaters`, {
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
