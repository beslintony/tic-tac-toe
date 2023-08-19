import { useEffect } from 'react';
import Cell from '../components/Cell';
import SymbolChoiceOverlay from '../components/SymbolChoiceOverlay';
import {
  useGameDataStore,
  useGameScoreStore,
  useGameStatusStore,
} from '../store/gameStore';

function Home() {
  const currentPlayer = useGameDataStore((state) => state.currentPlayer);
  const winner = useGameDataStore((state) => state.winner);
  const isDraw = useGameStatusStore((state) => state.isDraw);
  const isGameOver = useGameStatusStore((state) => state.isGameOver);
  const setIsGameOver = useGameStatusStore((state) => state.setIsGameOver);
  const circleScore = useGameScoreStore((state) => state.circleScore);
  const crossScore = useGameScoreStore((state) => state.crossScore);

  useEffect(() => {
    if (isDraw || winner) {
      setIsGameOver(true);
    }
  }, [isDraw, winner, setIsGameOver]);

  const handleSymbolChosen = (symbol: 'cross' | 'circle') => {
    useGameDataStore.setState({ currentPlayer: symbol });
  };

  const handleReset = () => {
    useGameDataStore.setState({
      board: Array.from({ length: 3 }, () => Array(3).fill('')),
      currentPlayer,
      winner: '',
    });
    useGameStatusStore.setState({
      isDraw: false,
      isGameOver: false,
    });
  };

  return (
    <div className="app">
      <div className="score-container">
        <div className="score">
          Player X: {crossScore} - Player O: {circleScore}
        </div>
      </div>
      <div className="button-container">
        <button className="reset-button" type="button" onClick={handleReset}>
          New Game
        </button>
      </div>
      {!currentPlayer && !isGameOver && (
        <SymbolChoiceOverlay onSymbolChosen={handleSymbolChosen} />
      )}
      <Cell />
      <div className="status">
        {winner && <p>Player {winner} wins!</p>}
        {isDraw && !winner && <p>It&lsquo;s a draw!</p>}
      </div>
    </div>
  );
}

export default Home;
