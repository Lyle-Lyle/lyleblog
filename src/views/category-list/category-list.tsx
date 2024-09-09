import { Table } from 'antd';
import type { ColumnsType } from 'antd/table';

import React, { FC } from 'react';

const CategoryList: FC = () => {
  return (
    loaderData && (
      <div>
        {/* 表格区域 */}
        <Table dataSource={} />
      </div>
    )
  );
};

export default CategoryList;
