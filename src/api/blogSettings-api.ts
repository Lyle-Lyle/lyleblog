import axios from '@/api';

// // 分类下拉列表
// export const getCateListApi = () =>
//   axios.post<null, BaseResponse<CateItem[]>>('/admin/category/select/list');

// 上传文件
export const uploadFile = (data) => {
  return axios.post('/admin/file/upload', data);
};

export const updateBlogSettings = (data) => {
  return axios.post('/admin/blog/settings/update', data);
};
