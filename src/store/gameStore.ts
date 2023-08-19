import { create } from 'zustand';
import { createWithEqualityFn } from 'zustand/traditional';

interface GameDataStore {
  board: ('cross' | 'circle' | '')[][];
  currentPlayer: 'cross' | 'circle' | '';
  winner: string;
}

interface GameDataActions {
  setBoard: (board: ('cross' | 'circle' | '')[][]) => void;
  setCurrentPlayer: (player: 'cross' | 'circle' | '') => void;
  setWinner: (winner: string) => void;
}

export const useGameDataStore = create<GameDataStore & GameDataActions>(
  (set) => ({
    board: Array.from({ length: 3 }, () => Array(3).fill('')),
    currentPlayer: '',
    winner: '',
    setBoard: (board) => set({ board }),
    setCurrentPlayer: (player) => set({ currentPlayer: player }),
    setWinner: (winner) => set({ winner }),
  })
);

interface GameStatusStore {
  isDraw: boolean;
  isGameOver: boolean;
}

interface GameStatusActions {
  setIsDraw: (isDraw: boolean) => void;
  setIsGameOver: (isGameOver: boolean) => void;
}

export const useGameStatusStore = create<GameStatusStore & GameStatusActions>(
  (set) => ({
    isDraw: false,
    isGameOver: false,
    setIsDraw: (isDraw) => set({ isDraw }),
    setIsGameOver: (isGameOver) => set({ isGameOver }),
  })
);

interface GameScoreStore {
  crossScore: number;
  circleScore: number;
}

interface GameScoreActions {
  increaseCrossScore: () => void;
  increaseCircleScore: () => void;
}

export const useGameScoreStore = createWithEqualityFn<
  GameScoreStore & GameScoreActions
>(
  (set) => ({
    crossScore: 0,
    circleScore: 0,
    increaseCrossScore: () =>
      set((state) => ({ crossScore: state.crossScore + 1 })),
    increaseCircleScore: () =>
      set((state) => ({ circleScore: state.circleScore + 1 })),
  }),
  Object.is
);
