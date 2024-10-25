package com.lyle.lyleblog.common.domain.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.lyle.lyleblog.common.config.InsertBatchMapper;
import com.lyle.lyleblog.common.domain.dos.ArticleTagRelDO;

import java.util.List;

public interface ArticleTagRelMapper extends InsertBatchMapper<ArticleTagRelDO> {

    /**
     * 根据文章 ID 删除关联记录
     * @param articleId
     * @return
     */
    default int deleteByArticleId(Long articleId) {
        return delete(Wrappers.<ArticleTagRelDO>lambdaQuery()
                .eq(ArticleTagRelDO::getArticleId, articleId));
    }

    /**
     * 根据文章 ID 集合批量查询
     * @param articleIds
     * @return
     */
    default List<ArticleTagRelDO> selectByArticleIds(List<Long> articleIds) {
        return selectList(Wrappers.<ArticleTagRelDO>lambdaQuery()
                .in(ArticleTagRelDO::getArticleId, articleIds));
    }

    /**
     * 查询该标签 ID 下所有关联记录
     * @param tagName
     * @return
     */
    default List<ArticleTagRelDO> selectByTagName(String tagName) {
        return selectList(Wrappers.<ArticleTagRelDO>lambdaQuery()
                .eq(ArticleTagRelDO::getTagName, tagName));
    }

    /**
     * 根据文章 ID 来查询
     * @param articleId
     * @return
     */
    default List<ArticleTagRelDO> selectByArticleId(Long articleId) {
        return selectList(Wrappers.<ArticleTagRelDO>lambdaQuery()
                .eq(ArticleTagRelDO::getArticleId, articleId));
    }

    /**
     * 根据标签 Name 查询
     * @param tagName
     * @return
     */
    default ArticleTagRelDO selectOneByTagName(String tagName) {
        return selectOne(Wrappers.<ArticleTagRelDO>lambdaQuery()
                .eq(ArticleTagRelDO::getTagName, tagName)
                .last("LIMIT 1"));
    }


}
