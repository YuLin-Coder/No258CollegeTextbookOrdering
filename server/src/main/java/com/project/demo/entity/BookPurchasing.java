package com.project.demo.entity;

import java.sql.Date;
import java.sql.Timestamp;
import com.project.demo.entity.base.BaseEntity;
import java.io.Serializable;
import lombok.*;
import javax.persistence.*;


/**
 *书籍采购：(BookPurchasing)表实体类
 *
 */
@Setter
@Getter
@Entity(name = "BookPurchasing")
public class BookPurchasing implements Serializable {

    //BookPurchasing编号
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "book_purchasing_id")
    private Integer book_purchasing_id;
    // 教材名称
    @Basic
    private String textbook_name;
    // 教材类型
    @Basic
    private String textbook_type;
    // 教材科目
    @Basic
    private String textbook_subjects;
    // 采购价格
    @Basic
    private String purchase_price;
    // 采购日期
    @Basic
    private Timestamp purchase_date;
    // 采购数量
    @Basic
    private String purchase_quantity;
    // 采购人员
    @Basic
    private Integer purchasing_personnel;
    // 采购备注
    @Basic
    private String purchase_remarks;

    // 更新时间
    @Basic
    private Timestamp update_time;

    // 创建时间
    @Basic
    private Timestamp create_time;

}
