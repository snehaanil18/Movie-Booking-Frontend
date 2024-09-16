"use client";
import React, { useEffect, useState } from 'react';
import InputField from '@/Utils/Components/InputField/InputField';
import styles from './movies.module.css';
import { MovieResponse } from '@/Utils/Models/movie';
import { viewMoviesAPI } from '@/app/Admin/Components/Movies/Services/allAPIs.mjs';
import Card from '@/Utils/Components/Card/Card';
import Link from 'next/link';

function Page() {
  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState<MovieResponse[]>([]);
  const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;

  const getMovies = async () => {
    try {
      const response = await viewMoviesAPI();
      if (response.status == 200) {
        const details = response.data;
        setMovies(details.data);
      } else {
        const details = response.response.data;
        alert(details);
      }
    } catch (err) {
      console.error(err);
      alert('Server error');
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  // Filter movies based on the search input
  const filteredMovies = movies.filter(movie => 
    movie.title.toLowerCase().includes(search.toLowerCase()) ||
    movie.director.toLowerCase().includes(search.toLowerCase()) ||
    movie.language.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className={styles.search}>
        <InputField
          label=""
          name="search"
          className={styles.searchField}
          value={search}
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by Name, Director, or Language"
        />
      </div>

      <div className={styles.container}>
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie, index) => (
            <Link href={`/modules/movies/${movie._id}`} key={index}>
              <Card
                image={`${serverURL}/uploads/${movie.posterImage}`}
                imageHeight={300}
                imageWidth={50}
                title={movie.title}
                content={{
                  Director: movie.director,
                  Language: movie.language
                }}
                className={styles.movieCard}
              />
            </Link>
          ))
        ) : (
          <p>No movies found.</p>
        )}
      </div>
    </div>
  );
}

export default Page;
