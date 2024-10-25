package com.lyle.lyleblog.admin.service;

import com.lyle.lyleblog.admin.model.vo.category.AddCategoryReqVO;
import com.lyle.lyleblog.admin.model.vo.category.DeleteCategoryReqVO;
import com.lyle.lyleblog.admin.model.vo.category.FindCategoryPageListReqVO;
import com.lyle.lyleblog.admin.model.vo.tag.AddTagReqVO;
import com.lyle.lyleblog.admin.model.vo.tag.DeleteTagReqVO;
import com.lyle.lyleblog.admin.model.vo.tag.FindTagPageListReqVO;
import com.lyle.lyleblog.admin.model.vo.tag.SearchTagsReqVO;
import com.lyle.lyleblog.common.utils.PageResponse;
import com.lyle.lyleblog.common.utils.Response;

public interface AdminTagService {

    /**
     * add tags to a list
     * @param addTagReqVO
     * @return
     */
   Response addTags(AddTagReqVO addTagReqVO);


   PageResponse findTagPageList(FindTagPageListReqVO findTagPageListReqVO);

    /**
     * 删除标签
     * @param deleteTagReqVO
     * @return
     */
    Response deleteTag(DeleteTagReqVO deleteTagReqVO);

    /**
     * 根据标签关键词模糊查询
     * @param searchTagsReqVO
     * @return
     */
    Response searchTags(SearchTagsReqVO searchTagsReqVO);

    Response findTagSelectList();

}
