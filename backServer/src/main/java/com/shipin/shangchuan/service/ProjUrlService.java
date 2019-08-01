package com.shipin.shangchuan.service;

import com.shipin.shangchuan.dao.ProjUrlDao;
import com.shipin.shangchuan.model.ProjUrl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Component
public class ProjUrlService {
    @Autowired
    private ProjUrlDao projUrlDao;
    // 插入
    public int insertUrl(String url,String userName,int courseId){
        String projUrls = projUrlDao.selectProjUrl(userName,courseId);
        int jieguo = 0;
        if(projUrls==null){
            jieguo=projUrlDao.insertProjUrl(url,userName,courseId);
        }
        else {
            jieguo=projUrlDao.updateProjUrl(url,userName,courseId);
        }
        return jieguo;
    }
}
