import { useEffect, useState } from "react";
import {
  createEmptySudokuValues,
  createTheNeutralSudokuValues,
  solveSudoku,
} from "./sudokuUtils";
import {
  HighlightModes,
  HighlightDirection,
  clearSudokuHighlight,
  calculateNewSudokuHighlight,
} from "./sudokuHighlightingUtils";
import {
  rotateSudokuClockwise,
  rotateSudokuCounterclockwise,
  mirrorSudokuHorizontally,
  mirrorSudokuVertically,
} from "./sudokuTools/basicSudokuTransformations";
import { Color } from "react-color";

export enum SelectableTools {
  ROW_COLUMN_SWITCH = "rowColumnSwitch",
  BOX_ROW_COLUMN_SWITCH = "boxRowColumnSwitch",
  MIRROR_BOX_ROW_COLUMN = "mirrorBoxRowColumn",
  NUMBER_SWITCH = "numberSwitch",
  PARTIAL_NUMBER_SWITCH = "partialNumberSwitch",
}

export const enum InstantTools {
  MIRROR_SUDOKU_HORIZONTALLY = "mirrorSudokuHorizontally",
  MIRROR_SUDOKU_VERTICALLY = "mirrorSudokuVertically",
  ROTATE_CLOCKWISE = "rotateClockwise",
  ROTATE_COUNTERCLOCKWISE = "rotateCounterclockwise",
}

export interface SudokuProperties {
  sudokuBoxWidth: number;
  sudokuBoxHeight: number;
  sudokuValues: number[][];
  highlightedSquares: number[][];
  selectedSquares: number[][];
  sudokuColors: Array<Color>;
  sudokuColorsEnabled: boolean;
  sudokuStyle: React.CSSProperties;
  sudokuSquaresTextStyle: React.CSSProperties;
}

