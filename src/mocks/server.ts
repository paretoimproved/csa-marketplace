// Mock response data
export const mockLoginResponse = {
  token: 'fake-token',
  user: {
    id: '1',
    email: 'test@example.com',
    role: 'farmer',
    firstName: 'Test',
    lastName: 'User'
  }
};

// Mock fetch globally
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(mockLoginResponse)
  })
) as jest.Mock;

// Helper to reset mocks between tests
export const resetMocks = () => {
  (global.fetch as jest.Mock).mockClear();
};