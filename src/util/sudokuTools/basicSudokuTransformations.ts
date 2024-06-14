import {
  createEmptySudokuValues,
} from "../sudokuUtils";

export function rotateSudokuClockwise(
  sudokuValues: Array<Array<number>>
) {
  const newSudokuValues = createEmptySudokuValues(sudokuValues.length)
  for(let i = 0; i < sudokuValues.length; i++) {
    for(let j = 0; j < sudokuValues.length; j++) {
      newSudokuValues[j][i] = sudokuValues[sudokuValues.length - i - 1][j]
    }
  }

  return newSudokuValues
}

export function rotateSudokuCounterclockwise(
  sudokuValues: Array<Array<number>>
) {
  const newSudokuValues = createEmptySudokuValues(sudokuValues.length)
  for(let i = 0; i < sudokuValues.length; i++) {
    for(let j = 0; j < sudokuValues.length; j++) {
      newSudokuValues[j][i] = sudokuValues[i][sudokuValues.length - j - 1]
    }
  }

  return newSudokuValues
}

export function mirrorSudokuHorizontally(
  sudokuValues: Array<Array<number>>
) {
  const newSudokuValues = createEmptySudokuValues(sudokuValues.length)
  for(let i = 0; i < sudokuValues.length; i++) {
    for(let j = 0; j < sudokuValues.length; j++) {
      newSudokuValues[i][j] = sudokuValues[i][sudokuValues.length - j - 1]
    }
  }

  return newSudokuValues
}

export function mirrorSudokuVertically(
  sudokuValues: Array<Array<number>>
) {
  const newSudokuValues = createEmptySudokuValues(sudokuValues.length)
  for(let i = 0; i < sudokuValues.length; i++) {
    for(let j = 0; j < sudokuValues.length; j++) {
      newSudokuValues[i][j] = sudokuValues[sudokuValues.length - i - 1][j]
    }
  }

  return newSudokuValues
}