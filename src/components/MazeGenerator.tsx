import { createEffect, createSignal } from 'solid-js';
import {
  currentSignal,
  finishSignal,
  isSolvingSignal,
  mazeSignal,
  sizeSignal,
  solutionSignal,
  startSignal,
} from '../stores';
import { Cell } from '../types';
import { getUnvisitedNeighbors, removeWalls, solveMazeBFS } from '../logic';
import { generateBaseMaze, sleep } from '../utils';
import Input from './ui/input';
import Button from './ui/button';

function MazeGenerator() {
  const [maze, setMaze] = mazeSignal;
  const [current, setCurrent] = currentSignal;
  const [size, setSize] = sizeSignal;
  const [_solution, setSolution] = solutionSignal;
  const [start, setStart] = startSignal;
  const [finish, setFinish] = finishSignal;
  const [isGenerating, setIsGenerating] = createSignal(false);
  const [isSolving, setIsSolving] = isSolvingSignal;

  async function generateMaze() {
    setSolution([]);
    setIsGenerating(true);
    const initialMaze = generateBaseMaze();

    const startX = Math.floor(Math.random() * size().cols);
    const startY = Math.floor(Math.random() * size().rows);
    setStart(initialMaze[startY][startX]);
    setFinish(initialMaze[size().rows - 1][size().cols - 1]);
    setCurrent(start());
    const stack: Cell[] = [];

    current().visited = true;

    setMaze(initialMaze);

    while (true) {
      const neighbors = getUnvisitedNeighbors({
        cell: current(),
        maze: initialMaze,
        rows: size().rows,
        cols: size().cols,
      });

      if (neighbors.length > 0) {
        const next = neighbors[Math.floor(Math.random() * neighbors.length)];
        removeWalls({ current: current(), next });
        stack.push(current());
        setCurrent(next);
        current().visited = true;
      } else if (stack.length > 0) {
        setCurrent(stack.pop() as Cell);
      } else {
        break;
      }
      setMaze([...initialMaze]);
      await sleep(1);
    }
    setIsGenerating(false);
  }

  const displaySolutionStepByStep = async (solutionPath: Cell[]) => {
    for (let i = 0; i < solutionPath.length; i++) {
      setSolution(solutionPath.slice(0, i + 1));
      await sleep(25);
    }
  };

  const solve = async () => {
    setIsSolving(true);
    const solutionPath = await solveMazeBFS(maze(), start(), finish());
    setSolution(solutionPath);
    displaySolutionStepByStep(solutionPath);
    setIsSolving(false);
  };

  createEffect(() => {
    if (size().cols > 20 || size().rows > 20) {
      setSize({ rows: 20, cols: 20 });
    }
  });

  return (
    <div class='flex flex-wrap justify-center gap-2 mt-4 items-center'>
      <Button onClick={generateMaze} disabled={isGenerating() || isSolving()}>
        Generate Maze
      </Button>
      <Button onClick={solve} variant='secondary' disabled={isGenerating() || isSolving()}>
        Solve Maze
      </Button>

      <div>
        <label for='size' class='mr-2'>
          Size
        </label>
        <Input
          max={30}
          id='size'
          type='number'
          value={size().rows}
          onInput={(e: Event) => {
            const target = e.currentTarget as HTMLInputElement;
            if (target) {
              setSize({
                ...size(),
                rows: parseInt(target.value),
                cols: parseInt(target.value),
              });
            }
          }}
          disabled={isGenerating() || isSolving()}
        />
      </div>
    </div>
  );
}

export default MazeGenerator;
