package com.project.demo.entity;


import java.sql.Timestamp;
import java.io.Serializable;

import lombok.*;

import javax.persistence.*;


/**
 * 评论：(Comment)表实体类
 *
 * @author xxx
 *@since 202X-XX-XX
 */
@Setter
@Getter
@Entity
public class Comment implements Serializable {

    private static final long serialVersionUID = 897384967462600611L;

    /**
     * 评论ID：
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private Integer commentId;

    /**
     * 评论人ID：
     */

    @Basic
    @Column(name = "user_id")
    private Integer userId;

    /**
     * 回复评论ID：空为0
     */

    @Basic
    @Column(name = "reply_to_id")
    private Integer replyToId;

    /**
     * 内容：
     */

    @Basic
    @Column(name = "content")
    private String content;

    /**
     * 昵称：
     */

    @Basic
    @Column(name = "nickname")
    private String nickname;

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

}

