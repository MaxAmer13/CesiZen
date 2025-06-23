import { environment } from '../../src/environments/environment';

const base = environment.apiUrl;

export const ApiRoutes = {
  User: {
    Login: `${base}/user/login`,
    Register: `${base}/user/register`,
    GetAll: `${base}/user`,                 // liste utilisateurs (citizens)
    Count: `${base}/user/count`,            // nombre utilisateurs
    GetById: (userId: number) => `${base}/user/${userId}`,
    Update: (userId: number) => `${base}/user/${userId}`,
    Delete: (userId: number) => `${base}/user/${userId}/hard-delete`,
    SoftDelete: (userId: number) => `${base}/user/${userId}/soft-delete`,
    ToggleActivation: (userId: number) => `${base}/user/${userId}/activation`,
    RestoreAccount: `${base}/user/restore`
  }
};
