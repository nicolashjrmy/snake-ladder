import { SNAKES_LADDERS } from '@/lib/utils';

interface GameBoardProps {
  position: number;
  isAnimating?: boolean;
}

export default function GameBoard({ position, isAnimating = false }: GameBoardProps) {
  const getBoardLayout = () => {
    const squares = [];
    let squareNumber = 1;

    // Create 10 rows
    for (let row = 0; row < 10; row++) {
      const rowSquares = [];

      if (row % 2 === 0) {
        // Even rows: left to right
        for (let col = 0; col < 10; col++) {
          rowSquares.push(squareNumber);
          squareNumber++;
        }
      } else {
        // Odd rows: right to left (serpentine)
        for (let col = 0; col < 10; col++) {
          rowSquares.unshift(squareNumber);
          squareNumber++;
        }
      }

      squares.push(rowSquares);
    }

    // Reverse to display from top to bottom (100 at top, 1 at bottom)
    return squares.reverse();
  };

  const getDestinationFor = (squareNumber: number): number | null => {
    const match = SNAKES_LADDERS.find(([from]) => from === squareNumber);
    return match ? match[1] : null;
  };

  const isSnake = (from: number, to: number): boolean => {
    return to < from;
  };

  const board = getBoardLayout();

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-10 gap-1 bg-gray-200 p-2 rounded">
        {board.map((row) =>
          row.map((squareNumber) => {
            const destination = getDestinationFor(squareNumber);
            const isCurrentPosition = squareNumber === position;
            const isSnakeSquare = destination && isSnake(squareNumber, destination);

            return (
              <div
                key={squareNumber}
                className={`
                  w-12 h-12 flex flex-col items-center justify-center rounded border-2 text-xs font-semibold transition-all duration-300
                  ${
                    isCurrentPosition
                      ? 'bg-blue-500 border-blue-700 text-white shadow-lg scale-110'
                      : 'bg-white border-gray-300 text-gray-700'
                  }
                  ${isAnimating && isCurrentPosition ? 'animate-pulse' : ''}
                `}
              >
                <span className="text-xs">{squareNumber}</span>
                {destination && (
                  <span
                    className={`text-xs font-bold ${
                      isSnakeSquare ? 'text-red-600' : 'text-green-600'
                    }`}
                  >
                    {destination}
                  </span>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
