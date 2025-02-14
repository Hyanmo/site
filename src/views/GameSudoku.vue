<template>
  <div id="sudoku-container">
    <h1>数独游戏</h1>
    <div class="sudoku-wrap">
      <div class="sudoku-board">
        <div
          v-for="(cell, index) in sudokuGrid"
          :key="index"
          class="sudoku-cell"
          :class="{
            'editable': cell.editable,
            'filled': !cell.editable,
            'highlight': highlightCells(index),
            'box-highlight': isBoxBoundary(index),
            'error': isInputError(index),  // 这里增加了错误提示的类
            'correct': isInputCorrect(index),  // 这里增加了正确输入的类
          }"
        >
          <input
            v-if="cell.editable"
            type="number"
            v-model="cell.value"
            @input="onInputChange(index)"
            :min="1"
            :max="9"
          />
          <span v-else>{{ cell.value }}</span>
        </div>
      </div>
    </div>
    <div id="difficulty" class="check-wrap center-horizontal">
      <input type="radio" name="difficulty" value="easy" v-model="difficulty" @change="setDifficulty('easy')" /> 简单
      <input type="radio" name="difficulty" value="hard" v-model="difficulty" @change="setDifficulty('hard')" /> 困难
      <input type="radio" name="difficulty" value="disgust" v-model="difficulty" @change="setDifficulty('disgust')" /> 变态
    </div>
    <p id="timer">{{ timer }}</p>
    <div class="button-wrap center-horizontal">
      <button type="button" @click="gameStart">换一个</button>
      <button type="button" @click="showAnswer">看答案</button>
    </div>
    <p v-if="isWin" id="win-message">你赢了！</p>
    <!-- 添加返回个人主页按钮 -->
    <div class="button-wrap center-horizontal">
      <button type="button" @click="goToProfile">收起</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sudokuGrid: [], // 存储数独格子的值
      timer: '00:00', // 定时器
      difficulty: 'easy', // 默认难度
      solutionGrid: [], // 存储数独的正确解
      isWin: false, // 游戏是否胜利标识
    };
  },
  created() {
    this.initGame();
    this.startTimer();
  },
  methods: {
    initGame() {
      this.isWin = false; // 重置胜利标志
      // 初始化数独格子
      this.sudokuGrid = Array.from({ length: 81 }, () => ({
        value: '',
        editable: true, // 默认所有格子都是可编辑的
      }));

      // 根据难度生成数独
      this.generateSudoku(this.difficulty);
    },
    startTimer() {
      let minutes = 0;
      let seconds = 0;
      this.timerInterval = setInterval(() => {
        if (this.isWin) return; // 如果游戏胜利，则停止计时
        seconds++;
        if (seconds === 60) {
          seconds = 0;
          minutes++;
        }
        this.timer = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      }, 1000);
    },
    stopTimer() {
      clearInterval(this.timerInterval);
    },
    setDifficulty(level) {
      this.difficulty = level;
      this.initGame(); // 重新初始化游戏
    },
    generateSudoku(difficulty) {
      const grid = this.generateEmptyGrid();
      const solution = this.solveSudoku(grid);
      this.solutionGrid = solution;
      this.createPuzzle(solution, difficulty);
    },
    generateEmptyGrid() {
      return Array(81).fill(0);
    },
    solveSudoku(grid) {
      const solve = (grid) => {
        const findEmptyCell = grid.findIndex(cell => cell === 0);
        if (findEmptyCell === -1) return true; // 找到所有格子都已填充

        const row = Math.floor(findEmptyCell / 9);
        const col = findEmptyCell % 9;

        for (let num = 1; num <= 9; num++) {
          if (this.isValidMove(grid, row, col, num)) {
            grid[findEmptyCell] = num;
            if (solve(grid)) return true;
            grid[findEmptyCell] = 0;
          }
        }
        return false;
      };

      solve(grid);
      return grid;
    },
    isValidMove(grid, row, col, num) {
      for (let i = 0; i < 9; i++) {
        if (grid[row * 9 + i] === num || grid[i * 9 + col] === num) return false; // 同一行或同一列冲突
      }

      const boxRow = Math.floor(row / 3) * 3;
      const boxCol = Math.floor(col / 3) * 3;

      for (let i = boxRow; i < boxRow + 3; i++) {
        for (let j = boxCol; j < boxCol + 3; j++) {
          if (grid[i * 9 + j] === num) return false; // 同一个 3x3 宫内冲突
        }
      }

      return true;
    },
    createPuzzle(solution, difficulty) {
      let grid = [...solution];
      let clues = this.getClueCount(difficulty);
      let removedCells = 0;

      while (removedCells < 81 - clues) {
        const randomIndex = Math.floor(Math.random() * 81);
        if (grid[randomIndex] !== 0) {
          grid[randomIndex] = 0;
          removedCells++;
        }
      }

      // 更新数独格子
      this.sudokuGrid = grid.map((value) => ({
        value: value === 0 ? '' : value,
        editable: value === 0,
      }));
    },
    getClueCount(difficulty) {
      if (difficulty === 'easy') return 40;
      if (difficulty === 'hard') return 30;
      return 20; // 变态难度
    },
    onInputChange() {
      this.checkWin(); // 每次输入变更后检查是否完成
    },
    checkWin() {
      // 检查是否解答正确
      const isSolved = this.sudokuGrid.every((cell, index) => {
        return cell.value === this.solutionGrid[index];
      });
      if (isSolved && !this.isWin) {
        this.isWin = true;
        this.stopTimer(); // 停止计时
      }
    },
    gameStart() {
      this.initGame();
    },
    showAnswer() {
      this.sudokuGrid = this.solutionGrid.map((value) => ({
        value: value === 0 ? '' : value,
        editable: false,
      }));
    },
    highlightCells(index) {
      const row = Math.floor(index / 9);
      const col = index % 9;
      return (row % 3 === 0 || col % 3 === 0) ? 'highlight' : '';
    },
    isBoxBoundary(index) {
      const row = Math.floor(index / 9);
      const col = index % 9;
      return (row % 3 === 0 && col % 3 === 0);
    },
    isInputError(index) {
      // 如果输入不正确并且是可编辑的，返回 `true`
      return this.sudokuGrid[index].editable && this.sudokuGrid[index].value !== '' && this.sudokuGrid[index].value != this.solutionGrid[index];
    },
    isInputCorrect(index) {
      // 如果输入正确并且是可编辑的，返回 `true`
      return this.sudokuGrid[index].editable && this.sudokuGrid[index].value === this.solutionGrid[index];
    },
    // 返回个人主页的方法
    goToProfile() {
      this.$router.push({ name: 'Profile' });
    }
  },
};
</script>

