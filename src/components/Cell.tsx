import winningCombos from '../commons/combos';
import {
  useGameDataStore,
  useGameScoreStore,
  useGameStatusStore,
} from '../store/gameStore';

function Cell() {
  const board = useGameDataStore((state) => state.board);
  const increaseCircleScore = useGameScoreStore(
    (state) => state.increaseCircleScore
  );
  const increaseCrossScore = useGameScoreStore(
    (state) => state.increaseCrossScore
  );
  const setWinner = useGameDataStore((state) => state.setWinner);
  const setIsDraw = useGameStatusStore((state) => state.setIsDraw);
  const currentPlayer = useGameDataStore((state) => state.currentPlayer);
  const isGameOver = useGameStatusStore((state) => state.isGameOver);
  const setIsGameOver = useGameStatusStore((state) => state.setIsGameOver);

  const updateScores = (player: 'cross' | 'circle') => {
    if (player === 'cross') {
      increaseCrossScore();
    } else if (player === 'circle') {
      increaseCircleScore();
    }
  };

  const checkForWinner = () => {
    for (let i = 0; i < winningCombos.length; i += 1) {
      const combo = winningCombos[i];
      const a = combo[0];
      const b = combo[1];
      const c = combo[2];

      const cellA = board[Math.floor(a / 3)][a % 3];
      const cellB = board[Math.floor(b / 3)][b % 3];
      const cellC = board[Math.floor(c / 3)][c % 3];

      if (cellA && cellA === cellB && cellA === cellC) {
        setWinner(cellA);
        setIsGameOver(true);
        updateScores(cellA);
        return;
      }
    }

    if (board.flat().every((cell) => cell !== '')) {
      setIsDraw(true);
    }
  };

  const handleCellClick = (row: number, col: number) => {
    if (!board[row][col] && !isGameOver) {
      const newBoard = [...board];
      newBoard[row][col] = currentPlayer;
      useGameDataStore.setState({ board: newBoard });

      useGameDataStore.setState({
        currentPlayer: currentPlayer === 'circle' ? 'cross' : 'circle',
      });

      checkForWinner();
    }
  };

  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div className="row" key={`row-${Math.random()}`}>
          {row.map((cellValue, colIndex) => (
            <div
              className="cell"
              key={`cell-${Math.random()}`}
              onClick={() => handleCellClick(rowIndex, colIndex)}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  handleCellClick(rowIndex, colIndex);
                }
              }}
            >
              {cellValue === 'circle' && <div className="circle" />}
              {cellValue === 'cross' && <div className="cross" />}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Cell;
