import axios from 'axios'

const server_url = process.env.NEXT_PUBLIC_SERVER_URL;
const token = sessionStorage.getItem('token')

export const addShowAPI = async (show) => {
    return await axios.post(`${server_url}/add-show`, show, {
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

export const allShowsAPI = async() => {
    return await axios.get(`${server_url}/all-shows`, {
        headers: {
            "Content-Type": "application/json",
        }
    }).then((response) => {
        return response
    })
        .catch((error) => {
            return error
        });
}

export const movieShowsAPI = async(id) => {
    return await axios.get(`${server_url}/get-movie-shows/${id}`, {
        headers: {
            "Content-Type": "application/json",
        }
    }).then((response) => {
        return response
    })
        .catch((error) => {
            return error
        });
}
