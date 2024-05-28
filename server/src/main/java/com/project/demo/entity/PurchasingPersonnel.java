package com.project.demo.entity;

import java.sql.Date;
import java.sql.Timestamp;
import com.project.demo.entity.base.BaseEntity;
import java.io.Serializable;
import lombok.*;
import javax.persistence.*;


/**
 *采购人员：(PurchasingPersonnel)表实体类
 *
 */
@Setter
@Getter
@Entity(name = "PurchasingPersonnel")
public class PurchasingPersonnel implements Serializable {

    //PurchasingPersonnel编号
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "purchasing_personnel_id")
    private Integer purchasing_personnel_id;
    // 人员姓名
    @Basic
    private String personnel_name;
    // 人员性别
    @Basic
    private String personnel_gender;
    // 用户编号
    @Id
    @Column(name = "user_id")
    private Integer userId;

    // 更新时间
    @Basic
    private Timestamp update_time;

    // 创建时间
    @Basic
    private Timestamp create_time;

}
