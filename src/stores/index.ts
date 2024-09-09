import { createSignal } from 'solid-js';
import { Cell, Maze } from '../types';
import { generateBaseMaze } from '../utils';

export const sizeSignal = createSignal({ rows: 15, cols: 15 });
const [size] = sizeSignal;
export const mazeSignal = createSignal<Maze>(generateBaseMaze());

export const isSolvingSignal = createSignal(false);

export const currentSignal = createSignal<Cell>({
  visited: false,
  walls: { top: true, right: true, bottom: true, left: true },
  x: 0,
  y: 0,
});
export const solutionSignal = createSignal<Cell[]>([]);
export const finishSignal = createSignal<Cell>({
  visited: false,
  walls: { top: true, right: true, bottom: true, left: true },
  x: size().cols - 1,
  y: size().rows - 1,
});
export const startSignal = createSignal<Cell>({
  visited: false,
  walls: { top: true, right: true, bottom: true, left: true },
  x: 0,
  y: 0,
});
