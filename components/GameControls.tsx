'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface GameControlsProps {
  onMove: (value: number) => void;
  onReset: () => void;
}

export default function GameControls({ onMove, onReset }: GameControlsProps) {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  const handleMove = () => {
    setError('');

    if (!inputValue) {
      setError('Please enter a number');
      return;
    }

    const moveValue = parseInt(inputValue, 10);

    if (isNaN(moveValue) || moveValue < 1 || moveValue > 6) {
      setError('Please enter a number between 1 and 6');
      return;
    }

    onMove(moveValue);
    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleMove();
    }
  };

  return (
    <div className="space-y-4 mt-8">
      <div className="flex gap-2">
        <Input
          type="number"
          min="1"
          max="6"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setError('');
          }}
          onKeyPress={handleKeyPress}
          placeholder="Enter 1-6"
          className="flex-1"
        />
        <Button
          onClick={handleMove}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Move
        </Button>
      </div>

      {error && <p className="text-red-600 text-sm font-medium">{error}</p>}

      <Button
        onClick={onReset}
        variant="outline"
        className="w-full"
      >
        Reset Game
      </Button>
    </div>
  );
}
