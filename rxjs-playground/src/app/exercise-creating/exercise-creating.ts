import { Component } from '@angular/core';
import { Observable, of, from, timer, interval, ReplaySubject, map, filter, take, Observer, Subscriber, pipe, OperatorFunction } from 'rxjs';

import { HistoryWindow } from '../shared/history-window/history-window';

@Component({
  templateUrl: './exercise-creating.html',
  imports: [HistoryWindow]
})
export class ExerciseCreating {

  logStream$ = new ReplaySubject<unknown>();

  constructor() {
    /**
     * 1. Erstelle ein Observable und abonniere den Datenstrom.
     *    Probiere dazu die verschiedenen Creation Functions aus: of(), from(), timer(), interval()
     * 2. Implementiere außerdem ein Observable manuell, indem du den Konstruktor "new Observable()" nutzt.
     *
     * Tipps:
     * Zum Abonnieren kannst du einen (partiellen) Observer oder ein einzelnes next-Callback verwenden.
     * Du kannst die Methode this.log() verwenden, um eine Ausgabe in der schwarzen Box im Browser zu erzeugen.
     */

    /******************************/
    
    // of('Frankfurt', 'Kiel', 'Stuttgart', 'Leipzig')
    // from([1,2,3,4,5])
    // interval(1000)        // ---0---1---2---3---4 ...
    // timer(3000)           // ---------0|
    // timer(3000, 1000)     // ---------0---1---2---3---4 ...
    // timer(1000, 1000)     // ---0---1---2---3---4 ...
    // timer(0, 1000)        // 0---1---2---3---4 ...
    

    function myOf<T>(...values: T[]): Observable<T> {
      return new Observable<T>(sub => {
        values.forEach(value => sub.next(value));
        sub.complete();
      });
    }


    function myCombiOperator(): OperatorFunction<number, number> {
      return pipe(
        map((e: number) => e * 3),
        filter(e => e % 2 === 0)
      );
    }

    /*timer(0, 1000).pipe(
      // map(e => e * 3),
      // filter(e => e % 2 === 0)
      myCombiOperator()
    ).subscribe({
      next: e => this.log(e),
      complete: () => this.log('COMPLETE')
    });*/

    function intervalFromArray<T>(intervalMs: number, values: T[]): Observable<T> {
      return interval(intervalMs).pipe(
        take(values.length),
        map(i => values[i])
      );
    }

    intervalFromArray(1000, ['A', 'B', 'C', 'D']).subscribe({
      next: e => this.log(e),
      complete: () => this.log('COMPLETE')
    });
    
    /******************************/

    // Procucer: erzeugt Daten
    function producer(sub: Subscriber<number>) {
      const result = Math.random();
      sub.next(result);
      sub.next(2);
      sub.next(3);
      sub.complete();
      console.log('AFTER COMPLETE');

      const timer1 = setTimeout(() => sub.next(100), 2000);
      const timer2 = setTimeout(() => {
        console.log('TIMEOUT 4000');
        sub.next(400);
      }, 4000);
      const timer3 = setTimeout(() => sub.complete(), 6000);

      // Teardown Logic
      // wird ausgeführt bei unsubscribe() und complete/error
      return () => {
        console.log('TEARDOWN');
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }

    // Observer: empfängt die Daten
    const obs: Observer<number> = {
      next: e => console.log(e),
      error: (err: any) => console.error(err),
      complete: () => console.log('FERTIG')
    }

    // Observable: Schnittstelle zwischen Producer und Observer
    // vermittelt die Daten von Quelle zur Senke
    // producer(obs);

    const myObs$ = new Observable(producer);
    const myObs2$ = new Observable<string>(sub => {
      sub.next('Hallo Welt');
      sub.complete();
    })
    // myObs$.subscribe(e => console.log(e))
    // myObs$.subscribe()
    const sub = myObs$.subscribe(obs)

    setTimeout(() => {
      console.log('unsubscribe');
      sub.unsubscribe()
    }, 3000)

    
    /******************************/
  }

  log(msg: unknown) {
    this.logStream$.next(msg);
  }

}
