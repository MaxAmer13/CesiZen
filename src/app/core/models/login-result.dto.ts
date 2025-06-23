export interface LoginResultDto {
  success: boolean;
  token?: string;
  id: number;
  message?: string;
  errorCode?: string;
}
