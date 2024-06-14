import { useState, useEffect } from "react";
import ButtonOpenSudokuCreation from "./ButtonOpenSudokuCreation";
import ResizePanelHandle from "./ResizePanelHandle";
import SliderWithTextField from "./SliderWithTextField";

interface Props {
  animationSpeed: number;
  onClickOpenSudokuCreation: () => void;
  onClickOpenSudokuColorPicker: () => void;
  onSudokuColorsToggle: () => void;
  onAnimationSpeedChanged: (newAnimationSpeed: number) => void;
}

const SettingsPanel = ({
  animationSpeed,
  onClickOpenSudokuCreation,
  onClickOpenSudokuColorPicker,
  onSudokuColorsToggle,
  onAnimationSpeedChanged,
}: Props) => {
  const [width, setWidth] = useState(300); // Initial width
  const [isDragging, setIsDragging] = useState(false);
  const minWidth = 230;
  const maxWidth = 700;

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setWidth(Math.max(Math.min(e.clientX, maxWidth), minWidth));
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

  return (
    <div
      className="settings-panel"
      style={{ width: `${width}px`, border: "solid 2px" }}
    >
      <ResizePanelHandle sideOfPanel="right" onMouseDown={handleMouseDown} />

      <h2
        style={{
          fontSize: `min(${width / 8}px, 33px)`,
        }}
      >
        <b>Settings Panel</b>
      </h2>

      <div className="btn-group" role="group" aria-label="Basic example">
        <ButtonOpenSudokuCreation onClick={onClickOpenSudokuCreation}>
          New
        </ButtonOpenSudokuCreation>

        <button type="button" className="btn btn-primary">
          Load
        </button>

        <button type="button" className="btn btn-primary">
          Save
        </button>
      </div>

      <br />
      <br />

      <button type="button" className="btn btn-primary btn-sm">
        Edit sudoku values
      </button>
      <br />
      <button type="button" className="btn btn-primary btn-sm">
        Edit reference sudoku
      </button>

      <br />
      <br />

      <button type="button" className="btn btn-primary btn-sm">
        Start new transformation log
      </button>
      <br />

      <button type="button" className="btn btn-primary btn-sm">
        Save transformation log
      </button>
      <br />

      <button type="button" className="btn btn-primary btn-sm">
        Load and perform transformation log
      </button>
      <br />
      <br />

      <button
        type="button"
        className="btn btn-primary btn-sm"
        onClick={onClickOpenSudokuColorPicker}
      >
        Edit color palette
      </button>

      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="colorsEnabledToggle"
          defaultChecked
          onChange={onSudokuColorsToggle}
        />
        <label
          className="form-check-label"
          htmlFor="colorsEnabledToggle"
          style={{ fontSize: "14px" }}
        >
          Colors enabled
        </label>
      </div>

      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="referenceSudokuColorsToggle"
        />
        <label
          className="form-check-label"
          htmlFor="referenceSudokuColorsToggle"
          style={{ fontSize: "14px" }}
        >
          Reference sudoku colors
        </label>
      </div>

      <br />

      <div style={{ transformOrigin: "left", scale: "0.9 0.9" }}>
        <SliderWithTextField
          value={animationSpeed}
          onChange={onAnimationSpeedChanged}
          minValue={0}
          maxValue={5}
          stepSize={0.1}
          sliderWidth={150}
          textFieldWidth={50}
        >
          Animation Speed
        </SliderWithTextField>
      </div>
      <br />
    </div>
  );
};

export default SettingsPanel;
