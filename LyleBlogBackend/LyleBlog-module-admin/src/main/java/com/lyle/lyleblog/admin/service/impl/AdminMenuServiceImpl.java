package com.lyle.lyleblog.admin.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.lyle.lyleblog.admin.service.AdminMenuService;
import com.lyle.lyleblog.common.domain.dos.MenuDO;
import com.lyle.lyleblog.common.domain.mapper.MenuMapper;
import com.lyle.lyleblog.common.utils.Response;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class AdminMenuServiceImpl implements AdminMenuService {

    @Autowired
    private MenuMapper menuMapper;

    @Override
    public Response getMenu() {
        LambdaQueryWrapper<MenuDO> wrapper = new LambdaQueryWrapper<>();
        List<MenuDO> menuList = menuMapper.selectList(wrapper);
        return Response.success(menuList);
    }
}
