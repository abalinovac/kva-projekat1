import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieModel } from '../../models/movie.model';
import { CinemaService } from '../../services/cinema.service';
import { NgIf } from '@angular/common';
import { UtilsService } from '../utils-service';
import { Loading } from "../loading/loading";
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { SafePipe } from '../safe-pipe';

@Component({
  selector: 'app-details',
  imports: [NgIf, Loading, MatCardModule, MatListModule, MatButtonModule, SafePipe  ],
  templateUrl: './details.html',
  styleUrl: './details.css'
})
export class Details {

  public flight: MovieModel | null = null

  public constructor(private route: ActivatedRoute, public utils: UtilsService){
    route.params.subscribe(params=>{
      CinemaService.getMoviesById(params['id']).then(rsp=>{
        this.flight = rsp.data
      })
    })
  }

  public generateMapLink(){
    return `https://www.google.com/maps?output=embed&q=${this.flight?.destination}`
  }
}
