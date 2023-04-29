export interface IResponse {
  code: number;
  message: string;
  data: any;
}

export interface IAuthRequest {
  username: string;
  password: string;
}

export interface IAuthResponse {
  token: string;
}

export interface IAuthContext {
  id: string | null;
  token: string | null;
  onLogin: ((token: string) => void) | null;
  onLogout: (() => void) | null;
}

export interface IUserContext {
  id: string;
}
