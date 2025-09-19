import { CinemaModel } from "./cinema.model"

export interface OrderModel {
    id: number
    movieId: number
    title: string
    shortDescription: string; 
    runTime: number
    name: CinemaModel
    count: number
    pricePerItem: number
    status: 'ordered' | 'paid' | 'canceled',
    rating: null | boolean
}