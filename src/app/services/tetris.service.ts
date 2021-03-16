import { BehaviorSubject, Subscription, interval } from 'rxjs';

import { Injectable } from '@angular/core';

const SPEED_INCREASE_MULTIPLIER = .9;
const SPEED_INCREASE_FREQUENCY = 30;

@Injectable({
  providedIn: 'root'
})
export class TetrisService {

  constructor() {
    this.timer$.subscribe(time => {
      if (time === this.speedLevel$.value * SPEED_INCREASE_FREQUENCY) {
        this.increaseSpeed();
        this.speedLevel$.next(this.speedLevel$.value + 1);
      }
    })
  }

  speedLevel$ = new BehaviorSubject<number>(1);
  tick$ = new BehaviorSubject<number>(0);
  timer$ = new BehaviorSubject<number>(0);
  speed = 1000;

  sub = new Subscription();
  timerSub = new Subscription();

  restart() {
    this.sub = interval(1000).subscribe(_ => this.tick$.next(this.tick$.value + 1));
    this.timerSub = interval(1000).subscribe(_ => this.timer$.next(this.timer$.value + 1));
  }

  increaseSpeed() {
    this.sub.unsubscribe();
    this.speed = Math.round(this.speed * SPEED_INCREASE_MULTIPLIER);
    this.sub = interval(this.speed).subscribe(_ => this.tick$.next(this.tick$.value + 1));

  }

  buildBoard(width: number, height: number, usersCount = 1) {
    let x = new Array(height);

    const finalWidth = usersCount === 1 ? 10 : usersCount * 8 + 2;

    for (var i = 0; i < x.length; i++) {
      x[i] = new Array(finalWidth);
    }
    return x;
  }

  stopTimer() {
    this.timerSub.unsubscribe();
  }

}
