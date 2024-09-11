// 0 means not highlighted
// 1 means highlighted
// 2 and up means selected. But 2 is in a different group than 3 and so on

export const enum HighlightModes {
  SQUARE = "square",
  LINE = "line",
  BOX_LINE = "boxLine",
}

export const enum HighlightDirection {
  NONE = "none",
  HORIZONTAL = "horizontal",
  VERTICAL = "vertical",
}

export function clearSudokuHighlight(dimension: number) {
  const newHighlightedSquares = [];
  for (let i = 0; i < dimension; i++) {
    const newRowValues = [];
    for (let j = 0; j < dimension; j++) {
      newRowValues.push(0);
    }
    newHighlightedSquares.push(newRowValues);
  }

  return newHighlightedSquares;
}

export function cloneSudokuHighlight(
  highlightedSquares: Array<Array<number>>,
  excludeHighlightType?: number
) {
  const newHighlightedSquares = [];
  for (let i = 0; i < highlightedSquares.length; i++) {
    const newRowValues = [];
    for (let j = 0; j < highlightedSquares.length; j++) {
      newRowValues.push(
        highlightedSquares[i][j] == excludeHighlightType
          ? 0
          : highlightedSquares[i][j]
      );
    }
    newHighlightedSquares.push(newRowValues);
  }

  return newHighlightedSquares;
}

export function highlightSudokuSquare(
  highlightedSquares: Array<Array<number>>,
  row: number,
  column: number,
  highlightType: number
) {
  const newHighlightedSquares = cloneSudokuHighlight(
    highlightedSquares,
    highlightType
  );
  newHighlightedSquares[row][column] = highlightType;
  return newHighlightedSquares;
}

export function highlightSudokuRow(
  highlightedSquares: Array<Array<number>>,
  row: number,
  highlightType: number
) {
  const newHighlightedSquares = cloneSudokuHighlight(
    highlightedSquares,
    highlightType
  );
  for (let i = 0; i < newHighlightedSquares.length; i++) {
    newHighlightedSquares[row][i] = highlightType;
  }
  return newHighlightedSquares;
}

export function highlightSudokuColumn(
  highlightedSquares: Array<Array<number>>,
  column: number,
  highlightType: number
) {
  const newHighlightedSquares = cloneSudokuHighlight(
    highlightedSquares,
    highlightType
  );
  for (let i = 0; i < newHighlightedSquares.length; i++) {
    newHighlightedSquares[i][column] = highlightType;
  }
  return newHighlightedSquares;
}

export function highlightSudokuBoxRow(
  highlightedSquares: Array<Array<number>>,
  boxRowNr: number,
  boxWidth: number,
  highlightType: number
) {
  console.log(boxRowNr, boxWidth);
  const newHighlightedSquares = cloneSudokuHighlight(
    highlightedSquares,
    highlightType
  );
  for (let row = 0; row < boxWidth; row++) {
    for (let column = 0; column < newHighlightedSquares.length; column++) {
      newHighlightedSquares[boxRowNr * boxWidth + row][column] = highlightType;
    }
  }
  return newHighlightedSquares;
}

export function highlightSudokuBoxColumn(
  highlightedSquares: Array<Array<number>>,
  boxColumnNr: number,
  boxHeight: number,
  highlightType: number
) {
  const newHighlightedSquares = cloneSudokuHighlight(
    highlightedSquares,
    highlightType
  );
  for (let column = 0; column < boxHeight; column++) {
    for (let row = 0; row < newHighlightedSquares.length; row++) {
      newHighlightedSquares[row][boxColumnNr * boxHeight + column] =
        highlightType;
    }
  }
  return newHighlightedSquares;
}

export function calculateNewSudokuHighlight(
  highlightedSquares: Array<Array<number>>,
  sudokuBoxWidth: number,
  sudokuBoxHeight: number,
  squareId: number,
  highlightType: number,
  highlightMode: HighlightModes,
  highlightDirectionLock: HighlightDirection,
  direction: HighlightDirection,
  selectedSquareId1: number
) {
  let newSudokuHighlight: Array<Array<number>> = clearSudokuHighlight(
    sudokuBoxWidth * sudokuBoxHeight
  );

  const actualHighlightDirection =
    highlightDirectionLock != HighlightDirection.NONE
      ? highlightDirectionLock
      : direction;

  if (highlightMode == HighlightModes.SQUARE) {
    if (actualHighlightDirection !== HighlightDirection.NONE) {
      newSudokuHighlight = highlightSudokuSquare(
        highlightedSquares,
        Math.floor(squareId / (sudokuBoxWidth * sudokuBoxHeight)),
        Math.floor(squareId % (sudokuBoxWidth * sudokuBoxHeight)),
        highlightType
      );
    }
  } else if (highlightMode == HighlightModes.LINE) {
    if (actualHighlightDirection === HighlightDirection.HORIZONTAL) {
      // makes you only able to highlight rows in the same bow-row
      if (
        selectedSquareId1 != -1 &&
        Math.floor(
          Math.floor(squareId / (sudokuBoxWidth * sudokuBoxHeight)) /
            sudokuBoxHeight
        ) !=
          Math.floor(
            Math.floor(selectedSquareId1 / (sudokuBoxWidth * sudokuBoxHeight)) /
              sudokuBoxHeight
          )
      ) {
        return newSudokuHighlight;
      }
      newSudokuHighlight = highlightSudokuRow(
        highlightedSquares,
        Math.floor(squareId / (sudokuBoxWidth * sudokuBoxHeight)),
        highlightType
      );
    } else if (actualHighlightDirection === HighlightDirection.VERTICAL) {
      // makes you only able to highlight columns in the same bow-column
      if (
        selectedSquareId1 != -1 &&
        Math.floor(
          Math.floor(squareId % (sudokuBoxWidth * sudokuBoxHeight)) /
            sudokuBoxWidth
        ) !=
          Math.floor(
            Math.floor(selectedSquareId1 % (sudokuBoxWidth * sudokuBoxHeight)) /
              sudokuBoxWidth
          )
      ) {
        return newSudokuHighlight;
      }
      newSudokuHighlight = highlightSudokuColumn(
        highlightedSquares,
        Math.floor(squareId % (sudokuBoxWidth * sudokuBoxHeight)),
        highlightType
      );
    }
  } else if (highlightMode == HighlightModes.BOX_LINE) {
    if (actualHighlightDirection === HighlightDirection.HORIZONTAL) {
      newSudokuHighlight = highlightSudokuBoxRow(
        highlightedSquares,
        Math.floor(
          Math.floor(squareId / (sudokuBoxWidth * sudokuBoxHeight)) /
            sudokuBoxHeight
        ),
        sudokuBoxHeight,
        highlightType
      );
    } else if (actualHighlightDirection === HighlightDirection.VERTICAL) {
      newSudokuHighlight = highlightSudokuBoxColumn(
        highlightedSquares,
        Math.floor(
          Math.floor(squareId % (sudokuBoxWidth * sudokuBoxHeight)) /
            sudokuBoxWidth
        ),
        sudokuBoxWidth,
        highlightType
      );
    }
  }

  return newSudokuHighlight;
}
