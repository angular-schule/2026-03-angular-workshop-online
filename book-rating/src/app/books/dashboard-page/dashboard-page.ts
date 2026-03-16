import { Component, DestroyRef, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';

import { Book } from '../shared/book';
import { BookCard } from '../book-card/book-card';
import { BookRatingHelper } from '../shared/book-rating-helper';
import { BookStore } from '../shared/book-store';

@Component({
  selector: 'app-dashboard-page',
  imports: [BookCard, DatePipe],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
})
export class DashboardPage {
  // protected readonly books = signal<Book[]>([]);

  #ratingHelper = inject(BookRatingHelper);
  #store = inject(BookStore);
  #destroyRef = inject(DestroyRef);

  protected readonly booksResource = this.#store.getAllResource();
  protected readonly currentDate = signal(Date.now());

  constructor() {
    /*this.#store.getAll().subscribe(receivedBooks => {
      this.books.set(receivedBooks);
    });*/

    // Intervall für Datumsaktualisierung
    const dateInterval = setInterval(() => {
      this.currentDate.set(Date.now());
    }, 1000);

    // Callback wird ausgeführt, wenn Komponente zerstört wird.
    // Das ist die moderne Alternative zu `ngOnDestroy()`.
    this.#destroyRef.onDestroy(() => clearInterval(dateInterval));
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

  doDeleteBook(book: Book): void {
    if (!confirm(`Buch "${book.title}" wirklich löschen?`)) {
      return;
    }

    this.#store.delete(book.isbn).subscribe(() => {
      this.booksResource.value.update(oldList => oldList.filter(b => b.isbn !== book.isbn));
      // ODER: this.booksResource.reload();
    });
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
