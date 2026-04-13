'use client';

import { useState } from 'react';
import GameBoard from '@/components/GameBoard';
import GameControls from '@/components/GameControls';
import { applySnakesAndLadders, getPositionDisplay} from '@/lib/utils';

export default function Home() {
  const [position, setPosition] = useState(1);
  const [gameWon, setGameWon] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationType, setAnimationType] = useState<'snake' | 'ladder' | null>(null);

  const animateMovement = (startPos: number, endPos: number, callback: () => void) => {
    setIsAnimating(true);
    const steps = Math.abs(endPos - startPos);
    const stepSize = endPos > startPos ? 1 : -1;
    let currentStep = 0;

    const animate = () => {
      currentStep++;
      const newPos = startPos + (stepSize * currentStep);
      setPosition(newPos);

      if (currentStep < steps) {
        setTimeout(animate, 100);
      } else {
        setIsAnimating(false);
        callback();
      }
    };

    animate();
  };

  const handleMove = (moveValue: number) => {
    if (gameWon || isAnimating) return;

    const initialPosition = position + moveValue;
    const finalPosition = applySnakesAndLadders(initialPosition);

    if (initialPosition !== finalPosition) {
      const isSnake = finalPosition < initialPosition;
      setAnimationType(isSnake ? 'snake' : 'ladder');
      setPosition(initialPosition);
      
      setTimeout(() => {
        animateMovement(initialPosition, finalPosition, () => {
          setAnimationType(null);
          if (finalPosition >= 100) {
            setPosition(100);
            setGameWon(true);
          }
        });
      }, 300);
    } else {
      if (initialPosition >= 100) {
        setPosition(100);
        setGameWon(true);
      } else {
        setPosition(initialPosition);
      }
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
          <GameBoard position={position} isAnimating={isAnimating} />
          
          <div className="mt-8 text-center">
            <p className="text-2xl font-semibold text-gray-700">
              Current Position: <span className="text-blue-600">{getPositionDisplay(position)}</span>
            </p>

            {isAnimating && animationType && (
              <div className={`mb-4 p-3 border rounded-lg font-medium ${
                animationType === 'snake' 
                  ? 'bg-red-100 border-red-400 text-red-800' 
                  : 'bg-green-100 border-green-400 text-green-800'
              }`}>
                <p>
                  {animationType === 'snake' 
                    ? ':((' 
                    : ':DD'
                  }
                </p>
              </div>
            )}

            {gameWon && (
              <div className="mb-6 p-4 bg-green-100 border border-green-400 rounded-lg">
                <p className="text-green-800 font-bold text-lg">
                  Congratulations! You won!
                </p>
              </div>
            )}
          </div>

          <GameControls onMove={handleMove} onReset={handleReset} gameWon={gameWon} isAnimating={isAnimating} />
        </div>
      </div>
    </div>
  );
}
