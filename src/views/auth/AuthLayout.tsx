import React, { FC, PropsWithChildren } from 'react';
import styles from './AuthLayout.module.less';
import { Navigate } from 'react-router-dom';
import useAppStore, { selectToken } from '@/store/app-store';

const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
  const token = useAppStore(selectToken);
  if (token) {
    return <Navigate to='/' replace />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.box}>{children}</div>
    </div>
  );
};

export default AuthLayout;
