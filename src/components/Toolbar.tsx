import ToolbarElement from "./ToolbarElement";
import "./Toolbar.css";
import rowColumnSwitchImage from "../assets/toolsImages/rowColumnSwitchImage.png";
import boxRowColumnSwitchImage from "../assets/toolsImages/boxRowColumnSwitchImage.png";
import mirrorBoxRowColumnImage from "../assets/toolsImages/mirrorBoxRowColumnImage.png";
import mirrorSudokuImage from "../assets/toolsImages/mirrorSudokuImage.png";
import numberSwitchImage from "../assets/toolsImages/numberSwitchImage.png";
import partialNumberSwitchImage from "../assets/toolsImages/partialNumberSwitchImage.png";
import rotateSudokuClockwiseImage from "../assets/toolsImages/rotateSudokuClockwiseImage.png";
import { selectableTools } from "../App";

interface Props {
  selectedTool: selectableTools;
  toolRowColumnSwitch: () => void;
  toolBoxRowColumnSwitch: () => void;
  toolMirrorBoxRowColumn: () => void;
  toolMirrorSudokuHorizontally: () => void;
  toolMirrorSudokuVertically: () => void;
  toolNumberSwitch: () => void;
  toolPartialNumberSwitch: () => void;
  toolRotateClockwise: () => void;
  toolRotateCounterclockwise: () => void;
}

const Toolbar = ({
  selectedTool,
  toolRowColumnSwitch,
  toolBoxRowColumnSwitch,
  toolMirrorBoxRowColumn,
  toolMirrorSudokuHorizontally,
  toolMirrorSudokuVertically,
  toolNumberSwitch,
  toolPartialNumberSwitch,
  toolRotateClockwise,
  toolRotateCounterclockwise,
}: Props) => {
  return (
    <div id="toolbar">
      <ToolbarElement
        alt="row/column switch button"
        src={rowColumnSwitchImage}
        onClick={toolRowColumnSwitch}
        selected={selectedTool === selectableTools.ROW_COLUMN_SWITCH}
      />

      <ToolbarElement
        alt="box row/column switch button"
        src={boxRowColumnSwitchImage}
        onClick={toolBoxRowColumnSwitch}
        selected={selectedTool === selectableTools.BOX_ROW_COLUMN_SWITCH}
      />

      <ToolbarElement
        alt="mirror box row/column button"
        src={mirrorBoxRowColumnImage}
        onClick={toolMirrorBoxRowColumn}
        selected={selectedTool === selectableTools.MIRROR_BOX_ROW_COLUMN}
      />

      <ToolbarElement
        alt="mirror sudoku horizontally button"
        src={mirrorSudokuImage}
        onClick={toolMirrorSudokuHorizontally}
        selected={false}
      />

      <ToolbarElement
        alt="mirror sudoku vertically button"
        src={mirrorSudokuImage}
        onClick={toolMirrorSudokuVertically}
        selected={false}
        rotateImage
      />

      <ToolbarElement
        alt="number switch button"
        src={numberSwitchImage}
        onClick={toolNumberSwitch}
        selected={selectedTool === selectableTools.NUMBER_SWITCH}
      />

      <ToolbarElement
        alt="partial number switch button"
        src={partialNumberSwitchImage}
        onClick={toolPartialNumberSwitch}
        selected={selectedTool === selectableTools.PARTIAL_NUMBER_SWITCH}
      />

      <ToolbarElement
        alt="rotate sudoku clockwise button"
        src={rotateSudokuClockwiseImage}
        onClick={toolRotateClockwise}
        selected={false}
      />

      <ToolbarElement
        alt="rotate sudoku counterclockwise button"
        src={rotateSudokuClockwiseImage}
        onClick={toolRotateCounterclockwise}
        selected={false}
        flipImage
      />
    </div>
  );
};

export default Toolbar;
