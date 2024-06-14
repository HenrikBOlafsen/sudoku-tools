import { useState } from "react";
import SliderWithTextField from "./SliderWithTextField";

interface Props {
  defaultBoxWidth: number;
  defaultBoxHeight: number;
  onDismiss: () => void;
  onCreateSudoku: (
    boxWidth: number,
    boxHeight: number,
    shouldBeNeutral: boolean,
    shouldBeFilled: boolean
  ) => void;
}

const SudokuCreationPanel = ({
  defaultBoxWidth,
  defaultBoxHeight,
  onDismiss,
  onCreateSudoku,
}: Props) => {
  const [newBoxWidth, setNewBoxWidth] = useState(defaultBoxWidth);
  const [newBoxHeight, setNewBoxHeight] = useState(defaultBoxHeight);
  const [shouldBeNeutral, setShouldBeNeutral] = useState(false);
  const [shouldBeFilled, setShouldBeFilled] = useState(false);

  return (
    <div id="sudokuCreationPanel">
      <button
        type="button"
        className="btn-close"
        aria-label="Close"
        onClick={onDismiss}
        style={{ float: "left" }}
      ></button>
      <br />
      <div style={{ paddingLeft: 50, paddingRight: 50 }}>
        <h4>New sudoku:</h4>

        <br />
        <SliderWithTextField
          value={newBoxWidth}
          onChange={setNewBoxWidth}
          minValue={1}
          maxValue={6}
        >
          Box Width:
        </SliderWithTextField>

        <SliderWithTextField
          value={newBoxHeight}
          onChange={setNewBoxHeight}
          minValue={1}
          maxValue={6}
        >
          Box Height:
        </SliderWithTextField>
        <br />

        <input
          className="form-check-input"
          type="checkbox"
          id="flexCheckDefault"
          onChange={(e) => setShouldBeNeutral(e.target.checked)}
        />
        <label className="form-check-label">&ensp; Neutral</label>
        <br />

        <input
          className="form-check-input"
          type="checkbox"
          id="flexCheckDefault"
          onChange={(e) => setShouldBeFilled(e.target.checked)}
        />
        <label className="form-check-label">&ensp; Filled</label>

        <br />
        <br />
        <br />

        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={() =>
            onCreateSudoku(
              newBoxWidth,
              newBoxHeight,
              shouldBeNeutral,
              shouldBeFilled
            )
          }
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default SudokuCreationPanel;
