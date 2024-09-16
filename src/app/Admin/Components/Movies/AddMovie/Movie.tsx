"use client";
import React, { useState } from 'react';
import styles from './addmovie.module.css'
import { MovieData } from '@/Utils/Models/movie';
import InputField from '@/Utils/Components/InputField/InputField';
import Button from '@/Utils/Components/Button/Button';
import Textarea from '@/Utils/Components/Textarea';
import { addMovieAPI } from '../Services/allAPIs.mjs'
// import { useRouter } from 'next/navigation';

function Movie() {
    const [movieData, setMovieData] = useState<MovieData>({
        title: "",
        genre: "",
        releaseDate: "",
        duration: 0,
        director: "",
        cast: [""],
        synopsis: "",
        language: "",
        rating: 0,
        posterImage: null,
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    // const router = useRouter()

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setMovieData(prevState => ({
            ...prevState,
            [name]: value
        }));
        validateField(name, value);
    };

    // const handleCastChange = (index: number, field: keyof CastMember, value: string | File | null) => {
    //     const updatedCast = [...movieData.cast];
    //     // Type guard to handle `File | null` correctly
    //     if (field === "image" && value instanceof File) {
    //       updatedCast[index][field] = value;
    //     } else if (field !== "image") {
    //       updatedCast[index][field] = value as string; // Cast to string as other fields are strings
    //     }
    //     setMovieData(prevState => ({
    //       ...prevState,
    //       cast: updatedCast
    //     }));
    //   };

    // const addCastMember = () => {
    //     setMovieData(prevState => ({
    //         ...prevState,
    //         cast: [...prevState.cast, { name: "", image: null }] // Add a new empty cast member
    //     }));
    // };

    const handleCastChange = (index: number, value: string) => {
        const updatedCast = [...movieData.cast];
        updatedCast[index] = value; // Directly update the name at the index

        setMovieData(prevState => ({
            ...prevState,
            cast: updatedCast,
        }));
    };

    const addCastMember = () => {
        setMovieData(prevState => ({
            ...prevState,
            cast: [...prevState.cast, ""], // Add an empty string for the new cast member name
        }));
    };

    const validateField = (name: string, value: string | number) => {
        const newErrors = { ...errors };

        switch (name) {
            case "title":
                if (!value.toString().trim()) {
                    newErrors.title = "Title is required";
                } else {
                    delete newErrors.title;
                }
                break;

            case "genre":
                if (!value.toString().trim()) {
                    newErrors.genre = "Genre is required";
                } else if (/\d/.test(value.toString())) { // Check if value contains a number
                    newErrors.genre = "Genre should not contain numbers";
                } else {
                    delete newErrors.genre;
                }
                break;

            case "releaseDate":
                if (!value.toString().trim()) {
                    newErrors.releaseDate = "Release date is required";
                } else {
                    delete newErrors.releaseDate;
                }
                break;

            case "duration":
                if (Number(value) <= 0) {
                    newErrors.duration = "Duration must be a positive number";
                } else {
                    delete newErrors.duration;
                }
                break;

            case "director":
                if (!value.toString().trim()) {
                    newErrors.director = "Director is required";
                } else if (/\d/.test(value.toString())) { // Check if value contains a number
                    newErrors.director = "Director's name should not contain numbers";
                } else {
                    delete newErrors.director;
                }
                break;

            case "language":
                if (!value.toString().trim()) {
                    newErrors.language = "Language is required";
                } else if (/\d/.test(value.toString())) { // Check if value contains a number
                    newErrors.language = "Language should not contain numbers";
                } else {
                    delete newErrors.genre;
                }
                break;

            case "rating":
                if (Number(value) < 0 || Number(value) > 10) {
                    newErrors.rating = "Rating must be between 0 and 10";
                } else {
                    delete newErrors.rating;
                }
                break;

            case "posterImage":
                if (!value) {
                    newErrors.posterImage = "Poster image is required";
                } else {
                    delete newErrors.posterImage;
                }
                break;


        }

        setErrors(newErrors);
    };


    // const handleSubmit = async () => {
    //     const formData = new FormData();
    //     formData.append('title', movieData.title);
    //     formData.append('genre', movieData.genre);
    //     formData.append('releaseDate', movieData.releaseDate);
    //     formData.append('duration', movieData.duration.toString());
    //     formData.append('director', movieData.director);
    //     formData.append('synopsis', movieData.synopsis);
    //     formData.append('language', movieData.language);
    //     formData.append('rating', movieData.rating.toString());

    //     // Append poster image
    //     if (movieData.posterImage) {
    //         formData.append('posterImage', movieData.posterImage);
    //     }

    //     // Append cast members
    //     movieData.cast.forEach((castMember, index) => {
    //         formData.append(`cast[${index}][name]`, castMember.name);
    //         if (castMember.image) {
    //             formData.append(`cast[${index}][image]`, castMember.image);
    //         }
    //     });

    //     try{
    //         const result = await addMovieAPI(formData)
    //         console.log(result);

    //     }
    //     catch(err){
    //         console.log(err);
    //     }

    // }

    const handleSubmit = async () => {
        

        const formData = new FormData();
        formData.append('title', movieData.title);
        formData.append('genre', movieData.genre);
        formData.append('releaseDate', movieData.releaseDate);
        formData.append('duration', movieData.duration.toString());
        formData.append('director', movieData.director);
        formData.append('synopsis', movieData.synopsis);
        formData.append('language', movieData.language);
        formData.append('rating', movieData.rating.toString());

        // Append poster image if available
        if (movieData.posterImage) {
            formData.append('posterImage', movieData.posterImage);
        }

        // Append cast members
        // movieData.cast.forEach((castMember, index) => {
        //     formData.append(`cast[${index}][name]`, castMember.name);
        //     if (castMember.image) {
        //        formData.append(`castImage`, castMember.image);
        //     }
        // });
        movieData.cast.forEach((castMember, index) => {
            formData.append(`cast[${index}]`, castMember); // Append names as individual fields
        });

        try {
            const result = await addMovieAPI(formData);
            console.log(result);
            
            if(result.status==200){
                const details = result.data;
                alert(details.message)
                setMovieData({
                    title: "",
                    genre: "",
                    releaseDate: "",
                    duration: 0,
                    director: "",
                    cast: [""],
                    synopsis: "",
                    language: "",
                    rating: 0,
                    posterImage: null,
                }
                )
            }
            else{
                const details = result.response.data;
                alert(details.message)
                
            }

        } catch (err) {
            console.error(err);
        }
    };


    return (
        <div>
            <div className={styles.container}>
                <h2>Add Movie</h2>
                <label className={styles.fieldName} htmlFor="">Title</label>
                <InputField label='' type='text' name='title' value={movieData.title} onChange={handleInputChange} placeholder="Title" />
                {errors.title && <p className={styles.error}>{errors.title}</p>}

                <label className={styles.fieldName} htmlFor="">Genre</label>
                <InputField label='' type="text" name="genre" value={movieData.genre} onChange={handleInputChange} placeholder="Genre" />
                {errors.genre && <p className={styles.error}>{errors.genre}</p>}

                <label className={styles.fieldName} htmlFor="">Release Date</label>
                <InputField label='' type="date" name="releaseDate" value={movieData.releaseDate} onChange={handleInputChange} placeholder="Release Date" />
                {errors.releaseDate && <p className={styles.error}>{errors.releaseDate}</p>}

                <label className={styles.fieldName} htmlFor="">Duration</label>
                <InputField label='' type="number" name="duration" value={movieData.duration} onChange={handleInputChange} placeholder="Duration (minutes)" />
                {errors.duration && <p className={styles.error}>{errors.duration}</p>}

                <label className={styles.fieldName} htmlFor="">Director</label>
                <InputField label='' type="text" name="director" value={movieData.director} onChange={handleInputChange} placeholder="Director" />
                {errors.director && <p className={styles.error}>{errors.director}</p>}

                <label className={styles.fieldName} htmlFor="">Cast</label>
                {/* <div className={styles.cast}>
                    {movieData.cast.map((castMember, index) => (
                        <div key={index} className={styles.castMember}>
                            <InputField
                                label=''
                                name='cast name'
                                type="text"
                                value={castMember.name}
                                onChange={(e) => handleCastChange(index, "name", e.target.value)}
                                placeholder="Cast Member Name"
                            />
                            <InputField
                                label=''
                                name='cast image'
                                value=''
                                type="file"
                                onChange={(e) => {
                                    const file = e.target.files ? e.target.files[0] : null;
                                    handleCastChange(index, "image", file);
                                }}
                                placeholder="Upload Cast Image"
                            />
                        </div>
                    ))}
                    <Button label="Add Cast Member" onClick={addCastMember} />
                </div> */}
                <label className={styles.fieldName} htmlFor="">Cast</label>
                <div className={styles.cast}>
                    {movieData.cast.map((castMember, index) => (
                        <div key={index} className={styles.castMember}>
                            <InputField
                                label=''
                                name={`cast-${index}`}
                                type="text"
                                value={castMember}// Use the string directly
                                onChange={(e) => handleCastChange(index, e.target.value)}
                                placeholder="Cast Member Name"
                            />
                        </div>
                    ))}
                    <Button label="Add Cast Member" onClick={addCastMember} />
                </div>


                <label className={styles.fieldName} htmlFor="">Synopsis</label>
                <Textarea
                    label=""
                    name="synopsis"
                    value={movieData.synopsis}
                    onChange={handleInputChange}
                    placeholder="Enter the synopsis"
                />

                <label className={styles.fieldName} htmlFor="">Language</label>
                <InputField label='' type="text" name="language" value={movieData.language} onChange={handleInputChange} placeholder="Language" />
                {errors.language && <p className={styles.error}>{errors.language}</p>}

                <label className={styles.fieldName} htmlFor="">Rating</label>
                <InputField label='' type="number" name="rating" value={movieData.rating} onChange={handleInputChange} placeholder="Rating (0-10)" />
                {errors.rating && <p className={styles.error}>{errors.rating}</p>}

                <label className={styles.fieldName} htmlFor="">Poster </label>
                <InputField label=''
                    value=''
                    type="file"
                    name="posterImage"
                    onChange={e => {
                        if (e.target.files && e.target.files.length > 0) {
                            const file = e.target.files[0];
                            setMovieData({
                                ...movieData,
                                posterImage: file // Store the actual file object
                            });
                        }
                    }}
                />
                {errors.posterImage && <p className={styles.error}>{errors.posterImage}</p>}

                <Button label='Add Movie' onClick={() => handleSubmit()} />


            </div>
        </div>
    )
}

export default Movie