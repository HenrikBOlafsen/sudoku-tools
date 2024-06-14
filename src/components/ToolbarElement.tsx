interface Props {
  src: string;
  alt: string;
  onClick: () => void;
  selected: boolean;
  flipImage?: boolean;
  rotateImage?: boolean;
}

const ToolbarElement = ({
  src,
  alt,
  onClick,
  selected,
  flipImage = false,
  rotateImage = false,
}: Props) => {
  const style = {
    ...(selected ? { boxShadow: "3px 8px 8px #888888" } : {}),
    ...(flipImage ? { scale: "-1 1" } : {}),
    ...(rotateImage ? { rotate: "90deg" } : {}),
  };
  return (
    <img
      src={src}
      alt={alt}
      className="toolbarImage"
      onClick={onClick}
      style={style}
    />
  );
};

export default ToolbarElement;
