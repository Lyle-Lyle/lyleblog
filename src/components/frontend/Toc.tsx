import React, { useEffect, useState } from 'react';

const Toc = () => {
  const [titles, setTitles] = useState([]);
  useEffect(() => {
    // 通过 .artilce-content 样式来获取父级 div
    const container = document.querySelector('.article-content');
    console.log('container', container);

    // 使用 MutationObserver 监视 DOM 的变化
    // 使用 MutationObserver 监视 DOM 的变化
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
          // 只提取二级、三级标题
          const levels = ['h2', 'h3'];
          const headings = container?.querySelectorAll(levels);

          console.log(headings);

          // 存放组装后的目录标题数据
          const titlesArr = [];

          // 下标
          let index = 1;
          headings.forEach((heading) => {
            // 标题等级， h2 -> 级别 2 ； h3 -> 级别3
            const headingLevel = parseInt(heading.tagName.substring(1));
            // 标题文字
            const headingText = heading.innerText;
            // 标题的位置（距离顶部的距离）
            const offsetTop = heading.offsetTop;

            if (headingLevel === 2) {
              // 二级标题
              titlesArr.push({
                index,
                level: headingLevel,
                text: headingText,
                offsetTop,
                children: [], // 二级标题下的子标题
              });
            } else {
              // 三级标题
              // 父级标题
              const parentHeading = titlesArr[titlesArr.length - 1];
              // 设置父级标题的 children
              parentHeading.children.push({
                index,
                level: headingLevel,
                text: headingText,
                offsetTop,
              });
            }
            // 下标 +1
            index++;
          });

          console.log(titlesArr);
        }
      }
    });

    // 配置监视子节点的变化
    const config = { childList: true, subtree: true };
    // 开始观察正文 div 的内容变化
    observer.observe(container, config);
  }, []);

  return (
    <>
      {/* <!-- text-sm/[30px] 表示文字小号，行高为 30px --> */}
      {titles.length > 0 && titles && (
        <div className='sticky top-[5.5rem] text-sm/[30px] w-full p-5 mb-3 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700'>
          {/* <!-- 目录标题 --> */}
          <h2 className='flex items-center mb-2 font-bold text-gray-900 uppercase dark:text-white'>
            {/* <!-- 目录图标 --> */}
            <svg
              t='1699441758495'
              class='icon w-3.5 h-3.5 mr-2'
              viewBox='0 0 1024 1024'
              version='1.1'
              xmlns='http://www.w3.org/2000/svg'
              p-id='4043'
              width='200'
              height='200'
            >
              <path
                d='M857.6 25.6a76.8 76.8 0 0 1 76.8 76.8v819.2a76.8 76.8 0 0 1-76.8 76.8H166.4a76.8 76.8 0 0 1-76.8-76.8V102.4a76.8 76.8 0 0 1 76.8-76.8h691.2z m-102.4 678.4H473.6l-2.2528 0.064a38.4 38.4 0 0 0 0 76.672L473.6 780.8h281.6l2.2528-0.064a38.4 38.4 0 0 0 0-76.672L755.2 704z m0-230.4H473.6l-2.2528 0.064a38.4 38.4 0 0 0 0 76.672L473.6 550.4h281.6l2.2528-0.064a38.4 38.4 0 0 0 0-76.672L755.2 473.6z m0-230.4H473.6l-2.2528 0.064a38.4 38.4 0 0 0 0 76.672L473.6 320h281.6l2.2528-0.064a38.4 38.4 0 0 0 0-76.672L755.2 243.2z'
                fill='#6B57FE'
                p-id='4044'
              ></path>
              <path
                d='M281.6 691.2a51.2 51.2 0 1 1 0 102.4 51.2 51.2 0 0 1 0-102.4z m0-230.4a51.2 51.2 0 1 1 0 102.4 51.2 51.2 0 0 1 0-102.4z m0-230.4a51.2 51.2 0 1 1 0 102.4 51.2 51.2 0 0 1 0-102.4z'
                fill='#FFBA00'
                p-id='4045'
              ></path>
            </svg>
            文章目录
          </h2>
          <div className='toc-wrapper'>
            <ul className='toc'>
              {/* <!-- 二级标题 --> */}
              {titles.map((value) => (
                <span className='py-2 pl-5'>{value.text}</span>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Toc;
