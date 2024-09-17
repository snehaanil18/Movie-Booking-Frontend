"use client";
import React, { useEffect, useState } from 'react'
import { TheaterData } from '@/Utils/Models/theater';
import { MovieResponse } from '@/Utils/Models/movie';
import { useRouter } from 'next/navigation';
import { viewTheaterAPI } from '../../Theaters/Services/allAPIs';
import { viewMoviesAPI } from '../../Movies/Services/allAPIs.mjs';
import styles from './shows.module.css'
import Button from '@/Utils/Components/Button/Button';
import {  addShowAPI } from '../Services/allAPIs'
import InputField from '@/Utils/Components/InputField/InputField';

function AddShows() {
  const [movies, setMovies] = useState<MovieResponse[]>([]);
  const [theaters, setTheaters] = useState<TheaterData[]>([])
  const [price, setPrice] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const showTimings = ["10:00 AM", "01:00 PM", "04:00 PM", "07:00 PM", "10:00 PM"];
  const [selectedMovie, setSelectedMovie] = useState<string>('');
  const [selectedTheater, setSelectedTheater] = useState<{ name: string, capacity: number } | null>(null);
  const [selectedTiming, setSelectedTiming] = useState<string>('');
  const router = useRouter()

  const getTheaters = async () => {
    const token = sessionStorage.getItem('token');
    if (token) {
      try {
        const response = await viewTheaterAPI()
        if (response.status == 200) {
          const details = response.data;
          setTheaters(details.data)
        }
        else {
          const details = response.response.data;
          alert(details)
          
          router.push('/Login')
        }
      }
      catch (err) {
        console.log(err);
        alert('Server error')
      }
    }
    else {
      alert('Please login to continue')
      router.push('/Login')
    }
  }

  const getMovies = async () => {
    const token = sessionStorage.getItem('token');
    if (token) {
      try {
        const response = await viewMoviesAPI()
  

        if (response.status == 200) {
          const details = response.data
          setMovies(details.data)
        }
        else {
          const details = response.response.data;
          alert(details)
          router.push('/Login');
        }
      }
      catch (err) {
        console.log(err);
        alert('Server error')
      }
    }

    else {
      alert('Please Login to Continue')
    }
  }

  useEffect(() => {
    getTheaters()
    getMovies()
  }, [])

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numValue = Number(value);

    // Validate the input
    if (!isNaN(numValue) && numValue >= 0) {
      setPrice(numValue);
      setError(null); // Clear error if input is valid
    } else {
      setError('Please enter a valid positive number');
    }
  };

  const handleSubmit = async() => {
    if (!selectedMovie || !selectedTheater || !selectedTiming) {
      alert('Please select all fields.');
      return;
    }

    const showData = {
      movie: selectedMovie,
      theater: selectedTheater, // Include theater capacity
      timing: selectedTiming,
      price: price
    };

    const token = sessionStorage.getItem('token');
    if (token) {
      try {
        const response = await addShowAPI(showData)
        if (response.status == 200) {
          const details = response.data;
          alert(details.message)
          router.push('/Admin/Dashboard')
        }
        else {
          const details = response.response.data;
          alert(details.message)
        }
      }
      catch (error) {
        console.log('An error occured', error);
      }
    }
    else {
      alert('Login to continue')
      router.push('/Login');
    }
  }

return (
  <div>
    <div className={styles.container}>
      <h2>Add Show</h2>
      <label className={styles.fieldName}>Select Movie</label>
      <select value={selectedMovie} onChange={(e) => setSelectedMovie(e.target.value)} name="" id="">
        <option value="">Select Movie</option>
        {movies.length > 0 ? (
          movies.map((data, index) =>
            <option key={index} value={data.title}>{data.title} </option>
          )
        ) : (
          <option value="">No movies available</option>
        )}
      </select>

      <label className={styles.fieldName}>Select Theater</label>
      <select value={selectedTheater?.name || ''} onChange={(e) => {
        const selectedOption = theaters.find(theater => theater.name == e.target.value);
        if (selectedOption) {
          setSelectedTheater(selectedOption);  // Update selectedTheater with name and capacity
        }
      }}>
        <option value="">Select Theater</option>
        {theaters.length > 0 ? (
          theaters.map((data, index) =>
            <option key={index} value={data.name}>{data.name} (Capacity: {data.capacity})</option>
          )
        ) : (
          <option value="">No Theaters available</option>
        )}
      </select>

      <label className={styles.fieldName}>Select Show Timing</label>
      <select value={selectedTiming} onChange={(e) => setSelectedTiming(e.target.value)}>
        <option value="">Select Time</option>
        {showTimings.length > 0 ? (
          showTimings.map((data, index) =>
            <option key={index} value={data}>{data}</option>
          )
        ) : (
          <option value="">No Timings available</option>
        )}
      </select>

      <label className={styles.fieldName}>Price</label>
      <InputField name='price' label='' type='text' value={price} onChange={handlePriceChange}/>
      {error && <p className={styles.error}>{error}</p>}

      <Button label='Add Show' onClick={() => handleSubmit()} />
    </div>
  </div>
)
}

export default AddShows