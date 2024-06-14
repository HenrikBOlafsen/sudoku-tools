
// 0 means not highlighted
// 1 means highlighted
// 2 and up means selected. But 2 is in a different group than 3 and so on

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

export function cloneSudokuHighlight(highlightedSquares: Array<Array<number>>, excludeHighlightType?: number) {
  const newHighlightedSquares = [];
  for (let i = 0; i < highlightedSquares.length; i++) {
    const newRowValues = [];
    for (let j = 0; j < highlightedSquares.length; j++) {
      newRowValues.push(highlightedSquares[i][j] == excludeHighlightType? 0 : highlightedSquares[i][j]);
    }
    newHighlightedSquares.push(newRowValues);
  }

  return newHighlightedSquares;
}

export function highlightSudokuSquare(highlightedSquares: Array<Array<number>>, row: number, column: number, highlightType: number) {
  const newHighlightedSquares = cloneSudokuHighlight(highlightedSquares, highlightType)
  newHighlightedSquares[row][column] = highlightType
  return newHighlightedSquares
}

export function highlightSudokuRow(highlightedSquares: Array<Array<number>>, row: number, highlightType: number) {
  const newHighlightedSquares = cloneSudokuHighlight(highlightedSquares, highlightType)
  for(let i = 0; i < newHighlightedSquares.length; i++) {
    newHighlightedSquares[row][i] = highlightType
  }
  return newHighlightedSquares
}

export function highlightSudokuColumn(highlightedSquares: Array<Array<number>>, column: number, highlightType: number) {
  const newHighlightedSquares = cloneSudokuHighlight(highlightedSquares, highlightType)
  for(let i = 0; i < newHighlightedSquares.length; i++) {
    newHighlightedSquares[i][column] = highlightType
  }
  return newHighlightedSquares
}

export function highlightSudokuBoxRow(highlightedSquares: Array<Array<number>>, boxRowNr: number, boxWidth: number, highlightType: number) {
  console.log(boxRowNr, boxWidth);
  const newHighlightedSquares = cloneSudokuHighlight(highlightedSquares, highlightType)
  for(let row = 0; row < boxWidth; row++) {
    for(let column = 0; column < newHighlightedSquares.length; column++) {
      newHighlightedSquares[boxRowNr * boxWidth + row][column] = highlightType
    }
  }
  return newHighlightedSquares
}

export function highlightSudokuBoxColumn(highlightedSquares: Array<Array<number>>, boxColumnNr: number, boxHeight: number, highlightType: number) {
  const newHighlightedSquares = cloneSudokuHighlight(highlightedSquares, highlightType)
  for(let column = 0; column < boxHeight; column++) {
    for(let row = 0; row < newHighlightedSquares.length; row++) {
      newHighlightedSquares[row][boxColumnNr * boxHeight + column] = highlightType
    }
  }
  return newHighlightedSquares
}