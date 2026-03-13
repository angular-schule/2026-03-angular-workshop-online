import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCard } from './book-card';
import { inputBinding, outputBinding } from '@angular/core';
import { Book } from '../shared/book';
import { provideRouter } from '@angular/router';

describe('BookCard', () => {
  let component: BookCard;
  let fixture: ComponentFixture<BookCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookCard],
      providers: [
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BookCard, {
      bindings: [
        inputBinding('book', () => ({
          isbn: '123',
          title: 'Angular',
          rating: 3,
          price: 22,
          description: '',
          authors: []
        })),
        // outputBinding('rateUp', (b: Book) => {})
      ]
    });
    // TS-Klasseninstanz
    component = fixture.componentInstance;

    // DOM-Element (gerendertes Template)
    // Beispiel: fixture.nativeElement.querySelector('h2').textContent

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
