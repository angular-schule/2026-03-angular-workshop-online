import { Component, inject, signal } from '@angular/core';
import { Book } from '../shared/book';
import { apply, applyEach, applyWhen, form, FormField, FormRoot, max, maxLength, min, minLength, provideSignalFormsConfig, required, schema, validate } from '@angular/forms/signals';
import { JsonPipe } from '@angular/common';
import { BookStore } from '../shared/book-store';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';

export const isbnSchema = schema<string>(path => {
  required(path);
  minLength(path, 10);
  maxLength(path, 13);
});


@Component({
  selector: 'app-book-create-page',
  imports: [FormField, FormRoot, JsonPipe],
  templateUrl: './book-create-page.html',
  styleUrl: './book-create-page.scss',
  providers: [
    provideSignalFormsConfig({
      classes: {
        invalid: formField => formField.state().invalid() && formField.state().touched()
      }
    })
  ]
})
export class BookCreatePage {
  #store = inject(BookStore);
  #router = inject(Router);

  // Datenmodell
  protected readonly bookData = signal<Book>({
    isbn: '',
    title: '',
    description: '',
    rating: 1,
    price: 0,
    authors: ['', '', '']
  });

  // Formularmodell (FieldTree)
  protected readonly bookForm = form(
    this.bookData,
    path => {
      required(path.isbn, { message: 'ISBN ist erforderlich.' });
      minLength(path.isbn, 10, { message: 'Die ISBN muss min. 10 Zeichen lang sein.' });
      maxLength(path.isbn, 13, { message: 'Die ISBN darf max. 13 Zeichen lang sein.' });

      required(path.title, { message: 'Titel ist erforderlich.' });
      required(path.rating, { message: 'Rating ist erforderlich.' });
      required(path.price, { message: 'Preis ist erforderlich.' });

      min(path.rating, 1, { message: 'Rating muss zwischen 1 und 5 liegen.' });
      max(path.rating, 5, { message: 'Rating muss zwischen 1 und 5 liegen.' });
      min(path.price, 0, { message: 'Preis darf nicht negativ sein.' });

      // Eigene Validierung: Die ISBN muss mit "978" beginnen
      validate(path.isbn, ctx => {
        if (ctx.value().startsWith('978')) {
          return undefined;
        } else {
          return {
            kind: 'isbnprefix',
            message: 'Die ISBN muss mit 978 beginnen.'
          };
        }
      });

      // Kind-Schema für jeden Autor anwenden
      applyEach(path.authors, authorPath => {
        required(authorPath);
        minLength(authorPath, 3);
        maxLength(authorPath, 20);
      });

      // Kind-Schema auf ein Feld anwenden
      // apply(path.isbn, isbnSchema);
      
      // Kind-Schema konditional auf ein Feld anwenden
      // => nur wenn Title gültig ist, wird Description zum Pflichtfeld
      applyWhen(
        path.description,
        ctx => ctx.stateOf(path.title).valid(),
        descPath => {
          required(descPath);
        }
      );

      // Idee für Ausblick: Eigener Validator für Autoren (mindestens 1 Eintrag muss ausgefüllt sein)
    },
    {
      submission: {
        action: async (f) => {
          const newBook: Book = f().value();
          const receivedBook = await firstValueFrom(this.#store.create(newBook))
          await this.#router.navigate(['/books', receivedBook.isbn]);
        }
      }
    }
  );

  addAuthorField() {
    this.bookForm.authors().value.update(currentAuthors => {
      return [...currentAuthors, ''];
    });
  }
}
