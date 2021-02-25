import { BLOCK_OPTIONS, TetBlock } from './block-models';
import { Component, HostListener, OnInit } from '@angular/core';

import { KeyboardService } from './../../services/keyboard.service';
import { Observable } from 'rxjs';
import { TetrisService } from './../../services/tetris.service';

@Component({
  selector: 'app-tetris',
  templateUrl: './tetris.component.html',
  styleUrls: ['./tetris.component.scss']
})
export class TetrisComponent {

  constructor(
    private tetrisService: TetrisService,
    private keyboardService: KeyboardService,
  ) { }
  blockId = 0;
  width = 10;
  height = 20;
  board = this.getBoard(this.width, this.height);

  activeBlock = new TetBlock(this.blockId++);

  tick$: Observable<any>

  ngOnInit() {
    this.keyboardService.keyboardEvent$.subscribe(eventCode => this.handleKeyboardEvent(eventCode));
  }

  getBoard(width: number, height: number) {
    let x = new Array(height);

    for (var i = 0; i < x.length; i++) {
      x[i] = new Array(width);
    }
    return x;
  }

  getBackground(yIndex: number, xIndex: number, currentValue: string): string {
    if (currentValue) {
      return currentValue;
    }

    let isActiveUnit = this.activeBlock.boardPosition.some(coordinates =>
      coordinates[0] === yIndex && coordinates[1] === xIndex
    );

    if (isActiveUnit === true) {
      return this.activeBlock.color;
    }
  }

  moveDown() {
    const cantMove = this.activeBlock.boardPosition.some(unitPosition => {
      let isProhibited = unitPosition[0] === this.height - 1;
      if (!isProhibited) {
        let nextMoveIndex = unitPosition[0] + 1;
        isProhibited = this.board[nextMoveIndex][unitPosition[1]] !== undefined;
      }
      return isProhibited;
    })

    if (cantMove) {
      this.archiveBlock(this.activeBlock);

      this.activeBlock = new TetBlock(this.blockId++);
      return;
    }
    this.activeBlock.boardPosition.forEach(unit => {
      unit[0]++;
    })
  }

  moveRight(){
    const cantMove = this.activeBlock.boardPosition.some(unitPosition => {
      let isProhibited = unitPosition[1] === this.width - 1;
      if (!isProhibited) {
        let nextMoveIndex = unitPosition[1] + 1;
        isProhibited = this.board[unitPosition[0]][nextMoveIndex] !== undefined;
      }
      return isProhibited;
    })
    if (cantMove) {
      return;
    }
    this.activeBlock.boardPosition.forEach(unit => {
      unit[1]++;
    })
  }

  moveLeft() {
    const cantMove = this.activeBlock.boardPosition.some(unitPosition => {
      let isProhibited = unitPosition[1] === 0;
      if (!isProhibited) {
        let nextMoveIndex = unitPosition[1] - 1;
        isProhibited = this.board[unitPosition[0]][nextMoveIndex] !== undefined;
      }
      return isProhibited;
    })
    if (cantMove) {
      return;
    }
    this.activeBlock.boardPosition.forEach(unit => {
      unit[1]--;
    })
  }

  rotate() {

  }

  restart() {
    this.tetrisService.restart();
    this.tick$ = this.tetrisService.tick$;
    this.tick$.subscribe(_ => this.moveDown())
  }

  archiveBlock(block: TetBlock) {
    block.boardPosition.forEach(coordinates => {
      this.board[coordinates[0]][coordinates[1]] = block.color;
    })
  }

  handleKeyboardEvent(code: string) {
    switch (code) {
      case 'ArrowRight':
        this.moveRight();
        break;
      case 'ArrowLeft':
        this.moveLeft();
        break;
      case 'ArrowDown':
        this.moveDown();
        break;
      case 'Space':
        this.rotate();
        break;

      default:
        break;
    }
  }
}
