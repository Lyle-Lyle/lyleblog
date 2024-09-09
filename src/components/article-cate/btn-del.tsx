import { useEffect, useState, type FC } from 'react';
import { Button, message, Popconfirm, PopconfirmProps } from 'antd';
import { useActionData, useSubmit } from 'react-router-dom';
import { useNavLoading, useNavSubmitting } from '@/utils/hooks';

const ButtonDelete: FC<{ id: number }> = ({ id }) => {
  const [open, setOpen] = useState(false);
  const submit = useSubmit();
  const submitting = useNavSubmitting('DELETE');

  //调用 useNavLoading hook，获取当前的导航状态是否为“重新加载数据”。
  //紧接着，调用 useActionData hook，获取到 action 返回的标识：
  const loading = useNavLoading('DELETE');
  const actionData = useActionData() as boolean;

  const handleDelete = () => {
    if (id === 1 || id === 2) {
      return message.error('delete error');
    }
    setOpen(true);

    console.log(id);
  };

  const confirm = () => {
    console.log('确认删除！', id);
    submit({ id }, { method: 'DELETE' });
  };

  const cancel = () => {
    console.log('取消了删除');
    setOpen(false);
  };
  //接收第二个形参（事件对象 e），判断 e?.currentTarget.dataset.type 的值是否为 btn-ok。
  //如果是，证明点击了确认按钮，不需要关闭气泡确认框。如果否，证明点击的不是确认按钮，需要关闭气泡确认框
  const handleOpenChange: PopconfirmProps['onOpenChange'] = (isOpen, e) => {
    const btnType = e?.currentTarget.dataset.type;
    if (!isOpen && btnType !== 'btn-ok') {
      // 手动关闭旧的气泡确认框
      setOpen(false);
    }
  };

  useEffect(() => {
    if (loading && actionData) {
      setOpen(false);
    }
  }, [loading, actionData]);

  return (
    <>
      <Popconfirm
        open={open} // 控制气泡确认框的显示和隐藏
        title='Instruction'
        description='Are you sure you want to delete it?'
        onConfirm={confirm} // 确认按钮的点击事件处理函数
        onCancel={cancel} // 取消按钮的点击事件处理函数
        okText='yes'
        cancelText='cancel'
        onOpenChange={handleOpenChange}
        okButtonProps={{
          'data-type': 'btn-ok',
          loading: submitting && { delay: 200 },
        }}
      >
        <Button type='link' size='small' onClick={handleDelete}>
          delete
        </Button>
      </Popconfirm>
    </>
  );
};

export default ButtonDelete;
