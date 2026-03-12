import { Component, inject, signal } from '@angular/core';
import { Book } from '../shared/book';
import { BookCard } from '../book-card/book-card';
import { BookRatingHelper } from '../shared/book-rating-helper';

@Component({
  selector: 'app-dashboard-page',
  imports: [BookCard],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
})
export class DashboardPage {
  protected readonly books = signal<Book[]>([]);
  
  #ratingHelper = inject(BookRatingHelper);

  constructor() {
    this.books.set([
      {
        isbn: '123',
        title: 'Angular',
        description: 'Grundlagen und mehr',
        price: 42.9,
        rating: 5,
        authors: ['FM', 'DK', 'JH'],
      },
      {
        isbn: '456',
        title: 'Vue.js',
        description: 'Das grüne Framework',
        price: 46.9,
        rating: 3,
        authors: ['FD'],
      },
    ]);
  }

  doRateUp(book: Book) {
    const ratedBook = this.#ratingHelper.rateUp(book);
    this.#updateList(ratedBook);
  }
  
  doRateDown(book: Book) {
    const ratedBook = this.#ratingHelper.rateDown(book);
    this.#updateList(ratedBook);
  }

  #updateList(ratedBook: Book) {
    // Buchliste neu erzeugen, dabei Buch austauschen
    // [1,2,3,4,5].map(e => e * 10) // [10, 20, 30, 40, 50]
    // [7, 4, 8, 6, 7, 2, 4].filter(e => e < 5) // [4, 2, 4]
    
    this.books.update(currentList => {
      return currentList.map(b => {
        if (ratedBook.isbn === b.isbn) {
          return ratedBook;
        } else {
          return b;
        }
      })
    });
  }
}
