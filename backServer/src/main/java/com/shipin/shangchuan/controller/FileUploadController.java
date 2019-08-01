package com.shipin.shangchuan.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class FileUploadController {

    //访问路径为：http://localhost:8088/shipin/file

    @RequestMapping("/file")

    public String file(){
        System.out.print("================请求路径===跳转file页面====="+"\n");
        return "/file";

    }

//    @RequestMapping("/shangchuan")
//
//    public String shangchuan(){
//        System.out.print("================请求路径===跳转index页面====="+"\n");
//        return "/index";
//
//    }




}