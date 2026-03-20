import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BookStore } from '../shared/book-store';

@Component({
  selector: 'app-liked-books-page',
  imports: [RouterLink],
  templateUrl: './liked-books-page.html',
})
export class LikedBooksPage {
  protected readonly store = inject(BookStore);
}
