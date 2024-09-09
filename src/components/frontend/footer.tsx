import React from 'react';

const Footer = () => {
  return (
    <footer className='bg-white mt-5 dark:bg-gray-800'>
      <div className='w-full mx-auto max-w-screen-xl py-6 md:flex md:items-center md:justify-between'>
        <span className='text-sm text-gray-500 sm:text-center dark:text-gray-400'>
          © 2024{' '}
          <a href='https://www.quanxiaoha.com/' className='hover:underline'>
            Lyle
          </a>
          . All Rights Reserved.
        </span>
        <ul className='flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0'>
          <li>
            Contact me:
            <a href='#' className='mr-4 hover:underline md:mr-6 '>
              Xiongjinyue.lyle@gmail.com
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
