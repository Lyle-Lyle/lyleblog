package com.lyle.lyleblog.admin.controller;

import com.lyle.lyleblog.admin.model.vo.category.AddCategoryReqVO;
import com.lyle.lyleblog.admin.model.vo.tag.AddTagReqVO;
import com.lyle.lyleblog.admin.model.vo.tag.DeleteTagReqVO;
import com.lyle.lyleblog.admin.model.vo.tag.FindTagPageListReqVO;
import com.lyle.lyleblog.admin.model.vo.tag.SearchTagsReqVO;
import com.lyle.lyleblog.admin.service.AdminTagService;
import com.lyle.lyleblog.common.aspect.ApiOperationLog;
import com.lyle.lyleblog.common.utils.PageResponse;
import com.lyle.lyleblog.common.utils.Response;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController
@RequestMapping("/admin")
@Api(tags = "Admin 标签模块")
public class AdminTagController {

    @Resource
    private AdminTagService tagService;

    @PostMapping("/tag/add")
    @ApiOperation(value = "添加标签")
    @ApiOperationLog(description = "添加标签")
    public Response addTags(@RequestBody @Validated AddTagReqVO addTagReqVO) {
        return tagService.addTags(addTagReqVO);
    }

    @PostMapping("/tag/list")
    @ApiOperation(value = "标签分页数据获取")
    @ApiOperationLog(description = "标签分页数据获取")
    public PageResponse findTagPageList(@RequestBody @Validated FindTagPageListReqVO findTagPageListReqVO) {
        return tagService.findTagPageList(findTagPageListReqVO);
    }

    @PostMapping("/tag/delete")
    @ApiOperation(value = "删除标签")
    @ApiOperationLog(description = "删除标签")
    public Response deleteTag(@RequestBody @Validated DeleteTagReqVO deleteTagReqVO) {
        return tagService.deleteTag(deleteTagReqVO);
    }

    @PostMapping("/tag/search")
    @ApiOperation(value = "标签模糊查询")
    @ApiOperationLog(description = "标签模糊查询")
    public Response searchTags(@RequestBody @Validated SearchTagsReqVO searchTagsReqVO) {
        return tagService.searchTags(searchTagsReqVO);
    }

    @PostMapping("/tag/select/list")
    @ApiOperation(value = "分类 Select 下拉列表数据获取")
    @ApiOperationLog(description = "分类 Select 下拉列表数据获取")
    public Response findTagSelectList() {
        return tagService.findTagSelectList();
    }


}
