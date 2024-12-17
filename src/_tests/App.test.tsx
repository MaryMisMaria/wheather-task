import { render } from '@testing-library/react';
// App
import App from '../App';

test('should render without crash', () => {
  render(<App />);
});
