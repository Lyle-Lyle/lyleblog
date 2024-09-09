/// <reference types="vite/client" />

// 请求体的数据类型
type RegisterForm = {
  username: string;
  password: string;
  repassword: string;
};

// 排除一个项
type LoginForm = Omit<RegisterForm, 'repassword'>;

// 接口返回的数据类型
interface BaseResponse<T = unknown> {
  code: number;
  message: string;
  data?: T;
}

type Login = {
  token: string;
};

// 用户的基本信息
type User = {
  name: string;
  logo: string;
  avatar: string;
  introduction: string;
  githubHomepage: string;
  linkedinHomepage: string;
};

// 左侧菜单项的 TS 类型
type MenuItem = {
  readonly path: string;
  name: string;
  icon: React.ReactNode;
};

// 文章分类
type CateItem = {
  id: number;
  name: string;
};

// 标签分类
type TagItem = {
  id: number;
  name: string;
  // createTime: string;
};
// 添加标签
type TagAddForm = Omit<TagItem, 'id'>;

// 标签分页查询参数
// type ArtTagQuery = {
//   id: number | string;
//   name: string;
//   current: number;
//   size: number;
// };

// 添加分类表单
type ArtCateAddForm = Omit<CateItem, 'id'>;

// 分页查询参数
type BaseListQuery = {
  // id: number | string;
  name: string;
  current: number;
  pageSize: number;
};

// 文章的类型
type Article = {
  readonly id: number;
  title: string;
  cover: string;
  createTime: string;
};

// 后端返回的文章列表
type ArticleRsp = {
  readonly id: number;
  title: string;
  cover: string;
  summary: string;
  createTime: string;
};

// 归档的文章
type ArchiveArtRsp = {
  readonly id: number;
  title: string;
  cover: string;
  createDate: string;
};

type ArtAddForm = {
  readonly id: number;
  title: string;
  content: string;
  cover: string;
  summary: string;
  categoryName: string;
  tags: string[];
};

// 文章分页查询参数
type ArtListQuery = {
  id: number | string;
  title: string;
  current: number;
  pageSize: number;
};

// 博客设置页面表单保存
type BlogSettings = {
  name: string;
  introduction: string;
  logo: string;
  avatar: string;
  githubHomepage: string | null;
  linkedinHomepage: string | null;
};

// 根绝分类名查询文章列表
type CategoryArtListQuery = {
  name: string;
  current: number;
  pageSize: number;
};
