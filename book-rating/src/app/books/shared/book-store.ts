import { HttpClient, httpResource } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { Book } from './book';
import { Observable } from 'rxjs';

const LIKED_BOOKS_KEY = 'liked-books';

@Injectable({
  providedIn: 'root',
})
export class BookStore {
  #http = inject(HttpClient);
  #apiUrl = 'https://api.angular.schule';

  readonly likedBooks = signal<Book[]>(this.#loadLikedBooks());
  readonly likedBooksCount = computed(() => this.likedBooks().length);

  constructor() {
    effect(() => {
      localStorage.setItem(LIKED_BOOKS_KEY, JSON.stringify(this.likedBooks()));
    });
  }

  #loadLikedBooks(): Book[] {
    const raw = localStorage.getItem(LIKED_BOOKS_KEY);
    return raw ? JSON.parse(raw) : [];
  }

  addLikedBook(book: Book) {
    if (this.likedBooks().some(b => b.isbn === book.isbn)) {
      return;
    }
    this.likedBooks.update(books => [...books, book]);
  }

  clearLikedBooks() {
    this.likedBooks.set([]);
  }

  getAll(): Observable<Book[]> {
    return this.#http.get<Book[]>(`${this.#apiUrl}/books`);
  }

  getAllResource() {
    return httpResource<Book[]>(
      () => `${this.#apiUrl}/books`,
      { defaultValue: [] }
    );
  }
  
  getSingle(isbn: string): Observable<Book> {
    return this.#http.get<Book>(`${this.#apiUrl}/books/${isbn}`);
  }

  getSingleResource(isbn: () => string) {
    return httpResource<Book>(
      () => `${this.#apiUrl}/books/${isbn()}`
    )
  }

  create(book: Book): Observable<Book> {
    return this.#http.post<Book>(`${this.#apiUrl}/books`, book);
  }

  search(term: string): Observable<Book[]> {
    return this.#http.get<Book[]>(`${this.#apiUrl}/books/search/${term}`);
  }

  delete(isbn: string): Observable<unknown> {
    return this.#http.delete<unknown>(`${this.#apiUrl}/books/${isbn}`);
  }
}
