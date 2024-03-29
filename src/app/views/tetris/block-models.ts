export interface BlockModel {
  color: string;
  boardPosition: any[];
  rotationSequence: any[];
  currentSequenceNumber: number;
  active?: boolean,
}

const O: BlockModel = {
  color: '#70C1B3',
  active: true,
  boardPosition: [[0, 4], [0, 5], [1, 4], [1, 5]],
  rotationSequence: [
    [[0, 0], [0, 0], [0, 0], [0, 0]],
  ],
  currentSequenceNumber: 0,
}

const T: BlockModel = {
  color: '#50514F',
  active: true,
  boardPosition: [[0, 4], [1, 3], [1, 4], [1, 5]],
  rotationSequence: [
    [[0, 0], [1, 1], [0, 0], [0, 0]],
    [[2, 0], [-1, -1], [0, 0], [0, 0]],
    [[-2, 0], [0, 0], [0, 0], [1, -1]],
    [[0, 0], [0, 0], [0, 0], [-1, 1]],
  ],
  currentSequenceNumber: 0,
}

const J: BlockModel = {
  color: '#A15856',
  active: true,
  boardPosition: [[0, 4], [1, 4], [2, 3], [2, 4]],
  rotationSequence: [
    [[1, -1], [0, 0], [0, 2], [-1, 1]],
    [[-1, 1], [0, 0], [-2, 0], [1, -1]],
    [[1, -1], [0, 0], [0, -2], [-1, 1]],
    [[-1, 1], [0, 0], [2, 0], [1, -1]],
  ],
  currentSequenceNumber: 0,
}

const L: BlockModel = {
  color: '#F25F5C',
  active: true,
  boardPosition: [[0, 4], [1, 4], [2, 4], [2, 5]],
  rotationSequence: [
    [[1, -1], [0, 0], [-1, 1], [-2, 0]],
    [[-1, 1], [0, 0], [1, -1], [0, -2]],
    [[1, -1], [0, 0], [-1, 1], [2, 0]],
    [[-1, 1], [0, 0], [1, -1], [0, 2]],
  ],
  currentSequenceNumber: 0,
}

const S: BlockModel = {
  color: '#F9A061',
  active: true,
  boardPosition: [[0, 4], [1, 4], [1, 5], [2, 5]],
  rotationSequence: [
    [[0, 0], [0, 0], [0, -2], [-2, 0]],
    [[0, 0], [0, 0], [0, 2], [2, 0]],
  ],
  currentSequenceNumber: 0,
}

const Z: BlockModel = {
  color: '#ecd474',
  active: true,
  boardPosition: [[0, 5], [1, 5], [1, 4], [2, 4]],
  rotationSequence: [
    [[0, -1], [0, 0], [0, 0], [-2, -1]],
    [[0, 1], [0, 0], [0, 0], [2, 1]],
  ],
  currentSequenceNumber: 0,
}

const I: BlockModel = {
  color: '#247BA0',
  active: true,
  boardPosition: [[0, 4], [1, 4], [2, 4], [3, 4]],
  rotationSequence: [
    [[1, -1], [0, 0], [-1, 1], [-2, 2]],
    [[-1, 1], [0, 0], [1, -1], [2, -2]],
  ],
  currentSequenceNumber: 0,
}

export const BLOCK_OPTIONS = [
  O, T, J, L, I, S, Z
]

export function copyBlock(block: BlockModel): BlockModel {
  return {
    color: block.color,
    active: block.active,
    boardPosition: [...block.boardPosition.map((els: []) => [...els])],
    rotationSequence: [...block.rotationSequence.map((els: []) => {
      return els.map((el: []) => [...el])
    })],
    currentSequenceNumber: block.currentSequenceNumber,
  }
}
function copySequence(): BlockModel[] {
  const all = [];
  BLOCK_OPTIONS.forEach(block => {
    all.push(copyBlock(block));
  })
  return all;
}

export class TetSequenceController {
  sequence = [];

  constructor() {
    this.newSequence();
  }

  next(): BlockModel {
    if (this.sequence.length === 0) {
      this.newSequence();
    }
    return this.sequence.pop();
  }

  private newSequence() {
    const options = copySequence();

    for (let i = options.length - 1; i >= 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      this.sequence.push(options[randomIndex])
      options.splice(randomIndex, 1);
    }
  }
}
