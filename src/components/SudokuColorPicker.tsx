import { useState } from "react";
import { ChromePicker, Color } from "react-color";

let colorNumberOffset = 0;
function selectColor(number: number) {
  const hue =
    ((number + colorNumberOffset) * 137.508 + (Math.random() * 10 - 5)) % 360; // use golden angle approximation
  //const saturation = 80 + Math.sin((number * Math.PI) / 6) * 20;
  const lightness =
    75 +
    Math.sin(
      (number * Math.PI * (Math.random() * 10 + 1) + (Math.random() * 10 - 5)) /
        (Math.random() * 10 + 1)
    ) *
      10;
  return `hsl(${hue},100%,${lightness}%)`;
}

interface Props {
  sudokuBoxWidth: number;
  sudokuBoxHeight: number;
  sudokuColors: Array<Color>;
  setSudokuColors: (newSudokuColors: Array<Color>) => void;
  onClickCloseButton: () => void;
}

const SudokuColorPicker = ({
  sudokuBoxWidth,
  sudokuBoxHeight,
  sudokuColors,
  setSudokuColors,
  onClickCloseButton,
}: Props) => {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  const colorsForValues = [];
  for (let i = 0; i < sudokuBoxWidth * sudokuBoxHeight; i++) {
    //console.log(sudokuColors[i].toString());

    colorsForValues.push(
      <div
        key={i}
        onClick={() => setSelectedColorIndex(i)}
        style={{
          backgroundColor: "#fff",
          border: "solid" + (selectedColorIndex == i ? " 3px red" : ""),
          padding: "4px",
        }}
      >
        {i + 1}
        {": "}
        <div
          style={{
            width: "15px",
            height: "15px",
            backgroundColor: sudokuColors[i].toString(),
            display: "inline-block",
            float: "right",
            marginTop: "5px",
            marginRight: "3px",
            border: "solid",
          }}
        ></div>{" "}
      </div>
    );
  }

  return (
    <div
      style={{
        width: "300px",
        height: "300px",
        position: "absolute",
        top: "50%",
        left: "50%",
        scale: "1.2",
        transform: "translate(-50%, -50%)",
      }}
    >
      <button
        onClick={onClickCloseButton}
        style={{
          padding: "5px",
          width: "50px",
          marginBottom: "-2px",
          borderRadius: "10px 10px 0px 0px",
          backgroundColor: "#ddd",
        }}
      >
        <b>X</b>
      </button>
      <div
        style={{
          width: "300px",
          height: "258px",
          backgroundColor: "lightgray",
          border: "solid 2px",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
          }}
        >
          <button
            onClick={() => {
              const newSudokuColors = sudokuColors.slice();
              for (let i = 0; i < newSudokuColors.length; i++) {
                newSudokuColors[i] = "#fff";
              }
              setSudokuColors(newSudokuColors);
            }}
          >
            Clear
          </button>
          <button
            onClick={() => {
              colorNumberOffset = Math.random() * 20;
              const newSudokuColors = sudokuColors.slice();
              for (let i = 0; i < newSudokuColors.length; i++) {
                newSudokuColors[i] = selectColor(i);
              }
              setSudokuColors(newSudokuColors);
            }}
          >
            Generate
          </button>
          <button>Save</button>
          <button>Load</button>
        </div>
        <div
          style={{
            float: "right",
          }}
        >
          {
            <ChromePicker
              color={sudokuColors[selectedColorIndex]}
              onChange={(color) => {
                const newSudokuColors = sudokuColors.slice();
                newSudokuColors[selectedColorIndex] = color.hex;
                setSudokuColors(newSudokuColors);
              }}
              disableAlpha
            />
          }
        </div>
        <div
          id="sudokuColorPicker"
          style={{
            width: "70px",
            height: "89%",
            overflow: "-moz-scrollbars-vertical",
            overflowY: "scroll",
          }}
        >
          {colorsForValues}
        </div>
      </div>
    </div>
  );
};

export default SudokuColorPicker;
