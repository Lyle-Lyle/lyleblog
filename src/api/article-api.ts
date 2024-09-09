import axios from '@/api';

// 发布文章
export const postArticleApi = (data) =>
  axios.post<null, BaseResponse>('/admin/article/publish', data);

// 根据分页，获取文章的列表数据
// export const getArticleListApi = (data: ArtListQuery) =>
//   axios.get<null, ArticleListResponse>('/admin/article/list', { params: data });

export const getArticleListApi = (data) =>
  axios.post<null, BaseResponse<Article[]>>('/admin/article/list', data);

// 获取frontend的文章首页分页数据

export const getFrontendArticleListApi = (data) =>
  axios.post<null, BaseResponse>('/article/list', data);

// 更新文章
export const updateArticle = (data) =>
  axios.post<null, BaseResponse>('/article/update', data);

// 删除文章
export const deleteArticle = (data) =>
  axios.post<null, BaseResponse>('/admin/article/delete', data);

// 根据文章id获取文章信息
export const getArticleInfo = (data) =>
  axios.post<null, BaseResponse>('/admin/article/articleInfo', data);
