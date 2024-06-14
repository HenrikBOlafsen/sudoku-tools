export function cloneSudokuValues(sudokuValues: Array<Array<number>>) {
  const newSudokuValues = [];
  for (let i = 0; i < sudokuValues.length; i++) {
    const newRowValues = [];
    for (let j = 0; j < sudokuValues[i].length; j++) {
      newRowValues.push(sudokuValues[i][j]);
    }
    newSudokuValues.push(newRowValues);
  }
}

export function createEmptySudokuValues(
  dimension: number
): Array<Array<number>> {
  const newSudokuValues = [];
  for (let i = 0; i < dimension; i++) {
    const newRowValues = [];
    for (let j = 0; j < dimension; j++) {
      newRowValues.push(0);
    }
    newSudokuValues.push(newRowValues);
  }

  return newSudokuValues;
}

export function createTheNeutralSudokuValues(
  boxWidth: number,
  boxHeight: number
): Array<Array<number>> {
  const newSudokuValues = createEmptySudokuValues(boxWidth * boxHeight)

  // fill the first box with values 1 to (boxWidth * boxHeight), from left to right from top to bottom
  for(let x = 0; x < boxWidth; x++) {
    for(let y = 0; y < boxHeight; y++) {
      newSudokuValues[y][x] = y * boxWidth + x + 1
    }
  }

  // fill in the digit 1 in all rows and columns
  for(let boxCol = 0; boxCol < boxHeight; boxCol++) {
    for(let boxRow = 0; boxRow < boxWidth; boxRow++) {
      newSudokuValues[boxRow * boxHeight + boxCol][boxCol * boxWidth + boxRow] = 1
    }
  }

  return newSudokuValues;
}

export function solveSudoku(sudokuValues: Array<Array<number>>, row: number, col: number, boxWidth: number, boxHeight: number) {
  if(row === boxWidth * boxHeight - 1 && col === boxWidth * boxHeight) return true

  if(col == boxWidth * boxHeight) {
    row++
    col = 0
  }

  if(sudokuValues[row][col] > 0) return solveSudoku(sudokuValues, row, col + 1, boxWidth, boxHeight);

  for(let num = 1; num <= boxWidth * boxHeight; num++) {
    if(isSafeSquareValue(sudokuValues, row, col, num, boxWidth, boxHeight)) {
      // Assigning the num in the current (row,col)
      // position of the grid and assuming our assigned num
      // in the position is correct
      sudokuValues[row][col] = num;

      if (solveSudoku(sudokuValues, row, col + 1, boxWidth, boxHeight)) return true
    }

      // Removing the assigned num, since our assumption
      // was wrong, and we go for next assumption with different num value
      sudokuValues[row][col] = 0;
  }
}

export function isSafeSquareValue(sudokuValues: Array<Array<number>>, row: number, col: number, num: number, boxWidth: number, boxHeight: number) {
  // check if the same number is in the row
  for(let i = 0; i < boxWidth * boxHeight; i++) {
    if(sudokuValues[row][i] === num) return false
  }

  // check if the same number is in the column
  for(let i = 0; i < boxWidth * boxHeight; i++) {
    if(sudokuValues[i][col] === num) return false
  }

  // check if the same number is in the box
  const startRow = row - (row % boxHeight);
	const startCol = col - (col % boxWidth);
  for(let i = 0; i < boxHeight; i++) {
    for(let j = 0; j < boxWidth; j++) {
      if(sudokuValues[i + startRow][j + startCol] === num) return false
    }
  }

  return true
}