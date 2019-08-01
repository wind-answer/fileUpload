package com.shipin.shangchuan.service;

import com.shipin.shangchuan.dao.DocDao;
import com.shipin.shangchuan.model.Doc;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.List;

@Service
@Component
public class DocService {

    @Autowired
    private DocDao docDao;

    //插入
    public int insertUrl(String name,String lujing,String url,String userName,int courseId){
        System.out.print("开始插入=name=="+name+"\n");
        System.out.print("开始插入=lujing=="+lujing+"\n");
        System.out.print("开始插入=url=="+url+"\n");
        System.out.print("开始插入=userName=="+userName+"\n");
        int jieguo=docDao.insertUrl(name,lujing,url,userName,courseId);
        System.out.print("插入结果==="+jieguo+"\n");
        return jieguo;
    }
    //查询
    public List<Doc> selectShipin(String userName,int courseId){
        List<Doc> docs= docDao.selectDoc(userName,courseId);
        return  docs;
    }

    //删除
    public int deleteUrl(String url){
        String path = docDao.selectLuJing(url);
        File file =new File(path);
        file.delete();
        int result = docDao.deleteUrl(url);
        return result;
    }
}
