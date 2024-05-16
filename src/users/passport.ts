//passport.ts

export const AuthGuard = jest.fn().mockImplementation(() => ({
  canActivate: jest.fn().mockImplementation(() => true),
}));
