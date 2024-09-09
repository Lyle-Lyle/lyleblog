import type { FC } from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

// 点击按钮跳转到文章修改页面
const BtnEditAritcle: FC<{ articleId: number }> = ({ articleId }) => {
  const navigate = useNavigate();
  return (
    <Button
      type='link'
      size='small'
      onClick={() => navigate(`/admin/art-edit/${articleId}`)}
    >
      Edit Post
    </Button>
  );
};

export default BtnEditAritcle;
