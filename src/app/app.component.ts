import { Component, HostListener } from '@angular/core';
import { Observable, Subscription, fromEvent } from 'rxjs';

import { KeyboardService } from './services/keyboard.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  subscription: Subscription;

  constructor(
    private keyboardService: KeyboardService,
  ) {}

  ngOnInit() {
    this.subscription = fromEvent(document, 'keydown').subscribe((e: KeyboardEvent) => {
      this.keyboardService.keyboardEvent$.next(e);
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
