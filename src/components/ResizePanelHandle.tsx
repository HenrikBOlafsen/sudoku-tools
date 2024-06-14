import "./ResizePanelHandle.css";

interface Props {
  sideOfPanel: "left" | "right" | "top" | "bottom";
  onMouseDown: () => void;
}

const ResizePanelHandle = ({ sideOfPanel, onMouseDown }: Props) => {
  return (
    <div
      className={"resize-panel-handle-" + sideOfPanel + "-side"}
      onMouseDown={onMouseDown}
    />
  );
};

export default ResizePanelHandle;
