package com.project.demo.entity;


import java.sql.Timestamp;
import java.io.Serializable;

import lombok.*;

import javax.persistence.*;


/**
 * 临时访问牌(AccessToken)表实体类
 *
 * @author xxx
 *@since 202X-XX-XX
 */
@Setter
@Getter
@Entity
public class AccessToken implements Serializable {

    private static final long serialVersionUID = 913269304437207500L;

    /**
     * 临时访问牌ID
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "token_id")
    private Integer tokenId;

    /**
     * 临时访问牌
     */

    @Basic
    @Column(name = "token")
    private String token;

    /**
     * 最大寿命：默认2小时
     */

    @Basic
    @Column(name = "maxage")
    private Integer maxage;

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
     * 用户信息
     */

    @Basic
    @Column(name = "user_id")
    private Integer user_id;

}
