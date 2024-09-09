import { useEffect, useState, type FC } from 'react';
import { Button, Form, Input, message, Modal } from 'antd';
import { useActionData, useSubmit } from 'react-router-dom';
import { useNavLoading, useNavSubmitting } from '@/utils/hooks';

const ButtonEdit: FC<{ cate: CateItem }> = ({ cate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formRef] = Form.useForm<CateItem>();
  const submit = useSubmit();
  const submitting = useNavSubmitting('PUT');
  const loading = useNavLoading('PUT');
  // 获取action返回的数据
  const actionData = useActionData() as boolean | null;

  //监听 loading 和 actionData 的变化，当它们都为 true 的时候，关闭对话框
  useEffect(() => {
    if (loading && actionData) {
      setIsModalOpen(false);
    }
  }, [loading, actionData]);

  const showEditModal = () => {
    console.log(cate);
    // if (cate.id === 1 || cate.id === 2) {
    //   message.error('error');
    //   return;
    // }

    formRef.setFieldsValue(cate);
    // 展示 Modal 对话框，进行修改的操作
    setIsModalOpen(true);
  };

  const handleOk = () => {
    // setIsModalOpen(false);
    formRef
      .validateFields()
      .then((values) => {
        console.log('表单校验通过：', values);
        // 把验证通过的表单数据，提交到路由的 action 中进行处理
        submit(values, { method: 'PUT' });
      })
      .catch((err) => {
        console.log('表单校验失败：', err);
      });
  };

  return (
    <>
      <Button type='link' size='small' onClick={showEditModal}>
        Edit
      </Button>

      <Modal
        title='edit category'
        cancelText='cancel'
        okText='save'
        // 获取loading状态
        okButtonProps={{ loading: submitting && { delay: 200 } }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
        // 当对话框关闭之后，重置 Form 表单
        afterClose={() => formRef.resetFields()}
      >
        <Form form={formRef} autoComplete='off' style={{ marginTop: 25 }}>
          <Form.Item label='id' name='id' hidden>
            <Input readOnly />
          </Form.Item>

          <Form.Item
            label='category name'
            name='name'
            rules={[
              { required: true, message: 'Please enter category name!' },
              {
                pattern: /^\S{1,10}$/,
                message: 'must be a non-empty string of 1 to 10 characters!',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ButtonEdit;
