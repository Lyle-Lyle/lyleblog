package com.lyle.lyleblog.admin.service;

import com.lyle.lyleblog.admin.model.vo.category.AddCategoryReqVO;
import com.lyle.lyleblog.admin.model.vo.category.DeleteCategoryReqVO;
import com.lyle.lyleblog.admin.model.vo.category.FindCategoryPageListReqVO;
import com.lyle.lyleblog.admin.model.vo.category.UpdateCategoryReqVO;
import com.lyle.lyleblog.common.utils.PageResponse;
import com.lyle.lyleblog.common.utils.Response;
import org.springframework.web.bind.annotation.RequestBody;

public interface AdminCategoryService {
    /**
     * 添加分类
     * @param addCategoryReqVO
     * @return
     */
    Response addCategory(AddCategoryReqVO addCategoryReqVO);

    public Response updateCategory(UpdateCategoryReqVO updateCategoryReqVO);

    /**
     * 分类分页数据查询
     * @param findCategoryPageListReqVO
     * @return
     */
    PageResponse findCategoryPageList(FindCategoryPageListReqVO findCategoryPageListReqVO);

    /**
     * 删除分类
     */
    Response deleteCategory(DeleteCategoryReqVO deleteCategoryReqVO);

    /**
     * 获取文章分类的 Select 列表数据
     * @return
     */
    Response findCategorySelectList();


}
