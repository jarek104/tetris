import { MatDialog } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { BlockModel, TetSequenceController, copyBlock } from './block-models';
import { FirebaseService } from '../../services/firebase.service';
import { KeyboardService } from '../../services/keyboard.service';
import { TetrisService } from '../../services/tetris.service';
import { SaveScoreDialog } from 'src/app/shared/save-score-dialog.component';

const SCORE_LEVEL_MULTIPLIER = .8;

@Component({
  selector: 'app-tetris',
  templateUrl: './tetris.component.html',
  styleUrls: ['./tetris.component.scss']
})
export class TetrisComponent {

  constructor(
    private tetrisService: TetrisService,
    private keyboardService: KeyboardService,
    private firebabe: FirebaseService,
    public dialog: MatDialog,
  ) { }

  leaderboard = [];
  blockWidth = 25;
  blockHeight = 25;
  scoreLevelMultiplayer = 1;
  boardWidth = 10;
  boardHeight = 20;
  board = [];
  gameOver = false;
  currentPlaceDisplayed = 0;

  sequenceController = new TetSequenceController();
  activeBlock = this.sequenceController.next();

  // Displayed in UI
  score = 0;
  blocksCount = 1;
  timer$: Observable<number>;
  speedLevel$: Observable<number>;
  shouldIndicateLevelBump$: Observable<boolean>;
  topTenScores = [];

  ngOnInit() {
    this.keyboardService.keyboardEvent$.subscribe(event => this.handleKeyboardEvent(event));
    this.board = this.tetrisService.buildBoard(this.boardWidth, this.boardHeight);
    this.tetrisService.tick$.subscribe(_ => this.moveDown())
    this.timer$ = this.tetrisService.timer$;
    this.shouldIndicateLevelBump$ = this.tetrisService.levelIncreaseIndicator$;
    this.speedLevel$ = this.tetrisService.speedLevel$;
    this.speedLevel$.subscribe(lvl => {
      this.scoreLevelMultiplayer = lvl === 1 ? 1 : lvl * SCORE_LEVEL_MULTIPLIER;
    })
    this.firebabe.getTetrisLeaderboard().subscribe(data => {
      console.log('Top 10:', data);
      this.leaderboard = data;
    })
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

  onPreviousPlace() {
    if (this.currentPlaceDisplayed > 0) {
      this.currentPlaceDisplayed--;
    }
  }

  onNextPlace() {
    if (this.currentPlaceDisplayed < 9) {
      this.currentPlaceDisplayed++;
    }
  }

  moveDown() {
    const cantMove = this.activeBlock.boardPosition.some(unitPosition => {
      let isProhibited = unitPosition[0] === this.boardHeight - 1;
      if (!isProhibited) {
        let nextMoveIndex = unitPosition[0] + 1;
        isProhibited = this.board[nextMoveIndex][unitPosition[1]] !== undefined;
      }
      return isProhibited;
    })

    if (cantMove && !this.gameOver) {
      this.archiveBlock(this.activeBlock);
      this.evaluateRows();

      this.activeBlock = this.sequenceController.next();
      this.blocksCount++;
      this.gameOver = this.isGameOver(this.activeBlock)
      if (this.gameOver) {
        this.evaluateSavingScore();
      }
    } else if (!this.gameOver && this.tetrisService.timer$.value > 0) {
      this.activeBlock.boardPosition.forEach(unit => {
        unit[0]++;
      })
    }
  }

  isGameOver(block: BlockModel) {
    return block.boardPosition.some(unit => {
      let isOver = this.board[unit[0]][unit[1]];
      if (isOver) {
        this.tetrisService.stopTimer();
      }
      return isOver;
    });
  }

  moveRight(){
    const cantMove = this.activeBlock.boardPosition.some(unitPosition => {
      let isProhibited = unitPosition[1] === this.boardWidth - 1;
      if (!isProhibited) {
        let nextMoveIndex = unitPosition[1] + 1;
        isProhibited = this.board[unitPosition[0]][nextMoveIndex] !== undefined;
      }
      return isProhibited || this.tetrisService.timer$.value === 0;;
    })
    if (cantMove || this.gameOver) {
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
      return isProhibited || this.tetrisService.timer$.value === 0;
    })
    if (cantMove || this.gameOver) {
      return;
    }
    this.activeBlock.boardPosition.forEach(unit => {
      unit[1]--;
    })
  }

  rotate() {
    if (this.gameOver || this.tetrisService.timer$.value === 0) {
      return;
    }

    const copy = copyBlock(this.activeBlock);

    let currentSequenceInd = this.activeBlock.currentSequenceNumber;
    copy.boardPosition.forEach((unitPosition, index) => {
      let currentSequence = this.activeBlock.rotationSequence[currentSequenceInd];
      unitPosition[0] = unitPosition[0] + currentSequence[index][0];
      unitPosition[1] = unitPosition[1] + currentSequence[index][1];
    })

    // this ensures the next move won't be outside of the board or on the occupied spot
    const cantRotate = copy.boardPosition.some(unitPosition => {
      return unitPosition[0] >= this.boardHeight ||
            unitPosition[1] < 0 || unitPosition[1] >= this.boardWidth ||
            this.board[unitPosition[0]][unitPosition[1]] !== undefined;
    })

    if(!cantRotate) {
      this.activeBlock = copy;
      if (currentSequenceInd === this.activeBlock.rotationSequence.length -1) {
        this.activeBlock.currentSequenceNumber = 0;
      } else {
        this.activeBlock.currentSequenceNumber++;
      }
    }

  }

  evaluateRows() {
    const rowIndexesToRemove = [];
    this.board.forEach((row: any[], index) => {
      const rowNotReady = row.includes(undefined);
      if (!rowNotReady) {
        rowIndexesToRemove.push(index);
      }
    });
    this.updateScore(rowIndexesToRemove.length);
    rowIndexesToRemove.forEach(index => {
      this.board.splice(index, 1);
      this.board.unshift(new Array(this.boardWidth));
    });

  }

  startGame() {
    this.tetrisService.restart();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SaveScoreDialog, {
      width: '350px',
      data: {score: this.score, level: this.tetrisService.speedLevel$.value}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.firebabe.saveScore(result);
    });
  }

  evaluateSavingScore() {
    if (this.score > 0) {
      const isTopTen = this.score > this.leaderboard[this.leaderboard.length - 1].score;
      isTopTen || this.leaderboard.length < 10 ? this.openDialog() : this.firebabe.saveScore({score: this.score, level: this.tetrisService.speedLevel$.value});
    }
  }


  updateScore(rowsCount: number) {
    let temp = this.score;
    switch (rowsCount) {
      case 1:
        temp+= 100 * this.scoreLevelMultiplayer;
        break;
      case 2:
        temp+= 300 * this.scoreLevelMultiplayer;
        break;
      case 3:
        temp+= 500 * this.scoreLevelMultiplayer;
        break;
      case 4:
        temp+= 800 * this.scoreLevelMultiplayer;
        break;

      default:
        break;
    }
    this.score = Math.round(temp);
  }

  archiveBlock(block: BlockModel) {
    block.boardPosition.forEach(coordinates => {
      this.board[coordinates[0]][coordinates[1]] = block.color;
    })
  }

  handleKeyboardEvent(event: KeyboardEvent) {
    switch (event.code) {
      case 'ArrowRight':
        event.preventDefault();
        this.moveRight();
        break;
      case 'ArrowLeft':
        event.preventDefault();
        this.moveLeft();
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.moveDown();
        break;
      case 'ArrowUp':
        event.preventDefault();
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
