import { getArticleListApi } from '@/api/article-api';
import { getCateListApi } from '@/api/cate-api';
import { getArchivePageList } from '@/api/frontend-api';
import { getTagSelectListApi } from '@/api/tag-api';
import CategoryListCard from '@/components/frontend/CategoryListCard';
import Footer from '@/components/frontend/footer';
import Header from '@/components/frontend/header';
import TagListCard from '@/components/frontend/TagListCard';
import UserInfoCard from '@/components/frontend/UserInfoCard';
import to from 'await-to-js';
import { initCollapses, initDropdowns } from 'flowbite';
import { Pagination } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import {
  LoaderFunctionArgs,
  useLoaderData,
  useSearchParams,
} from 'react-router-dom';

const ArchiveList = () => {
  const loaderData = useLoaderData() as {
    artRes: {
      aticles: ArchiveArtRsp[];
      month: string;
    }[];
    cateRes: CateItem[];
    tagRes: TagItem[];
    q;
    total: number;
  } | null;
  console.log('Archive loaderData', loaderData);

  const [currentPage, setCurrentPage] = useState(loaderData?.q.current);

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
  useEffect(() => {
    //用于初始化 flowbite 的 collapse 组件，有了它，当页面在移动端展示时，点击菜单收缩按钮，可查看隐藏的菜单选项，
    initCollapses();
    initDropdowns();
  }, []);
  return (
    <>
      {/* <Header></Header> */}

      {/* <!-- 主内容区域 --> */}
      <main className='container max-w-screen-xl mx-auto p-4 px-6'>
        {/* <!-- grid 表格布局，分为 4 列 --> */}
        <div className='grid grid-cols-4 gap-7'>
          {/* <!-- 左边栏，占用 3 列 --> */}
          <div className='col-span-4 md:col-span-3 mb-3'>
            {' '}
            <div className='col-span-4 md:col-span-3 mb-3'>
              <div className='p-5 mb-4 border border-gray-200 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700'>
                {loaderData?.artRes.map((data) => (
                  <>
                    {' '}
                    <time className='text-lg font-semibold text-gray-900 dark:text-white'>
                      {data?.month}
                    </time>
                    <ol className='mt-3 divide-y divider-gray-200 dark:divide-gray-700'>
                      {data?.articles.map((article) => (
                        <li>
                          <a
                            href='#'
                            className='items-center block p-3 sm:flex hover:bg-gray-100 dark:hover:bg-gray-700'
                          >
                            <img
                              className='w-24 h-12 mb-3 mr-3 rounded-lg sm:mb-0'
                              src={article.cover}
                              alt='post'
                            />
                            <div className='text-gray-600 dark:text-gray-400'>
                              <h2 className='text-base font-normal text-gray-900'>
                                {article.title}
                              </h2>
                              <span className='inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400'>
                                <svg
                                  className='inline w-2.5 h-2.5 mr-2 text-gray-400 dark:text-white'
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
                                {article.createDate}
                              </span>
                            </div>
                          </a>
                        </li>
                      ))}
                    </ol>
                  </>
                ))}
              </div>
            </div>
            {/* 分页 */}
            <div className='flex overflow-x-auto sm:justify-center'>
              <Pagination
                currentPage={currentPage}
                totalPages={10}
                onPageChange={onPageChange}
                showIcons
              />
            </div>
          </div>

          {/* <!-- 右边侧边栏，占用一列 --> */}
          <aside className='col-span-4 md:col-span-1'>
            {/* <!-- 博主信息 --> */}
            <UserInfoCard></UserInfoCard>

            {/* <!-- 分类 --> */}
            <CategoryListCard cateRes={loaderData?.cateRes}></CategoryListCard>

            {/* <!-- 标签 --> */}
            <TagListCard tagRes={loaderData?.tagRes}></TagListCard>
          </aside>
        </div>
      </main>

      {/* <Footer></Footer> */}
    </>
  );
};

export default ArchiveList;

export const loader = async ({ request }: LoaderFunctionArgs) => {
  // 解析 URL 中的查询参数，把字符串解析为查询参数对象 q
  const searchParams = new URL(request.url).searchParams;

  const q: ArtListQuery = {
    id: Number(searchParams.get('id')) || '',
    title: searchParams.get('title') || '',
    current: Number(searchParams.get('current')) || 1,
    pageSize: Number(searchParams.get('size')) || 4,
  };

  // 获取归档文章分页列表
  const [artErr, artRes] = await to(getArchivePageList(q));
  console.log('artRes', artRes);

  // 根据文章id获取对应的分类数据
  const [cateErr, cateRes] = await to(getCateListApi());
  console.log(cateRes);

  // // 根据文章id获取对应的标签数据
  const [tagErr, tagRes] = await to(getTagSelectListApi());
  console.log(tagRes);

  if (cateErr || tagErr || artErr) return null;
  return {
    artRes: artRes.data,
    cateRes: cateRes.data,
    tagRes: tagRes.data,
    q,
    total: artRes.total,
  };
};
