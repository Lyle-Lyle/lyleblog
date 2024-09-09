import { useEffect, useRef, useState, type FC } from 'react';
import { Button, Flex, Form, Input, message, Modal, Tag, Tooltip } from 'antd';
import {
  useActionData,
  useFetcher,
  useLocation,
  useNavigation,
  useSubmit,
} from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';

import type { InputRef } from 'antd';
import { METHODS } from 'http';
import { post } from 'node_modules/axios/index.d.cts';
import { addTagApi } from '@/api/tag-api';
import to from 'await-to-js';

const ButtonAddTag: FC = () => {
  const submit = useSubmit();
  const handleCancel = async () => {
    // 关闭对话框
    // setIsModalOpen(false);
    // 手动触发表单的校验
    // 1. 需要先拿到表单的引用对象
    // 2. 调用表单引用对象的 validateFields 方法
    console.log('submitting tags', tags);
    // submit(tags, { method: 'post', action: '/art-tag' });
    const [err] = await to(addTagApi(tags));
    if (err) {
      setIsModalOpen(false);
      return null;
    } else {
      message.success('Successfully Added!');
      setIsModalOpen(false);
    }
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formRef] = Form.useForm();

  //得到 action 调用结束后返回的数据
  const actionData = useActionData() as boolean;

  // 新建标签
  const [tags, setTags] = useState<string[]>(['Tag 2', 'Tag 3']);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState('');
  const inputRef = useRef<InputRef>(null);
  const editInputRef = useRef<InputRef>(null);

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  useEffect(() => {
    editInputRef.current?.focus();
  }, [editInputValue]);

  const handleClose = (removedTag: string) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    console.log(newTags);
    setTags(newTags);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && !tags.includes(inputValue)) {
      setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue('');
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditInputValue(e.target.value);
  };

  const handleEditInputConfirm = () => {
    const newTags = [...tags];
    newTags[editInputIndex] = editInputValue;
    setTags(newTags);
    setEditInputIndex(-1);
    setEditInputValue('');
  };

  return (
    <>
      <Button type='primary' onClick={() => setIsModalOpen(true)}>
        Add Tag
      </Button>
      <Modal
        title='Add tag' // 对话框的标题
        cancelText='cancel' // 取消按钮要显示的文本
        okText='add' // 确认按钮要显示的文本
        open={isModalOpen} // 是否展示对话框
        // onOk={handleOk} // 确认按钮的事件处理函数
        onCancel={handleCancel} // 取消按钮的事件处理函数
        afterClose={() => formRef.resetFields()}
      >
        <Flex gap='4px 0' wrap>
          {tags.map<React.ReactNode>((tag, index) => {
            if (editInputIndex === index) {
              return (
                <Input
                  ref={editInputRef}
                  key={tag}
                  size='small'
                  // style={tagInputStyle}
                  value={editInputValue}
                  onChange={handleEditInputChange}
                  onBlur={handleEditInputConfirm}
                  onPressEnter={handleEditInputConfirm}
                />
              );
            }
            const isLongTag = tag.length > 20;
            const tagElem = (
              <Tag
                key={tag}
                closable={index !== 0}
                style={{ userSelect: 'none' }}
                onClose={() => handleClose(tag)}
              >
                <span
                  onDoubleClick={(e) => {
                    if (index !== 0) {
                      setEditInputIndex(index);
                      setEditInputValue(tag);
                      e.preventDefault();
                    }
                  }}
                >
                  {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                </span>
              </Tag>
            );
            return isLongTag ? (
              <Tooltip title={tag} key={tag}>
                {tagElem}
              </Tooltip>
            ) : (
              tagElem
            );
          })}
          {inputVisible ? (
            <Input
              ref={inputRef}
              type='text'
              size='small'
              // style={tagInputStyle}
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputConfirm}
              onPressEnter={handleInputConfirm}
            />
          ) : (
            <Tag
              // style={tagPlusStyle}
              icon={<PlusOutlined />}
              onClick={showInput}
            >
              New Tag
            </Tag>
          )}
        </Flex>
      </Modal>
    </>
  );
};

export default ButtonAddTag;
