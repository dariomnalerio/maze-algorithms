import MazeDisplay from './components/MazeDisplay';
import MazeGenerator from './components/MazeGenerator';

function App() {
  return (
    <div class='min-h-screen bg-gray-900 text-white p-2 md:p-4'>
      <header class='flex justify-center pt-10'>
        <h1 class='text-4xl font-bold mb-8 text-center'>Maze Explorer</h1>
      </header>
      <main>
        <MazeGenerator />
        <MazeDisplay />
      </main>
    </div>
  );
}

export default App;
