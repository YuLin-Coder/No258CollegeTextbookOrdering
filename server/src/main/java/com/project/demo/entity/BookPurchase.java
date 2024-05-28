package com.project.demo.entity;

import java.sql.Date;
import java.sql.Timestamp;
import com.project.demo.entity.base.BaseEntity;
import java.io.Serializable;
import lombok.*;
import javax.persistence.*;


/**
 *书籍购买：(BookPurchase)表实体类
 *
 */
@Setter
@Getter
@Entity(name = "BookPurchase")
public class BookPurchase implements Serializable {

    //BookPurchase编号
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "book_purchase_id")
    private Integer book_purchase_id;
    // 教材名称
    @Basic
    private String textbook_name;
    // 教材类型
    @Basic
    private String textbook_type;
    // 教材科目
    @Basic
    private String textbook_subjects;
    // 书籍价格
    @Basic
    private String book_price;
    // 购买教师
    @Basic
    private Integer buy_teachers;
    // 购买数量
    @Basic
    private String purchase_quantity;
    // 购买日期
    @Basic
    private Timestamp purchase_date;
    // 共计价格
    @Basic
    private String total_price;
    // 购书备注
    @Basic
    private String book_purchase_remarks;
    // 支付状态
    @Basic
    private String pay_state;

    // 支付类型: 微信、支付宝、网银
    @Basic
    private String pay_type;

    // 更新时间
    @Basic
    private Timestamp update_time;

    // 创建时间
    @Basic
    private Timestamp create_time;

}
