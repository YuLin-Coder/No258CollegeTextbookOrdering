package com.project.demo.entity;


import java.sql.Timestamp;
import java.io.Serializable;

import lombok.*;

import javax.persistence.*;


/**
 * 文章：用于内容管理系统的文章(Article)表实体类
 *
 * @author xxx
 *@since 202X-XX-XX 
 */
@Setter
@Getter
@Entity
@IdClass(ArticleId.class)
public class Article implements Serializable {

    private static final long serialVersionUID = 974130093549945724L;

    @Id
    @Column(name = "article_id")
    private Integer articleId;

    @Id
    @Column(name = "title")
    private String title;

    /**
     * 文章分类：[0,1000]用来搜索指定类型的文章
     */

    @Basic
    @Column(name = "type")
    private String type;


    /**
     * 点击数：[0,1000000000]访问这篇文章的人次
     */

    @Basic
    @Column(name = "hits")
    private Integer hits;

    /**
     * 点赞数
     */
    @Basic
    @Column(name = "praise_len")
    private Integer praise_len;


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
     * 来源：[0,255]文章的出处
     */

    @Basic
    @Column(name = "source")
    private String source;


    /**
     * 来源地址：[0,255]用于跳转到发布该文章的网站
     */

    @Basic
    @Column(name = "url")
    private String url;


    /**
     * 标签：[0,255]用于标注文章所属相关内容，多个标签用空格隔开
     */

    @Basic
    @Column(name = "tag")
    private String tag;


    /**
     * 正文：文章的主体内容
     */

    @Basic
    @Column(name = "content")
    private String content;


    /**
     * 封面图
     */

    @Basic
    @Column(name = "img")
    private String img;


    /**
     * 文章描述
     */

    @Basic
    @Column(name = "description")
    private String description;


}

class ArticleId implements Serializable{

    private Integer articleId;
    private String title;
}

