import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { MatSelectModule } from '@angular/material/select';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-signup',
  imports: [MatCardModule,RouterLink, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatSelectModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  public destinationList: string[] = []
  public email = ''
  public password = ''
  public repeatPassword = ''
  public firstName = ''
  public lastName = ''
  public phone = ''
  public address = ''
  public destination = ''

  public constructor(private router: Router) {
    MovieService.getMovies()
      .then(rsp => this.destinationList = rsp.data)
  }

  public doSignup() {
    if (this.email == '' || this.password == '') {
      alert('Email i lozinka su obavezna polja')
      return
    }

    if (this.password !== this.repeatPassword) {
      alert('Lozinka se ne uklapa')
      return
    }

    const result = UserService.createUser({
      email: this.email,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
      phone: this.phone,
      address: this.address,
      orders: []
    })

    result ? this.router.navigate(['/login']) : alert('Email je već zauzet')
  }
}
