export interface LoginResponse {
  user: {
    id: string;
    username: string;
  };
  token: string;
}
