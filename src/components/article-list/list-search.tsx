import { Button, Form, Select } from 'antd';
import Search from 'antd/es/input/Search';
import React, { FC } from 'react';
import { useLoaderData, useSearchParams } from 'react-router-dom';

// 页面顶部的搜索框
const ListSearch: FC = () => {
  //通过 useLoaderData hook 获取到 loader 返回的查询参数对象 q
  const loaderData = useLoaderData() as null | {
    result: CateItem[];
    q: BaseListQuery;
  };

  const [, setSearchParams] = useSearchParams();
  // 提交表单的时候触发onFinish

  // const [value, setValue] = useState('');

  const handleSearch = (value: string) => {
    console.log(value);
    const params = { ...loaderData?.q, name: value };
    // 类型报错
    setSearchParams(params);
  };

  // const handleChange = (value: string) => {
  //   console.log(value);
  // };

  return (
    <Search
      placeholder='Search...'
      // value={loaderData?.q.name}
      onSearch={handleSearch}
      // onChange={handleChange}
      size='middle'
      allowClear
      style={{ width: 200 }}
    />

    // {/* 点击重置按钮清空查询参数 */}
    // <Button onClick={() => setSearchParams()}>Reset</Button>
  );
};

export default ListSearch;
