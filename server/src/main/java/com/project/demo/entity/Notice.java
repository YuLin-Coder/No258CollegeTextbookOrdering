package com.project.demo.entity;


import java.sql.Timestamp;
import java.io.Serializable;

import lombok.*;

import javax.persistence.*;


/**
 * 公告：(Notice)表实体类
 *
 * @author xxx
 *@since 202X-XX-XX
 */
@Setter
@Getter
@Entity
public class Notice implements Serializable {

    private static final long serialVersionUID = -51697340312239379L;

    /**
     * 公告id：
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "notice_id")
    private Integer noticeId;

    /**
     * 标题：
     */

    @Basic
    @Column(name = "title")
    private String title;

    /**
     * 正文：
     */

    @Basic
    @Column(name = "content")
    private String content;

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

