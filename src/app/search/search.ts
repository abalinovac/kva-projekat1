import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { MovieModel } from '../../models/movie.model';
import { NgIf } from '@angular/common';
import { CinemaService } from '../../services/cinema.service';
import { MatButtonModule } from '@angular/material/button';
import { UtilsService } from '../utils-service';
import { Loading } from "../loading/loading";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-search',
  imports: [MatTableModule, NgIf, MatButtonModule, Loading, RouterLink],
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class Search {
  displayedColumns: string[] = ['id', 'destination', 'flightNumber', 'scheduledAt', 'actions'];
  dataSource: MovieModel[] | null = null

  public constructor(public utils: UtilsService){
    CinemaService.getMovies(0,8).then(rsp=>this.dataSource = rsp.data.content)
  }
}
