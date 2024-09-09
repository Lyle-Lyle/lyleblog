import type { FC } from 'react';
import { Menu, MenuProps } from 'antd';
import { useLoaderData, useNavigate } from 'react-router-dom';
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  FileAddOutlined,
  FileTextOutlined,
  HomeOutlined,
  KeyOutlined,
  MailOutlined,
  PictureOutlined,
  PieChartOutlined,
  ProfileOutlined,
  ReadOutlined,
  SolutionOutlined,
  UserOutlined,
} from '@ant-design/icons';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  { key: '/admin', icon: <PieChartOutlined />, label: 'Dashboard' },
  { key: '/admin/art-list', icon: <DesktopOutlined />, label: 'Articles' },
  { key: '/admin/art-cate', icon: <ContainerOutlined />, label: 'Category' },
  { key: '/admin/art-tag', icon: <ContainerOutlined />, label: 'Tags' },
  {
    key: '/admin/blog-settings',
    icon: <ContainerOutlined />,
    label: 'Setttings',
  },
];

const RootMenu: FC = () => {
  const navigate = useNavigate();
  const handleClick = (e) => {
    console.log('key', e.key);
    navigate(e.key, { replace: true });
  };
  return (
    <>
      <Menu
        theme='dark'
        mode='inline'
        defaultSelectedKeys={['1']}
        items={items}
        onClick={handleClick}
      />
    </>
  );
};

export default RootMenu;
