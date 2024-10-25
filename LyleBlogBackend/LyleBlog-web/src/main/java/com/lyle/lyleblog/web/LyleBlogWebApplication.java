package com.lyle.lyleblog.web;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@ComponentScan({"com.lyle.lyleblog.*"}) // 多模块项目中，必需手动指定扫描 com.lyle.lyleblog 包下面的所有类
@EnableScheduling
public class LyleBlogWebApplication {

    public static void main(String[] args) {
        SpringApplication.run(LyleBlogWebApplication.class, args);
    }

}
