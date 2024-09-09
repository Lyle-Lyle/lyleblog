import { useEffect, useState, type FC } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import {
  useActionData,
  useLocation,
  useNavigation,
  useSubmit,
} from 'react-router-dom';

const ButtonAdd: FC = () => {
  const submit = useSubmit();
  const location = useLocation();
  const handleOk = () => {
    // 关闭对话框
    // setIsModalOpen(false);
    // 手动触发表单的校验
    // 1. 需要先拿到表单的引用对象
    // 2. 调用表单引用对象的 validateFields 方法
    formRef
      .validateFields()
      .then((values: ArtCateAddForm) => {
        console.log('校验通过后的数据是：', values);
        // TODO：提交表单数据到路由的 action 进行处理
        submit(values, { method: 'POST' });
      })
      .catch((err) => {
        console.log('校验不通过:', err);
      });
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formRef] = Form.useForm();
  const navigation = useNavigation();

  //得到 action 调用结束后返回的数据
  const actionData = useActionData() as boolean;

  useEffect(() => {
    if (
      navigation.state === 'loading' &&
      navigation.formMethod?.toUpperCase() === 'POST' &&
      navigation.formAction === location.pathname
    ) {
      setIsModalOpen(false);
    }
  }, [navigation, location, actionData]);

  return (
    <>
      <Button type='primary' onClick={() => setIsModalOpen(true)}>
        Add category
      </Button>
      <Modal
        title='Add category' // 对话框的标题
        cancelText='cancel' // 取消按钮要显示的文本
        okText='add' // 确认按钮要显示的文本
        //为 Modal 中的添加按钮设置 loading 的 delay 时间
        okButtonProps={{
          loading: navigation.state === 'submitting' &&
            navigation.formMethod.toUpperCase() === 'POST' &&
            navigation.formAction === location.pathname && { delay: 200 },
        }}
        open={isModalOpen} // 是否展示对话框
        onOk={handleOk} // 确认按钮的事件处理函数
        onCancel={() => setIsModalOpen(false)} // 取消按钮的事件处理函数
        afterClose={() => formRef.resetFields()}
        // confirmLoading={
        //   navigation.state === 'submitting' &&
        //   //修改或删除的动作，也会导致添加分类的对话框展示 loading 状态。
        //   navigation.formMethod.toUpperCase() === 'POST' &&
        //   navigation.formAction === location.pathname
        // } // 精准判断当前的 loading 状态
      >
        <Form form={formRef} autoComplete='off' style={{ marginTop: 25 }}>
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

export default ButtonAdd;
