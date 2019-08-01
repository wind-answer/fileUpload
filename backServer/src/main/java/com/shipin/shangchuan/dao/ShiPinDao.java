package com.shipin.shangchuan.dao;

import com.shipin.shangchuan.model.Shipin;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper
@Component
public interface ShiPinDao {

    //插入
    @Insert({"insert into shipins (name,lujing,url,userName,course_id) values (#{name},#{lujing},#{url},#{userName},#{courseId})"})
    int insertUrl(@Param("name")String name,@Param("lujing")String lujing,@Param("url")String url,@Param("userName")String userName,@Param("courseId")int courseId);

    //查询
    @Select("select * from shipins where userName = #{userName} AND course_id = #{courseId}")
    List<Shipin> selectShipin(@Param("userName")String userName,@Param("courseId")int courseId);

    @Delete("DELETE FROM shipins WHERE url = #{url}")
    int deleteUrl(@Param("url")String url);

    // 查询文件位置
    @Select("select lujing from shipins WHERE url = #{url}")
    String selectLuJing(String url);
}
