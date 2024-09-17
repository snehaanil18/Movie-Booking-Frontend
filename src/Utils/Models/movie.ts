export interface CastMember {
    name: string;
    image: File | null; // Image of the cast member
}

export interface MovieData {
    title: string;
    genre: string;
    releaseDate: string;
    duration: number;
    director: string;
    cast: string[]; 
    synopsis: string;
    language: string;
    rating: number;
    posterImage: File | null; // `File` for the poster image, or `null` if not uploaded
}

export interface CastMemberResponse {
  _id: string;
  name: string;
  image: string;
}
  
export interface MovieResponse {
  _id: string;
  title: string;
  genre: string;
  releaseDate: string; // Use ISO string format for date
  duration: number;
  director: string;
  cast: string[]; // Array of cast members
  synopsis: string;
  language: string;
  posterImage: string;
}