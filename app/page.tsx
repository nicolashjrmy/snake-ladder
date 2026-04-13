'use client';

import { useState } from 'react';
import GameBoard from '@/components/GameBoard';
import GameControls from '@/components/GameControls';

export default function Home() {
  const [position, setPosition] = useState(1);

  const handleMove = (moveValue: number) => {
    const newPosition = position + moveValue;
    setPosition(newPosition);
  };

  const handleReset = () => {
    setPosition(1);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-2xl">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Snakes & Ladders
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8">
          <GameBoard position={position} />
          
          <div className="mt-8 text-center">
            <p className="text-2xl font-semibold text-gray-700">
              Current Position: <span className="text-blue-600">{position}</span>
            </p>
          </div>

          <GameControls onMove={handleMove} onReset={handleReset} />
        </div>
      </div>
    </div>
  );
}
