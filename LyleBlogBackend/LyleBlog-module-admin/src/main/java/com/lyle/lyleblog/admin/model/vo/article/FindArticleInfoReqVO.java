package com.lyle.lyleblog.admin.model.vo.article;


import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ApiModel(value = "查询文章info入参 VO")
public class FindArticleInfoReqVO {

    /**
     * 文章id
     */
    private Long articleId;
}

