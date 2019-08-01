package com.shipin.shangchuan.controller;

import com.shipin.shangchuan.dao.UserInfoDao;
import com.shipin.shangchuan.model.Course;
import com.shipin.shangchuan.model.UserModel;
import com.shipin.shangchuan.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import java.io.*;
import java.text.SimpleDateFormat;
import java.util.*;


@Controller
//@RequestMapping("/file")
public class MyfileCOntroller {

    @Autowired
    private ShiPinService shiPinService;
    @Autowired
    private UserInfoService userInfoService;
    @Autowired
    private TuPianService tuPianService;
    @Autowired
    private DocService docService;
    @Autowired
    private UserDataService userDataService;
    @Autowired
    private ProjUrlService projUrlService;
    @Autowired
    private CourseService courseService;
    @Autowired
    private UserInfoDao userInfoDao;

    private String  url;
    private String realPath = "/filezone/practice";
    private String realUrl = "http://211.87.179.16:80/file/practice";

//    private String realPath = "/Users/macbookAIR/Sites/fileUpload";
//    private String realUrl = "http://localhost/fileUpload";

    @RequestMapping(value="/login",produces="application/json;charset=UTF-8")
    @ResponseBody
    public Map<String,Integer> login(String userName,String password){
        Map<String,Integer> user = new HashMap<String,Integer>();
        UserModel userModels = userInfoService.selectUserData(userName,password);
        if(userInfoService.selectUserData(userName,password).getUserName() == null){
            user.put("code",500);
        }else{
            if (userInfoService.selectUserData(userName,password).getRole() == 0) {
                user.put("code",200);
            }else {
                user.put("code",300);
            }
        }
        return user;
    }

    @RequestMapping(value="/userCourse",produces="application/json;charset=UTF-8")
    @ResponseBody
    public List<Course> userCourse(String userName){
        List<Course> courseList = courseService.selectCourseByUserName(userName);
        return courseList;
    }

    @RequestMapping(value="/allStudents",produces="application/json;charset=UTF-8")
    @ResponseBody
    public List<UserModel> allStudents(int courseId){
        List<UserModel> students = userInfoDao.selectStudents(courseId);
        return students;
    }

    @RequestMapping(value="/userData",produces="application/json;charset=UTF-8")
    @ResponseBody
    public HashMap<String,Object> getUserData(String userName,int courseId) {
        return userDataService.selectUserData(userName,courseId);
    }

    @RequestMapping(value="/uploadPIC",produces="application/json;charset=UTF-8")
    @ResponseBody
    public String uploadPIC(MultipartFile file,String userName,int courseId) {

        System.out.print(userName+"上传文件==="+"\n");
        //判断文件是否为空
        if (file.isEmpty()) {
            return "上传文件不可为空";
        }


        // 获取文件名
        String fileName = file.getOriginalFilename();
        // 加个时间戳，尽量避免文件名称重复
        fileName = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) + "_" + fileName;
        System.out.print("（加个时间戳，尽量避免文件名称重复）保存的文件名为: "+fileName+"\n");

        // 文件绝对路径
        String path = realPath+"/images/" +fileName;
        System.out.print("保存文件绝对路径"+path+"\n");

        //创建文件路径
        File dest = new File(path);

        //判断文件是否已经存在
        if (dest.exists()) {
            return "文件已经存在";
        }

        //判断文件父目录是否存在
        if (!dest.getParentFile().exists()) {
            dest.getParentFile().mkdir();
        }

        try {
            //上传文件
            file.transferTo(dest); //保存文件
            System.out.print("保存文件路径"+path+"\n");
            url=realUrl+"/images/"+fileName;//本地运行项目
            int jieguo= tuPianService.insertUrl(file.getOriginalFilename(),path,url,userName,courseId);
            System.out.print("插入结果"+jieguo+"\n");
            System.out.print("保存的完整url===="+url+"\n");

        } catch (IOException e) {
            return "上传失败";
        }

