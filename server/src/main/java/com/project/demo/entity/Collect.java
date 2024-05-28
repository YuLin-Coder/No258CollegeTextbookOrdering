package com.project.demo.entity;


import java.sql.Timestamp;
import java.io.Serializable;

import lombok.*;

import javax.persistence.*;


/**
 * 收藏：(Collect)表实体类
 *
 * @author xxx
 *@since 202X-XX-XX
 */
@Setter
@Getter
@Entity
public class Collect implements Serializable {

    private static final long serialVersionUID = -52185721730058036L;

    /**
     * 收藏ID：
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "collect_id")
    private Integer collectId;

    /**
     * 收藏人ID：
     */

    @Basic
    @Column(name = "user_id")
    private Integer userId;

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
     * 标题：
     */

    @Basic
    @Column(name = "title")
    private String title;

    /**
     * 封面：
     */

    @Basic
    @Column(name = "img")
    private String img;

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

