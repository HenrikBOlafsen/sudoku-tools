import { createEmptySudokuValues } from "../sudokuUtils";

export function rotateSudokuClockwise(sudokuValues: Array<Array<number>>) {
  const newSudokuValues = createEmptySudokuValues(sudokuValues.length);
  for (let i = 0; i < sudokuValues.length; i++) {
    for (let j = 0; j < sudokuValues.length; j++) {
      newSudokuValues[j][i] = sudokuValues[sudokuValues.length - i - 1][j];
    }
  }

  return newSudokuValues;
}

export function rotateSudokuCounterclockwise(
  sudokuValues: Array<Array<number>>
) {
  const newSudokuValues = createEmptySudokuValues(sudokuValues.length);
  for (let i = 0; i < sudokuValues.length; i++) {
    for (let j = 0; j < sudokuValues.length; j++) {
      newSudokuValues[j][i] = sudokuValues[i][sudokuValues.length - j - 1];
    }
  }

  return newSudokuValues;
}

export function mirrorSudokuHorizontally(sudokuValues: Array<Array<number>>) {
  const newSudokuValues = createEmptySudokuValues(sudokuValues.length);
  for (let i = 0; i < sudokuValues.length; i++) {
    for (let j = 0; j < sudokuValues.length; j++) {
      newSudokuValues[i][j] = sudokuValues[i][sudokuValues.length - j - 1];
    }
  }

  return newSudokuValues;
}

export function mirrorSudokuVertically(sudokuValues: Array<Array<number>>) {
  const newSudokuValues = createEmptySudokuValues(sudokuValues.length);
  for (let i = 0; i < sudokuValues.length; i++) {
    for (let j = 0; j < sudokuValues.length; j++) {
      newSudokuValues[i][j] = sudokuValues[sudokuValues.length - i - 1][j];
    }
  }

  return newSudokuValues;
}

export function switchRows(
  sudokuValues: Array<Array<number>>,
  row1: number,
  row2: number
) {
  const newSudokuValues = createEmptySudokuValues(sudokuValues.length);
  for (let i = 0; i < sudokuValues.length; i++) {
    for (let j = 0; j < sudokuValues.length; j++) {
      if (i == row1) {
        newSudokuValues[i][j] = sudokuValues[row2][j];
      } else if (i == row2) {
        newSudokuValues[i][j] = sudokuValues[row1][j];
      } else {
        newSudokuValues[i][j] = sudokuValues[i][j];
      }
    }
  }

  return newSudokuValues;
}

export function switchColumns(
  sudokuValues: Array<Array<number>>,
  column1: number,
  column2: number
) {
  const newSudokuValues = createEmptySudokuValues(sudokuValues.length);
  for (let i = 0; i < sudokuValues.length; i++) {
    for (let j = 0; j < sudokuValues.length; j++) {
      if (j == column1) {
        newSudokuValues[i][j] = sudokuValues[i][column2];
      } else if (j == column2) {
        newSudokuValues[i][j] = sudokuValues[i][column1];
      } else {
        newSudokuValues[i][j] = sudokuValues[i][j];
      }
    }
  }

  return newSudokuValues;
}

export function switchBoxRows(
  sudokuValues: Array<Array<number>>,
  boxRow1: number,
  boxRow2: number,
  sudokuBoxHeight: number
) {
  const newSudokuValues = createEmptySudokuValues(sudokuValues.length);
  for (let i = 0; i < sudokuValues.length; i++) {
    for (let j = 0; j < sudokuValues.length; j++) {
      if (Math.floor(i / sudokuBoxHeight) == boxRow1) {
        newSudokuValues[i][j] =
          sudokuValues[boxRow2 * sudokuBoxHeight + (i % sudokuBoxHeight)][j];
      } else if (Math.floor(i / sudokuBoxHeight) == boxRow2) {
        newSudokuValues[i][j] =
          sudokuValues[boxRow1 * sudokuBoxHeight + (i % sudokuBoxHeight)][j];
      } else {
        newSudokuValues[i][j] = sudokuValues[i][j];
      }
    }
  }

  return newSudokuValues;
}

export function switchBoxColumns(
  sudokuValues: Array<Array<number>>,
  boxColumn1: number,
  boxColumn2: number,
  sudokuBoxWidth: number
) {
  const newSudokuValues = createEmptySudokuValues(sudokuValues.length);
  for (let i = 0; i < sudokuValues.length; i++) {
    for (let j = 0; j < sudokuValues.length; j++) {
      if (Math.floor(j / sudokuBoxWidth) == boxColumn1) {
        newSudokuValues[i][j] =
          sudokuValues[i][boxColumn2 * sudokuBoxWidth + (j % sudokuBoxWidth)];
      } else if (Math.floor(j / sudokuBoxWidth) == boxColumn2) {
        newSudokuValues[i][j] =
          sudokuValues[i][boxColumn1 * sudokuBoxWidth + (j % sudokuBoxWidth)];
      } else {
        newSudokuValues[i][j] = sudokuValues[i][j];
      }
    }
  }

  return newSudokuValues;
}
