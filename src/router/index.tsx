import { createBrowserRouter } from 'react-router-dom';
import AuthLayout from '../views/auth/AuthLayout';
import Login, { action as loginAction } from '../views/auth/Login';
import Register, { action as regAction } from '../views/auth/Register';
import Root, { loader as rootLoader } from '@/views/root/root.tsx';
import AuthRoot from '@/views/root/auth-root';
import ArticleCate, {
  loader as artCateLoader,
  action as artCateAction,
} from '@/views/article/article-cate';
import ArticleList, {
  loader as artListLoader,
  action as artListAction,
} from '@/views/article/article-list';
import ArticleTag, {
  loader as artTagLoader,
  action as artTagAction,
} from '@/views/article/article-tag';
import ArticleAdd, {
  loader as artAddLoader,
  action as artAddAction,
} from '@/views/article/article-add';
import BlogSetting, {
  loader as blogSettingLoader,
  action as blogSettingAction,
} from '@/views/settings/blog-settings';
import Home, { loader as homeLoader } from '@/views/frontend/home';
import ArchiveList, {
  loader as archiveLoader,
} from '@/views/frontend/archive-list';
import HomeTest from '@/views/frontend/home-test';
import CategoryList, {
  loader as categoryLoader,
} from '@/views/frontend/category-list';
import CategoryArticleList, {
  loader as categoryArticleLoader,
} from '@/views/frontend/category-article-list';
import TagList, { loader as tagLoader } from '@/views/frontend/tag-list';
import TagArticleList, {
  loader as tagArticleLoader,
} from '@/views/frontend/tag-article-list';
import ArticleDetail, {
  loader as artDetailLoader,
} from '@/views/frontend/article-detail';
import NotFound from '@/views/frontend/404';
import Index, { loader as indexLoader } from '@/views';
import ArticleEdit, {
  loader as artEditLoader,
  action as artEditAction,
} from '@/views/article/article-edit';

const router = createBrowserRouter([
  {
    path: '/login',
    action: loginAction,
    element: (
      <AuthLayout>
        <Login />
      </AuthLayout>
    ),
  },
  {
    path: '/register',
    action: regAction,
    element: (
      <AuthLayout>
        <Register />
      </AuthLayout>
    ),
  },
  {
    path: '/admin',
    element: (
      <AuthRoot>
        <Root />
      </AuthRoot>
    ),
    loader: rootLoader,
    children: [
      // { path: 'home', element: <Home /> },
      // { path: 'user-info', element: <UserInfo /> },
      // { path: 'user-avatar', element: <UserAvatar /> },
      // { path: 'user-pwd', element: <UserPassword /> },
      {
        path: '',
        element: <Index />,
        loader: indexLoader,
      },
      {
        path: 'art-cate',
        element: <ArticleCate />,
        loader: artCateLoader,
        action: artCateAction,
      },
      {
        path: 'art-tag',
        element: <ArticleTag />,
        loader: artTagLoader,
        action: artTagAction,
      },
      {
        path: 'art-list',
        element: <ArticleList />,
        loader: artListLoader,
        action: artListAction,
      },
      {
        path: 'art-add',
        element: <ArticleAdd />,
        loader: artAddLoader,
        action: artAddAction,
      },
      {
        path: 'art-edit/:articleId',
        element: <ArticleEdit />,
        loader: artEditLoader,
        action: artEditAction,
      },
      {
        path: 'blog-settings',
        element: <BlogSetting />,
        loader: blogSettingLoader,
        action: blogSettingAction,
      },
    ],
  },
  {
    path: '/',
    element: <Home />,
    loader: homeLoader,
  },
  {
    path: '/home-test',
    element: <HomeTest />,
  },
  {
    path: '/archive',
    element: <ArchiveList />,
    loader: archiveLoader,
  },
  {
    path: '/category',
    element: <CategoryList />,
    loader: categoryLoader,
  },
  {
    path: '/category/article/list',
    element: <CategoryArticleList />,
    loader: categoryArticleLoader,
  },
  {
    path: '/tag',
    element: <TagList />,
    loader: tagLoader,
  },
  {
    path: '/tag/article/list',
    element: <TagArticleList />,
    loader: tagArticleLoader,
  },
  {
    path: '/article/:articleId',
    element: <ArticleDetail />,
    loader: artDetailLoader,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
