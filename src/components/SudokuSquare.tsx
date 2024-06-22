import { Color } from "react-color";
import { HighlightDirection } from "../App";
import { useState } from "react";

interface Props {
  squareId: number;
  squareValue: number;
  squareColor: Color;
  boxWidth: number;
  boxHeight: number;
  boxWidthHeightPx: number;
  handleHoverChange: (squareId: number, direction: HighlightDirection) => void;
  handleClick: (squareId: number, direction: HighlightDirection) => void;
  textStyle: object;
}

const SudokuSquare = ({
  squareId,
  squareValue,
  squareColor,
  boxWidth,
  boxHeight,
  boxWidthHeightPx,
  handleHoverChange,
  handleClick,
  textStyle,
}: Props) => {
  const clickIsDragTreshold = 3;
  const [cursorPosOnMouseDown, setCursorPosOnMouseDown] = useState([0, 0]);

  const squareStyle: React.CSSProperties = {
    width: boxWidthHeightPx,
    height: boxWidthHeightPx,
  };

  const textMargins: React.CSSProperties = {};

  // makes some parts of the squares's borders thicker if needed to show the box it is in
  if (Math.floor(squareId / (boxWidth * boxHeight)) % boxHeight == 0) {
    squareStyle.borderTop = "solid black 2px";
    textMargins.marginTop = "-1.5px";
  }
  if (squareId % boxWidth == 0) {
    squareStyle.borderLeft = "solid black 2px";
    textMargins.marginLeft = "-1.5px";
  }
  if (
    Math.floor(squareId / (boxWidth * boxHeight)) % boxHeight ==
    boxHeight - 1
  ) {
    squareStyle.borderBottom = "solid black 2px";
    textMargins.marginBottom = "-1.5px";
  }
  if (squareId % boxWidth == boxWidth - 1) {
    squareStyle.borderRight = "solid black 2px";
    textMargins.marginRight = "-1.5px";
  }

  if (
    Math.floor(squareId / (boxWidth * boxHeight) + 1) %
      (boxWidth * boxHeight) ==
    0
  ) {
    //squareStyle.borderBottom = "solid black 3px";
    //textMargins.marginBottom = "-1.5px";
  }
  if ((squareId + 1) % (boxWidth * boxHeight) == 0) {
    //squareStyle.borderRight = "solid black 3px";
    //textMargins.marginRight = "-1.5px";
  }

  squareStyle.backgroundColor = squareColor.toString();

  /*const handleOnMouseEnter = (e: React.MouseEvent) => {
    let currentTargetRect = e.currentTarget.getBoundingClientRect();
    const event_offsetX = e.pageX - currentTargetRect.left;
    const event_offsetY = e.pageY - currentTargetRect.top;
    console.log(event_offsetX, event_offsetY);
    if (Math.abs(event_offsetX) > Math.abs(event_offsetY)) {
      handleHoverChange(squareId, "vertical");
    } else {
      handleHoverChange(squareId, "horizontal");
    }
  };*/

  const handleOnMouseMove = (e: React.MouseEvent) => {
    let currentTargetRect = e.currentTarget.getBoundingClientRect();
    const event_offsetX =
      e.pageX - (currentTargetRect.left + currentTargetRect.right) / 2;
    const event_offsetY =
      e.pageY - (currentTargetRect.top + currentTargetRect.bottom) / 2;

    if (Math.abs(event_offsetX) > Math.abs(event_offsetY)) {
      handleHoverChange(squareId, HighlightDirection.HORIZONTAL);
    } else {
      handleHoverChange(squareId, HighlightDirection.VERTICAL);
    }
  };

  const handleOnMouseLeave = () => {
    handleHoverChange(squareId, HighlightDirection.NONE);
  };

  const handleClickHelper = (e: React.MouseEvent) => {
    if (
      Math.abs(cursorPosOnMouseDown[0] - e.clientX) > clickIsDragTreshold ||
      Math.abs(cursorPosOnMouseDown[1] - e.clientY) > clickIsDragTreshold
    )
      return;

    let currentTargetRect = e.currentTarget.getBoundingClientRect();
    const event_offsetX =
      e.pageX - (currentTargetRect.left + currentTargetRect.right) / 2;
    const event_offsetY =
      e.pageY - (currentTargetRect.top + currentTargetRect.bottom) / 2;

    if (Math.abs(event_offsetX) > Math.abs(event_offsetY)) {
      handleClick(squareId, HighlightDirection.HORIZONTAL);
    } else {
      handleClick(squareId, HighlightDirection.VERTICAL);
    }
  };

  const handleOnMouseDown = (e: React.MouseEvent) => {
    setCursorPosOnMouseDown([e.clientX, e.clientY]);
  };

  return (
    <div
      className="gridSquare"
      style={squareStyle}
      onMouseMove={handleOnMouseMove}
      onMouseLeave={handleOnMouseLeave}
      onClick={handleClickHelper}
      onMouseDown={handleOnMouseDown}
    >
      <p
        style={{
          ...textMargins,
          ...textStyle,
        }}
      >
        {squareValue != 0 ? squareValue : ""}
      </p>
    </div>
  );
};

export default SudokuSquare;
