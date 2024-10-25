package com.lyle.lyleblog.web.service;

import com.lyle.lyleblog.common.utils.Response;

public interface BlogSettingsService {
    /**
     * 获取博客设置信息
     * @return
     */
    Response findDetail();
}
