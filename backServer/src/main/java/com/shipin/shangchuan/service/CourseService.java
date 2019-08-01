package com.shipin.shangchuan.service;


import com.shipin.shangchuan.dao.CourseDao;
import com.shipin.shangchuan.model.Course;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Component
public class CourseService {
    @Autowired
    private CourseDao courseDao;

    // 根据用户名查询用户所有的课程
    public List<Course> selectCourseByUserName(String userName){
        List<Course> courses = new ArrayList<Course>();
        List<Integer> courseIds = courseDao.selectCourseIdsByUserName(userName);
        for(int i=0;i<courseIds.size();i++){
            courses.add(courseDao.selectCourseById(courseIds.get(i)));
        }
        return courses;
    }
}
