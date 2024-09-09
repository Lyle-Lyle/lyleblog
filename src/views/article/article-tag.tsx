/* eslint-disable react-refresh/only-export-components */
import type { FC } from 'react';
import {
  delCateApi,
  editCateApi,
  getCateListApi,
  postCateApi,
} from '@/api/cate-api.ts';
import to from 'await-to-js';
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  useLoaderData,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import {
  Button,
  Flex,
  message,
  Pagination,
  Space,
  Table,
  TableProps,
} from 'antd';
import ButtonAdd from '@/components/article-cate/btn-add';
import ButtonEdit from '@/components/article-cate/btn-edit';
import ButtonDelete from '@/components/article-cate/btn-del';
import { addTagApi, deleteTagApi, getTagListApi } from '@/api/tag-api';
import TagListTable from '@/components/article-tag/tag-list-table';
import ButtonAddTag from '@/components/article-tag/btn-add-tag';
import ListSearch from '@/components/article-list/list-search';
import ButtonEditTag from '@/components/article-tag/btn-edit-tag';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  // 解析 URL 中的查询参数，把字符串解析为查询参数对象 q
  const searchParams = new URL(request.url).searchParams;

  const q: BaseListQuery = {
    // id: Number(searchParams.get('id')) || '',
    name: searchParams.get('name') || '',
    current: Number(searchParams.get('current')) || 1,
    pageSize: Number(searchParams.get('size')) || 2,
  };

  // 获取标签分页列表
  const [err, res] = await to(getTagListApi(q));
  console.log(res);

  if (err) return null;
  return res;
};

const columns: TableProps<TagItem>['columns'] = [
  {
    title: 'Tag',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'createTime',
    dataIndex: 'createTime',
    key: 'createTime',
  },
  {
    title: 'Action',
    key: 'action',
    render(_, record) {
      return (
        <>
          <ButtonDelete id={record.id} />
        </>
      );
    },
  },
];

// 标签管理页面
const ArticleTag: FC = () => {
  const loaderData = useLoaderData() as {
    data: TagItem[];
    total: number;
    size: number;
    current: number;
  } | null;
  console.log('useLoaderData' + loaderData);

  const [, setSearchParams] = useSearchParams();

  // 表格分页属性
  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: false,
    showTotal: () => `共${loaderData?.total}条`,
    pageSize: loaderData?.size,
    current: loaderData?.current,
    total: loaderData?.total,
    // onShowSizeChange: (current, pageSize) => changePageSize(pageSize, current),
    onChange: (current, pageSize) => changePage(current, pageSize),
  };

  const changePage = (current, pageSize) => {
    // 拿到最新的表格页码
    // 设置 searchParams

    const params = { current, size: pageSize };
    setSearchParams(params);
  };

  return (
    <div>
      <Space direction='vertical' style={{ display: 'flex' }}>
        <Flex justify='space-between'>
          {/* 搜索组件 */}
          <ListSearch />
          <ButtonAddTag />
        </Flex>
        {/* 表格组件 */}
        <Table
          columns={columns}
          dataSource={loaderData?.data}
          pagination={paginationProps}
        />
      </Space>
    </div>
  );
};

export default ArticleTag;

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
    console.log('formDataObject', formDataObject);
    const [err] = await to(addTagApi(formDataObject));
    if (err) return null;
    message.success('Successfully added!');
  } else if (method === 'DELETE') {
    // 调用删除分类的接口
    const [err] = await to(deleteTagApi(formDataObject));
    if (err) return null;
    message.success('Successfully deleted!');
  }
  return true;
};
