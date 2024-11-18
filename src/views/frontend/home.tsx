import React, { useEffect, useState } from 'react';
import Header from '../../components/frontend/header';
import { initCollapses, initDropdowns } from 'flowbite';
import Footer from '@/components/frontend/footer';
import {
  LoaderFunctionArgs,
  redirect,
  useLoaderData,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import {
  getArticleListApi,
  getFrontendArticleListApi,
} from '@/api/article-api';
import to from 'await-to-js';
import { getCateListApi } from '@/api/cate-api';
import { getTagSelectListApi } from '@/api/tag-api';
import { Pagination } from 'flowbite-react';
import UserInfoCard from '@/components/frontend/UserInfoCard';
import CategoryListCard from '@/components/frontend/CategoryListCard';
import TagListCard from '@/components/frontend/TagListCard';
import router from '@/router';

const Home = () => {
  const loaderData = useLoaderData();
  console.log('Home loaderData', loaderData);

  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const [, setSearchParams] = useSearchParams();
  const onPageChange = (page: number) => {
    const params = { current: page };
    setSearchParams(params);
    setCurrentPage(page);
  };

  const getDate = (data: string) => {
    const str = data.trim().split(' ');
    return str[0];
  };

  const toArticleDetailPage = (id: number) => {
    console.log(id);
    console.log(`/article/${id}`);
    navigate(`/article/${id}`);
    // redirect(`/article/${id}`);
    // router.navigate(`/article/${id}`);
  };
  useEffect(() => {
    //用于初始化 flowbite 的 collapse 组件，有了它，当页面在移动端展示时，点击菜单收缩按钮，可查看隐藏的菜单选项，
    initCollapses();
    initDropdowns();
  }, []);
  return (
    <>
      {/* <Header /> */}
      {/* <!-- 主内容区域 --> */}
      <main className='container max-w-screen-xl mx-auto p-4'>
        {/* <!-- grid 表格布局，分为 4 列 --> */}
        <div className='grid grid-cols-4 gap-4'>
          {/* <!-- 左边栏，占用 3 列 --> */}
          <div className='col-span-4 md:col-span-3 mb-3'>
            {/* <!-- 文章列表，grid 表格布局，分为 2 列 --> */}
            <div className='grid grid-cols-2 gap-4'>
              {/* 渲染文章列表 */}
              {loaderData?.artRes?.map((value) => (
                <div className='col-span-2 md:col-span-1'>
                  <div className='bg-white border  border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700'>
                    {/* <!-- 文章封面 --> */}
                    <a onClick={() => toArticleDetailPage(value?.id)}>
                      <img
                        className='rounded-t-lg h-48
                         w-full'
                        src={value?.cover}
                        alt=''
                      />
                    </a>
                    {/* <!-- 标签 --> */}
                    <div className='mb-1 mt-1'>
                      {value?.tags?.map((tag) => (
                        <span className='inline-block cursor-pointer text-green-800 text-xs font-medium ml-2 mr-2 px-2.5 py-0.5 rounded hover:bg-green-200 hover:text-green-900 dark:bg-green-900 dark:text-green-300'>
                          {tag?.name}
                        </span>
                      ))}
                    </div>

                    <div className='p-4'>
                      {/* 文章标题 */}
                      <a onClick={() => toArticleDetailPage(value?.id)}>
                        <h2 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
                          {value?.title}
                        </h2>
                      </a>
                      {/* <!-- 文章摘要 --> */}
                      {/* <p className='mb-3 font-normal text-gray-500 dark:text-gray-400'>
                        {value.summary}
                      </p> */}

                      {/* <!-- 文章发布时间、所属分类 --> */}
                      {/* 上述代码中，我们添加了一个 <p> 标签来当做发布时间、所属分类的父容器，并使用 flex items-center 指定其内容为 flex 布局，内容垂直居中。另外，针对分类的 <a> 标签，还指定了 hover:underline 样式，表示当鼠标移动到上方时，出现下划线效果。 */}
                      <p className='flex items-center font-normal text-gray-400 text-sm dark:text-gray-400'>
                        {/* <!-- 发布时间 --> */}
                        <svg
                          className='inline w-3 h-3 mr-2 text-gray-400 dark:text-white'
                          aria-hidden='true'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 20 20'
                        >
                          <path
                            stroke='currentColor'
                            stroke-linecap='round'
                            stroke-linejoin='round'
                            stroke-width='2'
                            d='M5 1v3m5-3v3m5-3v3M1 7h18M5 11h10M2 3h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z'
                          />
                        </svg>
                        {getDate(value?.createTime)}
                        {/* <!-- 所属分类 --> */}
                        <svg
                          className='inline w-3 h-3 ml-5 mr-2 text-gray-400 dark:text-white'
                          aria-hidden='true'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 18 18'
                        >
                          <path
                            stroke='currentColor'
                            stroke-linecap='round'
                            stroke-linejoin='round'
                            stroke-width='2'
                            d='M1 5v11a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H1Zm0 0V2a1 1 0 0 1 1-1h5.443a1 1 0 0 1 .8.4l2.7 3.6H1Z'
                          />
                        </svg>

                        <a href='#' className='text-gray-400 hover:underline'>
                          {value?.category?.name}
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* <div className='col-span-2 md:col-span-1'>
                <div className='bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700'>
                  <a href='#'>
                    <img
                      className='rounded-t-lg h-48 w-full'
                      src='https://img.quanxiaoha.com/quanxiaoha/193dd1504ebb4f138085acb23619e0dd.jpg'
                      alt=''
                    />
                  </a>
                  <div className='p-5'>
                    <a href='#'>
                      <h2 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
                        从零手撸前后端分离博客（已更新11w+字）
                      </h2>
                    </a>
                    <p className='mb-3 font-normal text-gray-500 dark:text-gray-400'>
                      已更新 69 节内容，共计 105150 字，演示截图：521
                      张，持续爆肝中...
                    </p>
                  </div>
                </div>
              </div> */}
            {/* <!-- 分页 --> */}

            <div className='flex overflow-x-auto sm:justify-center'>
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(
                  loaderData?.total / loaderData?.q.pageSize
                )}
                onPageChange={onPageChange}
                showIcons
              />
            </div>
          </div>

          {/* 右边侧边栏，占用一列 */}
          <aside className='col-span-4 md:col-span-1'>
            {/* <!-- 博主信息 --> */}
            <UserInfoCard />
            {/* 分类卡片 */}

            <CategoryListCard cateRes={loaderData?.cateRes} />

            {/* 标签 */}
            <TagListCard tagRes={loaderData?.tagRes} />
          </aside>
        </div>
      </main>

      {/* <Footer /> */}
    </>
  );
};

export default Home;

export const loader = async ({ request }: LoaderFunctionArgs) => {
  // 解析 URL 中的查询参数，把字符串解析为查询参数对象 q
  const searchParams = new URL(request.url).searchParams;

  const q: ArtListQuery = {
    id: Number(searchParams.get('id')) || '',
    title: searchParams.get('title') || '',
    current: Number(searchParams.get('current')) || 1,
    pageSize: Number(searchParams.get('size')) || 6,
  };

  // 获取首页文章分页列表
  const [artErr, artRes] = await to(getFrontendArticleListApi(q));
  console.log('artRes', artRes);

  // 根据文章id获取对应的分类数据
  const [cateErr, cateRes] = await to(getCateListApi());

  // 根据文章id获取对应的标签数据
  const [tagErr, tagRes] = await to(getTagSelectListApi());

  if (cateErr || tagErr || artErr) return null;
  return {
    artRes: artRes.data,
    cateRes: cateRes.data,
    tagRes: tagRes.data,
    q,
    total: artRes.total,
  };
};
