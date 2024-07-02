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
  } = useSudoku();

  return (
    <div id="pageWrapper">
      {sudokuCreationPanelVisible && (
        <SudokuCreationPanel
          defaultBoxWidth={sudokuProperties.sudokuBoxWidth}
          defaultBoxHeight={sudokuProperties.sudokuBoxHeight}
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

      {sudokuProperties.sudokuBoxWidth > 0 &&
        sudokuProperties.sudokuBoxHeight > 0 && (
          <Sudoku
            key={recenterSudokuDirtyHack}
            sudokuProperties={sudokuProperties}
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
          setSudokuColorsEnabled(!sudokuProperties.sudokuColorsEnabled);
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
          sudokuBoxWidth={sudokuProperties.sudokuBoxWidth}
          sudokuBoxHeight={sudokuProperties.sudokuBoxHeight}
          sudokuColors={sudokuProperties.sudokuColors}
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
