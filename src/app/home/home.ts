import { Component } from '@angular/core';
import { CinemaService } from '../../services/cinema.service';
import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { AxiosError } from 'axios';
import { MovieModel } from '../../models/movie.model';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { UtilsService } from '../utils-service';
import { Loading } from "../loading/loading";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [NgIf, NgFor, MatButtonModule, MatCardModule, Loading, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  public movies: MovieModel[] | null = null
  public error: string | null = null


  constructor(public utils: UtilsService){
    CinemaService.getMovies(0,  3)
    .then (rsp => this.movies = rsp.data.content)
    .catch((e: AxiosError) => this.error = `${e.code}: ${e.message}`)
  }
}
