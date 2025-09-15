import { environment } from '../../src/environments/environment';

const base = environment.apiUrl;

export const ApiRoutes = {
  User: {
    Login: `${base}/user/login`,
    Register: `${base}/user/register`,
    GetById: (userId: number) => `${base}/user/${userId}`,
    RestoreAccount: `${base}/user/restore`
  }
};
