/* eslint-disable react-refresh/only-export-components */
import type { FC } from 'react';
import {
  delCateApi,
  editCateApi,
  getCateListApi,
  postCateApi,
} from '@/api/cate-api.ts';
import to from 'await-to-js';
import { ActionFunctionArgs, useLoaderData } from 'react-router-dom';
import { Button, message, Space, Table, TableProps } from 'antd';
import ButtonAdd from '@/components/article-cate/btn-add';
import ButtonEdit from '@/components/article-cate/btn-edit';
import ButtonDelete from '@/components/article-cate/btn-del';

const columns: TableProps<CateItem>['columns'] = [
  // {
  //   title: '序号',
  //   render(_, __, index) {
  //     return index + 1;
  //   },
  // },
  {
    title: 'Category',
    dataIndex: 'name',
  },
  {
    title: 'Action',
    render(_, record) {
      return (
        <>
          {/* <Button
            type='link'
            size='small'
            onClick={() => console.log(record.id)}
          >
            修改
          </Button> */}
          {/* <ButtonEdit cate={record} /> */}
          {/* <Button
            type='link'
            size='small'
            onClick={() => console.log(record.id)}
          >
            删除
          </Button> */}
          <ButtonDelete id={record.id} />
        </>
      );
    },
  },
];

// 文章分类页面
const ArticleCate: FC = () => {
  const loaderData = useLoaderData() as { cates: CateItem[] } | null;

  return (
    loaderData && (
      <Space direction='vertical' style={{ display: 'flex' }}>
        {/* 新增分类按钮 */}
        <ButtonAdd />
        {/* 表格区域 */}
        <Table
          dataSource={loaderData.cates}
          columns={columns}
          size='middle'
          rowKey='id'
          pagination={false}
          bordered
        />
      </Space>
    )
  );
};

export default ArticleCate;

export const loader = async () => {
  const [err, res] = await to(getCateListApi());

  if (err) return null;
  return { cates: res.data };
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const fd = await request.formData();
  const formDataObject = Object.fromEntries(fd);
  // 获取请求的 method 类型
  const method = request.method.toUpperCase() as
    | 'POST'
    | 'PUT'
    | 'PATCH'
    | 'DELETE';

  if (method === 'POST') {
    // 调用添加的 API 接口
    const [err] = await to(postCateApi(formDataObject));
    if (err) return null;
    message.success('Successfully added!');
  } else if (method === 'DELETE') {
    // 调用删除分类的接口
    const [err] = await to(delCateApi(formDataObject.id));
    if (err) return null;
    message.success('Successfully deleted!');
  }
  return true;
};
