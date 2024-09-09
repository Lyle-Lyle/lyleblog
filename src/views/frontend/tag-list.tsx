import { getCateListApi } from '@/api/cate-api';
import { getTagSelectListApi } from '@/api/tag-api';
import CategoryListCard from '@/components/frontend/CategoryListCard';
import Footer from '@/components/frontend/footer';
import Header from '@/components/frontend/header';
import TagListCard from '@/components/frontend/TagListCard';
import UserInfoCard from '@/components/frontend/UserInfoCard';
import to from 'await-to-js';
import React from 'react';
import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom';

const TagList = () => {
  const loaderData = useLoaderData() as {
    artRes: ArticleRsp[];
    cateRes: CateItem[];
    tagRes: TagItem[];
    q;
    total: number;
  } | null;
  return (
    <>
      <Header></Header>
      {/* // <!-- 主内容区域 --> */}
      <main className='container max-w-screen-xl mx-auto p-4 px-6'>
        {/* <!-- grid 表格布局，分为 4 列 --> */}
        <div className='grid grid-cols-4 gap-7'>
          {/* <!-- 左边栏，占用 3 列 --> */}
          <div className='col-span-4 md:col-span-3 mb-3'>
            {/* <!-- 标签 -->
            标签列表 */}
            <TagListCard tagRes={loaderData?.tagRes} />
          </div>

          {/* <!-- 右边侧边栏，占用一列 --> */}
          <aside className='col-span-4 md:col-span-1'>
            {/* <!-- 博主信息 --> */}
            <UserInfoCard></UserInfoCard>

            {/* <!-- 分类 --> */}
            <CategoryListCard cateRes={loaderData?.cateRes}></CategoryListCard>
          </aside>
        </div>
      </main>
      <Footer></Footer>;
    </>
  );
};

export default TagList;

export const loader = async ({ request }: LoaderFunctionArgs) => {
  // 解析 URL 中的查询参数，把字符串解析为查询参数对象 q
  const searchParams = new URL(request.url).searchParams;

  const q: ArtListQuery = {
    id: Number(searchParams.get('id')) || '',
    title: searchParams.get('title') || '',
    current: Number(searchParams.get('current')) || 1,
    pageSize: Number(searchParams.get('size')) || 2,
  };

  // 获取文章分页列表
  // const [artErr, artRes] = await to(getArticleListApi(q));
  // console.log(artRes);

  // 根据文章id获取对应的分类数据
  const [cateErr, cateRes] = await to(getCateListApi());
  // console.log(cateRes);

  // 根据文章id获取对应的标签数据
  const [tagErr, tagRes] = await to(getTagSelectListApi());
  // console.log(tagRes);

  if (tagErr) return null;
  return {
    cateRes: cateRes?.data,
    tagRes: tagRes.data,
    q,
  };
};
