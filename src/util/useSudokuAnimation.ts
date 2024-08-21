import { useState } from "react";

export const enum SudokuAnimations {
  MIRROR_SUDOKU_HORIZONTALLY = "mirrorSudokuHorizontally",
  MIRROR_SUDOKU_VERTICALLY = "mirrorSudokuVertically",
  ROTATE_CLOCKWISE = "rotateClockwise",
  ROTATE_COUNTERCLOCKWISE = "rotateCounterclockwise",
}

export function useSudokuAnimation() {
  const [animationSpeed, setAnimationSpeed] = useState(1);

  const [animationRotateClockwiseOngoing, setAnimationRotateClockwiseOngoing] =
    useState(false);
  const [
    animationRotateCounterclockwiseOngoing,
    setAnimationRotateCounterclockwiseOngoing,
  ] = useState(false);

  const [
    animationMirrorHorizontallyOngoing,
    setAnimationMirrorHorizontallyOngoing,
  ] = useState(false);

  const [
    animationMirrorVerticallyOngoing,
    setAnimationMirrorVerticallyOngoing,
  ] = useState(false);

  function setOngoingAnimation(
    sudokuAnimation: SudokuAnimations,
    state: boolean
  ) {
    switch (sudokuAnimation) {
      case SudokuAnimations.MIRROR_SUDOKU_HORIZONTALLY:
        setAnimationMirrorHorizontallyOngoing(state);
        break;
      case SudokuAnimations.MIRROR_SUDOKU_VERTICALLY:
        setAnimationMirrorVerticallyOngoing(state);
        break;
      case SudokuAnimations.ROTATE_CLOCKWISE:
        setAnimationRotateClockwiseOngoing(state);
        break;
      case SudokuAnimations.ROTATE_COUNTERCLOCKWISE:
        setAnimationRotateCounterclockwiseOngoing(state);
        break;
    }
  }

  const sudokuAnimationOngoing =
    animationRotateClockwiseOngoing ||
    animationRotateCounterclockwiseOngoing ||
    animationMirrorHorizontallyOngoing ||
    animationMirrorVerticallyOngoing;

  const transformationTransitionDuration =
    animationSpeed !== 0 ? 1 / animationSpeed : 0;

  let sudokuStyle: object = {
    transition: "box-shadow 0s, rotate 0s, transform 0s",
  };
  if (animationRotateClockwiseOngoing) {
    sudokuStyle = {
      transition: `box-shadow ${transformationTransitionDuration}s, rotate ${transformationTransitionDuration}s`,
      transformOrigin: "0% 0%",
      rotate: "90deg",
      boxShadow: "10px -5px 10px #888",
    };
  } else if (animationRotateCounterclockwiseOngoing) {
    sudokuStyle = {
      transition: `box-shadow ${transformationTransitionDuration}s, rotate ${transformationTransitionDuration}s`,
      transformOrigin: "0% 0%",
      rotate: "-90deg",
      boxShadow: "-10px 5px 10px #888",
    };
  } else if (animationMirrorHorizontallyOngoing) {
    sudokuStyle = {
      transition: `box-shadow ${transformationTransitionDuration}s, transform ${transformationTransitionDuration}s`,
      transform: "perspective(800px) translate(-50%, -50%) rotateY(180deg)",
      boxShadow: "-5px 10px 10px #888",
    };
  } else if (animationMirrorVerticallyOngoing) {
    sudokuStyle = {
      transition: `box-shadow ${transformationTransitionDuration}s, transform ${transformationTransitionDuration}s`,
      transform: "perspective(1500px) translate(-50%, -50%) rotateX(180deg)",
      boxShadow: "5px -10px 10px #888",
    };
  }

  let sudokuSquaresTextStyle: object = { transition: "rotate 0s" };
  if (animationRotateClockwiseOngoing) {
    sudokuSquaresTextStyle = {
      transition: `rotate ${transformationTransitionDuration}s`,
      rotate: "-90deg",
    };
  } else if (animationRotateCounterclockwiseOngoing) {
    sudokuSquaresTextStyle = {
      transition: `rotate ${transformationTransitionDuration}s`,
      rotate: "90deg",
    };
  } else if (animationMirrorHorizontallyOngoing) {
    sudokuSquaresTextStyle = {
      transition: `transform ${transformationTransitionDuration}s`,
      transform: "rotateY(180deg)",
    };
  } else if (animationMirrorVerticallyOngoing) {
    sudokuSquaresTextStyle = {
      transition: `transform ${transformationTransitionDuration}s`,
      transform: "rotateX(180deg)",
    };
  }

  return {
    animationSpeed,
    sudokuAnimationOngoing,
    sudokuStyle,
    sudokuSquaresTextStyle,
    transformationTransitionDuration,
    setAnimationSpeed,
    setOngoingAnimation,
  };
}
