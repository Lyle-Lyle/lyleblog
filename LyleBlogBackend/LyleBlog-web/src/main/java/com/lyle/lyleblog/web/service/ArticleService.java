package com.lyle.lyleblog.web.service;


import com.lyle.lyleblog.common.utils.Response;
import com.lyle.lyleblog.web.model.vo.article.FindArticleDetailReqVO;
import com.lyle.lyleblog.web.model.vo.article.FindIndexArticlePageListReqVO;

public interface ArticleService {
    /**
     * 获取首页文章分页数据
     * @param findIndexArticlePageListReqVO
     * @return
     */
    Response findArticlePageList(FindIndexArticlePageListReqVO findIndexArticlePageListReqVO);


    /**
     * 获取文章详情
     * @param findArticleDetailReqVO
     * @return
     */
    Response findArticleDetail(FindArticleDetailReqVO findArticleDetailReqVO);
}

