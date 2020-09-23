import * as api from '..';

test('public api', () => {
  expect(api).toMatchInlineSnapshot(`
    Object {
      "clearHTTPResourceCache": [Function],
      "mutateHTTPResource": [Function],
      "revalidateHTTPResource": [Function],
      "useHTTPInfiniteResource": [Function],
      "useHTTPResource": [Function],
    }
  `);
});
