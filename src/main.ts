import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

//standardna funkcija koja generiše celu angular aplikaciju
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
