package com.lyle.lyleblog.web.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.CollectionUtils;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.lyle.lyleblog.common.domain.dos.ArticleDO;
import com.lyle.lyleblog.common.domain.dos.ArticleTagRelDO;
import com.lyle.lyleblog.common.domain.dos.TagDO;
import com.lyle.lyleblog.common.domain.mapper.ArticleMapper;
import com.lyle.lyleblog.common.domain.mapper.ArticleTagRelMapper;
import com.lyle.lyleblog.common.domain.mapper.TagMapper;
import com.lyle.lyleblog.common.enums.ResponseCodeEnum;
import com.lyle.lyleblog.common.exception.BizException;
import com.lyle.lyleblog.common.utils.PageResponse;
import com.lyle.lyleblog.common.utils.Response;
import com.lyle.lyleblog.web.convert.ArticleConvert;
import com.lyle.lyleblog.web.model.vo.tag.FindTagArticlePageListReqVO;
import com.lyle.lyleblog.web.model.vo.tag.FindTagArticlePageListRspVO;
import com.lyle.lyleblog.web.model.vo.tag.FindTagListRspVO;
import com.lyle.lyleblog.web.service.TagService;
import io.swagger.models.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@Slf4j
public class TagServiceImpl implements TagService {

    @Autowired
    private TagMapper tagMapper;
    @Autowired
    private ArticleTagRelMapper articleTagRelMapper;
    @Autowired
    private ArticleMapper articleMapper;

    /**
     * 获取标签列表
     *
     * @return
     */
    @Override
    public Response findTagList() {
        // 查询所有标签
        List<TagDO> tagDOS = tagMapper.selectList(Wrappers.emptyWrapper());

        // DO 转 VO
        List<FindTagListRspVO> vos = null;
        if (!CollectionUtils.isEmpty(tagDOS)) {
            vos = tagDOS.stream()
                    .map(tagDO -> FindTagListRspVO.builder()
//                            .id(tagDO.getId())
                            .name(tagDO.getName())
                            .build())
                    .collect(Collectors.toList());
        }

        return Response.success(vos);
    }

    /**
     * 获取标签下文章分页列表
     *
     * @param findTagArticlePageListReqVO
     * @return
     */
    @Override
    public Response findTagPageList(FindTagArticlePageListReqVO findTagArticlePageListReqVO) {
        Long current = findTagArticlePageListReqVO.getCurrent();
        Long size = findTagArticlePageListReqVO.getPageSize();
        // 标签 ID
        String tagName = findTagArticlePageListReqVO.getName();

        // 判断该标签是否存在
        QueryWrapper<TagDO> QueryWrapper = new QueryWrapper<>();
        QueryWrapper.eq("name", tagName);
        TagDO tagDO = tagMapper.selectOne(QueryWrapper);
        if (Objects.isNull(tagDO)) {
            log.warn("==> 该标签不存在, tagName: {}", tagName);
            throw new BizException(ResponseCodeEnum.TAG_NOT_EXISTED);
        }

        // 先查询该标签下所有关联的文章 ID
        List<ArticleTagRelDO> articleTagRelDOS = articleTagRelMapper.selectByTagName(tagName);

        // 若该标签下未发布任何文章
        if (CollectionUtils.isEmpty(articleTagRelDOS)) {
            log.info("==> 该标签下还未发布任何文章, tagName: {}", tagName);
            return PageResponse.success(null, null);
        }

        // 提取所有文章 ID
        List<Long> articleIds = articleTagRelDOS.stream().map(ArticleTagRelDO::getArticleId).collect(Collectors.toList());

        // 根据文章 ID 集合查询文章分页数据
        Page<ArticleDO> page = articleMapper.selectPageListByArticleIds(current, size, articleIds);
        List<ArticleDO> articleDOS = page.getRecords();

        // DO 转 VO
        List<FindTagArticlePageListRspVO> vos = null;
        if (!CollectionUtils.isEmpty(articleDOS)) {
            vos = articleDOS.stream()
                    .map(articleDO -> ArticleConvert.INSTANCE.convertDO2TagArticleVO(articleDO))
                    .collect(Collectors.toList());
        }

        return PageResponse.success(page, vos);
    }
}
