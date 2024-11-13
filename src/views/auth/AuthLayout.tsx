import { FC, PropsWithChildren } from 'react';
import styles from './AuthLayout.module.less';
import { Navigate } from 'react-router-dom';
import useAppStore, { selectToken } from '@/store/app-store';
import { message } from 'antd';

const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
  const token = useAppStore(selectToken);
  // get page title

  if (token) {
    return <Navigate to='/' replace />;
  } else {
    // no token，promp notification
    message.error('Please login first!');
  }

  return (
    <div className={styles.container}>
      <div className={styles.box}>{children}</div>
    </div>
  );
};

export default AuthLayout;
