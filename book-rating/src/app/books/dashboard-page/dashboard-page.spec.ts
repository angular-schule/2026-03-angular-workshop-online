import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPage } from './dashboard-page';
import { BookRatingHelper } from '../shared/book-rating-helper';
import { Book } from '../shared/book';
import { BookStore } from '../shared/book-store';
import { of } from 'rxjs';

describe('DashboardPage', () => {
  let component: DashboardPage;
  let fixture: ComponentFixture<DashboardPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardPage],
      providers: [
        // BRH ersetzen: wenn jemand BRH anfordert,
        // wird stattdessen unser Mock-Objekt ausgeliefert
        {
          provide: BookRatingHelper,
          useValue: { rateUp: (b: Book) => b }
        },
        {
          provide: BookStore,
          useValue: { getAll: () => of([]) }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
