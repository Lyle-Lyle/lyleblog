package com.lyle.lyleblog.common.domain.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.lyle.lyleblog.common.domain.dos.ArticleCategoryRelDO;

import java.util.List;

public interface ArticleCategoryRelMapper extends BaseMapper<ArticleCategoryRelDO> {

    /**
     * 根据文章 ID 删除关联记录
     * @param articleId
     * @return
     */
    default int deleteByArticleId(Long articleId) {
        return delete(Wrappers.<ArticleCategoryRelDO>lambdaQuery()
                .eq(ArticleCategoryRelDO::getArticleId, articleId));
    }

    /**
     * 根据文章 ID 查询
     * @param articleId
     * @return
     */
    default ArticleCategoryRelDO selectByArticleId(Long articleId) {
        return selectOne(Wrappers.<ArticleCategoryRelDO>lambdaQuery()
                .eq(ArticleCategoryRelDO::getArticleId, articleId));
    }

    /**
     * 根据文章 ID 集合批量查询
     * @param articleIds
     * @return
     */
    default List<ArticleCategoryRelDO> selectByArticleIds(List<Long> articleIds) {
        return selectList(Wrappers.<ArticleCategoryRelDO>lambdaQuery()
                .in(ArticleCategoryRelDO::getArticleId, articleIds));
    }

    /**
     * 根据分类 name 查询所有的关联记录
     * @param categoryName
     * @return
     */
    default List<ArticleCategoryRelDO> selectListByCategoryName(String categoryName) {
        return selectList(Wrappers.<ArticleCategoryRelDO>lambdaQuery()
                .eq(ArticleCategoryRelDO::getCategoryName, categoryName));
    }

    /**
     * 根据分类 name 查询
     * @param categoryName
     * @return
     */
    default ArticleCategoryRelDO selectOneByCategoryName(String categoryName) {
        return selectOne(Wrappers.<ArticleCategoryRelDO>lambdaQuery()
                .eq(ArticleCategoryRelDO::getCategoryName, categoryName)
                .last("LIMIT 1"));
    }

}
