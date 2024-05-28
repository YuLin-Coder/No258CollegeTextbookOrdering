package com.project.demo.entity;


import java.sql.Timestamp;
import java.io.Serializable;

import lombok.*;

import javax.persistence.*;


/**
 * 文章频道：用于汇总浏览文章，在不同频道下展示不同文章。(ArticleType)表实体类
 *
 * @author xxx
 *@since 202X-XX-XX 
 */
@Setter
@Getter
@Entity
public class ArticleType implements Serializable {

    private static final long serialVersionUID = -52781903658809142L;

    /**
     * 分类ID：[0,10000]
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "type_id")
    private Integer typeId;

    /**
     * 显示顺序：[0,1000]决定分类显示的先后顺序
     */

    @Basic
    @Column(name = "display")
    private Integer display;

    /**
     * 分类名称：[2,16]
     */

    @Basic
    @Column(name = "name")
    private String name;

    /**
     * 上级分类ID：[0,32767]
     */

    @Basic
    @Column(name = "father_id")
    private Integer fatherId;

    /**
     * 描述：[0,255]描述该分类的作用
     */

    @Basic
    @Column(name = "description")
    private String description;

    /**
     * 分类图标：
     */

    @Basic
    @Column(name = "icon")
    private String icon;

    /**
     * 外链地址：[0,255]如果该分类是跳转到其他网站的情况下，就在该URL上设置
     */

    @Basic
    @Column(name = "url")
    private String url;

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

