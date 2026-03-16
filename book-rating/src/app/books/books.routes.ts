import { Routes } from "@angular/router";
import { DashboardPage } from "./dashboard-page/dashboard-page";
import { BookDetailsPage } from "./book-details-page/book-details-page";
import { BookSearchPage } from "./book-search-page/book-search-page";
import { BookCreatePage } from "./book-create-page/book-create-page";
import { BooksEntryPage } from "./books-entry-page/books-entry-page";

export const booksRoutes: Routes = [
    {
        path: '',
        component: BooksEntryPage,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardPage },
            { path: 'search', component: BookSearchPage },
            { path: 'create', component: BookCreatePage },
            { path: ':isbn', component: BookDetailsPage }
        ]
    }
];