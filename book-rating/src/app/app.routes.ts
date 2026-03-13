import { Routes } from '@angular/router';
import { booksRoutes } from './books/books.routes';
import { NotFoundPage } from './not-found-page/not-found-page';

export const routes: Routes = [
    // bei Weiterleitung vom leeren Pfad (fast) immer pathMatch:full notwendig
    { path: '', redirectTo: 'books', pathMatch: 'full' },
    ...booksRoutes,
    // Wildcard-Route: muss immer unten stehen
    { path: '**', component: NotFoundPage },
];

/*
TODO:
- Default-Route: Weiterleitung
- Fehlerseite
- Links setzen
    - BookCard => Detailseite
    - Detailseite => Dashboard
- Detailseite
*/