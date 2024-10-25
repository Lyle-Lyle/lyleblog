package com.lyle.lyleblog.admin.controller;


import com.lyle.lyleblog.admin.service.AdminMenuService;
import com.lyle.lyleblog.common.aspect.ApiOperationLog;
import com.lyle.lyleblog.common.utils.Response;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;

@RestController
@Api(tags = "Admin 主页菜单")
public class AdminMenuController {

    @Resource
    private AdminMenuService adminMenuService;

    @GetMapping("/my/menu")
    @ApiOperation(value = "左侧菜单列表")
    @ApiOperationLog(description = "左侧菜单列表")
    public Response getMenu() {
        return adminMenuService.getMenu();
    }
}
