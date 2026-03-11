import { Component, signal } from '@angular/core';
import { Book } from '../shared/book';
import { BookCard } from "../book-card/book-card";

@Component({
  selector: 'app-dashboard-page',
  imports: [BookCard],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
})
export class DashboardPage {
  protected readonly books = signal<Book[]>([]);

  constructor() {
    this.books.set([
      {
        isbn: '123',
        title: 'Angular',
        description: 'Grundlagen und mehr',
        price: 42.9,
        rating: 5,
        authors: ['FM', 'DK', 'JH']
      },
      {
        isbn: '456',
        title: 'Vue.js',
        description: 'Das grüne Framework',
        price: 46.9,
        rating: 3,
        authors: ['FD']
      }
    ])
  }
}
