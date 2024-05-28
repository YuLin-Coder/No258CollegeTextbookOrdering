package com.project.demo.controller;

import com.project.demo.entity.BookPurchasing;
import com.project.demo.service.BookPurchasingService;
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
 *书籍采购：(BookPurchasing)表控制层
 *
 */
@RestController
@RequestMapping("/book_purchasing")
public class BookPurchasingController extends BaseController<BookPurchasing,BookPurchasingService> {

    /**
     *书籍采购对象
     */
    @Autowired
    public BookPurchasingController(BookPurchasingService service) {
        setService(service);
    }

    @PostMapping("/add")
    @Transactional
    public Map<String, Object> add(HttpServletRequest request) throws IOException {
        Map<String,Object> paramMap = service.readBody(request.getReader());
        this.addMap(paramMap);
        String sql = "SELECT MAX(book_purchasing_id) AS max FROM "+"book_purchasing";
        Query select = service.runCountSql(sql);
        Integer max = (Integer) select.getSingleResult();
        sql = "UPDATE `textbook_books` INNER JOIN `book_purchasing` ON textbook_books.textbook_name=book_purchasing.textbook_name SET textbook_books.number_of_books = textbook_books.number_of_books + book_purchasing.purchase_quantity WHERE book_purchasing.book_purchasing_id="+max;
        select = service.runCountSql(sql);
        select.executeUpdate();
        return success(1);
    }

}
