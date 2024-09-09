import { sizeSignal } from '../stores';
import { Maze } from '../types';

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function generateBaseMaze(): Maze {
  const [size] = sizeSignal;

  return Array.from({ length: size().rows }, (_, y) =>
    Array.from({ length: size().cols }, (_, x) => ({
      x,
      y,
      visited: false,
      walls: { top: true, right: true, bottom: true, left: true },
    }))
  );
}
