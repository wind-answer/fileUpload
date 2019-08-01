package com.shipin.shangchuan.service;


import com.shipin.shangchuan.dao.UserInfoDao;
import com.shipin.shangchuan.model.UserModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Component
public class UserInfoService {
    @Autowired
    private UserInfoDao userInfoDao;


    public UserModel selectUserData(String userName,String passworld){
        UserModel users = userInfoDao.selectUsers(userName,passworld);
        return  users;
    }
}
