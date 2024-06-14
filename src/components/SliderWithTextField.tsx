import { useState } from "react";

interface Props {
  children: React.ReactNode;
  value: number;
  onChange: (newValue: number) => void;
  minValue: number;
  maxValue: number;
  stepSize?: number;
  sliderWidth?: number;
  textFieldWidth?: number;
}

const SliderWithTextField = ({
  children,
  value,
  onChange,
  minValue,
  maxValue,
  stepSize = 1,
  sliderWidth = 155,
  textFieldWidth = 45,
}: Props) => {
  const [hasTrailingDot, setHasTrailingDot] = useState(false);

  const handleRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(parseFloat(event.target.value));
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (
      event.target.value.endsWith(".") &&
      event.target.value
        .substring(0, event.target.value.length - 1)
        .search(/[.]/) == -1 &&
      !Number.isInteger(stepSize)
    )
      setHasTrailingDot(true);
    else setHasTrailingDot(false);

    if (Number.isNaN(parseFloat(event.target.value))) {
      onChange(0);
    } else {
      onChange(parseFloat(event.target.value));
    }
  };

  const handleTextFocusOut = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (
      Number.isNaN(parseFloat(event.target.value)) ||
      parseFloat(event.target.value) < minValue
    ) {
      onChange(minValue);
    } else if (parseFloat(event.target.value) > maxValue) {
      onChange(maxValue);
    }
  };

  return (
    <>
      <label className="form-label">{children}</label>

      <div
        className="align-items-center"
        style={{
          width: sliderWidth + textFieldWidth,
          display: "grid",
          gridTemplateColumns: `${
            sliderWidth / (sliderWidth + textFieldWidth)
          }fr ${textFieldWidth / (sliderWidth + textFieldWidth)}fr`,
        }}
      >
        <input
          type="range"
          min={minValue}
          max={maxValue}
          step={stepSize}
          value={value}
          className="form-range"
          id="sudokuSizeSlider"
          onChange={handleRangeChange}
        />

        <input
          type="text"
          id="boxWidthInputField"
          className="form-control"
          value={(value === 0 ? "" : value) + (hasTrailingDot ? "." : "")}
          style={{ marginLeft: 10, textAlign: "center" }}
          onChange={handleTextChange}
          onBlur={handleTextFocusOut}
        />
      </div>
    </>
  );
};

export default SliderWithTextField;

/*
import React, { useState } from "react";

interface Props {
  children: React.ReactNode;
  minValue?: number;
  maxValue?: number;
  defaultValue?: number;
  value: number;
}

const SliderWithTextField = ({
  children,
  minValue = 0,
  maxValue = 6,
  defaultValue = 3,
}: Props) => {
  const [value, setValue] = useState(defaultValue.toString());
  const [shownValue, setShownValue] = useState(defaultValue.toString());

  const handleRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setValue(inputValue);
    setShownValue(inputValue);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = event.target.value;
    const regExpMinValue = Math.max(0, Math.min(9, minValue));
    const regExpMaxValue = Math.max(0, Math.min(9, maxValue));
    let validInput = inputValue.replace(
      new RegExp(`[^${regExpMinValue}-${regExpMaxValue}]`, "g"),
      ""
    );

    if (validInput.length > maxValue.toString().length) {
      validInput = validInput.slice(1);
      setShownValue(validInput);
      setValue(validInput);
    }

    // If the input value is empty, set it to the minimum value of the range
    else if (validInput === "") {
      setValue(minValue.toString());
      setShownValue("");
    } else if (parseInt(validInput) > maxValue) {
      setValue(maxValue.toString());
      setShownValue(validInput);
    } else {
      setValue(validInput);
      setShownValue(validInput);
    }
  };

  const handleTextFocusOut = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === "") {
      setValue(minValue.toString());
      setShownValue(minValue.toString());
    } else if (parseInt(event.target.value) > maxValue) {
      setValue(maxValue.toString());
      setShownValue(maxValue.toString());
    }
  };

  return (
    <>
      <label className="form-label">{children}</label>

      <div
        className="align-items-center"
        style={{
          width: 200,
          display: "grid",
          gridTemplateColumns: "3.5fr 1fr",
        }}
      >
        <input
          type="range"
          min={minValue}
          max={maxValue}
          value={value}
          className="form-range"
          id="sudokuSizeSlider"
          onChange={handleRangeChange}
        />

        <input
          type="text"
          id="boxWidthInputField"
          className="form-control"
          value={shownValue}
          style={{ marginLeft: 10, textAlign: "center" }}
          onChange={handleTextChange}
          onBlur={handleTextFocusOut}
        />
      </div>
    </>
  );
};

export default SliderWithTextField;
*/
