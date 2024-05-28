package com.project.demo.entity;


import java.io.Serializable;
import java.sql.Timestamp;

import lombok.*;

import javax.persistence.*;


/**
 * 用户组：用于用户前端身份和鉴权(UserGroup)表实体类
 *
 * @author xxx
 *@since 202X-XX-XX
 */
@Setter
@Getter
@Entity
public class UserGroup implements Serializable {

    private static final long serialVersionUID = 968356951391304707L;

    /**
     * 用户组ID：[0,8388607]
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "group_id")
    private Integer groupId;

    /**
     * 显示顺序：[0,1000]
     */
    @Basic
    @Column(name = "display")
    private Integer display;

    /**
     * 名称：[0,16]
     */
    @Basic
    @Column(name = "name")
    private String name;

    /**
     * 描述：[0,255]描述该用户组的特点或权限范围
     */
    @Basic
    @Column(name = "description")
    private String description;

    /**
     * 来源表：
     */
    @Basic
    @Column(name = "source_table")
    private String sourceTable;

    /**
     * 来源字段：
     */
    @Basic
    @Column(name = "source_field")
    private String sourceField;

    /**
     * 注册位置:
     */
    @Basic
    @Column(name = "register")
    private String register;

    /**
     * 创建时间:
     */
    @Basic
    @Column(name = "create_time")
    private Timestamp createTime;

    /**
     * 更新时间:
     */
    @Basic
    @Column(name = "update_time")
    private Timestamp updateTime;

}

