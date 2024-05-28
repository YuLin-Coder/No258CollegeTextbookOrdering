package com.project.demo.entity;


import java.io.Serializable;

import lombok.*;

import javax.persistence.*;


/**
 * (Upload)表实体类
 *
 * @author xxx
 *@since 202X-XX-XX
 */
@Setter
@Getter
@Entity
public class Upload implements Serializable {

    private static final long serialVersionUID = 924405862662825633L;

    /**
     * 上传ID
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "upload_id")
    private Integer uploadId;

    /**
     * 文件名
     */

    @Basic
    @Column(name = "name")
    private String name;

    /**
     * 访问路径
     */

    @Basic
    @Column(name = "path")
    private String path;

    /**
     * 文件路径
     */

    @Basic
    @Column(name = "file")
    private String file;

    /**
     * 显示顺序
     */

    @Basic
    @Column(name = "display")
    private String display;

    /**
     * 父级ID
     */

    @Basic
    @Column(name = "father_id")
    private Integer fatherId;

    /**
     * 文件夹
     */

    @Basic
    @Column(name = "dir")
    private String dir;

    /**
     * 文件类型
     */

    @Basic
    @Column(name = "type")
    private String type;

}

