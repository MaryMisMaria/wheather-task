import { useMemo } from 'react';

interface CardColor {
  backgroundColor: string;
  color: string;
}

const useCardColor = (description: string): CardColor =>
  useMemo(() => {
    let backgroundColor = '#f5f5f5';
    let color = '#424242';

    switch (true) {
      case description.includes('rain'):
        backgroundColor = '#e3f2fd';
        color = '#0d47a1';
        break;
      case description.includes('snow'):
        backgroundColor = '#e1f5fe';
        color = '#01579b';
        break;
      case description.includes('clear'):
      case description.includes('sun'):
        backgroundColor = '#fffde7';
        color = '#f57f17';
        break;
    }

    return { backgroundColor, color };
  }, [description]);

export default useCardColor;
