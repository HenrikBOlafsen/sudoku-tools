import ToolbarElement from "./ToolbarElement";
import "./Toolbar.css";
import rowColumnSwitchImage from "../assets/toolsImages/rowColumnSwitchImage.png";
import boxRowColumnSwitchImage from "../assets/toolsImages/boxRowColumnSwitchImage.png";
import mirrorBoxRowColumnImage from "../assets/toolsImages/mirrorBoxRowColumnImage.png";
import mirrorSudokuImage from "../assets/toolsImages/mirrorSudokuImage.png";
import numberSwitchImage from "../assets/toolsImages/numberSwitchImage.png";
import partialNumberSwitchImage from "../assets/toolsImages/partialNumberSwitchImage.png";
import rotateSudokuClockwiseImage from "../assets/toolsImages/rotateSudokuClockwiseImage.png";
import { InstantTools, SelectableTools } from "../App";

interface Props {
  selectedTool: SelectableTools;
  toolSelect: (tool: SelectableTools | InstantTools) => void;
}

const Toolbar = ({ selectedTool, toolSelect }: Props) => {
  return (
    <div id="toolbar">
      <ToolbarElement
        alt="row/column switch button"
        src={rowColumnSwitchImage}
        onClick={() => toolSelect(SelectableTools.ROW_COLUMN_SWITCH)}
        selected={selectedTool === SelectableTools.ROW_COLUMN_SWITCH}
      />

      <ToolbarElement
        alt="box row/column switch button"
        src={boxRowColumnSwitchImage}
        onClick={() => toolSelect(SelectableTools.BOX_ROW_COLUMN_SWITCH)}
        selected={selectedTool === SelectableTools.BOX_ROW_COLUMN_SWITCH}
      />

      <ToolbarElement
        alt="mirror box row/column button"
        src={mirrorBoxRowColumnImage}
        onClick={() => toolSelect(SelectableTools.MIRROR_BOX_ROW_COLUMN)}
        selected={selectedTool === SelectableTools.MIRROR_BOX_ROW_COLUMN}
      />

      <ToolbarElement
        alt="mirror sudoku horizontally button"
        src={mirrorSudokuImage}
        onClick={() => toolSelect(InstantTools.MIRROR_SUDOKU_HORIZONTALLY)}
        selected={false}
      />

      <ToolbarElement
        alt="mirror sudoku vertically button"
        src={mirrorSudokuImage}
        onClick={() => toolSelect(InstantTools.MIRROR_SUDOKU_VERTICALLY)}
        selected={false}
        rotateImage
      />

      <ToolbarElement
        alt="number switch button"
        src={numberSwitchImage}
        onClick={() => toolSelect(SelectableTools.NUMBER_SWITCH)}
        selected={selectedTool === SelectableTools.NUMBER_SWITCH}
      />

      <ToolbarElement
        alt="partial number switch button"
        src={partialNumberSwitchImage}
        onClick={() => toolSelect(SelectableTools.PARTIAL_NUMBER_SWITCH)}
        selected={selectedTool === SelectableTools.PARTIAL_NUMBER_SWITCH}
      />

      <ToolbarElement
        alt="rotate sudoku clockwise button"
        src={rotateSudokuClockwiseImage}
        onClick={() => toolSelect(InstantTools.ROTATE_CLOCKWISE)}
        selected={false}
      />

      <ToolbarElement
        alt="rotate sudoku counterclockwise button"
        src={rotateSudokuClockwiseImage}
        onClick={() => toolSelect(InstantTools.ROTATE_COUNTERCLOCKWISE)}
        selected={false}
        flipImage
      />
    </div>
  );
};

export default Toolbar;
