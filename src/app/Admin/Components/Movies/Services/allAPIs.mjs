import axios from 'axios'

const server_url = process.env.NEXT_PUBLIC_SERVER_URL;
const token = sessionStorage.getItem('token')

export const addMovieAPI = async (movie) => {
    return await axios.post(`${server_url}/add-movies`, movie, {
        headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`

        }
    }).then((response) => {
        return response
    })
        .catch((error) => {
            return error
        });
}

export const viewMoviesAPI = async () => {
    return await axios.get(`${server_url}/all-movies`, {
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

export const popularMoviesAPI = async () => {
    return await axios.get(`${server_url}/popular-movies`, {
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

export const getAMovieAPI = async (id) => {
    return await axios.get(`${server_url}/get-a-movie/${id}`, {
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