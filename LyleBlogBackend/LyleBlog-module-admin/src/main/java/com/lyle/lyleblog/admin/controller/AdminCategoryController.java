package com.lyle.lyleblog.admin.controller;

import com.lyle.lyleblog.admin.model.vo.category.AddCategoryReqVO;
import com.lyle.lyleblog.admin.model.vo.category.DeleteCategoryReqVO;
import com.lyle.lyleblog.admin.model.vo.category.FindCategoryPageListReqVO;
import com.lyle.lyleblog.admin.model.vo.category.UpdateCategoryReqVO;
import com.lyle.lyleblog.admin.service.AdminCategoryService;
import com.lyle.lyleblog.common.aspect.ApiOperationLog;
import com.lyle.lyleblog.common.utils.PageResponse;
import com.lyle.lyleblog.common.utils.Response;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
@Api(tags = "Admin 分类模块")
public class  AdminCategoryController {

    @Autowired
    private AdminCategoryService categoryService;

    @PostMapping("/category/add")
    @ApiOperation(value = "添加分类")
    @ApiOperationLog(description = "添加分类")
    public Response addCategory(@RequestBody @Validated AddCategoryReqVO addCategoryReqVO) {
        return categoryService.addCategory(addCategoryReqVO);
    }

    @PutMapping("/category/update")
    @ApiOperation(value = "修改分类")
    @ApiOperationLog(description = "修改分类")
    public Response updateCategory(@RequestBody @Validated UpdateCategoryReqVO updateCategoryReqVO) {
        return categoryService.updateCategory(updateCategoryReqVO);
    }


    @PostMapping("/category/list")
    @ApiOperation(value = "分类分页数据获取")
    @ApiOperationLog(description = "分类分页数据获取")
    public PageResponse findCategoryList(@RequestBody @Validated FindCategoryPageListReqVO findCategoryPageListReqVO) {
        return categoryService.findCategoryPageList(findCategoryPageListReqVO);
    }

    @DeleteMapping("/category/delete")
    @ApiOperation(value = "删除分类")
    @ApiOperationLog(description = "删除分类")
    public Response deleteCategory(@Validated @RequestBody DeleteCategoryReqVO deleteCategoryReqVO) {
        return categoryService.deleteCategory(deleteCategoryReqVO);
    }

    @PostMapping("/category/select/list")
    @ApiOperation(value = "分类 Select 下拉列表数据获取")
    @ApiOperationLog(description = "分类 Select 下拉列表数据获取")
    public Response findCategorySelectList() {
        return categoryService.findCategorySelectList();
    }


}
