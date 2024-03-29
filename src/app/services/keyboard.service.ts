import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KeyboardService {

  keyboardEvent$ = new BehaviorSubject<KeyboardEvent>(new KeyboardEvent(''));

  constructor() { }
}
