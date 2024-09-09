import axios from '@/api';

// Registe API
export const regApi = (data: FormData) =>
  axios.post<null, BaseResponse>('/reg', data);

// login API
export const loginApi = (data: LoginForm) =>
  axios.post<null, BaseResponse<Login>>('/login', data);
