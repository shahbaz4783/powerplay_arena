export interface UserData {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code: string;
  is_premium?: boolean;
}

export interface FormResponse {
  message: {
    success?: string;
    error?: string;
  };
}
