import { Component, input, output } from '@angular/core';
import { Book } from '../shared/book';
import { RatingDisplay } from '../rating-display/rating-display';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-book-card',
  imports: [RatingDisplay, CurrencyPipe],
  templateUrl: './book-card.html',
  styleUrl: './book-card.scss',
})
export class BookCard {
  // Input: hier fließen Daten von der Elternkomponente hinein
  // von oben nach unten
  readonly book = input.required<Book>();
  readonly minRating = input(0);
  readonly maxRating = input(10);

  // Output: hier fließen Daten zur Elternkomponente hinaus
  // von unten nach oben
  readonly rateUp = output<Book>();
  readonly rateDown = output<Book>();

  doRateUp() {
    this.rateUp.emit(this.book());
  }
  
  doRateDown() {
    this.rateDown.emit(this.book());
  }
}
