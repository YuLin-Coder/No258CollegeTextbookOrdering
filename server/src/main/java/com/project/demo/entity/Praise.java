package com.project.demo.entity;


import java.sql.Timestamp;
import java.io.Serializable;

import lombok.*;

import javax.persistence.*;


/**
 * 点赞：(Praise)表实体类
 *
 * @author xxx
 *@since 202X-XX-XX
 */
@Setter
@Getter
@Entity
public class Praise implements Serializable {

    private static final long serialVersionUID = -48157238791857969L;

    /**
     * 点赞ID：
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "praise_id")
    private Integer praiseId;

    /**
     * 点赞人：
     */

    @Basic
    @Column(name = "user_id")
    private Integer userId;

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
     * 来源ID：
     */

    @Basic
    @Column(name = "source_id")
    private Integer sourceId;

    /**
     * 点赞状态:1为点赞，0已取消
     */

    @Basic
    @Column(name = "status")
    private Integer status;

}

