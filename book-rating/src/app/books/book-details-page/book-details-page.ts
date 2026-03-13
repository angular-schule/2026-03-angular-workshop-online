import { Component, inject, input } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-book-details-page',
  imports: [RouterLink],
  templateUrl: './book-details-page.html',
  styleUrl: './book-details-page.scss',
})
export class BookDetailsPage {
  #route = inject(ActivatedRoute);

  readonly isbn = input.required<string>();
  
  constructor() {
    // PULL
    // const isbn = this.#route.snapshot.paramMap.get('isbn'); // path: 'books/:isbn'
    // console.log(isbn);

    // PUSH
    /*this.#route.paramMap.subscribe(params => {
      const isbn = params.get('isbn');
      console.log(isbn);
    });*/
  }
}


/* TODO
- ISBN auslesen
- Buch per HTTP
- Buch anzeigen

*/