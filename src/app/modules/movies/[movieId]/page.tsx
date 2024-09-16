"use client";
import { getAMovieAPI } from '@/app/Admin/Components/Movies/Services/allAPIs.mjs'
import React, { useEffect, useState } from 'react'
import Card from '@/Utils/Components/Card/Card';
import { MovieResponse } from '@/Utils/Models/movie';
import styles from './details.module.css'
import { movieShowsAPI } from '@/app/Admin/Components/Shows/Services/allAPIs';
import { Show } from '@/Utils/Models/show';
// import Image from 'next/image';
// import clock from '../../../../Themes/Images/clock-seven-svgrepo-com.svg'
import Link from 'next/link';


function Page({ params }: { params: { movieId: string } }) {

    const movieId = params.movieId
    const [movie, setMovie] = useState<MovieResponse | null>(null);
    const [shows, setShows] = useState<Show[]>([])
    const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;
    
    const getMovieDetails = async () => {
        try {
            const response = await getAMovieAPI(movieId)
            console.log(response);
            const details = response.data;
            setMovie(details.data)
        }
        catch (err) {
            console.log(err);
        }
    }

    const showDetails = async () => {
        try {
            const response = await movieShowsAPI(movieId)
            console.log(response);
            const details = response.data;
            setShows(details.data)
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getMovieDetails()
        showDetails()
    }, [movieId])

    if (!movie) {
        return <div>Loading...</div>; 
    }



    return (
        <div>
            <div className={styles.container}>


                <div className={styles.details}>
                    <img src={`${serverURL}/uploads/${movie.posterImage}`} height={400} width={400} alt={movie.title} />
                    <h2>{movie.title}</h2>
                </div>

                <div className={styles.content}>
                    <p><b>Plot:</b></p>
                    {movie.synopsis}
                    <div className={styles.cast}>
                        <b>Cast:</b>
                        <ul>
                            {movie.cast.map((member) => (
                                <li key={member }>{member}</li>
                            ))}
                        </ul>
                    </div>
                    <p><b>Director:</b> {movie.director}</p>
                    <p><b>Genre:</b> {movie.genre}</p>
                    <p><b>Language:</b> {movie.language}</p>
                </div>
            </div>

            <div className={styles.shows}>
                {shows.map((show) => (
                    <Link href={`/modules/booking/${show.showId}`} key={show.showId} >
                    <Card
                        
                        title={show.theater.name} 
                        content={{
                            // Timing:(
                            //     <p>
                            //     <Image src={clock} alt='time' height={20} width={30} />
                            //     {`: ${show.timing}`}
                            //   </p>
                            // ) ,
                            Time: show.timing,
                            Address: show.theater.address,
                            City: show.theater.city
                        }}
                        className={styles.showCard}
                    />
                    </Link>
                ))}
            </div>

        </div>
    )
}

export default Page