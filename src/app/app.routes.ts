import { Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';
import { Search } from './search/search';
import { Airline } from './airline/airline';
import { Details } from './details/details';
import { Login } from './login/login';

export const routes: Routes = [
    {path: '', component: Home},
    {path: 'about', component: About},
    {path: 'search', component: Search},
    {path: 'airline', component: Airline},
    {path: 'details/:id', component: Details},
    {path: 'login', component: Login},
    {path: '**', redirectTo: ''}
];
