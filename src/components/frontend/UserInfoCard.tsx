import useUserStore, { selectUser } from '@/store/user-store';
import { Button } from 'flowbite-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserInfoCard = () => {
  const user = useUserStore(selectUser);
  const navigate = useNavigate();
  console.log('user', user);
  // const svgElement = document.getElementsByTagName('svg');
  // svgElement?.addEventListener('click', function () {
  //   // 处理点击事件的代码
  //   console.log('clicked');
  // });
  return (
    <div className='w-full py-5 px-2  bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700'>
      <div className='flex flex-col items-center'>
        {/* <!-- 博主头像 --> */}
        <img
          className='w-24 h-24 mb-3 rounded-full shadow'
          src={user.avatar}
          alt='user image'
        />
        {/* <!-- 博主昵称 --> */}
        <h5 className='mb-1 text-xl font-medium text-gray-900 dark:text-white'>
          {user.name}
        </h5>
        {/* <!-- 介绍语 --> */}
        <span className='text-sm text-gray-500 dark:text-gray-400'>
          {user.introduction}
        </span>
        {/* <!-- 第三方平台主页跳转（如 GitHub 等） --> */}
        <div className='flex justify-center mt-5 gap-2'>
          {/* <!-- GitHub --> */}{' '}
          <svg
            // t='1698029949662'
            className='icon w-7 h-7'
            viewBox='0 0 1024 1024'
            version='1.1'
            xmlns='http://www.w3.org/2000/svg'
            p-id='1447'
            width='200'
            height='200'
            onClick={() => window.open(user.githubHomepage)}
          >
            <path
              d='M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z'
              fill='#4186F5'
              p-id='1448'
            ></path>
            <path
              d='M611.944 302.056c0-15.701 2.75-30.802 7.816-44.917a384.238 384.238 0 0 0-186.11 2.956c-74.501-50.063-93.407-71.902-107.975-39.618a136.243 136.243 0 0 0-3.961 102.287 149.515 149.515 0 0 0-39.949 104.806c0 148.743 92.139 181.875 179.961 191.61a83.898 83.898 0 0 0-25.192 51.863c-40.708 22.518-91.94 8.261-115.181-32.058a83.117 83.117 0 0 0-60.466-39.98s-38.871-0.361-2.879 23.408a102.97 102.97 0 0 1 43.912 56.906s23.398 75.279 133.531 51.863v65.913c0 10.443 13.548 42.63 102.328 42.63 71.275 0 94.913-30.385 94.913-42.987V690.485a90.052 90.052 0 0 0-26.996-72.03c83.996-9.381 173.328-40.204 179.6-176.098a164.706 164.706 0 0 1-21.129 1.365c-84.07 0-152.223-63.426-152.223-141.666z'
              fill='#FFFFFF'
              p-id='1449'
            ></path>
            <path
              d='M743.554 322.765a136.267 136.267 0 0 0-3.961-102.289s-32.396-10.445-107.979 39.618a385.536 385.536 0 0 0-11.853-2.956 132.623 132.623 0 0 0-7.816 44.917c0 78.24 68.152 141.667 152.222 141.667 7.171 0 14.222-0.472 21.129-1.365 0.231-5.03 0.363-10.187 0.363-15.509a149.534 149.534 0 0 0-42.105-104.083z'
              fill='#FFFFFF'
              opacity='.4'
              p-id='1450'
            ></path>
          </svg>
          {/* linkedin */}
          <svg
            // t='1723125072047'
            className='icon w-7 h-7'
            viewBox='0 0 1024 1024'
            version='1.1'
            xmlns='http://www.w3.org/2000/svg'
            p-id='4291'
            width='200'
            height='200'
            onClick={() => window.open(user.linkedinHomepage)}
          >
            <path
              d='M512 1024C229.2224 1024 0 794.7776 0 512 0 229.2224 229.2224 0 512 0c282.7776 0 512 229.2224 512 512 0 282.7776-229.2224 512-512 512z m-137.762133-286.378667V397.380267h-102.4V737.621333h102.4z m-51.2-488.448c-33.024 0-54.5792 22.954667-53.9136 53.589334-0.682667 29.218133 20.8896 52.872533 53.248 52.872533 33.672533 0 55.2448-23.6544 55.2448-52.8896-0.682667-30.6176-21.572267-53.572267-54.5792-53.572267z m133.410133 488.448h102.4V541.405867c0-9.728 1.365333-20.1728 4.061867-26.453334 6.724267-19.456 23.569067-39.645867 51.882666-39.645866 37.034667 0 51.882667 29.917867 51.882667 73.762133V737.621333h102.4V535.842133c0-100.181333-50.517333-146.1248-117.9136-146.1248-54.562133 0-88.251733 32.7168-101.7344 54.272h-2.030933l-4.7104-46.609066h-88.9344c1.348267 29.917867 2.696533 66.0992 2.696533 108.544V737.621333z'
              fill='#0073B1'
              p-id='4292'
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default UserInfoCard;
