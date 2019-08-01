package com.shipin.shangchuan.dao;


import com.shipin.shangchuan.model.Course;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper
@Component
public interface CourseDao {
    // 根据课程id查询课程
    @Select("select * from course where id = #{courseId}")
    public Course selectCourseById(@Param("courseId")int courseId);

    // 根据用户名查询用户的课程ids
    @Select("select course_id from course_user where userName = #{userName}")
    public List<Integer> selectCourseIdsByUserName(String userName);
}
