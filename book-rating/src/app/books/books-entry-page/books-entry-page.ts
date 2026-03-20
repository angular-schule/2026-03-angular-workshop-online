import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { BookStore } from '../shared/book-store';

@Component({
  selector: 'app-books-entry-page',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './books-entry-page.html',
  styleUrl: './books-entry-page.scss',
})
export class BooksEntryPage {
  protected readonly store = inject(BookStore);
}
