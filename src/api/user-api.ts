import axios from '@/api';

// 获取用户的基本信息
export const getUserApi = () =>
  axios.get<null, BaseResponse<User>>('/admin/blog/settings/detail');
