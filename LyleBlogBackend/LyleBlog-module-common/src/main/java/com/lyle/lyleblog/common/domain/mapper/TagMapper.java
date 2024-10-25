package com.lyle.lyleblog.common.domain.mapper;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.lyle.lyleblog.common.domain.dos.TagDO;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

public interface TagMapper extends BaseMapper<TagDO> {
    /**
     * 分页查询
     * @param current
     * @param size
     * @param name
     * @return
     */
    default Page<TagDO> selectPageList(long current, long pageSize, String name) {
        // 分页对象
        Page<TagDO> page = new Page<>(current, pageSize);

        // 构建查询条件
        LambdaQueryWrapper<TagDO> wrapper = new LambdaQueryWrapper<>();
        wrapper
                .like(Objects.nonNull(name), TagDO::getName, name) // 模糊查询
//                .ge(Objects.nonNull(startDate), TagDO::getCreateTime, startDate) // 大于等于开始时间
//                .le(Objects.nonNull(endDate), TagDO::getCreateTime, endDate) // 小于等于结束时间
                .orderByDesc(TagDO::getCreateTime); // order by create_time desc

        return selectPage(page, wrapper);
    }

    /**
     * 根据标签模糊查询
     * @param key
     * @return
     */
    default List<TagDO> selectByKey(String key) {
        LambdaQueryWrapper<TagDO> wrapper = new LambdaQueryWrapper<>();

        // 构造模糊查询的条件
        wrapper.like(TagDO::getName, key).orderByDesc(TagDO::getCreateTime);

        return selectList(wrapper);
    }

    /**
     * 根据标签 Name 批量查询
     * @param tagNames
     * @return
     */
    default List<TagDO> selectByNames(List<String> tagNames) {
        return selectList(Wrappers.<TagDO>lambdaQuery()
                .in(TagDO::getName, tagNames));
    }
}
