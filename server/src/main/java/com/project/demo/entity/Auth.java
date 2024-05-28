package com.project.demo.entity;


import java.sql.Timestamp;
import java.io.Serializable;

import lombok.*;

import javax.persistence.*;


/**
 * 定制授权(Auth)表实体类
 *
 * @author xxx
 *@since 202X-XX-XX
 */
@Setter
@Getter
@Entity
public class Auth implements Serializable {

    private static final long serialVersionUID = -95935855259958194L;

    /**
     * 授权ID：
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "auth_id")
    private Integer authId;

    /**
     * 用户组：
     */
    @Basic
    @Column(name = "user_group")
    private String userGroup;

    /**
     * 模块名：
     */
    @Basic
    @Column(name = "mod_name")
    private String modName;

    /**
     * 表名：
     */
    @Basic
    @Column(name = "table_name")
    private String tableName;

    /**
     * 页面标题：
     */

    @Basic
    @Column(name = "page_title")
    private String pageTitle;

    /**
     * 路由路径：
     */
    @Basic
    @Column(name = "path")
    private String path;

	/**
	 * 位置：
	 */
	@Basic
	@Column(name = "position")
	private String position;

	/**
	 * 跳转方式：
	 */
	@Basic
	@Column(name = "mode")
	private String mode;

    /**
     * 是否可增加：
     */
    @Basic
    @Column(name = "add")
    private Integer add;

    /**
     * 是否可删除：
     */
    @Basic
    @Column(name = "del")
    private Integer del;

    /**
     * 是否可修改：
     */
    @Basic
    @Column(name = "set")
    private Integer set;

    /**
     * 是否可查看：
     */
    @Basic
    @Column(name = "get")
    private Integer get;

    /**
     * 添加字段：
     */
    @Basic
    @Column(name = "field_add")
    private String fieldAdd;

    /**
     * 修改字段：
     */
    @Basic
    @Column(name = "field_set")
    private String fieldSet;

    /**
     * 查询字段：
     */
    @Basic
    @Column(name = "field_get")
    private String fieldGet;

    /**
     * 跨表导航名称：
     */
    @Basic
    @Column(name = "table_nav_name")
    private String tableNavName;

    /**
     * 是否跨表操作：
     */
    @Basic
    @Column(name = "table_nav")
    private Boolean tableNav;

    /**
     * 配置：
     */
    @Basic
    @Column(name = "option")
    private String option;

    /**
     * 创建时间：
     */
    @Basic
    @Column(name = "create_time")
    private Timestamp createTime;

    /**
     * 更新时间：
     */
    @Basic
    @Column(name = "update_time")
    private Timestamp updateTime;

}

