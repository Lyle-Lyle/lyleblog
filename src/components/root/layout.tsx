import type { FC } from 'react';
import { Button, Popconfirm } from 'antd';
import { useNavigate } from 'react-router-dom';
import { resetAllStore } from '@/store/resetters';

const Logout: FC = () => {
  const navigate = useNavigate();

  const confirm = () => {
    // 清空 store 中的数据
    resetAllStore();
    // 跳转到登录页面
    navigate('/login');
  };

  return (
    <Popconfirm
      title='log out?'
      description='log out?'
      onConfirm={confirm}
      okText='yes'
      cancelText='cancel'
    >
      <Button type='link'>Logout</Button>
    </Popconfirm>
  );
};

export default Logout;
