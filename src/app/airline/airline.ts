import { Component } from '@angular/core';
import { AirLineModel } from '../../models/airline.model';
import { AirlineService } from '../search/airline.services';
import { NgIf } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-airline',
  imports: [MatTableModule, NgIf, MatButtonModule],
  templateUrl: './airline.html',
  styleUrl: './airline.css'
})
export class Airline {
  displayedColumns: string[] = ['id', 'name', 'countryOfOrigin', 'website', 'actions'];
  dataSource: AirLineModel[] = AirlineService.getAirlines()
}
