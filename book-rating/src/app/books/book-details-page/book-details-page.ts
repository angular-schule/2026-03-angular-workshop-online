import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BookStore } from '../shared/book-store';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-book-details-page',
  imports: [RouterLink, JsonPipe],
  templateUrl: './book-details-page.html',
  styleUrl: './book-details-page.scss',
})
export class BookDetailsPage {
  readonly isbn = input.required<string>();
  protected readonly book = inject(BookStore).getSingleResource(this.isbn);

  #store = inject(BookStore);

  protected readonly book2 = toSignal(toObservable(this.isbn).pipe(
    switchMap(isbn => this.#store.getSingle(isbn))
  ));
}
