package com.project.demo.entity;

import java.sql.Date;
import java.sql.Timestamp;
import com.project.demo.entity.base.BaseEntity;
import java.io.Serializable;
import lombok.*;
import javax.persistence.*;


/**
 *缺书信息：(BookShortageInformation)表实体类
 *
 */
@Setter
@Getter
@Entity(name = "BookShortageInformation")
public class BookShortageInformation implements Serializable {

    //BookShortageInformation编号
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "book_shortage_information_id")
    private Integer book_shortage_information_id;
    // 教材名称
    @Basic
    private String textbook_name;
    // 教材类型
    @Basic
    private String textbook_type;
    // 教材科目
    @Basic
    private String textbook_subjects;
    // 采购人员
    @Basic
    private Integer purchasing_personnel;
    // 书籍数量
    @Basic
    private String number_of_books;
    // 记录日期
    @Basic
    private Timestamp record_date;
    // 备注
    @Basic
    private String remarks;

    // 更新时间
    @Basic
    private Timestamp update_time;

    // 创建时间
    @Basic
    private Timestamp create_time;

}
