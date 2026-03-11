import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardPage } from './books/dashboard-page/dashboard-page';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DashboardPage],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Book Rating');
}



/* TODO
- Datenmodell
- (Bücher laden)
- Daten (heute per Hand definiert)
- Komponente für die "Seite": DashboardPage
- Signal mit Array von Büchern
- Komponente für einzelnes Buch: BookCard

*/