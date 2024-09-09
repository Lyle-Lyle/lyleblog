import React from 'react';

const HomeTest = () => {
  return (
    <main className='container max-w-screen-xl mx-auto p-4'>
      {/* <!-- grid 表格布局，分为 4 列 --> */}
      <div className='grid grid-cols-4 gap-4'>
        {/* <!-- 左边栏，占用 3 列 --> */}
        <div className='col-span-4 bg-amber-500 md:col-span-3 mb-3'>
          {/* <!-- 文章列表，grid 表格布局，分为 2 列 --> */}
          <div className='grid grid-cols-2 gap-4'>
            <div className='col-span-2 md:col-span-1 bg-blue-500'>
              第一篇文章
            </div>
            <div className='col-span-2 md:col-span-1 bg-blue-500'>
              第二篇文章
            </div>
          </div>
        </div>

        {/* <!-- 右边侧边栏，占用一列 --> */}
        <aside className='col-span-4 bg-green-500 md:col-span-1'>右边栏</aside>
      </div>
    </main>
  );
};

export default HomeTest;
