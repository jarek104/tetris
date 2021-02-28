import { Component, HostListener } from '@angular/core';
import { Observable, Subscription, fromEvent } from 'rxjs';

import { KeyboardService } from './services/keyboard.service';
import { SocketioService } from './services/socketio.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  subscription: Subscription;

  users$: Observable<number>;
  players$: Observable<string[]>;
  playerName = '';

  constructor(
    private socketService: SocketioService,
    private keyboardService: KeyboardService,
  ) {}

  ngOnInit() {
    this.subscription = fromEvent(document, 'keydown').subscribe((e: KeyboardEvent) => {
      this.keyboardService.keyboardEvent$.next(e);
    })
    // this.socketService.setupSocketConnection();
    // this.users$ = this.socketService.userCount$.asObservable();
    // this.players$ = this.socketService.players$.asObservable();
  }
  onKey(event: any) {
    this.playerName = event.target.value;
  }

  onSubmit() {
    this.socketService.setPlayerName(this.playerName);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
