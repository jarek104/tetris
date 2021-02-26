export interface BlockModel {
  color: string;
  boardPosition: any[];
  rotationSequence: any[];
  currentSequenceNumber: number;
  active?: boolean,
}


const O: BlockModel = {
  color: '#F4F1DE',
  active: true,
  boardPosition: [[0, 4], [0, 5], [1, 4], [1, 5]],
  rotationSequence: [
    [[0, 0], [0, 0], [0, 0], [0, 0]],
  ],
  currentSequenceNumber: 0,
}

const T: BlockModel = {
  color: '#E07A5F',
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
  color: '#3D405B',
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
  color: '#3D405B',
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
  color: '#81B29A',
  active: true,
  boardPosition: [[0, 4], [1, 4], [1, 5], [2, 5]],
  rotationSequence: [
    [[0, 0], [0, 0], [0, -2], [-2, 0]],
    [[0, 0], [0, 0], [0, 2], [2, 0]],
  ],
  currentSequenceNumber: 0,
}

const Z: BlockModel = {
  color: '#81B29A',
  active: true,
  boardPosition: [[0, 5], [1, 5], [1, 4], [2, 4]],
  rotationSequence: [
    [[0, -1], [0, 0], [0, 0], [-2, -1]],
    [[0, 1], [0, 0], [0, 0], [2, 1]],
  ],
  currentSequenceNumber: 0,
}

const I: BlockModel = {
  color: '#F2CC8F',
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

function copyBlock(block: BlockModel): BlockModel {
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

// export class TetBlock implements BlockModel {
//   color = '';
//   active = true;
//   boardPosition = [];
//   rotationSequence = [];
//   currentSequenceNumber = 0;

//   constructor() {
//     const ind: number = Math.floor(Math.random() * Math.floor(BLOCK_OPTIONS.length));
//     const block = BLOCK_OPTIONS[ind];

//     this.color = block.color;
//     this.boardPosition = [...block.boardPosition.map((els: []) => [...els])];
//     this.rotationSequence = [...block.rotationSequence.map((els: []) => [...els])];
//   }

// }
export class TetSequenceController {
  sequence = [];

  constructor() {
    this.newSequence();
  }

  next() {
    if (this.sequence.length > 0) {
      console.log(this.sequence.length);

      return this.sequence.pop();
    } else {
      this.newSequence();
      return this.sequence.pop();
    }
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
