package com.shipin.shangchuan.dao;


import com.shipin.shangchuan.model.UserModel;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper
@Component
public interface UserInfoDao {
    @Select("select * from sys_submiters where userName= #{userName} AND password= #{password}")
    @Results({
            @Result(property = "id",column = "id"),
            @Result(property = "userName",column = "userName"),
            @Result(property = "password",column = "password"),
            @Result(property = "role",column = "role"),
    })
    UserModel selectUsers(@Param("userName")String userName,@Param("password")String password);

    @Select("select * from course_user where course_id = #{courseId}")
    @Results({
            @Result(property = "id",column = "id"),
            @Result(property = "courseId",column = "course_id"),
            @Result(property = "userName",column = "userName"),
    })
    List<UserModel> selectStudents(int courseId);

}
