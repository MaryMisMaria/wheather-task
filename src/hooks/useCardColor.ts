import { useMemo } from 'react';

const useCardColor = (description: string) =>
  useMemo(() => {
    if (description.includes('rain')) {
      return { backgroundColor: '#e3f2fd', color: '#0d47a1' };
    }
    if (description.includes('snow')) {
      return { backgroundColor: '#e1f5fe', color: '#01579b' };
    }
    if (description.includes('clear') || description.includes('sun')) {
      return { backgroundColor: '#fffde7', color: '#f57f17' };
    }
    return { backgroundColor: '#f5f5f5', color: '#424242' };
  }, [description]);

export default useCardColor;
