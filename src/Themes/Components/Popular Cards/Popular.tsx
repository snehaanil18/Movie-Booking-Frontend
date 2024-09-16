"use client";
import { popularMoviesAPI } from "@/app/Admin/Components/Movies/Services/allAPIs.mjs";
import { MovieResponse } from "@/Utils/Models/movie";
import React, { useEffect, useState } from 'react'
import Card from "@/Utils/Components/Card/Card";
import styles from './popular.module.css'
import Link from "next/link";


function Popular() {
    const [movies, setMovies] = useState<MovieResponse[]>([])
    const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;
    const getMovies = async () => {
        try{
            const response = await popularMoviesAPI()
            
            
            if(response.status==200){
                const details = response.data;
                setMovies(details.data)
            }
        }
        catch(err){
            console.log(err);
            
        }
    }

    useEffect(() => {
        getMovies()
    }, [])

    return (
        <div className={styles.popular}>
            <h2>Popular Movies</h2>
            <div className={styles.container}>

                {movies.map((movie, index) => (
                    <Link href={`/modules/movies/${movie._id}`} key={index}>
                    <Card                       
                        image={`${serverURL}/uploads/${movie.posterImage}`}
                        imageHeight={300}
                        imageWidth={50}
                        title={movie.title}
                        content={
                            {

                            }
                        }
                        // content={{
                        //     Plot: movie.synopsis,
                        //     Director: movie.director,
                        //     Language: movie.language
                        // }}

                        className={styles.movieCard} // Apply additional styles if needed
                    />
                    </Link>
                ))}

            </div>
        </div>
    )
}

export default Popular