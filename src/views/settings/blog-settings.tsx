import React, { FC, useState } from 'react';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import 'md-editor-rt/lib/style.css';
import {
  Button,
  Cascader,
  Checkbox,
  ColorPicker,
  DatePicker,
  Flex,
  Form,
  Input,
  InputNumber,
  message,
  Radio,
  Select,
  SelectProps,
  Slider,
  Switch,
  TreeSelect,
  Upload,
} from 'antd';
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  useLoaderData,
  useNavigate,
  useSubmit,
} from 'react-router-dom';
import { useForm } from 'antd/es/form/Form';
import { MdEditor } from 'md-editor-rt';
import { postArticleApi } from '@/api/article-api';
import to from 'await-to-js';
import { getCateListApi } from '@/api/cate-api';
import { getTagSelectListApi } from '@/api/tag-api';
import FormItem from 'antd/es/form/FormItem';
import useUserStore, { selectUser } from '@/store/user-store';
import { updateBlogSettings, uploadFile } from '@/api/blogSettings-api';
import { METHODS } from 'http';
import useAppStore, { selectToken } from '@/store/app-store';

const { RangePicker } = DatePicker;
const { TextArea } = Input;

export const loader = async () => {
  // 获取标签分页列表
  const [cateErr, cateRes] = await to(getCateListApi());
  console.log(cateRes);

  // 获取分类列表
  const [tagErr, tagRes] = await to(getTagSelectListApi());
  console.log(tagRes);

  if (cateErr || tagErr) return null;

  return { cateRes: cateRes.data, tagRes: tagRes.data };
};

const normFile = (e: any) => {
  console.log('Upload event:', e);
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const BlogSetting: FC = () => {
  const navigate = useNavigate();
  const [formRef] = Form.useForm();
  const submit = useSubmit();
  const loaderData = useLoaderData() as {
    cateRes: CateItem[];
    tagRes: TagItem[];
  } | null;

  // 在页面加载后初始化表单的值, 通过store拿到全局共享的user info
  const user = useUserStore(selectUser);
  const token = useAppStore(selectToken);
  // formRef.setFieldsValue(user);

  // 文章内容
  const [text, setText] = useState('# Hello Editor');

  // tag select list
  const options: SelectProps['options'] = loaderData?.tagRes;

  //  upload组件属性
  const props = {
    action: 'http://localhost:8080/admin/file/upload',
    name: 'file',
    method: 'post',
    headers: {
      Authorization: 'Bearer ' + token,
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        // info.file.response.data.url;
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const handleCancel = () => {
    // 跳转到 article list页面
    navigate('/art-list');
    // 重置菜单
    formRef.resetFields();
  };

  const handleOk = () => {
    // 表单校验
    formRef
      .validateFields()
      .then((values) => {
        console.log('values', values);
        const formData: BlogSettings = {
          ...values,
          logo: values.logo.file.response.data.url,
          avatar: values.avatar.file.response.data.url,
        };
        console.log('校验通过后的数据是：', formData);
        // TODO：提交表单数据到路由的 action 进行处理
        submit(formData, { method: 'POST' });
        navigate('/admin/art-list');
      })
      .catch((err) => {
        console.log('校验不通过:', err);
        message.error('error!');
      });
  };

  // const handleChange = (value: string[]) => {
  //   console.log(`selected ${value}`);
  // };

  return (
    <>
      <Form
        form={formRef}
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 10 }}
        layout='horizontal'
        // disabled={componentDisabled}
        style={{ maxWidth: 600, marginLeft: 0 }}
      >
        <Form.Item label='Blog name' name='name'>
          <Input />
        </Form.Item>

        {/* 博客介绍语 */}
        <Form.Item label='bio' name='introduction'>
          <TextArea rows={4} />
        </Form.Item>
        {/* logo上传 */}
        <Form.Item
          label='Logo'
          // valuePropName='fileList'
          // getValueFromEvent={normFile}
          name='logo'
        >
          <Upload {...props} listType='picture-card'>
            <button style={{ border: 0, background: 'none' }} type='button'>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </button>
          </Upload>
        </Form.Item>
        {/* 用户头像上传 */}
        <Form.Item
          label='Avatar'
          // valuePropName='fileList'
          // getValueFromEvent={normFile}
          name='avatar'
        >
          <Upload {...props} listType='picture-card'>
            <button style={{ border: 0, background: 'none' }} type='button'>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </button>
          </Upload>
        </Form.Item>

        {/* 第三方链接
         */}
        <Form.Item
          label='githubHomepage'
          name='githubHomepage'
          labelCol={{ span: 5 }}
        >
          <Input placeholder='Please input your github url' />
        </Form.Item>

        <Form.Item
          label='linkedinHomepage'
          name='linkedinHomepage'
          labelCol={{ span: 5 }}
        >
          <Input placeholder='Please input your linkedin url' />
        </Form.Item>

        <Flex gap='small'>
          <Form.Item>
            <Button type='primary' onClick={handleOk}>
              publish
            </Button>
          </Form.Item>

          <Form.Item>
            <Button type='primary' onClick={handleCancel}>
              cancel
            </Button>
          </Form.Item>
        </Flex>
      </Form>
    </>
  );
};

export default BlogSetting;

export const action = async ({ request }: ActionFunctionArgs) => {
  const fd = await request.formData();
  const formDataObject = Object.fromEntries(fd);
  const [err, res] = await to(updateBlogSettings(formDataObject));
  if (err) return null;
  message.success('saved!');
  // Navigate();
  return true;
};
