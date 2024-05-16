export const AuthGuard = jest.fn(() => ({
  canActivate: jest.fn(() => true),
}));
