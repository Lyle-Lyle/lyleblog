package com.lyle.lyleblog.web.service.impl;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.core.toolkit.CollectionUtils;
import com.google.common.collect.Lists;
import com.lyle.lyleblog.common.domain.dos.ArticleDO;
import com.lyle.lyleblog.common.domain.mapper.ArticleMapper;
import com.lyle.lyleblog.common.utils.PageResponse;
import com.lyle.lyleblog.common.utils.Response;
import com.lyle.lyleblog.web.convert.ArticleConvert;
import com.lyle.lyleblog.web.model.vo.archive.FindArchiveArticlePageListReqVO;
import com.lyle.lyleblog.web.model.vo.archive.FindArchiveArticlePageListRspVO;
import com.lyle.lyleblog.web.model.vo.archive.FindArchiveArticleRspVO;
import com.lyle.lyleblog.web.service.ArchiveService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.YearMonth;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.stream.Collectors;

@Service
@Slf4j
public class ArchiveServiceImpl implements ArchiveService {

    @Autowired
    private ArticleMapper articleMapper;

    /**
     * 获取文章归档分页数据
     * 我们首先对文章表执行了分页查询操作，如果查询的文章记录不为空的话，则将文章 DO 类转换为 FindArchiveArticlePageListRspVO 类，
     * 然后，对其按 createMonth 发布月份进行分组，并放置到 Map 集合中，key 值为发布月份。
     * 由于 Map 集合是无序的，而前端展示需要按月份发布时间，进行降序排列，为了实现该效果，我们通过 TreeMap 按月份倒序排列。
     * 最后，再对排序后的 Map 进行遍历，并将其转换为归档 VO 返回给前端。
     *
     * @param findArchiveArticlePageListReqVO
     * @return
     */
    @Override
    public Response findArchivePageList(FindArchiveArticlePageListReqVO findArchiveArticlePageListReqVO) {
        Long current = findArchiveArticlePageListReqVO.getCurrent();
        Long size = findArchiveArticlePageListReqVO.getPageSize();

        // 分页查询 拿到所有的文章
        IPage<ArticleDO> page = articleMapper.selectPageList(current, size);
        List<ArticleDO> articleDOS = page.getRecords();

        List<FindArchiveArticlePageListRspVO> vos = Lists.newArrayList();
        if (!CollectionUtils.isEmpty(articleDOS)) {
            // DO 转 VO
            List<FindArchiveArticleRspVO> archiveArticleRspVOS =  articleDOS.stream()
                    .map(articleDO -> ArticleConvert.INSTANCE.convertDO2ArchiveArticleVO(articleDO))
                    .collect(Collectors.toList());

            // 按创建的月份进行分组
            Map<YearMonth, List<FindArchiveArticleRspVO>> map = archiveArticleRspVOS.stream().collect(Collectors.groupingBy(FindArchiveArticleRspVO::getCreateMonth));
            // 使用 TreeMap 按月份倒序排列
            Map<YearMonth, List<FindArchiveArticleRspVO>> sortedMap = new TreeMap<>(Collections.reverseOrder());
            sortedMap.putAll(map);

            // 遍历排序后的 Map，将其转换为归档 VO
            sortedMap.forEach((k, v) -> vos.add(FindArchiveArticlePageListRspVO.builder().month(k).articles(v).build()));
        }

        return PageResponse.success(page, vos);
    }
}
