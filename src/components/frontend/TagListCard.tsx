import React from 'react';
import { useNavigate } from 'react-router-dom';

const TagListCard = ({ tagRes }) => {
  const navigate = useNavigate();
  const toTagArticleListPage = (id, name) => {
    navigate(`/tag/article/list?id=${id}&name=${name}`);
  };
  return (
    <div className='w-full p-5 mb-3 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700'>
      {/* <!-- 标签标题 --> */}
      <h2 className='mb-2 font-bold text-gray-900 dark:text-white'>Tags</h2>
      {/* <!-- 标签列表 --> */}
      {tagRes &&
        tagRes.map((data) => (
          <span
            onClick={() => toTagArticleListPage(data.id, data.name)}
            className='inline-block cursor-pointer bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded hover:bg-green-200 hover:text-green-900 dark:bg-green-900 dark:text-green-300'
          >
            {data.name}
          </span>
        ))}
    </div>
  );
};

export default TagListCard;
