export interface User {
  accessToken: string;
  refreshToken: string;
  expiryDate: number;
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
}
