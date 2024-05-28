package com.project.demo.controller;

import com.project.demo.entity.Issuer;
import com.project.demo.service.IssuerService;
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
 *发行人员：(Issuer)表控制层
 *
 */
@RestController
@RequestMapping("/issuer")
public class IssuerController extends BaseController<Issuer,IssuerService> {

    /**
     *发行人员对象
     */
    @Autowired
    public IssuerController(IssuerService service) {
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
