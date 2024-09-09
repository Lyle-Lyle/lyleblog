import axios from '@/api';

// 分类下拉列表
export const getCateListApi = () =>
  axios.post<null, BaseResponse<CateItem[]>>('/admin/category/select/list');

// 添加分类
export const postCateApi = (data) =>
  axios.post<null, BaseResponse>('/admin/category/add', data);

// 修改分类
// export const editCateApi = (data) =>
//   axios.put<null, BaseResponse>('/admin/category/update', data);

// 删除分类
export const delCateApi = (id) =>
  axios.delete<null, BaseResponse>('/admin/category/delete', {
    params: { id },
  });

// 根据文章id获得分类
export const getCateById = (id) =>
  axios.post<null, BaseResponse>('/admin/category/delete', {
    params: { id },
  });
