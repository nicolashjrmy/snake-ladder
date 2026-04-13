'use client';

import { useState } from 'react';
import GameBoard from '@/components/GameBoard';
import GameControls from '@/components/GameControls';
import { applySnakesAndLadders } from '@/lib/utils';

export default function Home() {
  const [position, setPosition] = useState(1);
  const [gameWon, setGameWon] = useState(false);

  const handleMove = (moveValue: number) => {
    if(gameWon) return;

    let newPosition = position + moveValue;
    newPosition = applySnakesAndLadders(newPosition);

    if (newPosition >= 100) {
      setPosition(100);
      setGameWon(true);
    } else {
      setPosition(newPosition);
    }
  };

  const handleReset = () => {
    setPosition(1);
    setGameWon(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-2xl">
        <h1 className="text-4xl font-bold text-center mb-7 text-gray-800">
          Snakes & Ladders
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8">
          <GameBoard position={position} />
          
          <div className="mt-8 text-center">
            <p className="text-2xl font-semibold text-gray-700">
              Current Position: <span className="text-blue-600">{position}</span>
            </p>

            {gameWon && (
              <div className="mb-6 p-4 bg-green-100 border border-green-400 rounded-lg">
                <p className="text-green-800 font-bold text-lg">
                  Congratulations! You won!
                </p>
              </div>
            )}
          </div>

          <GameControls onMove={handleMove} onReset={handleReset} gameWon={gameWon} />
        </div>
      </div>
    </div>
  );
}
