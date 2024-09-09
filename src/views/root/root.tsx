/* eslint-disable react-refresh/only-export-components */
import React, { useState } from 'react';
import { Layout } from 'antd';
import RootHeader from '@/components/root/header';
import useAppStore, { selectCollapsed } from '@/store/app-store';
import { initUser } from '@/store/user-store';
import RootMenu from '@/components/root/menu';
import { Outlet, useNavigate } from 'react-router-dom';
import logo from '@/assets/images/Logo.jpeg';
import styles from '@/views/root/root.module.less';

const { Sider, Content, Footer } = Layout;

// 后台主页布局

const Root: React.FC = () => {
  const collapsed = useAppStore(selectCollapsed);
  const navigate = useNavigate();

  return (
    <Layout className={styles.container}>
      {/* 侧边栏 */}
      <Sider trigger={null} collapsible collapsed={collapsed}>
        {/* logo 区域 */}
        <div className={styles['box-logo']} onClick={() => navigate('/')}>
          <img src={logo} alt='logo' className={styles.logo} />
          {/* 按需展示文字 */}
          {!collapsed && <span className={styles['logo-text']}>Blog</span>}
        </div>
        {/* 左侧菜单 */}
        <RootMenu />
      </Sider>
      <Layout>
        {/* 头部区域 */}
        <RootHeader />

        {/* 内容区域 */}
        <Content className={styles.content}>
          {/* 路由占位符 */}
          <Outlet />
        </Content>
        {/* 底部区域 */}
        <Footer className={styles.footer}>Powered by &copy;Lyle</Footer>
      </Layout>
    </Layout>
  );
};

export default Root;

export const loader = async () => {
  // 在路由匹配成功后，将要渲染 Root 组件之前，先调用 initUser 函数获取全局共享的用户信息
  initUser();
  return null;
};
