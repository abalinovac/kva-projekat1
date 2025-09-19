import { CinemaModel } from "./cinema.model"

export interface OrderModel {
    id: number
    movieId: number
    title: string
    shortDescription: string
    name: CinemaModel
    count: number
    pricePerItem: number
    status: 'ordered' | 'paid' | 'canceled',
    rating: null | boolean
}