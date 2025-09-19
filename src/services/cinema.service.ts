import { CinemaModel } from "../models/cinema.model";

export class CinemaService {
    static getCinemas(): CinemaModel[] {
        return [
            {
                id: 1,
                name: 'Cineplexx - TC Ušće',
                city: 'Beograd',
                website: 'https://www.cineplexx.rs/info/price-list/CINEPLEXX-USCE-SHOPPING-CENTER'
            },
            {
                id: 2,
                name: 'CineStar 4DX Ada Mall',
                city: 'Beograd',
                website: 'https://cinestarcinemas.rs/beograd-ada-mall'
            },
            {
                id: 3,
                name: 'Kinoteka',
                city: 'Beograd',
                website: 'https://www.kinoteka.org.rs/jugoslovenska-kinoteka-kosovska-11/'
            },
            {
                id: 4,
                name: 'Roda Sinepleks',
                city: 'Beograd',
                website: 'http://www.rodacineplex.com/repertoar'
            }
        ]
    }

    static getCinemaById(id: number) {
        return this.getCinemas().find(cinema => cinema.id === id)
    }
}