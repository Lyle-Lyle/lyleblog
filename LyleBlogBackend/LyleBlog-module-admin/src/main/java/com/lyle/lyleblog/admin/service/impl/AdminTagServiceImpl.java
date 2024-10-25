package com.lyle.lyleblog.admin.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.lyle.lyleblog.admin.model.vo.category.AddCategoryReqVO;
import com.lyle.lyleblog.admin.model.vo.category.DeleteCategoryReqVO;
import com.lyle.lyleblog.admin.model.vo.category.FindCategoryPageListReqVO;
import com.lyle.lyleblog.admin.model.vo.category.FindCategoryPageListRspVO;
import com.lyle.lyleblog.admin.model.vo.tag.*;
import com.lyle.lyleblog.admin.service.AdminCategoryService;
import com.lyle.lyleblog.admin.service.AdminTagService;
import com.lyle.lyleblog.common.domain.dos.ArticleTagRelDO;
import com.lyle.lyleblog.common.domain.dos.CategoryDO;
import com.lyle.lyleblog.common.domain.dos.TagDO;
import com.lyle.lyleblog.common.domain.mapper.ArticleTagRelMapper;
import com.lyle.lyleblog.common.domain.mapper.CategoryMapper;
import com.lyle.lyleblog.common.domain.mapper.TagMapper;
import com.lyle.lyleblog.common.enums.ResponseCodeEnum;
import com.lyle.lyleblog.common.exception.BizException;
import com.lyle.lyleblog.common.model.vo.SelectRspVO;
import com.lyle.lyleblog.common.utils.PageResponse;
import com.lyle.lyleblog.common.utils.Response;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import javax.annotation.Resource;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@Slf4j
public class  AdminTagServiceImpl extends ServiceImpl<TagMapper, TagDO> implements AdminTagService {

    @Autowired
    private TagMapper tagMapper;

    @Autowired
    private ArticleTagRelMapper articleTagRelMapper;

    /**
     * 添加标签集合
     *
     * @param addTagReqVO
     * @return
     */
    @Override
    public Response addTags(AddTagReqVO addTagReqVO) {
        // vo 转 do
        List<TagDO> tagDOS = addTagReqVO.getTags().stream()
                .map(tagName -> TagDO.builder()
                        .name(tagName.trim()) // 去掉前后空格
                        .createTime(LocalDateTime.now())
                        .updateTime(LocalDateTime.now())
                        .build())
                .collect(Collectors.toList());

        // 批量插入
        try {
            saveBatch(tagDOS);
        } catch (Exception e) {
            log.warn("该标签已存在", e);
        }

        return Response.success();
    }

    /**
     * 查询标签分页
     *
     * @param findTagPageListReqVO
     * @return
     */
    @Override
    public PageResponse findTagPageList(FindTagPageListReqVO findTagPageListReqVO) {
        // 分页参数、条件参数
        Long current = findTagPageListReqVO.getCurrent();
        Long size = findTagPageListReqVO.getPageSize();
        String name = findTagPageListReqVO.getName();
//        LocalDate startDate = findTagPageListReqVO.getStartDate();
//        LocalDate endDate = findTagPageListReqVO.getEndDate();

        // 分页查询
        Page<TagDO> page = tagMapper.selectPageList(current, size, name);

        List<TagDO> records = page.getRecords();

        // do 转 vo
        List<FindTagPageListRspVO> vos = null;
        if (!org.springframework.util.CollectionUtils.isEmpty(records)) {
            vos = records.stream().map(tagDO -> FindTagPageListRspVO.builder()
                    .id(tagDO.getId())
                    .name(tagDO.getName())
                    .createTime(tagDO.getCreateTime())
                    .build()).collect(Collectors.toList());
        }

        return PageResponse.success(page, vos);
    }

    /**
     * 删除标签
     *
     * @param deleteTagReqVO
     * @return
     */
    @Override
    public Response deleteTag(DeleteTagReqVO deleteTagReqVO) {
        // 标签 ID
        String tagName = deleteTagReqVO.getName();

        // 校验该标签下是否有关联的文章，若有，则不允许删除，提示用户需要先删除标签下的文章
        ArticleTagRelDO articleTagRelDO = articleTagRelMapper.selectOneByTagName(tagName);

        if (Objects.nonNull(articleTagRelDO)) {
            log.warn("==> 此标签下包含文章，无法删除，tagName: {}", tagName);
            throw new BizException(ResponseCodeEnum.TAG_CAN_NOT_DELETE);
        }

        QueryWrapper<TagDO> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("name", tagName);
        // 根据标签 ID 删除
        int count = tagMapper.delete(queryWrapper);

        return count == 1 ? Response.success() : Response.fail(ResponseCodeEnum.TAG_NOT_EXISTED);
    }

    /**
     * 根据标签关键词模糊查询
     *
     * @param searchTagsReqVO
     * @return
     */
    @Override
    public Response searchTags(SearchTagsReqVO searchTagsReqVO) {
        String key = searchTagsReqVO.getKey();

        // 执行模糊查询
        List<TagDO> tagDOS = tagMapper.selectByKey(key);

        // do 转 vo
        List<SelectRspVO> vos = null;
        if (!CollectionUtils.isEmpty(tagDOS)) {
            vos = tagDOS.stream()
                    .map(tagDO -> SelectRspVO.builder()
                            .name(tagDO.getName())
                            .id(tagDO.getId())
                            .build())
                    .collect(Collectors.toList());
        }

        return Response.success(vos);
    }

    @Override
    public Response findTagSelectList() {
        // 查询所有分类
        List<TagDO> tagDOS = tagMapper.selectList(null);

        // DO 转 VO
        List<SelectRspVO> selectRspVOS = null;
        // 如果分类数据不为空
        if (!CollectionUtils.isEmpty(tagDOS)) {
            // 将分类 ID 作为 Value 值，将分类名称作为 label 展示
            selectRspVOS = tagDOS.stream()
                    .map(categoryDO -> SelectRspVO.builder()
                            .name(categoryDO.getName())
                            .id(categoryDO.getId())
                            .build())
                    .collect(Collectors.toList());
        }

        return Response.success(selectRspVOS);
    }


}
