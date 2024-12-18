// mocks/handlers.js
import { rest } from 'msw';
import { BASE_URL } from '../../utilities/endpoints';

export const handlers = [
  rest.get(`${BASE_URL}`, (req, res, ctx) => {
    const query = req.url.searchParams.get('q');

    if (query === 'London') {
      return res(
        ctx.json([
          { name: 'London', country: 'GB' },
          { name: 'London', country: 'US' },
        ]),
      );
    }

    return res(ctx.json([])); // No results for other cities
  }),
];
