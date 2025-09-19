import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MovieModel } from '../../models/movie.model';
import { MovieService } from '../../services/movie.service';
import { CommonModule } from '@angular/common';
import { UtilsService } from '../../services/utils.service';
import { LoadingComponent } from "../loading/loading.component";
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { Observable, switchMap, map } from 'rxjs';



@Component({
    selector: 'app-details',
    imports: [CommonModule, LoadingComponent, MatCardModule, MatListModule, MatButtonModule, RouterLink],
    templateUrl: './details.component.html',
    styleUrl: './details.component.css'
})
export class DetailsComponent {

    public movies$: Observable<MovieModel>;

    public constructor(private route: ActivatedRoute, public utils: UtilsService) {
        this.movies$ = this.route.params.pipe(
            switchMap(params => {
                return MovieService.getMovieById(params['movieId'])
            }),
            map(rsp => rsp.data as MovieModel)
        );
    }

    public getGenres(movie: MovieModel): string {
        if (!movie || !movie.movieGenres || movie.movieGenres.length === 0) {
            return 'Nema podataka o žanru';
        }
        return movie.movieGenres.map(mg => mg.genre.name).join(', ');
    }


    public getActors(movie: MovieModel): string {
        if (!movie || !movie.movieActors || movie.movieActors.length === 0) {
            return 'Nema podataka o glumcima';
        }
        return movie.movieActors.map(ma => ma.actor.name).join(', ');
    }

    public getMoviePoster(movie: any): string {
        return movie.poster;
    }

}
