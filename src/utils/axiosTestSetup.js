import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

export const setupAxiosMock = () => {
  const mock = new AxiosMockAdapter(axios);

  afterEach(() => {
    mock.reset(); // Reset mocks after each test to prevent interference between tests
  });

  afterAll(() => {
    mock.restore(); // Restore Axios to its original state after all tests
  });

  return mock;
};
