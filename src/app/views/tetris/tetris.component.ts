import { BlockModel, TetSequenceController } from './block-models';

import { Component } from '@angular/core';
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
  blockWidth = 20;
  blockHeight = 20;
  width = 50;
  height = 20;
  board = this.getBoard(this.width, this.height);

  sequenceController = new TetSequenceController();
  activeBlock = this.sequenceController.next();

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
      this.evaluateRows();

      this.activeBlock = this.sequenceController.next();
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
    let currentSequenceInd = this.activeBlock.currentSequenceNumber;
    this.activeBlock.boardPosition.forEach((unitPosition, index) => {
      let currentSequence = this.activeBlock.rotationSequence[currentSequenceInd];
      unitPosition[0] = unitPosition[0] + currentSequence[index][0];
      unitPosition[1] = unitPosition[1] + currentSequence[index][1];
    })
    if (currentSequenceInd === this.activeBlock.rotationSequence.length -1) {
      this.activeBlock.currentSequenceNumber = 0;
    } else {
      this.activeBlock.currentSequenceNumber++;
    }
  }

  evaluateRows() {
    const rowIndexesToRemove = [];
    this.board.forEach((row: any[], index) => {
      const rowNotReady = row.includes(undefined);
      if (!rowNotReady) {
        rowIndexesToRemove.push(index);
      }
    })
    rowIndexesToRemove.forEach(index => {
      this.board.splice(index, 1);
      this.board.unshift(new Array(this.width));
    });

  }

  restart() {
    this.tetrisService.restart();
    this.tick$ = this.tetrisService.tick$;
    this.tick$.subscribe(_ => this.moveDown())
  }

  archiveBlock(block: BlockModel) {
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
      case 'ArrowUp':
        this.rotate();
        break;
      case 'Space':
        this.rotate();
        break;

      default:
        break;
    }
  }

  increaseWidth() {
    this.blockWidth = this.blockWidth + 5;
  }

  decreaseWidth() {
    this.blockWidth = this.blockWidth > 5 ? this.blockWidth - 5 : this.blockWidth;
  }

  increaseHeight() {
    this.blockHeight = this.blockHeight + 5;
  }

  decreaseHeight() {
    this.blockHeight = this.blockHeight > 5 ? this.blockHeight - 5 : this.blockHeight;
  }
}
