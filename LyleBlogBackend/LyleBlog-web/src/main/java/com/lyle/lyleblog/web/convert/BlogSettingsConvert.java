package com.lyle.lyleblog.web.convert;

import com.lyle.lyleblog.common.domain.dos.BlogSettingsDO;
import com.lyle.lyleblog.web.model.vo.blogsettings.FindBlogSettingsDetailRspVO;
import org.apache.ibatis.annotations.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface BlogSettingsConvert {
    /**
     * 初始化 convert 实例
     */
    BlogSettingsConvert INSTANCE = Mappers.getMapper(BlogSettingsConvert.class);

    /**
     * 将 DO 转化为 VO
     * @param bean
     * @return
     */
    FindBlogSettingsDetailRspVO convertDO2VO(BlogSettingsDO bean);

}
