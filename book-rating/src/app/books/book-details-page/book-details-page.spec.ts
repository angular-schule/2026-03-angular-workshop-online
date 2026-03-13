import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDetailsPage } from './book-details-page';
import { provideRouter } from '@angular/router';
import { inputBinding, resource } from '@angular/core';
import { BookStore } from '../shared/book-store';
import { Book } from '../shared/book';

describe('BookDetailsPage', () => {
  let component: BookDetailsPage;
  let fixture: ComponentFixture<BookDetailsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookDetailsPage],
      providers: [
        provideRouter([]),
        {
          provide: BookStore,
          useValue: {
            getSingleResource: (isbn: () => string) => resource({
              loader: () => Promise.resolve({ isbn: isbn() } as Book)
            })
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BookDetailsPage, {
      bindings: [
        inputBinding('isbn', () => '123')
      ]
    });
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
