import { Routes } from '@angular/router';
// import { booksRoutes } from './books/books.routes';
import { NotFoundPage } from './not-found-page/not-found-page';
// import { HomePage } from './home-page/home-page';

export const routes: Routes = [
    // bei Weiterleitung vom leeren Pfad (fast) immer pathMatch:full notwendig
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    // { path: 'home', component: HomePage },
    { path: 'home', loadComponent: () => import('./home-page/home-page').then(m => m.HomePage) },
    // ...booksRoutes,
    {
        path: 'books',
        loadChildren: () => import('./books/books.routes').then(m => m.booksRoutes)
    },
    // Wildcard-Route: muss immer unten stehen
    { path: '**', component: NotFoundPage },
];