package com.project.demo.controller;

import com.project.demo.entity.PurchasingPersonnel;
import com.project.demo.service.PurchasingPersonnelService;
import com.project.demo.controller.base.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.persistence.Query;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


/**
 *采购人员：(PurchasingPersonnel)表控制层
 *
 */
@RestController
@RequestMapping("/purchasing_personnel")
public class PurchasingPersonnelController extends BaseController<PurchasingPersonnel,PurchasingPersonnelService> {

    /**
     *采购人员对象
     */
    @Autowired
    public PurchasingPersonnelController(PurchasingPersonnelService service) {
        setService(service);
    }

    @PostMapping("/add")
    @Transactional
    public Map<String, Object> add(HttpServletRequest request) throws IOException {
        Map<String,Object> paramMap = service.readBody(request.getReader());
        this.addMap(paramMap);
        return success(1);
    }

}
