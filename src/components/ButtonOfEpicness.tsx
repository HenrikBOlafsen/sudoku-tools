import { useState } from "react";

const ButtonOfEpicness = () => {
  const [clickCount, setClickCount] = useState(0);

  return (
    <button
      type="button"
      className="btn btn-primary"
      onClick={() => {
        setClickCount(clickCount + 1);
      }}
    >
      Do epic epic {<span>{"epic ".repeat(clickCount)}</span>}
    </button>
  );
};

export default ButtonOfEpicness;
