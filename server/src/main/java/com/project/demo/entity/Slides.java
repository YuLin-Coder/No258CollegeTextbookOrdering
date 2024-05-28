package com.project.demo.entity;


import java.sql.Timestamp;
import java.io.Serializable;

import lombok.*;

import javax.persistence.*;


/**
 * 轮播图：(Slides)表实体类
 *
 * @author xxx
 *@since 202X-XX-XX
 */
@Setter
@Getter
@Entity
public class Slides implements Serializable {

    private static final long serialVersionUID = -75647097161026943L;

    /**
     * 轮播图ID：
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "slides_id")
    private Integer slidesId;

    /**
     * 标题：
     */

    @Basic
    @Column(name = "title")
    private String title;

    /**
     * 内容：
     */

    @Basic
    @Column(name = "content")
    private String content;

    /**
     * 链接：
     */

    @Basic
    @Column(name = "url")
    private String url;

    /**
     * 轮播图：
     */

    @Basic
    @Column(name = "img")
    private String img;

    /**
     * 点击量：
     */

    @Basic
    @Column(name = "hits")
    private Integer hits;

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

