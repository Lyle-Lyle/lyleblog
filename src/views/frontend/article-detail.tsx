import { getArticleDetail } from '@/api/frontend-api';
import CategoryListCard from '@/components/frontend/CategoryListCard';
import Footer from '@/components/frontend/footer';
import Header from '@/components/frontend/header';
import TagListCard from '@/components/frontend/TagListCard';
import UserInfoCard from '@/components/frontend/UserInfoCard';
import router from '@/router';
import to from 'await-to-js';
import React, { useEffect } from 'react';
import {
  LoaderFunctionArgs,
  useLoaderData,
  useNavigate,
} from 'react-router-dom';

import ScrollToTopButton from '@/components/frontend/ScrollToTopButton';

import './article-content.css';
import { getCateListApi } from '@/api/cate-api';
import { getTagSelectListApi } from '@/api/tag-api';
import Toc from '@/components/frontend/Toc';

// 文章详情页

const ArticleDetail = () => {
  const loaderData = useLoaderData();
  // const navigate = useNavigate();
  console.log('loaderData', loaderData);

  // useEffect(() => {
  //   if (loaderData?.artRes == null) {
  //     navigate('/home');
  //   }
  // }, [loaderData]);
  return (
    <>
      <Header></Header>
      <main className='container max-w-screen-xl mx-auto p-4 px-6'>
        {/* <!-- grid 表格布局，分为 4 列 --> */}
        <div className='grid grid-cols-4 gap-7'>
          {/* <!-- 左边栏，占用 3 列 --> */}
          <div className='col-span-4 md:col-span-3 mb-3'>
            {/* <!-- 文章详情 --> */}

            {/* <!-- 文章卡片父容器 --> */}
            <div className='w-full p-5 mb-3 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700'>
              {/* <!-- 面包屑 --> */}
              <nav className='flex text-gray-400' aria-label='Breadcrumb'>
                <ol className='inline-flex items-center space-x-1 md:space-x-3'>
                  <li className='inline-flex items-center'>
                    <a
                      href='#'
                      className='inline-flex items-center text-sm font-medium hover:text-blue-600 dark:text-gray-400 dark:hover:text-white'
                    >
                      <svg
                        className='w-3 h-3 mr-2.5'
                        aria-hidden='true'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                      >
                        <path d='m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z' />
                      </svg>
                      首页
                    </a>
                  </li>
                  <li>
                    <div className='flex items-center'>
                      /
                      <a
                        href='#'
                        className='ml-1 text-sm font-medium md:ml-3 dark:text-gray-400 dark:hover:text-white'
                      >
                        正文
                      </a>
                    </div>
                  </li>
                </ol>
              </nav>

              {/* <!-- 文章 --> */}
              <article>
                {/* <!-- 文章标题 --> */}
                <h1 className='mt-4 font-bold text-3xl'>
                  {loaderData?.artRes.title}
                </h1>
                {/* <!-- 文章 meta 信息，如发布时间等 --> */}
                <div className='text-gray-400 flex items-center mt-5 text-sm'>
                  {/* <!-- 发布时间 --> */}
                  <svg
                    className='inline w-3 h-3 mr-2 dark:text-white'
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
                  {loaderData?.artRes.createTime}
                  {/* <!-- 分类 --> */}
                  <svg
                    className='inline w-3 h-3 ml-5 mr-2 dark:text-white'
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
                  分类于
                  <a href='#' className='hover:underline'>
                    {loaderData?.artRes.categoryName}
                  </a>
                  {/* <!-- 阅读量 --> */}
                  <svg
                    className='inline w-3 h-3 ml-5 mr-2 dark:text-white'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 20 14'
                  >
                    <g
                      stroke='currentColor'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                    >
                      <path d='M10 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z' />
                      <path d='M10 13c4.97 0 9-2.686 9-6s-4.03-6-9-6-9 2.686-9 6 4.03 6 9 6Z' />
                    </g>
                  </svg>{' '}
                  阅读量 {loaderData?.artRes.readNum}
                </div>
                {/* <!-- 正文 --> */}
                <div
                  className='mt-5 article-content'
                  dangerouslySetInnerHTML={{
                    __html: loaderData?.artRes.content,
                  }}
                ></div>
                {/* <!-- 标签集合 --> */}

                <div className='mt-5'>
                  {' '}
                  {loaderData?.artRes.tags.map((tag) => (
                    <span className='inline-block mb-1 cursor-pointer bg-green-100 text-green-800 text-xs font-medium mr-2 px-3 py-1 rounded-full hover:bg-green-200 hover:text-green-900 dark:bg-green-900 dark:text-green-300'>
                      {tag.name}
                    </span>
                  ))}
                </div>

                {/* <!-- 上下篇 --> */}
                <nav className='flex flex-row mt-7'>
                  {/* <!-- basis-1/2 用于占用 flex 布局的一半空间 --> */}
                  <div className='basis-1/2'>
                    {/* <!-- h-full 指定高度占满 --> */}
                    <a
                      href={
                        loaderData?.artRes.preArticle
                          ? `/article/${loaderData?.artRes.preArticle?.articleId}`
                          : '#'
                      }
                      className='flex flex-col h-full p-4 mr-3 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                    >
                      <div>
                        <svg
                          className='inline w-3.5 h-3.5 mr-2 mb-1'
                          aria-hidden='true'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 14 10'
                        >
                          <path
                            stroke='currentColor'
                            stroke-linecap='round'
                            stroke-linejoin='round'
                            stroke-width='2'
                            d='M13 5H1m0 0 4 4M1 5l4-4'
                          ></path>
                        </svg>
                        Prev
                      </div>
                      <div>{loaderData?.artRes.preArticle?.articleTitle}</div>
                    </a>
                  </div>

                  <div className='basis-1/2'>
                    {/* <!-- text-right 指定文字居右显示 --> */}
                    <a
                      href={
                        loaderData?.artRes.nextArticle
                          ? `/article/${loaderData?.artRes.nextArticle?.articleId}`
                          : '#'
                      }
                      className='flex flex-col h-full text-right p-4 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                    >
                      <div>
                        Next
                        <svg
                          className='inline w-3.5 h-3.5 ml-2 mb-1'
                          aria-hidden='true'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 14 10'
                        >
                          <path
                            stroke='currentColor'
                            stroke-linecap='round'
                            stroke-linejoin='round'
                            stroke-width='2'
                            d='M1 5h12m0 0L9 1m4 4L9 9'
                          ></path>
                        </svg>
                      </div>
                      <div>{loaderData?.artRes.nextArticle?.articleTitle}</div>
                    </a>
                  </div>
                </nav>
              </article>
            </div>
          </div>

          {/* <!-- 右边侧边栏，占用一列 --> */}
          <aside className='col-span-4 md:col-span-1'>
            <div className=''>
              {/* <!-- 博主信息 --> */}
              <UserInfoCard></UserInfoCard>

              {/* <!-- 分类 --> */}
              <CategoryListCard
                cateRes={loaderData?.cateRes}
              ></CategoryListCard>

              {/* <!-- 标签 --> */}
              <TagListCard tagRes={loaderData?.tagRes}></TagListCard>

              {/* <!-- 文章目录 --> */}
              {/* <Toc></Toc> */}
            </div>
          </aside>
        </div>
      </main>
      {/* <!-- 返回顶部 --> */}
      {/* <ScrollToTopButton></ScrollToTopButton> */}
      <Footer></Footer>;
    </>
  );
};

export default ArticleDetail;

export const loader = async ({ params }: LoaderFunctionArgs) => {
  console.log(params);

  // // 获取文章detail
  const [artErr, artRes] = await to(getArticleDetail(params));
  console.log('artRes', artRes);

  // 根据文章id获取对应的分类数据
  const [cateErr, cateRes] = await to(getCateListApi());
  console.log(cateRes);

  // 根据文章id获取对应的标签数据
  const [tagErr, tagRes] = await to(getTagSelectListApi());
  // console.log(tagRes);

  // 如果没有对应的文章 跳转到404
  if (artRes.errorCode === '20010') {
    router.navigate('/notfound');
    return null;
  }
  if (cateErr || tagErr || artErr) return null;

  return {
    artRes: artRes.data,
    cateRes: cateRes.data,
    tagRes: tagRes.data,
  };
};
