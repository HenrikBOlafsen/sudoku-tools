import SudokuSquare from "./SudokuSquare";
import { Color } from "react-color";
import { HighlightDirection } from "../App";

interface Props {
  rowId: number;
  rowValues: Array<number>;
  highlightedSquaresInRow: Array<number>;
  selectedSquaresInRow: Array<number>;
  boxWidth: number;
  boxHeight: number;
  boxWidthHeightPx: number;
  sudokuColors: Array<Color>;
  squareHandleHoverChange: (
    squareId: number,
    direction: HighlightDirection
  ) => void;
  squareHandleClick: (squareId: number, direction: HighlightDirection) => void;
  squaresTextStyle: object;
}

const SudokuRow = ({
  rowId,
  rowValues,
  highlightedSquaresInRow,
  selectedSquaresInRow,
  boxWidth,
  boxHeight,
  boxWidthHeightPx,
  sudokuColors,
  squareHandleHoverChange,
  squareHandleClick,
  squaresTextStyle,
}: Props) => {
  const rowSquares = [];

  // to give every square in the sudoku a unique id, we don't always start i at 0 but
  // rather increase the start value of i by boxWidth * boxHeight per row
  // so if we have a standard 9x9 sudoku and it is row 0 then it i will go from 0 to 8, and then if it is row 1 it will then go form 9 to 17 and so on

  /*console.log(
    rowId * boxWidth * boxHeight,
    rowId * boxWidth * boxHeight + boxWidth * boxHeight
  );*/

  for (
    let i = rowId * boxWidth * boxHeight;
    i < rowId * boxWidth * boxHeight + boxWidth * boxHeight;
    i++
  ) {
    const squareValue = rowValues[i % (boxWidth * boxHeight)];
    const highlightType = highlightedSquaresInRow[i % (boxWidth * boxHeight)];
    const selectionType = selectedSquaresInRow[i % (boxWidth * boxHeight)];
    rowSquares.push(
      <SudokuSquare
        key={i}
        squareId={i}
        squareValue={squareValue}
        squareColor={
          highlightType === 1 || selectionType === 1
            ? "#faa"
            : highlightType === 2 || selectionType === 2
            ? "#aaf"
            : squareValue > 0
            ? sudokuColors[squareValue - 1]
            : "#fff"
        }
        boxWidth={boxWidth}
        boxHeight={boxHeight}
        boxWidthHeightPx={boxWidthHeightPx}
        handleHoverChange={squareHandleHoverChange}
        handleClick={squareHandleClick}
        textStyle={squaresTextStyle}
      />
    );
  }

  return <div className="sudokuRow">{rowSquares}</div>;
};

export default SudokuRow;
