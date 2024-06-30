import { useEffect, useState } from "react";
import { Color } from "react-color";
import SudokuRow from "./SudokuRow";
import { HighlightDirection } from "../util/sudokuHighlightingUtils";

interface Props {
  boxWidth: number;
  boxHeight: number;
  sudokuValues: Array<Array<number>>;
  highlightedSquares: Array<Array<number>>;
  selectedSquares: Array<Array<number>>;
  sudokuColors: Array<Color>;
  squareHandleHoverChange: (
    squareId: number,
    direction: HighlightDirection
  ) => void;
  squareHandleClick: (squareId: number, direction: HighlightDirection) => void;
  sudokuStyle: object;
  squaresTextStyle: object;
}

const Sudoku = ({
  boxWidth,
  boxHeight,
  sudokuValues,
  highlightedSquares,
  selectedSquares,
  sudokuColors,
  squareHandleHoverChange,
  squareHandleClick,
  sudokuStyle,
  squaresTextStyle,
}: Props) => {
  const boxWidthHeightPx = 42;

  /*useEffect(() => {
    const timer = setTimeout(() => {
      console.log("This will run after 1 second!");
    }, 1000);
    return () => clearTimeout(timer);
  }, []);*/

  const sudokuRows = [];
  for (let i = 0; i < boxWidth * boxHeight; i++) {
    sudokuRows.push(
      <SudokuRow
        key={i}
        rowId={i}
        rowValues={sudokuValues[i]}
        highlightedSquaresInRow={highlightedSquares[i]}
        selectedSquaresInRow={selectedSquares[i]}
        boxWidth={boxWidth}
        boxHeight={boxHeight}
        boxWidthHeightPx={boxWidthHeightPx}
        sudokuColors={sudokuColors}
        squareHandleHoverChange={squareHandleHoverChange}
        squareHandleClick={squareHandleClick}
        squaresTextStyle={squaresTextStyle}
      />
    );
  }

  const [isDragging, setIsDragging] = useState(false);
  const [sudokuPosition, setSudokuPosition] = useState([
    window.innerWidth / 2,
    window.innerHeight / 2,
  ]);
  const [offsetFromMouse, setOffsetFromMouse] = useState([0, 0]);
  const delta = 6;
  let startX: number;
  let startY: number;

  const minSudokuScale = 0.2;
  const maxSudokuScale = 3.0;
  const sudokuScalingSensitivity = 0.006;
  const [sudokuScale, setSudokuScale] = useState(
    Math.max(
      minSudokuScale,
      Math.min(maxSudokuScale, 9 / (boxWidth * boxHeight))
    )
  );

  const handleMouseDown = (e: React.MouseEvent) => {
    startX = e.pageX;
    startY = e.pageY;
    setOffsetFromMouse([
      sudokuPosition[0] - startX,
      sudokuPosition[1] - startY,
    ]);
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const diffX = Math.abs(e.pageX - startX);
    const diffY = Math.abs(e.pageY - startY);
    if (diffX < delta && diffY < delta) return;

    setSudokuPosition([
      e.pageX + offsetFromMouse[0],
      e.pageY + offsetFromMouse[1],
    ]);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove as any);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove as any);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  // to zoom in or out on the sudoku
  const handleWheel = (e: React.WheelEvent) => {
    const newScale = Math.min(
      maxSudokuScale,
      Math.max(
        minSudokuScale,
        sudokuScale + e.deltaY * sudokuScalingSensitivity
      )
    );
    setSudokuScale(newScale);
  };

  return (
    <div
      id="sudokuParent"
      style={{
        width: boxWidthHeightPx * boxWidth * boxHeight,
        height: boxWidthHeightPx * boxWidth * boxHeight,
        top: sudokuPosition[1] > 0 ? sudokuPosition[1] : "50%",
        left: sudokuPosition[0] > 0 ? sudokuPosition[0] : "50%",
        scale: sudokuScale.toString(),
        ...sudokuStyle,
      }}
      onMouseDown={handleMouseDown}
      onWheel={handleWheel}
    >
      <div className="sudokuRow">{sudokuRows}</div>
    </div>
  );
};

export default Sudoku;