        return url;
    }

    @RequestMapping(value="/deletePIC",produces="application/json;charset=UTF-8")
    @ResponseBody
    public String deletePIC(String url){
        tuPianService.deleteUrl(url);
        return "true";
    }



    @RequestMapping(value="/uploadVideo",produces="application/json;charset=UTF-8")
    @ResponseBody
    public String uploadVideo(MultipartFile file,String userName,int courseId) {

        System.out.print(userName+"上传文件==="+file.getOriginalFilename()+"\n");
        //判断文件是否为空
        if (file.isEmpty()) {
            return "上传文件不可为空";
        }


        // 获取文件名
        String fileName = file.getOriginalFilename();

        // 加个时间戳，尽量避免文件名称重复
        fileName = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) + "_" + fileName;
        System.out.print("（加个时间戳，尽量避免文件名称重复）保存的文件名为: "+fileName+"\n");

        // 文件绝对路径
        String path = realPath+"/videos/" +fileName;
        System.out.print("保存文件绝对路径"+path+"\n");

        //创建文件路径
        File dest = new File(path);

        //判断文件是否已经存在
        if (dest.exists()) {
            return "文件已经存在";
        }

        //判断文件父目录是否存在
        if (!dest.getParentFile().exists()) {
            dest.getParentFile().mkdir();
        }

        try {
            //上传文件
            file.transferTo(dest); //保存文件
            System.out.print("保存文件路径"+path+"\n");
            //url="http://你自己的域名/项目名/images/"+fileName;//正式项目
            url=realUrl+"/videos/"+fileName;//本地运行项目
            int jieguo= shiPinService.insertUrl(file.getOriginalFilename(),path,url,userName,courseId);
            System.out.print("插入结果"+jieguo+"\n");
            System.out.print("保存的完整url===="+url+"\n");

        } catch (IOException e) {
            return "上传失败";
        }

        return url;
    }

    @RequestMapping(value="/deleteVideo",produces="application/json;charset=UTF-8")
    @ResponseBody
    public String deleteVideo(String url){
        shiPinService.deleteUrl(url);
        return "true";
    }

    @RequestMapping(value="/uploadDOC",produces="application/json;charset=UTF-8")
    @ResponseBody
    public String uploadDOC(MultipartFile file,String userName,int courseId) {

        System.out.print(userName+"上传文件==="+"\n");
        //判断文件是否为空
        if (file.isEmpty()) {
            return "上传文件不可为空";
        }


        // 获取文件名
        String fileName = file.getOriginalFilename();

        // 加个时间戳，尽量避免文件名称重复
        fileName = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) + "_" + fileName;
        System.out.print("（加个时间戳，尽量避免文件名称重复）保存的文件名为: "+fileName+"\n");

        // 文件绝对路径
        String path = realPath+"/docs/" +fileName;
        System.out.print("保存文件绝对路径"+path+"\n");

        //创建文件路径
        File dest = new File(path);

        //判断文件是否已经存在
        if (dest.exists()) {
            return "文件已经存在";
        }

        //判断文件父目录是否存在
        if (!dest.getParentFile().exists()) {
            dest.getParentFile().mkdir();
        }

        try {
            //上传文件
            file.transferTo(dest); //保存文件
            System.out.print("保存文件路径"+path+"\n");
            url=realUrl+"/docs/"+fileName;//本地运行项目
            int jieguo= docService.insertUrl(file.getOriginalFilename(),path,url,userName,courseId);
            System.out.print("插入结果"+jieguo+"\n");
            System.out.print("保存的完整url===="+url+"\n");

        } catch (IOException e) {
            return "上传失败";
        }

        return url;
    }
    @RequestMapping(value="/deleteDOC",produces="application/json;charset=UTF-8")
    @ResponseBody
    public String deleteDOC(String url){
        docService.deleteUrl(url);
        return "true";
    }

    @RequestMapping(value="/saveProjUrl",produces="application/json;charset=UTF-8")
    @ResponseBody
    public String saveProjUrl(String url,String userName,int courseId){
        projUrlService.insertUrl(url,userName,courseId);
        return url;
    }

}