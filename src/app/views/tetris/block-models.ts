interface BlockModel {
  color: string;
  boardPosition: any[];
  id?: number;
  active?: boolean,
}


const SQUARE: BlockModel = {
  color: '#F4F1DE',
  active: true,
  boardPosition: [[2, 4], [2, 5], [1, 4], [1, 5]],
}

const TEE: BlockModel = {
  color: '#E07A5F',
  active: true,
  boardPosition: [[1, 4], [2, 3], [2, 4], [2, 5]],
}

const LEFT_L: BlockModel = {
  color: '#3D405B',
  active: true,
  boardPosition: [[1, 4], [2, 4], [3, 4], [3, 3]],
}

const RIGHT_L: BlockModel = {
  color: '#3D405B',
  active: true,
  boardPosition: [[1, 4], [2, 4], [3, 4], [3, 5]],
}

const LEFT_S: BlockModel = {
  color: '#81B29A',
  active: true,
  boardPosition: [[1, 4], [2, 4], [2, 5], [3, 5]],
}

const RIGHT_S: BlockModel = {
  color: '#81B29A',
  active: true,
  boardPosition: [[1, 5], [2, 5], [2, 4], [3, 4]],
}

const STICK: BlockModel = {
  color: '#F2CC8F',
  active: true,
  boardPosition: [[1, 4], [2, 4], [3, 4], [4, 4]],
}

export const BLOCK_OPTIONS = [
  SQUARE, TEE, LEFT_L, RIGHT_L, STICK, LEFT_S, RIGHT_S
]

function copyBlock(block: BlockModel) {
  return {
    color: block.color,
    active: block.active,
    boardPosition: [...block.boardPosition],
  }
}

export class TetBlock implements BlockModel {
  color = '';
  active = true;
  boardPosition = [];
  id = 0;

  constructor(id: number) {
    const ind: number = Math.floor(Math.random() * Math.floor(BLOCK_OPTIONS.length));
    const block = BLOCK_OPTIONS[ind];

    this.id = id;
    this.color = block.color;
    this.boardPosition = [...block.boardPosition.map((els: []) => [...els])];
  }

}
export class TetSequence {
  sequence = [];

  constructor() {

    let count = 7;

    for (let i = 0; i < count; i++) {
      let selected = BLOCK_OPTIONS[Math.round(Math.random() * count)];
      if (selected) {

      }

    }
  }
    nextBlock() {

    }
}
