// import echarts from 'echarts/types/src/echarts.js';
import { format, subMonths } from 'date-fns';
import * as echarts from 'echarts';
import React, { useEffect } from 'react';

// 当前日期
const currentDate = new Date();
console.log('currentDate', currentDate);
// 半年前
const sixMonthsAgo = subMonths(currentDate, 4);

// 格式化后的开始、结束日期
const startDate = format(sixMonthsAgo, 'yyyy-MM-dd');
const endDate = format(currentDate, 'yyyy-MM-dd');

// 随机生成模拟数据
function getVirtualData(year) {
  const date = +echarts.time.parse(year + '-01-01');
  const end = +echarts.time.parse(year + '-12-31');
  const dayTime = 3600 * 24 * 1000;
  const data = [];
  for (let time = date; time <= end; time += dayTime) {
    data.push([
      echarts.time.format(time, '{yyyy}-{MM}-{dd}', false),
      Math.floor(Math.random() * 10),
    ]);
  }
  console.log('data', data);
  return data;
}

const ArticlePublishCalendar = (props) => {
  // console.log('props', props.heatMapInfo);
  const initCalendar = () => {
    // 日历热点数据
    const myData = [];
    // 将传入的数据设置到 myDate 数组中
    const map = props.heatMapInfo;
    console.log('map', props);
    for (const key in map) {
      myData.push([key, map[key]]);
      // console.log('key', key);
    }
    const chartDom = document.getElementById('calendar');
    const myChart = echarts.init(chartDom);
    // const option;
    console.log('myData', myData);

    const option = {
      visualMap: {
        show: false,
        min: 0,
        max: 10,
      },
      calendar: {
        range: [startDate, endDate],
        // range: '2024',
      },
      series: {
        type: 'heatmap',
        coordinateSystem: 'calendar',
        // data: getVirtualData('2024'),
        data: myData,
      },
      gradientColor: [
        // 自定义热点颜色，参考了 GitHub 代码提交的颜色
        '#fff',
        '#40c463',
        '#30a14e',
        '#216e39',
      ],
    };

    option && myChart.setOption(option);
  };

  useEffect(() => {
    initCalendar();
  }, []);
  return <div id='calendar' className='overflow-x-auto w-full h-60'></div>;
};

export default ArticlePublishCalendar;
