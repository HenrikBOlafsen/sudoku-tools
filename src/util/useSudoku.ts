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
  switchRows,
  switchColumns,
  switchBoxRows,
  switchBoxColumns,
} from "./sudokuTools/basicSudokuTransformations";
import { Color } from "react-color";
import { SudokuAnimations, useSudokuAnimation } from "./useSudokuAnimation";

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
    [0, 0, 0, 8, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 4, 3, 0],
    [5, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 7, 0, 8, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 2, 0, 0, 3, 0, 0, 0, 0],
    [6, 0, 0, 0, 0, 0, 0, 7, 5],
    [0, 0, 3, 4, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 0, 0, 6, 0, 0],
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

  const [selectedSquareId1, setSelectedSquareId1] = useState(-1);

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
  const {
    animationSpeed,
    sudokuAnimationOngoing,
    sudokuStyle,
    sudokuSquaresTextStyle,
    transformationTransitionDuration,
    setAnimationSpeed,
    setOngoingAnimation,
  } = useSudokuAnimation();

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
      direction,
      selectedSquareId1
    );

    if (clickRegistered) {
      /* Maybe check for tool-type here? (and perform transformation?) */
      if (highlightType == 2) {
        performSudokuTransformation(squareId);
      }

      if (highlightType == 1) {
        setSelectedSquareId1(squareId);
        setSelectedSquares(newSudokuHighlight);
      } else {
        setSelectedSquares(
          clearSudokuHighlight(sudokuBoxWidth * sudokuBoxHeight)
        );
        setSelectedSquareId1(-1);
      }
      setHighlightedSquares(
        clearSudokuHighlight(sudokuBoxWidth * sudokuBoxHeight)
      );
    } else {
      setHighlightedSquares(newSudokuHighlight);
    }
  }

  function performSudokuTransformation(squareId: number) {
    let row1 = Math.floor(
      selectedSquareId1 / (sudokuBoxWidth * sudokuBoxHeight)
    );
    let row2 = Math.floor(squareId / (sudokuBoxWidth * sudokuBoxHeight));
    let column1 = Math.floor(
      selectedSquareId1 % (sudokuBoxWidth * sudokuBoxHeight)
    );
    let column2 = Math.floor(squareId % (sudokuBoxWidth * sudokuBoxHeight));
    if (
      selectedTool == SelectableTools.ROW_COLUMN_SWITCH &&
      highlightDirectionLock == HighlightDirection.HORIZONTAL &&
      Math.floor(row1 / sudokuBoxHeight) == Math.floor(row2 / sudokuBoxHeight)
    ) {
      setSudokuValues(switchRows(sudokuValues, row1, row2));
    } else if (
      selectedTool == SelectableTools.ROW_COLUMN_SWITCH &&
      highlightDirectionLock == HighlightDirection.VERTICAL &&
      Math.floor(column1 / sudokuBoxWidth) ==
        Math.floor(column2 / sudokuBoxWidth)
    ) {
      setSudokuValues(switchColumns(sudokuValues, column1, column2));
    }
    if (
      selectedTool == SelectableTools.BOX_ROW_COLUMN_SWITCH &&
      highlightDirectionLock == HighlightDirection.HORIZONTAL
    ) {
      setSudokuValues(
        switchBoxRows(
          sudokuValues,
          Math.floor(row1 / sudokuBoxHeight),
          Math.floor(row2 / sudokuBoxHeight),
          sudokuBoxHeight
        )
      );
    } else if (
      selectedTool == SelectableTools.BOX_ROW_COLUMN_SWITCH &&
      highlightDirectionLock == HighlightDirection.VERTICAL
    ) {
      setSudokuValues(
        switchBoxColumns(
          sudokuValues,
          Math.floor(column1 / sudokuBoxWidth),
          Math.floor(column2 / sudokuBoxWidth),
          sudokuBoxWidth
        )
      );
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
          if (sudokuAnimationOngoing) return;
          setOngoingAnimation(
            SudokuAnimations.MIRROR_SUDOKU_HORIZONTALLY,
            true
          );
          setTimeout(() => {
            setSudokuValues(mirrorSudokuHorizontally(sudokuValues));
            setOngoingAnimation(
              SudokuAnimations.MIRROR_SUDOKU_HORIZONTALLY,
              false
            );
          }, transformationTransitionDuration * 1000);
          break;
        case InstantTools.MIRROR_SUDOKU_VERTICALLY:
          if (sudokuAnimationOngoing) return;
          setOngoingAnimation(SudokuAnimations.MIRROR_SUDOKU_VERTICALLY, true);
          setTimeout(() => {
            setSudokuValues(mirrorSudokuVertically(sudokuValues));
            setOngoingAnimation(
              SudokuAnimations.MIRROR_SUDOKU_VERTICALLY,
              false
            );
          }, transformationTransitionDuration * 1000);
          break;
        case InstantTools.ROTATE_CLOCKWISE:
          if (sudokuAnimationOngoing) return;
          setOngoingAnimation(SudokuAnimations.ROTATE_CLOCKWISE, true);
          setTimeout(() => {
            const prevSudokuBoxWidth = sudokuBoxWidth;
            setSudokuBoxWidth(sudokuBoxHeight);
            setSudokuBoxHeight(prevSudokuBoxWidth);
            setSudokuValues(rotateSudokuClockwise(sudokuValues));
            setOngoingAnimation(SudokuAnimations.ROTATE_CLOCKWISE, false);
          }, transformationTransitionDuration * 1000);
          break;
        case InstantTools.ROTATE_COUNTERCLOCKWISE:
          if (sudokuAnimationOngoing) return;
          setOngoingAnimation(SudokuAnimations.ROTATE_COUNTERCLOCKWISE, true);
          setTimeout(() => {
            const prevSudokuBoxWidth = sudokuBoxWidth;
            setSudokuBoxWidth(sudokuBoxHeight);
            setSudokuBoxHeight(prevSudokuBoxWidth);
            setSudokuValues(rotateSudokuCounterclockwise(sudokuValues));
            setOngoingAnimation(
              SudokuAnimations.ROTATE_COUNTERCLOCKWISE,
              false
            );
          }, transformationTransitionDuration * 1000);
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
