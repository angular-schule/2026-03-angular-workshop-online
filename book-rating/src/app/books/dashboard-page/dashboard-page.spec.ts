import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPage } from './dashboard-page';
import { BookRatingHelper } from '../shared/book-rating-helper';
import { Book } from '../shared/book';
import { BookStore } from '../shared/book-store';
import { of } from 'rxjs';
import { Mock } from 'vitest';
import { resource } from '@angular/core';

describe('DashboardPage', () => {
  let component: DashboardPage;
  let fixture: ComponentFixture<DashboardPage>;
  let rateUpMockFn: Mock;

  beforeEach(async () => {
    rateUpMockFn = vi.fn();

    await TestBed.configureTestingModule({
      imports: [DashboardPage],
      providers: [
        // BRH ersetzen: wenn jemand BRH anfordert,
        // wird stattdessen unser Mock-Objekt ausgeliefert
        {
          provide: BookRatingHelper,
          useValue: {
            rateUp: rateUpMockFn,
            rateDown: vi.fn().mockReturnValue({ isbn: 'test2' })
          }
        },
        {
          provide: BookStore,
          useValue: {
            getAll: () => of([]),
            getAllResource: () => resource({
              loader: () => Promise.resolve([])
            })
          }
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

  it('should call service.rateUp() for doRateUp()', () => {
    // ARRANGE
    // Testbuch
    const testBook = { isbn: 'test' } as Book; // Type Assertion, bitte vorsichtig verwenden

    // Ersatzobjekt vorbereiten / Mock
    rateUpMockFn.mockReturnValue(testBook);

    // ACT
    component.doRateUp(testBook);

    // ASSERT
    // prüfen, ob rateUp aufgerufen wurde
    expect(rateUpMockFn).toHaveBeenCalledExactlyOnceWith(testBook);
  });
});
