import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Book } from './book';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookStore {
  #http = inject(HttpClient);
  #apiUrl = 'https://api.angular.schule';

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
