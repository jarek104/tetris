import { Observable, interval, of } from 'rxjs';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TetrisService {

  constructor() { }

  tick$ = of(0);

  restart() {
    this.tick$ = of(0)
    this.tick$ = interval(1000)
  }

  buildBoard(width: number, height: number) {
    let x = new Array(height);

    for (var i = 0; i < x.length; i++) {
      x[i] = new Array(width);
    }
    return x;
  }

}
