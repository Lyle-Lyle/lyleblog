import useAppStore, { selectToken } from '@/store/app-store';
import useUserStore, { selectAvatar, selectUser } from '@/store/user-store';
import { initCollapses, initDropdowns } from 'flowbite';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const token = useAppStore(selectToken);
  const user = useUserStore(selectUser);

  const location = useLocation();
  const navigate = useNavigate();

  // 根据路由不同显示不同的选中样式
  const class1 =
    'block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700';

  useEffect(() => {
    initCollapses();
    initDropdowns();
  }, []);
  return (
    <nav className='bg-white border-gray-200 dark:bg-gray-900'>
      <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
        <a
          // href='#'
          className='flex items-center space-x-3 rtl:space-x-reverse'
          onClick={() => navigate('/')}
        >
          <img
            src='https://flowbite.com/docs/images/logo.svg'
            className='h-8'
            alt='Flowbite Logo'
          />
          <span className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white'>
            LyleBlog
          </span>
        </a>
        <div className='flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse'>
          {/* search bar */}

          <form className='flex items-center max-w-sm mx-auto'>
            <label htmlFor='simple-search' className='sr-only'>
              Search
            </label>
            <div className='relative w-full'>
              <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
                <svg
                  className='w-4 h-4 text-gray-500 dark:text-gray-400'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 18 20'
                >
                  <path
                    stroke='currentColor'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2'
                    d='M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2'
                  />
                </svg>
              </div>
              <input
                type='text'
                id='simple-search'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                placeholder='Search...'
                required
              />
            </div>
            <button
              type='submit'
              className='p-2.5 ms-2  text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            >
              <svg
                className='w-4 h-4'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 20 20'
              >
                <path
                  stroke='currentColor'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                />
              </svg>
              <span className='sr-only'>Search</span>
            </button>
          </form>

          {/* Dropdown menu  */}

          {/* 已经登录，展示用户头像  */}
          {token ? (
            <button
              id='dropdownDefaultButton'
              data-dropdown-toggle='dropdown'
              type='button'
            >
              {/* 用户登录头像 */}
              {/* 默认让其右边距为 2， 通过 md: 来指定 PC 端右边距为 0。 */}
              <img
                className='w-10 h-10 rounded-full ml-5 mr-2 md:mr-0'
                src={user.avatar}
                alt='user photo'
              />
            </button>
          ) : (
            <button>Login</button>
          )}

          {/* Dropdown menu */}
          <div
            id='dropdown'
            className='z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700'
          >
            <ul
              className='py-2 text-sm text-gray-700 dark:text-gray-200'
              aria-labelledby='dropdownDefaultButton'
            >
              <li>
                <a
                  // href='http://localhost:5173/'
                  href='/admin'
                  className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                >
                  Admin
                </a>
              </li>
              {/* <li>
                <a
                  href='#'
                  className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                >
                  退出登录
                </a>
              </li> */}
            </ul>
          </div>

          <button
            data-collapse-toggle='navbar-user'
            type='button'
            className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
            aria-controls='navbar-user'
            aria-expanded='false'
          >
            <span className='sr-only'>Open main menu</span>
            <svg
              className='w-5 h-5'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 17 14'
            >
              <path
                stroke='currentColor'
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='M1 1h15M1 7h15M1 13h15'
              />
            </svg>
          </button>
        </div>

        {/* 页面中间的几个链接 */}
        <div
          className='items-center justify-between hidden w-full md:flex md:w-auto md:order-1'
          id='navbar-user'
        >
          <ul className='flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700'>
            <li>
              <a
                href='/'
                className={`${class1} ${
                  location.pathname == '/' ? 'text-blue-700' : 'text-gray-900'
                }`}
              >
                Home
              </a>
            </li>
            <li>
              {/* 为了实现对应菜单被选中状态，我们需要获取当前路由地址，并对其进行判断，如打开归档页，若路由路径为 /article/list , 则通过 :class 指令添加 text-blue-700 文字蓝色被选中样式 */}
              <a
                href='/archive'
                className={`${class1} ${
                  location.pathname == '/archive'
                    ? 'text-blue-700'
                    : 'text-gray-900'
                }`}
              >
                Archive
              </a>
            </li>
            <li>
              <a
                href='/category'
                className='block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'
              >
                Category
              </a>
            </li>
            <li>
              <a
                href='/tag'
                className='block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'
              >
                Tag
              </a>
            </li>
            {/* <li>
              <a
                href='#'
                className='block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'
              >
                todo
              </a>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