<style scoped>
#sudoku-container {
  font-family: Arial, sans-serif;
  text-align: center;
  margin-top: 20px;
}

.sudoku-wrap {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

.sudoku-board {
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  grid-gap: 5px;
  max-width: 540px;
}

.sudoku-cell {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  background-color: #fff;
  border: 2px solid #ccc;
  font-size: 24px;
  font-weight: bold;
}

.sudoku-cell.editable input {
  width: 40px;
  height: 40px;
  text-align: center;
  border: 2px solid #ccc;
  font-size: 24px;
  background-color: #fff;
  outline: none;
}

.sudoku-cell.filled {
  background-color: #f4f4f4;
}

.sudoku-cell.highlight {
  border: 2px solid #2ecc71;
}

.sudoku-cell.box-highlight {
  border: 3px solid #e74c3c;
  background-color: #f0f0f0;
}

.sudoku-cell.error {
  background-color: #ff4d4d;
}

.sudoku-cell.correct {
  background-color: #4dff4d;
}

.check-wrap {
  margin-top: 20px;
}

.center-horizontal {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.button-wrap {
  margin-top: 10px;
}

button {
  padding: 12px 24px;
  background-color: #2e8b57;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
  margin-top: 10px;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

button:hover {
  background-color: #f1f1f1;
}

#timer {
  font-size: 18px;
  margin-top: 20px;
}

#win-message {
  font-size: 24px;
  color: #2ecc71;
  margin-top: 20px;
}
</style>
