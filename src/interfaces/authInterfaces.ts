export interface RegisterUserRequest {
  email: string;
  name: string;
  password: string;
}

export interface LoginUserRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  name: string;
  email: string;
}
