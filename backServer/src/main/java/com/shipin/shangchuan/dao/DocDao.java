package com.shipin.shangchuan.dao;



import com.shipin.shangchuan.model.Doc;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper
@Component
public interface DocDao {

    //插入
    @Insert({"insert into docs (name,lujing,url,userName,course_id) values (#{name},#{lujing},#{url},#{userName},#{courseId})"})
    int insertUrl(@Param("name")String name,@Param("lujing")String lujing,@Param("url")String url,@Param("userName")String userName,@Param("courseId")int courseId);

    //查询
    @Select("select * from docs where userName = #{userName} AND course_id = #{courseId}")
    public List<Doc> selectDoc(@Param("userName")String userName,@Param("courseId")int courseId);

    // 删除
    @Delete("DELETE FROM docs WHERE url = #{url}")
    int deleteUrl(@Param("url")String url);

    // 查询文件位置
    @Select("select lujing from docs WHERE url = #{url}")
    String selectLuJing(String url);
}