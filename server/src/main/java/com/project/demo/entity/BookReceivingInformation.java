package com.project.demo.entity;

import java.sql.Date;
import java.sql.Timestamp;
import com.project.demo.entity.base.BaseEntity;
import java.io.Serializable;
import lombok.*;
import javax.persistence.*;


/**
 *领书信息：(BookReceivingInformation)表实体类
 *
 */
@Setter
@Getter
@Entity(name = "BookReceivingInformation")
public class BookReceivingInformation implements Serializable {

    //BookReceivingInformation编号
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "book_receiving_information_id")
    private Integer book_receiving_information_id;
    // 教材名称
    @Basic
    private String textbook_name;
    // 教材类型
    @Basic
    private String textbook_type;
    // 教材科目
    @Basic
    private String textbook_subjects;
    // 购买教师
    @Basic
    private Integer buy_teachers;
    // 购买数量
    @Basic
    private String purchase_quantity;
    // 领取日期
    @Basic
    private Timestamp collection_date;
    // 领取数量
    @Basic
    private String quantity_received;
    // 领取备注
    @Basic
    private String get_notes;

    // 更新时间
    @Basic
    private Timestamp update_time;

    // 创建时间
    @Basic
    private Timestamp create_time;

}
