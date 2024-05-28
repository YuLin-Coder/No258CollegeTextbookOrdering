package com.project.demo.entity;


import java.sql.Timestamp;
import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import javax.persistence.*;


/**
 * 用户账户：用于保存用户登录信息(User)表实体类
 *
 * @author xxx
 *@since 202X-XX-XX
 */
@Setter
@Getter
@Entity
public class User implements Serializable {

    private static final long serialVersionUID = -82540585424852966L;

    /**
     * 用户ID：[0,8388607]用户获取其他与用户相关的数据
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Integer userId;

    /**
     * 账户状态：[0,10](1可用|2异常|3已冻结|4已注销)
     */

    @Basic
    @Column(name = "state")
    private Integer state;

    /**
     * 所在用户组：[0,32767]决定用户身份和权限
     */

    @Basic
    @Column(name = "user_group")
    private String userGroup;

    /**
     * 上次登录时间：
     */

    @Basic
    @Column(name = "login_time")
    private Timestamp loginTime;

    /**
     * 手机号码：[0,11]用户的手机号码，用于找回密码时或登录时
     */

    @Basic
    @Column(name = "phone")
    private String phone;

    /**
     * 手机认证：[0,1](0未认证|1审核中|2已认证)
     */

    @Basic
    @Column(name = "phone_state")
    private Integer phoneState;

    /**
     * 用户名：[0,16]用户登录时所用的账户名称
     */

    @Basic
    @Column(name = "username")
    private String username;

    /**
     * 昵称：[0,16]
     */

    @Basic
    @Column(name = "nickname")
    private String nickname;

    /**
     * 密码：[0,32]用户登录所需的密码，由6-16位数字或英文组成
     */

    @Basic
    @Column(name = "password")
    private String password;

    /**
     * 邮箱：[0,64]用户的邮箱，用于找回密码时或登录时
     */

    @Basic
    @Column(name = "email")
    private String email;

    /**
     * 邮箱认证：[0,1](0未认证|1审核中|2已认证)
     */

    @Basic
    @Column(name = "email_state")
    private Integer emailState;

    /**
     * 头像地址：[0,255]
     */

    @Basic
    @Column(name = "avatar")
    private String avatar;

    /**
     * 创建时间：
     */

    @Basic
    @Column(name = "create_time")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Timestamp createTime;

    @Basic
    @Transient
    private String code;
}

