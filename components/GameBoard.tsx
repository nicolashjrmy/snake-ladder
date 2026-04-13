interface GameBoardProps {
  position: number;
}

export default function GameBoard({ position }: GameBoardProps) {
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

  const board = getBoardLayout();

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-10 gap-1 bg-gray-200 p-2 rounded">
        {board.map((row) =>
          row.map((squareNumber) => {
            const isCurrentPosition = squareNumber === position;

            return (
              <div
                key={squareNumber}
                className={`
                  w-12 h-12 flex items-center justify-center rounded border-2 text-xs font-semibold
                  ${
                    isCurrentPosition
                      ? 'bg-blue-500 border-blue-700 text-white'
                      : 'bg-white border-gray-300 text-gray-700'
                  }
                `}
              >
                {squareNumber}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
