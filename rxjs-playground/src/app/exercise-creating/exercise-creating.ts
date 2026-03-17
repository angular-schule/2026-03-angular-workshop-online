import { Component } from '@angular/core';
import { Observable, of, from, timer, interval, ReplaySubject, map, filter, Observer, Subscriber } from 'rxjs';

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
    
    timer(0, 1000).pipe(
      map(e => e * 3),
      filter(e => e % 2 === 0)
    ).subscribe({
      next: e => this.log(e),
      complete: () => this.log('COMPLETE')
    });
    
    /******************************/

    // Procucer: erzeugt Daten
    function producer(sub: Subscriber<number>) {
      const result = Math.random();
      sub.next(result);
      sub.next(2)
      sub.next(3)

      setTimeout(() => sub.next(100), 2000)
      setTimeout(() => sub.next(400), 4000)
      setTimeout(() => sub.complete(), 6000)
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
    // myObs$.subscribe(obs)
    // myObs$.subscribe(e => console.log(e))

    
    /******************************/
  }

  log(msg: unknown) {
    this.logStream$.next(msg);
  }

}
