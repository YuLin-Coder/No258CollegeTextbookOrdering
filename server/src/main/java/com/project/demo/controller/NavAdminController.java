package com.project.demo.controller;

import com.project.demo.entity.NavAdmin;
import com.project.demo.service.NavAdminService;

import com.project.demo.controller.base.BaseController;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

/**
 * (NavAdmin)表控制层
 *
 */
@RestController
@RequestMapping("nav_admin")
public class NavAdminController extends BaseController<NavAdmin, NavAdminService> {
    /**
     * 服务对象
     */
    @Autowired
    public NavAdminController(NavAdminService service) {
        setService(service);
    }

}


