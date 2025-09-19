import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MovieModel } from '../../models/movie.model';
import { NgFor, NgIf } from '@angular/common';
import { MovieService } from '../../services/movie.service';
import { MatButtonModule } from '@angular/material/button';
import { UtilsService } from '../../services/utils.service';
import { LoadingComponent } from "../loading/loading.component";
import { RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-search',
  imports: [
    MatTableModule,
    NgIf,
    NgFor,
    MatButtonModule,
    LoadingComponent,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatCardModule,
    MatSelectModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  displayedColumns: string[] = ['movieId', 'title', 'startDate', 'shortDescription', 'movieGenres'];
  allData: MovieModel[] | null = null;
  genreList: string[] = [];
  selectedGenre: string | null = 'Svi žanrovi';
  dataSource: MovieModel[] | null = null;
  titleList: string[] = ['Svi naslovi'];
  selectedTitle: string | null = 'Svi naslovi';
  userInput: string = '';
  dateList: string[] = ['Svi datumi'];
  selectedDate: string | null = 'Svi datumi';

  public constructor(public utils: UtilsService) {
    MovieService.getMovies()
      .then(rsp => {
        this.allData = rsp.data
        this.dataSource = rsp.data
        this.generateSearchCriteria(rsp.data)
      })
  }

  public generateSearchCriteria(source: MovieModel[]) {

    const uniqueGenres = source
      .flatMap(movie => movie.movieGenres)
      .map(movieGenre => movieGenre.genre.name)
      .filter((genre, index, array) => array.indexOf(genre) === index);
    this.genreList = ['Svi žanrovi'].concat(uniqueGenres);
    this.selectedGenre = 'Svi žanrovi';


    const uniqueTitles = source
      .map(obj => obj.title)
      .filter((title, index, array) => array.indexOf(title) === index);
    this.titleList = ['Svi naslovi'].concat(uniqueTitles);
    this.selectedTitle = 'Svi naslovi';


    const uniqueDates = source
      .map(obj => obj.startDate)
      .filter((date, index, array) => array.indexOf(date) === index);
    this.dateList = ['Svi datumi'].concat(uniqueDates);
    this.selectedDate = 'Svi datumi';
  }

  public doReset() {
    this.userInput = '';
    this.selectedGenre = 'Svi žanrovi';
    this.selectedTitle = 'Svi naslovi';
    this.selectedDate = 'Svi datumi';
    this.dataSource = this.allData;
    this.generateSearchCriteria(this.allData!);
  }

  public doFilterChain() {
    if (this.allData == null) return;

    this.dataSource = this.allData!

      .filter(obj => {
        if (this.selectedGenre == null || this.selectedGenre === 'Svi žanrovi') return true;
        return obj.movieGenres.some(mg => mg.genre.name === this.selectedGenre);
      })
      .filter(obj => {
        if (this.selectedTitle == null || this.selectedTitle === 'Svi naslovi') return true;
        return obj.title === this.selectedTitle;
      })
      .filter(obj => {
        if (this.userInput === '') return true;

        const inputLower = this.userInput.toLowerCase();
        return obj.title.toLowerCase().includes(inputLower) ||
          obj.description.toLowerCase().includes(inputLower) ||
          obj.shortDescription.toLowerCase().includes(inputLower);
      })
      .filter(obj => {
        if (this.selectedDate == null || this.selectedDate === 'Svi datumi') return true;
        return obj.startDate === this.selectedDate;
      });

  }

  public formatGenres(movie: any): string {
    if (!movie || !movie.movieGenres || movie.movieGenres.length === 0) {
      return 'Nema žanra';
    }
    return movie.movieGenres.map((mg: any) => mg.genre.name).join(', ');
  }

}
