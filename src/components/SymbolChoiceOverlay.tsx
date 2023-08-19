import { useState } from 'react';

interface SymbolChoiceOverlayProps {
  onSymbolChosen: (symbol: 'cross' | 'circle') => void;
}

function SymbolChoiceOverlay({ onSymbolChosen }: SymbolChoiceOverlayProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleSymbolChoice = (symbol: 'cross' | 'circle') => {
    setIsVisible(false);
    onSymbolChosen(symbol);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="overlay">
      <div className="overlay-content">
        <h2>Choose the first player symbol:</h2>
        <button type="button" onClick={() => handleSymbolChoice('cross')}>
          X
        </button>
        <button type="button" onClick={() => handleSymbolChoice('circle')}>
          O
        </button>
      </div>
    </div>
  );
}

export default SymbolChoiceOverlay;
