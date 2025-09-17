import { Component } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { NgFor, NgIf } from '@angular/common';
import { AxiosError } from 'axios';
import { MovieGenre, MovieModel } from '../../models/movie.model';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { UtilsService } from '../../services/utils.service';
import { LoadingComponent } from "../loading/loading.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [NgIf, NgFor, MatButtonModule, MatCardModule, LoadingComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  public movies: MovieModel[] | null = null
  public error: string | null = null

  constructor(public utils: UtilsService) {
    MovieService.getMovies()
      .then(rsp => this.movies = rsp.data)
      .catch((e: AxiosError) => this.error = `${e.code}: ${e.message}`)
  }

  public getMoviePoster(movie: any): string { 
    return movie.poster; 
  }

  public getActors(movie: any): string {
    // Provera da li niz postoji i da li ima elemenata
    if (!movie || !movie.movieActors || movie.movieActors.length === 0) {
        return 'Nema podataka o glumcima';
    }
    
    // Ključno: Mapiranje do imena glumca i spajanje u string
    return movie.movieActors.map((ma: any) => ma.actor.name).join(', ');
}

}
