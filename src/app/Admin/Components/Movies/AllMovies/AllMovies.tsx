"use client";
import React, { useEffect, useState } from 'react'
import Button from '@/Utils/Components/Button/Button'
import styles from './allmovie.module.css'
import Movie from '../AddMovie/Movie';
import { viewMoviesAPI } from '../Services/allAPIs.mjs';
import Card from '@/Utils/Components/Card/Card';
import { MovieResponse } from '@/Utils/Models/movie';
import { useRouter } from 'next/navigation';



function AllMovies() {
    const [movies,setMovies] = useState<MovieResponse[]>([])
    const [show, setShow] = useState(false)
    const serverURL = process.env.NEXT_PUBLIC_SERVER_URL

    const toggleaddMovie = () => {
        setShow(!show);
      
    }

    const router = useRouter()

    const getMovies = async() => {
        const token = sessionStorage.getItem('token');
        if(token){
            try{
                const response = await viewMoviesAPI()
                if(response.status == 200){
                    const details=response.data
                    setMovies(details.data)
                }
                else{
                    const details = response.response.data;
                    alert(details)
                    router.push('/Login');
                }
            }
            catch(err){
                console.log(err);
                alert('Server error')
            }
        }

        else{
            alert('Please Login to Continue')
        }
    }

    
    useEffect(() => {
        getMovies()
    },[])

    return (
        <div className={styles.allMovies}>
            <div className={styles.addButton}>
                <Button label={show ? "All Movie" : "Add Movie"} onClick={() => toggleaddMovie()} />
            </div>
            {show ? 
                <Movie /> 
                :
                <div>
                <h2>All Movies</h2>
                <div className={styles.container}>

                    {movies.map((movie, index) => (
                        <Card
                            key={index}
                            image={`${serverURL}/uploads/${movie.posterImage}`}
                            imageHeight={300}
                            imageWidth={50}
                            title={movie.title}

                            content={{
                                Plot: movie.synopsis,
                                Director: movie.director,
                                Language: movie.language
                            }}

                            className={styles.movieCard} // Apply additional styles if needed
                        />
                    ))}

                </div>
            </div>
            }
        </div>
    )
}

export default AllMovies