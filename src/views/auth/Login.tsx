import React, { FC } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input, Space, message } from 'antd';
import {
  ActionFunctionArgs,
  Link,
  redirect,
  useFetcher,
  useSearchParams,
} from 'react-router-dom';
import { loginApi } from '@/api/auth-api';
import to from 'await-to-js';
import useAppStore, { selectToken, setToken } from '@/store/app-store';
import { initUser } from '@/store/user-store';

const LoginFront: FC = () => {
  // 解析 URL 中的查询参数
  const [searchParams] = useSearchParams();
  const loginFetcher = useFetcher();

  const onFinish = (values: LoginForm) => {
    if (loginFetcher.state === 'submitting') return;
    loginFetcher.submit(values, { method: 'POST' });
  };

  return (
    <div className='grid grid-cols-2 h-screen'>
      {/* 默认占两列，order 用于指定排列顺序，md 用于适配非移动端（PC 端）  */}
      <div className='col-span-2 order-2 p-10 md:col-span-1 md:order-1 bg-slate-900'>
        {/* 指定为 flex 布局，并设置为屏幕垂直水平居中，高度为 100% */}
        <div className='flex justify-center items-center h-full flex-col'>
          <h2 className='font-bold text-4xl mb-7 text-white'>Lyleblog</h2>
          <p className='text-white'>
            一款由 Spring Boot + Mybaits Plus + Vue 3.2 + Vite 4
            开发的前后端分离博客。
          </p>
          {/* 指定图片宽度为父级元素的 1/2 */}
          <img src='../../public/assets/developer.png' />
        </div>
      </div>
      {/* 右边栏 */}
      <div className='col-span-2 order-1 md:col-span-1 md:order-2 bg-white'>
        <div className='flex justify-center items-center h-full flex-col'>
          {/* 大标题，设置字体粗细、大小、下边距 */}
          <h1 className='font-bold text-4xl mb-5'>Welcome back</h1>
          {/* 设置 flex 布局，内容垂直水平居中，文字颜色，以及子内容水平方向 x 轴间距 */}
          <div className='flex items-center justify-center mb-7 text-gray-400 space-x-2'>
            {/* 左边横线，高度为 1px, 宽度为 16，背景色设置 */}
            <span className='h-[1px] w-16 bg-gray-200'></span>

            <div className='mr-4'>账号密码登录</div>
            {/* 右边横线 */}
            <span className='h-[1px] w-16 bg-gray-200'></span>
          </div>
          {/* 引入 Element Plus 表单组件，移动端设置宽度为 5/6，PC 端设置为 2/5 */}
          <Form
            size='large'
            initialValues={{ username: searchParams.get('uname') }}
            onFinish={onFinish}
          >
            <Form.Item
              name='username'
              rules={[
                { required: true, message: 'Username!' },
                {
                  pattern: /^[0-9a-zA-Z]{1,10}$/,
                  message: '用户名必须是1-10位的字母数字！',
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className='site-form-item-icon' />}
                placeholder='Username'
              />
            </Form.Item>
            <Form.Item
              name='password'
              rules={[
                { required: true, message: 'password!' },
                {
                  pattern: /^\S{6,15}$/,
                  message: '密码必须是6-15位的非空字符！',
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className='site-form-item-icon' />}
                type='password'
                placeholder='Password'
              />
            </Form.Item>

            <Form.Item>
              <Space direction='vertical'>
                <Button
                  type='primary'
                  htmlType='submit'
                  loading={
                    loginFetcher.state === 'submitting' && { delay: 200 }
                  }
                >
                  Log in
                </Button>
                <div>
                  Or <Link to='/reg'>register now!</Link>
                </div>
              </Space>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const fd = await request.formData();
  const formDataObject = Object.fromEntries(fd) as LoginForm;
  // const formDataJsonString = JSON.stringify(formDataObject);
  // const loginData = {
  //   username: fd.get('username'),
  //   password: fd.get('password'),
  // };

  // console.log('ok', JSON.stringify(loginData));
  // 这里axios的api接受的是formData
  const [err, res] = await to(loginApi(formDataObject));

  if (err) return null;
  console.log(res);
  if (res.data) {
    // 全局存储登录成功之后拿到的 token 值
    setToken(res.data?.token);
    // 更新user的信息
    initUser();
  }
  const token = useAppStore.getState().token;
  console.log('app-store');
  console.log(token);

  // TODO: 修改页面标题

  // 提示用户登录成功
  message.success(res.message);
  // 跳转到后台主页
  // 因为登录成功之后，会把 token 存储到全局 store。紧接着会触发 AuthLayout 组件中的 if(token) 判断，发现 token 有值，因此会通过 <Navigate to="/" replace /> 自动跳转到后台主页。
  // return redirect('/');
  return null;
};

export default LoginFront;
