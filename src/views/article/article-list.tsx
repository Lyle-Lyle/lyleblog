/* eslint-disable react-refresh/only-export-components */
import { useEffect, type FC } from 'react';
import to from 'await-to-js';
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  useLoaderData,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { Button, Flex, message, Space, Table, TableProps } from 'antd';
import ButtonAdd from '@/components/article-cate/btn-add';
import ButtonEdit from '@/components/article-cate/btn-edit';
import ButtonDelete from '@/components/article-cate/btn-del';
import { addTagApi, getTagListApi, getTagSelectListApi } from '@/api/tag-api';
import TagListTable from '@/components/article-tag/tag-list-table';
import ButtonAddTag from '@/components/article-tag/btn-add-tag';
import ListSearch from '@/components/article-list/list-search';
import {
  deleteArticle,
  getArticleListApi,
  updateArticle,
} from '@/api/article-api';
import { getCateListApi } from '@/api/cate-api';
import BtnEditAritcle from '@/components/article-list/btn-edit';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  // 解析 URL 中的查询参数，把字符串解析为查询参数对象 q
  const searchParams = new URL(request.url).searchParams;

  const q: ArtListQuery = {
    id: Number(searchParams.get('id')) || '',
    title: searchParams.get('title') || '',
    current: Number(searchParams.get('current')) || 1,
    pageSize: Number(searchParams.get('size')) || 6,
  };

  // 获取文章分页列表
  const [artErr, artRes] = await to(getArticleListApi(q));
  console.log(artRes);

  // 获取标签分页列表
  const [cateErr, cateRes] = await to(getCateListApi());
  // console.log(cateRes);

  // 获取分类列表
  const [tagErr, tagRes] = await to(getTagSelectListApi());
  // console.log(tagRes);

  if (cateErr || tagErr || artErr) return null;
  return {
    artRes: artRes.data,
    cateRes: cateRes.data,
    tagRes: tagRes.data,
    q,
    total: artRes.total,
  };
};

const columns: TableProps<Article>['columns'] = [
  {
    title: 'Article',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'cover',
    dataIndex: 'cover',
    // key: 'cover',
    // width: 150,
    render: (_, record) => {
      // console.log(record.cover);
      // <img src={record.cover} />;
      return <img src={record.cover} width={80} height={80} />;
    },
  },
  {
    title: 'createTime',
    dataIndex: 'createTime',
    key: 'createTime',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => {
      return (
        <>
          <BtnEditAritcle articleId={record.id} />
          {/* <ButtonEdit cate={record} /> */}
          <ButtonDelete id={record.id} />
        </>
      );
    },
  },
];

// 文章管理页面
const ArticleList: FC = () => {
  const navigate = useNavigate();
  const loaderData = useLoaderData() as {
    artRes: Article[];
    q;
    total: number;
  } | null;
  console.log(loaderData);
  console.log('ArticleListLoaderData', loaderData?.artRes);

  const [, setSearchParams] = useSearchParams();

  // 表格分页属性
  const paginationProps = {
    // showSizeChanger: true,
    showQuickJumper: false,
    // showTotal: () => `${loaderData?.total}in toal`,
    pageSize: loaderData?.q.pageSize,
    current: loaderData?.q.current,
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
          <Button type='primary' onClick={() => navigate('/admin/art-add')}>
            new post
          </Button>
        </Flex>
        {/* 表格组件 */}
        <Table
          rowKey={(record) => record.id}
          columns={columns}
          dataSource={loaderData?.artRes}
          pagination={paginationProps}
        />
      </Space>
    </div>
  );
};

export default ArticleList;

export const action = async ({ request }: ActionFunctionArgs) => {
  const fd = await request.formData();

  const formDataObject = Object.fromEntries(fd);
  console.log('formDataObject', formDataObject);
  // 获取请求的 method 类型
  const method = request.method.toUpperCase() as
    | 'POST'
    | 'PUT'
    | 'PATCH'
    | 'DELETE';

  // if (method === 'PUT') {
  //   // 调用修改文章分类的接口
  //   const [err] = await to(updateArticle(formDataObject));
  //   if (err) return null;
  //   message.success('修改成功!');
  // } else if (method === 'DELETE') {
  //   // 调用删除分类的接口
  //   const [err] = await to(deleteArticle(formDataObject));
  //   if (err) return null;
  //   message.success('删除成功!');
  // }
  return true;
};
