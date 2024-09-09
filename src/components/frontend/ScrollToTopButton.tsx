import React, { useEffect } from 'react';

const ScrollToTopButton = () => {
  let showScrollToTopBtn = false;
  const handleScroll = () => {
    // 如果页面滚动超过300px，显示回到顶部按钮，否则隐藏
    if (window.scrollY > 300) {
      showScrollToTopBtn = true;
      console.log('scrollY', window.scrollY);
    } else {
      showScrollToTopBtn = false;
    }
  };

  // 滚动到顶部
  const scrollToTop = () => {
    window.scrollTo({
      top: 0, // 距离顶部位置
      behavior: 'smooth', // 平滑滚动效果
    });
  };

  useEffect(() => {
    window.addEventListener('scoll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {showScrollToTopBtn && ( // <!-- fixed 固定位置，并通过 bottom-xx right-xx 设置在右下角 -->
        <div
          className='border cursor-pointer fixed bottom-2 right-2 md:bottom-10 md:right-10 inline p-3 bg-white hover:bg-gray-100 rounded'
          onClick={scrollToTop}
        >
          <svg
            className='w-4 h-4 text-gray-500 dark:text-white'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 10 14'
          >
            <path
              stroke='currentColor'
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              d='M5 13V1m0 0L1 5m4-4 4 4'
            ></path>
          </svg>
        </div>
      )}
    </>
  );
};

export default ScrollToTopButton;
