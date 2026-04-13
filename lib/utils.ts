import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const SNAKES_LADDERS: [number, number][] = [
  [2, 38],
  [7, 14],
  [8, 31],
  [15, 26],
  [28, 84],
  [16, 6],
  [40, 11],
  [62, 19],
  [64, 60],
  [99, 80],
];

export function applySnakesAndLadders(position: number): number {
  const match = SNAKES_LADDERS.find(([from]) => from === position);
  if (match) {
    return match[1];
  }
  return position;
}
