import axios from 'axios';

const client = axios.create({
    baseURL: 'https://movie.pequla.com/api/movie?director=&actor=&search=&genre=',
    headers: {
        'Accept': 'application/json',
        'X-Client-Name': 'KVA/2025'
    },
    validateStatus: (status: number) => {
        return status === 200
        // Samo ako je 200 vrati response
        // U ostalim slucajevima baci izuzetak
    }
})

export class MovieService {
    static async getMovies(page: number = 0, size: number = 10) {
        return client.request({
            url: '/movie',
            method: 'GET',
            params: {
                'page': page,
                'size': size,
                'sort': 'id',          //stavila id umesto sceduledAt
            }
        })
    }

    static async getMovieList() {
        return client.request({
            url: '/movie/list',
            method: 'GET',
            params: {
                'type': 'departure'
            }
        })
    }

    static async getMovieById(id: number) {
        return client.get(`/movie/${id}`)
    }

    static async getDescription() {
        return client.get('/movie/description')       //izmeniti url
    }
}