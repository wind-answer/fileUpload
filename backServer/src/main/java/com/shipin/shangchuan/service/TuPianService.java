package com.shipin.shangchuan.service;

import com.shipin.shangchuan.dao.TuPianDao;
import com.shipin.shangchuan.model.Tupian;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.List;
@Service
@Component
public class TuPianService {

    @Autowired
    private TuPianDao tuPianDao;

    //插入
    public int insertUrl(String name,String lujing,String url,String userName,int courseId){
        System.out.print("开始插入=name=="+name+"\n");
        System.out.print("开始插入=lujing=="+lujing+"\n");
        System.out.print("开始插入=url=="+url+"\n");
        int jieguo=tuPianDao.insertUrl(name,lujing,url,userName,courseId);
        System.out.print("插入结果==="+jieguo+"\n");
        return jieguo;
    }
    //查询
    public List<Tupian> selectShipin(String userName,int courseId){
        List<Tupian> tupians=tuPianDao.selectTuPian(userName,courseId);
        return  tupians;
    }

    //删除
    public int deleteUrl(String url){
        String path = tuPianDao.selectLuJing(url);
        File file =new File(path);
        file.delete();
        int result = tuPianDao.deleteUrl(url);
        return result;
    }
}
