import useAppStore, { selectCollapsed, setCollapsed } from '@/store/app-store';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Collapse, Layout, theme } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { FC, useState } from 'react';
import styles from '@/components/root/header.module.less';
import Logout from './layout';
import useUserStore, { selectAvatar, selectName } from '@/store/user-store';

const { Sider, Content, Footer } = Layout;

const RootHeader: FC = () => {
  // 从store中选择出数据使用
  const collapsed = useAppStore(selectCollapsed);
  const name = useUserStore(selectName);
  const avatar = useUserStore(selectAvatar);

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Header className={styles.container}>
      <div>
        <Button
          type='text'
          className={styles.btnCollapsed}
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
        />
        {/* TODO：封装并实现面包屑组件 */}
      </div>
      <div>
        {/* 头像 */}
        {avatar ? <Avatar src={avatar} /> : <Avatar icon={<UserOutlined />} />}
        {/* 退出登录按钮 */}
        <Logout />
      </div>
    </Header>
  );
};

export default RootHeader;
