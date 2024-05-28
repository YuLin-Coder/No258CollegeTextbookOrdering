package com.project.demo.entity.base;

import lombok.Data;

import javax.persistence.*;

/**
 */
@MappedSuperclass
@Data
public class BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
}

