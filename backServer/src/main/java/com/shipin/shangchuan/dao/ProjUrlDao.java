package com.shipin.shangchuan.dao;

import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Component;


@Mapper
@Component
public interface ProjUrlDao {
    //插入
    @Insert({"insert into proj_url (url,userName,course_id) values (#{url},#{userName},#{courseId})"})
    int insertProjUrl(@Param("url")String url,@Param("userName")String userName,@Param("courseId")int courseId);

    //查询
    @Select("select url from proj_url where userName = #{userName} AND course_id = #{courseId}")
    String selectProjUrl(@Param("userName")String userName,@Param("courseId")int courseId);

    // 更新
    @Update("UPDATE proj_url SET url = #{url} WHERE userName = #{userName} AND course_id = #{courseId}")
    int updateProjUrl(@Param("url")String url,@Param("userName")String userName,@Param("courseId")int courseId);
}
