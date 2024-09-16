import axios from 'axios'

const server_url = process.env.NEXT_PUBLIC_SERVER_URL;

export const registerAPI = async (user) => {
    return await axios.post(`${server_url}/register-user`, user, {
        headers: {
            "Content-Type": "application/json"
        }
    }).then((response) => {
        return response
    })
        .catch((error) => {
            return error
        });
}

