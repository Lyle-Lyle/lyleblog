import React, { FC, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
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
import {
  deleteArticle,
  postArticleApi,
  updateArticle,
} from '@/api/article-api';
import to from 'await-to-js';
import { getCateListApi } from '@/api/cate-api';
import { getTagSelectListApi } from '@/api/tag-api';
import useAppStore, { selectToken } from '@/store/app-store';

import config from '@/config.json';

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const ArticleAdd: FC = () => {
  const navigate = useNavigate();
  const [formRef] = Form.useForm();
  const submit = useSubmit();
  // 拿到标签和分类数据
  const loaderData = useLoaderData() as {
    cateRes: CateItem[];
    tagRes: TagItem[];
  } | null;

  // 文章内容
  const [text, setText] = useState('# Hello Editor');

  // tag select list
  const options: SelectProps['options'] = loaderData?.tagRes;

  const token = useAppStore(selectToken);

  const handleCancel = () => {
    // 跳转到 article list页面
    navigate('/admin/art-list:');
    // 重置菜单
    formRef.resetFields();
  };

  const handleOk = () => {
    // 表单校验
    formRef
      .validateFields()
      .then((values: ArtAddForm) => {
        // 提交表单数据到路由的 action 进行处理
        const formData = {
          ...values,
          cover: values.cover.file.response.data.url,
        };
        console.log('校验通过后的数据是：', formData);
        submit(formData, { method: 'POST' });
        navigate('/admin/art-list');
      })
      .catch((err) => {
        console.log('校验不通过:', err);
      });
  };

  const handleChange = (value: string[]) => {
    console.log(`selected ${value}`);
  };

  //  upload组件属性
  const props = {
    action: `${config.baseURL}/admin/file/upload`,
    // action: 'http://118.25.109.39:8080/admin/file/upload',
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
        info.file.response.data.url;
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <>
      <Form
        form={formRef}
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 5 }}
        layout='vertical'
        // disabled={componentDisabled}
        style={{ maxWidth: 600, marginLeft: 0 }}
      >
        <Form.Item label='Title' name='title'>
          <Input />
        </Form.Item>
        <Form.Item label='content' name='content'>
          <MdEditor
            modelValue={text}
            onChange={setText}
            style={{ width: 1200 }}
          />
        </Form.Item>

        <Form.Item label='Category' name='categoryName'>
          <Select
            placeholder='Select a category'
            style={{ width: 180 }}
            options={loaderData?.cateRes}
            fieldNames={{ label: 'name', value: 'name' }}
          />
        </Form.Item>
        <Form.Item label='Tag' name='tags'>
          <Select
            mode='multiple'
            allowClear
            style={{ width: 180 }}
            placeholder='select a tag'
            // defaultValue={[]}
            onChange={handleChange}
            options={options}
            fieldNames={{ label: 'name', value: 'name' }}
          />
        </Form.Item>
        <Form.Item label='Summary' name='summary'>
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item
          label='Cover'
          // valuePropName='fileList'
          // getValueFromEvent={normFile}
          name='cover'
        >
          <Upload {...props} listType='picture-card'>
            <button style={{ border: 0, background: 'none' }} type='button'>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </button>
          </Upload>
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

export default ArticleAdd;

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

export const action = async ({ request }: ActionFunctionArgs) => {
  const fd = await request.formData();
  let formDataObject = Object.fromEntries(fd);
  // 把 "tag1,tag2" -> ['tag1','tag2']
  // 后端接受一个List<String>
  const tags = formDataObject.tags.split(',');
  formDataObject = { ...formDataObject, tags };

  //  create a new post
  const [err] = await to(postArticleApi(formDataObject));
  if (err) return null;
  message.success('Successfully added!');

  return true;
};
