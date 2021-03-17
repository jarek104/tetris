import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

export interface GameScore {
  score: number,
  playerName?: string,
  quote?: string,
  level?: number,
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private firestore: AngularFirestore,
  ) { }

  getTetrisLeaderboard() {
    return this.firestore.collection('tetris', ref => ref
    .orderBy('score', 'desc').limit(10)).valueChanges();
  }

  saveScore(score: Partial<GameScore>) {
    this.firestore.collection('tetris').add(score);
  }
}
