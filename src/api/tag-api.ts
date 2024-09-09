import axios from '@/api';

// 标签分页列表
export const getTagListApi = (data: BaseListQuery) =>
  axios.post<null, BaseResponse<TagItem[]>>('/admin/tag/list', data);

// 添加标签
export const addTagApi = (data) =>
  axios.post<null, BaseResponse>('/admin/tag/add', { tags: data });

// 标签下拉列表

export const getTagSelectListApi = () =>
  axios.post<null, BaseResponse<TagItem[]>>('/admin/tag/select/list');

// 删除标签
export const deleteTagApi = (data) =>
  axios.post<null, BaseResponse>('/admin/tag/delete', data);
