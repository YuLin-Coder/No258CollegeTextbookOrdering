package com.project.demo.entity;


import java.io.Serializable;

import lombok.*;

import javax.persistence.*;


/**
 * (NavAdmin)表实体类
 *
 * @author xxx
 *@since 202X-XX-XX
 */
@Setter
@Getter
@Entity
public class NavAdmin implements Serializable {

    private static final long serialVersionUID = 552913649360581182L;

    /**
     * 后台导航
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "admin_id")
    private Integer adminId;

    /**
     * 导航名
     */

    @Basic
    @Column(name = "name")
    private String name;

    @Basic
    @Column(name = "url")
    private String url;

}

