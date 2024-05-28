package com.project.demo.entity;

import java.sql.Date;
import java.sql.Timestamp;
import com.project.demo.entity.base.BaseEntity;
import java.io.Serializable;
import lombok.*;
import javax.persistence.*;


/**
 *教材书籍：(TextbookBooks)表实体类
 *
 */
@Setter
@Getter
@Entity(name = "TextbookBooks")
public class TextbookBooks implements Serializable {

    //TextbookBooks编号
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "textbook_books_id")
    private Integer textbook_books_id;
    // 教材名称
    @Basic
    private String textbook_name;
    // 教材类型
    @Basic
    private String textbook_type;
    // 教材科目
    @Basic
    private String textbook_subjects;
    // 书籍图片
    @Basic
    private String book_pictures;
    // 书籍作者
    @Basic
    private String book_author;
    // 出版日期
    @Basic
    private Timestamp publication_date;
    // 出版单位
    @Basic
    private String publishing_unit;
    // 书籍价格
    @Basic
    private String book_price;
    // 书籍数量
    @Basic
    private String number_of_books;
    // 发行人员
    @Basic
    private Integer issuer;
    // 书籍简介
    @Basic
    private String book_introduction;
    // 点击数
    @Basic
    private Integer hits;
    // 点赞数
    @Basic
    private Integer praise_len;

    // 更新时间
    @Basic
    private Timestamp update_time;

    // 创建时间
    @Basic
    private Timestamp create_time;

}
