import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  userCount$ = new BehaviorSubject(0);
  players$ = new BehaviorSubject([]);
  socket: any;
  constructor() {   }

  setupSocketConnection() {
    this.socket = io(environment.SOCKET_ENDPOINT);

    this.socket.on('usersCountChange', (data: number) => {
      this.userCount$.next(data);
    });

    this.socket.on('playerNamesChange', (players: string[]) => {
      this.players$.next(players);
    });
  }

  setPlayerName(name: string) {
    this.socket.emit('playerNameSet', name);
  }
}
