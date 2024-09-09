import axios from '@/api';

// 获取文章归档分页数据
export function getArchivePageList(data) {
  return axios.post('/archive/list', data);
}

// 获取分类-文章列表
export function getCategoryArticlePageList(data) {
  return axios.post('/category/article/list', data);
}

// 获取标签下文章列表
export function getTagArticlePageList(data) {
  return axios.post('/tag/article/list', data);
}

// 获取文章详情
export function getArticleDetail(data) {
  return axios.post('/article/detail', data);
}

// 获取仪表盘基础信息（文章数、分类数、标签数、总浏览量）
export function getBaseStatisticsInfo() {
  return axios.post('/admin/dashboard/statistics');
}

// 获取仪表盘文章发布热点统计信息
export function getPublishArticleStatisticsInfo() {
  return axios.post('/admin/dashboard/publishArticle/statistics');
}

// 获取仪表盘最近一周 PV 访问量信息
export function getArticlePVStatisticsInfo() {
  return axios.post('/admin/dashboard/pv/statistics');
}
