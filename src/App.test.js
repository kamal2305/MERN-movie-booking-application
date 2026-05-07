jest.mock('axios');

import { store } from './Store';

test('initial auth state is logged out', () => {
  const state = store.getState();
  expect(state.user.isLoggedIn).toBe(false);
  expect(state.admin.isLoggedIn).toBe(false);
});
