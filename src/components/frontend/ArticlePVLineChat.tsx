import React, { useEffect } from 'react';
import * as echarts from 'echarts';

const ArticlePVLineChat = (props) => {
  // 初始化折线图
  function initLineChat() {
    const chartDom = document.getElementById('lineChat');
    const myChart = echarts.init(chartDom);
    let option;

    // 从 props.value 中获取日期集合和 pv 访问量集合
    const pvDates = props.pvInfo.pvDates;
    const pvCounts = props.pvInfo.pvCounts;
    console.log('pvInfo', props);
    console.log('pvDates', pvDates);

    option = {
      xAxis: {
        type: 'category',
        // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        data: pvDates,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          // data: [150, 230, 224, 218, 135, 147, 260],
          data: pvCounts,
          type: 'line',
        },
      ],
    };

    option && myChart.setOption(option);
  }
  useEffect(() => {
    initLineChat();
  }, []);
  return (
    // <!-- PV 折线图容器 -->
    <div id='lineChat' className='overflow-x-auto w-full h-60'></div>
  );
};

export default ArticlePVLineChat;