export function useSudoku() {
  const [sudokuBoxWidth, setSudokuBoxWidth] = useState(3);
  const [sudokuBoxHeight, setSudokuBoxHeight] = useState(3);

  const [sudokuValues, setSudokuValues] = useState([
    [1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 3, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 4, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 5, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 6, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 7, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 8, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 9],
  ]);

  const [highlightedSquares, setHighlightedSquares] = useState(
    clearSudokuHighlight(sudokuBoxWidth * sudokuBoxHeight)
  );

  const [selectedSquares, setSelectedSquares] = useState(
    clearSudokuHighlight(sudokuBoxWidth * sudokuBoxHeight)
  );

  const [selectedTool, setSelectedTool] = useState(
    SelectableTools.ROW_COLUMN_SWITCH
  );
  const [highlightMode, setHighlightMode] = useState(HighlightModes.LINE);
  const [highlightType, setHighlightType] = useState(1);
  const [highlightDirectionLock, setHighlightDirectionLock] =
    useState<HighlightDirection>(HighlightDirection.NONE);

  const defaultSudokuColors = new Array(36).fill("#fff");
  const [sudokuColors, setSudokuColors] =
    useState<Array<Color>>(defaultSudokuColors);

  const [sudokuColorsEnabled, setSudokuColorsEnabled] = useState(true);

  const [recenterSudokuDirtyHack, setRecenterSudokuDirtyHack] = useState(0);

  useEffect(() => {
    switch (selectedTool) {
      case SelectableTools.ROW_COLUMN_SWITCH:
        setHighlightMode(HighlightModes.LINE);
        break;
      case SelectableTools.BOX_ROW_COLUMN_SWITCH:
      case SelectableTools.MIRROR_BOX_ROW_COLUMN:
        setHighlightMode(HighlightModes.BOX_LINE);
        break;
      case SelectableTools.NUMBER_SWITCH:
      case SelectableTools.PARTIAL_NUMBER_SWITCH:
        setHighlightMode(HighlightModes.SQUARE);
    }

    clearSudokuSelection();
  }, [selectedTool]);

  // animation stuff
  const [animationSpeed, setAnimationSpeed] = useState(1);

  const [animationRotateClockwiseOngoing, setAnimationRotateClockwiseOngoing] =
    useState(false);
  const [
    animationRotateCounterclockwiseOngoing,
    setAnimationRotateCounterclockwiseOngoing,
  ] = useState(false);

  const sudokuAnimationOngoing =
    animationRotateClockwiseOngoing || animationRotateCounterclockwiseOngoing;

  const rotateTransitionDuration =
    animationSpeed !== 0 ? 1 / animationSpeed : 0;

  let sudokuStyle: object = { transition: "box-shadow 0s, rotate 0s" };
  if (animationRotateClockwiseOngoing) {
    sudokuStyle = {
      transition: `box-shadow ${rotateTransitionDuration}s, rotate ${rotateTransitionDuration}s`,
      rotate: "90deg",
      boxShadow: "10px -5px 10px #888",
    };
  } else if (animationRotateCounterclockwiseOngoing) {
    sudokuStyle = {
      transition: `box-shadow ${rotateTransitionDuration}s, rotate ${rotateTransitionDuration}s`,
      rotate: "-90deg",
      boxShadow: "-10px 5px 10px #888",
    };
  }

  let sudokuSquaresTextStyle: object = { transition: "rotate 0s" };
  if (animationRotateClockwiseOngoing) {
    sudokuSquaresTextStyle = {
      transition: `rotate ${rotateTransitionDuration}s`,
      rotate: "-90deg",
    };
  } else if (animationRotateCounterclockwiseOngoing) {
    sudokuSquaresTextStyle = {
      transition: `rotate ${rotateTransitionDuration}s`,
      rotate: "90deg",
    };
  }

  function clearSudokuSelection() {
    setHighlightedSquares(
      createEmptySudokuValues(sudokuBoxWidth * sudokuBoxHeight)
    );
    setSelectedSquares(clearSudokuHighlight(sudokuBoxWidth * sudokuBoxHeight));
    setHighlightType(1);
    setHighlightDirectionLock(HighlightDirection.NONE);
  }

  function handleSudokuSquareHighlighting(
    squareId: number,
    direction: HighlightDirection,
    clickRegistered: boolean
  ) {
    let newSudokuHighlight: Array<Array<number>> = calculateNewSudokuHighlight(
      highlightedSquares,
      sudokuBoxWidth,
      sudokuBoxHeight,
      squareId,
      highlightType,
      highlightMode,
      highlightDirectionLock,
      direction
    );

    if (clickRegistered) {
      /* Maybe check for tool-type here? (and perform transformation?) */

      if (highlightType == 1) {
        setSelectedSquares(newSudokuHighlight);
      } else {
        setSelectedSquares(
          clearSudokuHighlight(sudokuBoxWidth * sudokuBoxHeight)
        );
      }
      setHighlightedSquares(
        clearSudokuHighlight(sudokuBoxWidth * sudokuBoxHeight)
      );
    } else {
      setHighlightedSquares(newSudokuHighlight);
    }
  }

  function handleSudokuCreation(
    boxWidth: number,
    boxHeight: number,
    shouldBeNeutral: boolean,
    shouldBeFilled: boolean
  ) {
    setSudokuBoxWidth(boxWidth);
    setSudokuBoxHeight(boxHeight);

    let newSudokuValues: Array<Array<number>> = createEmptySudokuValues(
      boxWidth * boxHeight
    );

    if (shouldBeNeutral) {
      newSudokuValues = createTheNeutralSudokuValues(boxWidth, boxHeight);
    }

    if (shouldBeFilled) {
      solveSudoku(newSudokuValues, 0, 0, boxWidth, boxHeight);
    }

    setSudokuValues(newSudokuValues);
    setHighlightedSquares(createEmptySudokuValues(boxWidth * boxHeight));
    setSelectedSquares(clearSudokuHighlight(boxWidth * boxHeight));
    setRecenterSudokuDirtyHack(recenterSudokuDirtyHack + 1);
  }

  const selectableToolsValues = Object.values(SelectableTools);
  function isSelectableTool(tool: any): tool is SelectableTools {
    return selectableToolsValues.includes(tool);
  }

  function onToolSelected(tool: SelectableTools | InstantTools) {
    if (isSelectableTool(tool)) {
      setSelectedTool(tool);
    } else {
      switch (tool) {
        case InstantTools.MIRROR_SUDOKU_HORIZONTALLY:
          setSudokuValues(mirrorSudokuHorizontally(sudokuValues));
          break;
        case InstantTools.MIRROR_SUDOKU_VERTICALLY:
          setSudokuValues(mirrorSudokuVertically(sudokuValues));
          break;
        case InstantTools.ROTATE_CLOCKWISE:
          if (sudokuAnimationOngoing) return;
          setAnimationRotateClockwiseOngoing(true);
          setTimeout(() => {
            const prevSudokuBoxWidth = sudokuBoxWidth;
            setSudokuBoxWidth(sudokuBoxHeight);
            setSudokuBoxHeight(prevSudokuBoxWidth);
            setSudokuValues(rotateSudokuClockwise(sudokuValues));
            setAnimationRotateClockwiseOngoing(false);
          }, rotateTransitionDuration * 1000);
          break;
        case InstantTools.ROTATE_COUNTERCLOCKWISE:
          if (sudokuAnimationOngoing) return;
          setAnimationRotateCounterclockwiseOngoing(true);
          setTimeout(() => {
            const prevSudokuBoxWidth = sudokuBoxWidth;
            setSudokuBoxWidth(sudokuBoxHeight);
            setSudokuBoxHeight(prevSudokuBoxWidth);
            setSudokuValues(rotateSudokuCounterclockwise(sudokuValues));
            setAnimationRotateCounterclockwiseOngoing(false);
          }, rotateTransitionDuration * 1000);
      }
      clearSudokuSelection();
    }
  }

  const sudokuProperties: SudokuProperties = {
    sudokuBoxWidth: sudokuBoxWidth,
    sudokuBoxHeight: sudokuBoxHeight,
    sudokuValues: sudokuValues,
    highlightedSquares: highlightedSquares,
    selectedSquares: selectedSquares,
    sudokuColors: sudokuColors,
    sudokuColorsEnabled: sudokuColorsEnabled,
    sudokuStyle: sudokuStyle,
    sudokuSquaresTextStyle: sudokuSquaresTextStyle,
  };

  return {
    sudokuProperties,
    selectedTool,
    highlightType,
    highlightDirectionLock,
    recenterSudokuDirtyHack,
    animationSpeed,
    handleSudokuSquareHighlighting,
    handleSudokuCreation,
    onToolSelected,
    setSudokuColors,
    setSudokuColorsEnabled,
    setAnimationSpeed,
    setHighlightDirectionLock,
    setHighlightType,
    setRecenterSudokuDirtyHack,
  };
}
