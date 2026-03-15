import { Component, inject } from '@angular/core';
import { ReplaySubject, throwError, of, EMPTY, retry, catchError } from 'rxjs';

import { HistoryWindow } from '../shared/history-window/history-window';
import { DataService } from './data.service';

@Component({
  templateUrl: './exercise-errorhandling.html',
  imports: [HistoryWindow]
})
export class ExerciseErrorhandling {

  logStream$ = new ReplaySubject<unknown>();
  #ds = inject(DataService);

  /**
   * Das Observable aus `this.ds.getData()` liefert Daten – oder mit hoher Wahrscheinlichkeit einen Fehler.
   * Probiere verschiedene Strategien aus, um den Fehler zu behandeln.
   */

  start() {
    this.#ds.getData().pipe(

      /******************************/

      
      /******************************/

    ).subscribe({
      next: e => this.logStream$.next(e),
      error: err => this.logStream$.next('❌ ERROR: ' + err),
      complete: () => this.logStream$.next('🏁 COMPLETE')
    });
  }
}
