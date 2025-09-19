import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieModel } from '../../models/movie.model';
import { MovieService } from '../../services/movie.service';
import { UtilsService } from '../../services/utils.service';
import { MatCardModule } from '@angular/material/card';
import { NgFor, NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CinemaModel } from '../../models/cinema.model';
import { CinemaService } from '../../services/cinema.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order',
  imports: [MatCardModule, NgIf, NgFor, MatInputModule, MatButtonModule, MatSelectModule, MatFormFieldModule, FormsModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {
  public movie: MovieModel | null = null
  public cinemas: CinemaModel[] = CinemaService.getCinemas()
  public selectedCinema: number = this.cinemas[0].id
  public selectedTicketCount: number = 1
  public selectedPrice: number = 150

  public constructor(private route: ActivatedRoute, public utils: UtilsService, private router: Router) {
    this.route.params.subscribe(params => {
      MovieService.getMovieById(params['movieId'])
        .then(rsp => {
          this.movie = rsp.data
        })
    })
  }

  public doOrder() {
    Swal.fire({
      title: `Kreiraj rezervaciju za film: ${this.movie?.title}?`, 
      text: "Rezervacija se može otkazati u svakom momentu sa Vašeg profila!",
      icon: "warning",
      showCancelButton: true,
      customClass: {
        popup: 'bg-dark'
      },
      confirmButtonColor: "#52d25bff",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sačuvaj rezervaciju!"
    }).then((result) => {
      if (result.isConfirmed) {
        const orderCreationResult = UserService.createOrder({
          id: new Date().getTime(),
          movieId: this.movie!.movieId, 
          title: this.movie!.title,
          shortDescription: this.movie!.shortDescription,
          runTime: this.movie!.runTime,
          name: CinemaService.getCinemaById(this.selectedCinema)!, 
          count: this.selectedTicketCount,
          pricePerItem: this.selectedPrice,
          status: 'ordered',
          rating: null
        })
        
        orderCreationResult ? this.router.navigate(['/user']) :
          Swal.fire({
            title: "Kreiranje rezervacije nije uspelo!", 
            text: "Kako biste uspešno rezervisali kartu, potrebno je da se registrujete ",
            icon: "error"
          });
      }
    })
  }

  public getGenres(movie: MovieModel): string {
    if (!movie || !movie.movieGenres || movie.movieGenres.length === 0) {
      return 'Nema podataka o žanru';
    }
    return movie.movieGenres.map(mg => mg.genre.name).join(', ');
  }
}