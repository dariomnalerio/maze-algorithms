import { createEffect, createSignal, For } from 'solid-js';
import { currentSignal, finishSignal, mazeSignal, solutionSignal, startSignal } from '../stores';
import { Cell } from '../types';

function getCellClasses(cell: Cell, start: Cell, finish: Cell, current: Cell, solution: Cell[]): string {
  return `h-5 w-5 md:h-6 md:w-6 p-0 m-0 border-0
    ${cell.walls.top ? 'border-t border-black' : ''} 
    ${cell.walls.right ? 'border-r border-black' : ''}
    ${cell.walls.bottom ? 'border-b border-black' : ''}
    ${cell.walls.left ? 'border-l border-black' : ''}
    ${start.x === cell.x && start.y === cell.y ? 'bg-gradient-to-br from-green-700 to-green-400' : ''}
    ${
      solution.some((c) => c !== start && c !== finish && c.x === cell.x && c.y === cell.y)
        ? 'bg-gradient-to-tr from-yellow-600 to-yellow-400'
        : ''
    }
    ${finish.x === cell.x && finish.y === cell.y ? 'bg-gradient-to-tr from-red-700 to-red-400' : ''}
    ${current.x === cell.x && current.y === cell.y ? 'bg-blue-600' : ''}`;
}

function MazeDisplay() {
  const [maze] = mazeSignal;
  const [solution] = solutionSignal;
  const [columns, setColumns] = createSignal(0);
  const [current] = currentSignal;
  const [start] = startSignal;
  const [finish] = finishSignal;
  createEffect(() => {
    setColumns(maze().length > 0 ? maze()[0].length : 0);
  });

  return (
    <div class='w-full flex justify-center mt-5 '>
      <div
        class='grid bg-cyan-600 max-w-fit overflow-clip z-50 '
        style={{
          'grid-template-columns': `repeat(${columns()}, minmax(0, 1fr))`,
        }}
      >
        <For each={maze()}>
          {(row: Cell[]) => (
            <For each={row}>
              {(cell) => <div class={getCellClasses(cell, start(), finish(), current(), solution())}></div>}
            </For>
          )}
        </For>
      </div>
    </div>
  );
}

export default MazeDisplay;
