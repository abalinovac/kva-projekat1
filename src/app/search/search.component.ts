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
    RouterLink,
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
  displayedColumns: string[] = ['id', 'destination', 'flightNumber', 'scheduledAt', 'actions'];
  allData: MovieModel[] | null = null
  destinationList: string[] = []
  selectedDestination: string | null = null
  dataSource: MovieModel[] | null = null
  flightNumberList: string[] = []
  selectedFlightNumber: string | null = null
  userInput: string = ''
  dateOptions: string[] = []
  selectedDate: string | null = null

  public constructor(public utils: UtilsService) {
    MovieService.getMovieList()
      .then(rsp => {
        this.allData = rsp.data
        this.dataSource = rsp.data
        this.generateSearchCriteria(rsp.data)
      })
  }

  public generateSearchCriteria(source: MovieModel[]) {
    this.destinationList = source.map(obj => obj.poster)
      .filter((dest: string, i: number, ar: any[]) => ar.indexOf(dest) === i)
    this.flightNumberList = source.map(obj => obj.description)
      .filter((num: string, i: number, ar: any[]) => ar.indexOf(num) === i)

  }

  public doReset() {
    this.userInput = ''
    this.selectedDestination = null
    this.selectedFlightNumber = null
    this.selectedDate = null
    this.dataSource = this.allData
    this.generateSearchCriteria(this.allData!)
  }

  public doFilterChain() {
    if (this.allData == null) return

    this.dataSource = this.allData!
      .filter(obj => {
        // Input Field Search
        if (this.userInput == '') return true
        return obj.title.toLowerCase().includes(this.userInput) ||
          obj.title.toString().includes(this.userInput) ||
          obj.description.includes(this.userInput)
      })
      .filter(obj => {
        // Destintination Search
        if (this.selectedDestination == null) return true
        return obj.createdAt === this.selectedDestination
      })
      .filter(obj => {
        // Flight Number Search
        if (this.selectedFlightNumber == null) return true
        return obj.description === this.selectedFlightNumber      //promeniti
      })
      .filter(obj => {
        // Date Search
        if (this.selectedDate == null) return true
        const start = new Date(`${this.selectedDate}T00:00:01`)
        const end = new Date(`${this.selectedDate}T23:59:59`)
        const scheduled = new Date(obj.createdAt)

        return (start <= scheduled) && (scheduled <= end)
      })

    this.generateSearchCriteria(this.dataSource)
  }
}
