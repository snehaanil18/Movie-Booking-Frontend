import { TheaterData } from "./theater";

export interface Show {
    showId: string;
    movie: string;
    theater: TheaterData;
    timing: string;
}

export interface ShowDetails {
    _id: string;
    theater: TheaterData;
    movie: string;
    timing: string;
    price: number;
    showId: string;
    bookedSeats: number[];
    __v: number;
  }