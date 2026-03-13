import { Component, inject, input, signal } from '@angular/core';
import { Book } from '../shared/book';
import { BookCard } from '../book-card/book-card';
import { BookRatingHelper } from '../shared/book-rating-helper';
import { BookStore } from '../shared/book-store';

@Component({
  selector: 'app-dashboard-page',
  imports: [BookCard],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
})
export class DashboardPage {
  // protected readonly books = signal<Book[]>([]);

  #ratingHelper = inject(BookRatingHelper);
  #store = inject(BookStore);

  protected readonly booksResource = this.#store.getAllResource();

  constructor() {
    /*this.#store.getAll().subscribe(receivedBooks => {
      this.books.set(receivedBooks);
    });*/
  }

  reloadList() {
    this.booksResource.reload();
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
    
    this.booksResource.value.update(currentList => {
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
