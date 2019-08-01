package com.shipin.shangchuan.dao;

import com.shipin.shangchuan.model.Tupian;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Component;

import java.util.List;


@Mapper
@Component
public interface TuPianDao {

    //插入
    @Insert({"insert into tupians (name,lujing,url,userName,course_id) values (#{name},#{lujing},#{url},#{userName},#{courseId})"})
    int insertUrl(@Param("name")String name, @Param("lujing")String lujing, @Param("url")String url,@Param("userName")String userName,@Param("courseId")int courseId);

    //查询
    @Select("select * from tupians where userName = #{userName} AND course_id = #{courseId} ")
    List<Tupian> selectTuPian(@Param("userName")String userName,@Param("courseId")int courseId);

    @Delete("DELETE FROM tupians WHERE url = #{url}")
    int deleteUrl(@Param("url")String url);

    // 查询文件位置
    @Select("select lujing from tupians WHERE url = #{url}")
    String selectLuJing(String url);
}