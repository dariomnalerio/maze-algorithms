import { createEffect, createSignal } from 'solid-js';
import { finishSignal, isSolvingSignal, mazeSignal, sizeSignal, solutionSignal, startSignal } from '../stores';
import { Cell } from '../types';
import { generateMaze, solveMazeBFS } from '../logic';
import { sleep } from '../utils';
import Input from './ui/input';
import Button from './ui/button';

function MazeGenerator() {
  const [maze] = mazeSignal;
  const [size, setSize] = sizeSignal;
  const [_solution, setSolution] = solutionSignal;
  const [start] = startSignal;
  const [finish] = finishSignal;
  const [isGenerating] = createSignal(false);
  const [isSolving, setIsSolving] = isSolvingSignal;

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
    } else if (size().cols < 4 || size().rows < 4) {
      setSize({ rows: 4, cols: 4 });
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
