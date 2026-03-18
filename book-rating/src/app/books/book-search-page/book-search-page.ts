import { Component, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { form, FormField } from '@angular/forms/signals';
import { debounceTime, distinctUntilChanged, filter, map, of, switchMap } from 'rxjs';
import { BookStore } from '../shared/book-store';

@Component({
  selector: 'app-book-search-page',
  imports: [FormField],
  templateUrl: './book-search-page.html',
  styleUrl: './book-search-page.scss',
})
export class BookSearchPage {
  #store = inject(BookStore);

  protected readonly searchTerm = signal('');
  protected readonly searchForm = form(this.searchTerm);

  protected readonly results = toSignal(toObservable(this.searchTerm).pipe(
    debounceTime(500),
    // filter(term => term.length >= 3),
    distinctUntilChanged(),
    switchMap(term => {
      if (term.length >= 3) {
        return this.#store.search(term)
      } else {
        return of([]);
      }
    })
  ), { initialValue: [] })
}
