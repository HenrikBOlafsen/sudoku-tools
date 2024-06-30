import { useState } from "react";
import SettingsPanel from "./components/SettingsPanel";
import SudokuCreationPanel from "./components/SudokuCreationPanel";
import Sudoku from "./components/Sudoku";
import Toolbar from "./components/Toolbar";
import { HighlightDirection } from "./util/sudokuHighlightingUtils";
import SudokuColorPicker from "./components/SudokuColorPicker";
import { useSudoku } from "./util/useSudoku";

function App() {
  const [sudokuCreationPanelVisible, setSudokuCreationPanelVisibility] =
    useState(false);
  const [sudokuColorPickerVisible, setSudokuColorPickerVisibility] =
    useState(false);

  const {
    sudokuBoxWidth,
    sudokuBoxHeight,
    sudokuValues,
    highlightedSquares,
    selectedSquares,
    selectedTool,
    highlightType,
    highlightDirectionLock,
    sudokuColors,
    sudokuColorsEnabled,
    recenterSudokuDirtyHack,
    animationSpeed,
    sudokuStyle,
    sudokuSquaresTextStyle,
    handleSudokuSquareHighlighting,
    handleSudokuCreation,
    onToolSelected,
    setSudokuColors,
    setSudokuColorsEnabled,
    setAnimationSpeed,
    setHighlightDirectionLock,
    setHighlightType,
    setRecenterSudokuDirtyHack,
  } = useSudoku();

  return (
    <div id="pageWrapper">
      {sudokuCreationPanelVisible && (
        <SudokuCreationPanel
          defaultBoxWidth={sudokuBoxWidth}
          defaultBoxHeight={sudokuBoxHeight}
          onDismiss={() => setSudokuCreationPanelVisibility(false)}
          onCreateSudoku={(
            boxWidth: number,
            boxHeight: number,
            shouldBeNeutral: boolean,
            shouldBeFilled: boolean
          ) => {
            handleSudokuCreation(
              boxWidth,
              boxHeight,
              shouldBeNeutral,
              shouldBeFilled
            );
            setSudokuCreationPanelVisibility(false);
          }}
        />
      )}

      {sudokuBoxWidth > 0 && sudokuBoxHeight > 0 && (
        <Sudoku
          key={recenterSudokuDirtyHack}
          boxWidth={sudokuBoxWidth}
          boxHeight={sudokuBoxHeight}
          sudokuValues={sudokuValues}
          highlightedSquares={highlightedSquares}
          selectedSquares={selectedSquares}
          sudokuColors={
            sudokuColorsEnabled ? sudokuColors : new Array(36).fill("#fff")
          }
          squareHandleHoverChange={(squareId, direction) => {
            handleSudokuSquareHighlighting(squareId, direction, false);
          }}
          squareHandleClick={(squareId, direction) => {
            handleSudokuSquareHighlighting(squareId, direction, true);
            if (highlightType == 1) {
              setHighlightDirectionLock(direction);
            } else if (highlightDirectionLock !== HighlightDirection.NONE) {
              setHighlightDirectionLock(HighlightDirection.NONE);
            }
            setHighlightType((highlightType % 2) + 1);
          }}
          sudokuStyle={sudokuStyle}
          squaresTextStyle={sudokuSquaresTextStyle}
        />
      )}

      <SettingsPanel
        animationSpeed={animationSpeed}
        onClickOpenSudokuCreation={() =>
          setSudokuCreationPanelVisibility(!sudokuCreationPanelVisible)
        }
        onClickOpenSudokuColorPicker={() =>
          setSudokuColorPickerVisibility(!sudokuColorPickerVisible)
        }
        onSudokuColorsToggle={() => {
          setSudokuColorsEnabled(!sudokuColorsEnabled);
        }}
        onAnimationSpeedChanged={setAnimationSpeed}
      ></SettingsPanel>

      <button
        type="button"
        className="btn btn-primary btn-sm"
        style={{
          width: "70px",
          height: "25px",
          position: "absolute",
          top: "30px",
          left: "50%",
          scale: "1.2",
          transform: "translate(-50%, -50%)",
          fontSize: "12px",
        }}
        onClick={() => setRecenterSudokuDirtyHack(recenterSudokuDirtyHack + 1)}
      >
        Recenter
      </button>

      {sudokuColorPickerVisible ? (
        <SudokuColorPicker
          sudokuBoxWidth={sudokuBoxWidth}
          sudokuBoxHeight={sudokuBoxHeight}
          sudokuColors={sudokuColors}
          setSudokuColors={(newSudokuColors) => {
            setSudokuColors(newSudokuColors);
          }}
          onClickCloseButton={() => setSudokuColorPickerVisibility(false)}
        />
      ) : null}

      <Toolbar
        selectedTool={selectedTool}
        toolSelect={onToolSelected}
      ></Toolbar>
    </div>
  );
}

export default App;
