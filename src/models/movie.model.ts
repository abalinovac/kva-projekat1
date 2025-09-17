export interface Director {
    directorId: number;
    name: string;
    createdAt: string; // Ili Date, ako ga parsujete
}

export interface Actor {
    actorId: number;
    name: string;
    createdAt: string;
}

export interface MovieActor {
    movieActorId: number;
    movieId: number;
    actorId: number;
    actor: Actor;
}

export interface Genre {
    genreId: number;
    name: string;
    createdAt: string;
}

export interface MovieGenre {
    movieGenreId: number;
    movieId: number;
    genreId: number;
    genre: Genre;
}

// --- Glavni Interfejs za Film (MovieModel) ---

export interface MovieModel {
    movieId: number;
    internalId: string;
    corporateId: string;
    directorId: number;
    title: string;
    originalTitle: string;
    description: string;
    shortDescription: string;

    
    // **VAŽNO:** Sada znamo da je 'poster' pun URL!
    poster: string; 
    
    startDate: string; // Ili Date
    shortUrl: string;
    runTime: number;
    active: boolean;
    createdAt: string; // Ili Date
    updatedAt: string | null; // Može biti null

    director: Director;
    movieActors: MovieActor[];
    movieGenres: MovieGenre[];
}