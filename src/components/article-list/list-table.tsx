// import { useMemo, type FC } from 'react';
// import { Table, Button } from 'antd';
// import type { TableProps } from 'antd';
// import { useSearchParams } from 'react-router-dom';

// const columns: TableProps<Article>['columns'] = [
//   // {
//   //   title: '序号',
//   //   render(_, __, index) {
//   //     return index + 1;
//   //   },
//   // },
//   { title: 'Title', dataIndex: 'title' },
//   { title: '名称', dataIndex: 'name' },
//   // TODO 使用 dayjs 格式化文章的发表时间
//   { title: '发表时间', dataIndex: 'pub_date' },
//   { title: '状态', dataIndex: 'state' },
//   {
//     title: '操作',
//     render(_, record) {
//       return (
//         <>
//           <Button
//             type='link'
//             size='small'
//             onClick={() => console.log('修改', record.id)}
//           >
//             修改
//           </Button>
//           {/* 自定义按钮 */}
//           {/* <BtnEditAritcle id={record.id} /> */}
//           <Button
//             type='link'
//             size='small'
//             onClick={() => console.log('删除', record.id)}
//           >
//             删除
//           </Button>
//         </>
//       );
//     },
//   },
// ];

// type Props = TableProps & Partial<{ total: number } & BaseListQuery>;

// // 自己封装的一个表格组件
// const ArticleListTable: FC<Props> = (props) => {
//   const pageOptions = useMemo<TableProps['pagination']>(() => {
//     return {
//       total: props.total,
//       // 每页展示多少条数据的下拉菜单的选项
//       pageSizeOptions: [2, 3, 5, 10, 20],
//       showSizeChanger: true,
//       showQuickJumper: true,
//       showTotal(total) {
//         return `共${total}条数据`;
//       },
//       // 改造分页的配置对象，新增 onChange 回调，当页码变化或 pageSize 变化都会触发此回调，拿到最新的分页并更新到 URL 中
//       onChange(page, pageSize) {
//         setSearchParams({
//           pagenum: page,
//           pagesize: pageSize,
//           cate_id: props.id,
//         } as unknown as {
//           [x: string]: string;
//         });
//       },
//     };
//   }, [props]);
//   const [, setSearchParams] = useSearchParams();

//   // 二次封装的规范：
//   // 1. 尽量不要改动原组件上的属性，如果需要添加额外属性的话，可以进行拓展和自定义
//   // 2. 如果原组件上的属性比较简单，可以不进行二次封装，直接借用原组件上的属性
//   // 3. 如果原组件上的属性配置比较复杂，则建议进行二次封装
//   return <Table {...props} columns={columns} pagination={pageOptions} />;
// };

// export default ArticleListTable;
