import { Component, OnDestroy } from '@angular/core';
import { Subject, ReplaySubject, timer, Subscription, takeWhile, takeUntil } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { HistoryWindow } from '../shared/history-window/history-window';

@Component({
  templateUrl: './exercise-unsubscribe.html',
  imports: [HistoryWindow]
})
export class ExerciseUnsubscribe implements OnDestroy {

  logStream$ = new ReplaySubject<unknown>();

  /**
   * Öffne die Browser-Console: Dort siehst Du den Output eines Observables, das jede Sekunde einen Wert generiert.
   * Navigiere zurück auf die Startseite und beobachte die Console:
   * Die Subscription läuft weiter. Wir haben einen klassischen Memory Leak erzeugt ...
   * 
   * Sorge dafür, dass die Subscription in der Methode ngOnDestroy() beendet wird!
   * Sie wird beim Buttonklick und beim Wegnavigieren ausgelöst.
   * 
   * Es gibt noch weitere Wege, das Problem zu lösen ...
   */
  constructor() {
    const interval$ = timer(0, 1000);

    interval$.pipe(

      /******************************/

      
      /******************************/

    ).subscribe({
      next: e => this.log(e),
      error: err => this.log('❌ ERROR: ' + err),
      complete: () => this.log('✅ COMPLETE')
    });
  }

  ngOnDestroy() {
  }

  log(msg: unknown) {
    console.log(msg);
    this.logStream$.next(msg);
  }
}
