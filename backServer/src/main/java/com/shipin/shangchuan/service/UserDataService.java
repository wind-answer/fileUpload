package com.shipin.shangchuan.service;


import com.shipin.shangchuan.dao.*;
import com.shipin.shangchuan.model.Course;
import com.shipin.shangchuan.model.Doc;
import com.shipin.shangchuan.model.Shipin;
import com.shipin.shangchuan.model.Tupian;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Service
@Component
public class UserDataService {
    @Autowired
    private TuPianDao tuPianDao;
    @Autowired
    private ShiPinDao shiPinDao;
    @Autowired
    private DocDao docDao;
    @Autowired
    private ProjUrlDao projUrlDao;
    @Autowired
    private CourseDao courseDao;

    public HashMap<String,Object> selectUserData(String userName,int courseId){
        HashMap<String,Object> userData = new HashMap();
        List<Tupian> picListTemp = tuPianDao.selectTuPian(userName,courseId);
        List<Object> picList = new ArrayList<Object>();
        for(int i = 0; i < picListTemp.size(); i++)
        {
            HashMap<String,Object> tempOject = new HashMap<String,Object>();
            Tupian tempModel =  picListTemp.get(i);
            tempOject.put("uid",tempModel.getId());
            tempOject.put("name",tempModel.getName());
            tempOject.put("status","done");
            tempOject.put("url",tempModel.getUrl());
            tempOject.put("thumbUrl",tempModel.getUrl());
            tempOject.put("response",tempModel.getUrl());
            picList.add(tempOject);
            //System.out.println(list.get(i));
        }

        List<Shipin> videoListTemp = shiPinDao.selectShipin(userName,courseId);
        List<Object> videoList = new ArrayList<Object>();
        for(int i = 0; i < videoListTemp.size(); i++)
        {
            HashMap<String,Object> tempOject = new HashMap<String,Object>();
            Shipin tempModel = videoListTemp.get(i);
            tempOject.put("uid",tempModel.getId());
            tempOject.put("name",tempModel.getName());
            tempOject.put("status","done");
            tempOject.put("url",tempModel.getUrl());
            tempOject.put("thumbUrl",tempModel.getUrl());
            tempOject.put("response",tempModel.getUrl());
            videoList.add(tempOject);
            //System.out.println(list.get(i));
        }

        List<Doc> docListTemp = docDao.selectDoc(userName,courseId);
        List<Object> docList = new ArrayList<Object>();
        for(int i = 0; i < docListTemp.size(); i++)
        {
            HashMap<String,Object> tempOject = new HashMap<String,Object>();
            Doc tempModel =  docListTemp.get(i);
            tempOject.put("uid",tempModel.getId());
            tempOject.put("name",tempModel.getName());
            tempOject.put("status","done");
            tempOject.put("url",tempModel.getUrl());
            tempOject.put("thumbUrl",tempModel.getUrl());
            tempOject.put("response",tempModel.getUrl());
            docList.add(tempOject);
            //System.out.println(list.get(i));
        }
        String projUrl = projUrlDao.selectProjUrl(userName,courseId);
        if(projUrl==null) projUrl="";
        Course course = courseDao.selectCourseById(courseId);
        userData.put("picList",picList);
        userData.put("videoList",videoList);
        userData.put("docList",docList);
        userData.put("projUrl",projUrl);
        userData.put("courseName",course.getCourse_name());
        return userData;
    }


}
