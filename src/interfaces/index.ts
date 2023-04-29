export interface IResponse {
  code: number;
  message: string;
  data: any;
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

export interface IAuthRequest {
  username: string;
  password: string;
}

export interface IAuthResponse {
  token: string;
}

export interface IJobResponse {
  id: string;
  type: boolean;
  url: string;
  created_at: string;
  company: string;
  company_url: string;
  location: string;
  title: string;
  description: string;
  how_to_apply: string;
  company_logo: string;
}
