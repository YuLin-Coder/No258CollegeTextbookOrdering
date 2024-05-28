package com.project.demo.controller;

import com.project.demo.entity.BookPurchase;
import com.project.demo.service.BookPurchaseService;
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
 *书籍购买：(BookPurchase)表控制层
 *
 */
@RestController
@RequestMapping("/book_purchase")
public class BookPurchaseController extends BaseController<BookPurchase,BookPurchaseService> {

    /**
     *书籍购买对象
     */
    @Autowired
    public BookPurchaseController(BookPurchaseService service) {
        setService(service);
    }

    @PostMapping("/add")
    @Transactional
    public Map<String, Object> add(HttpServletRequest request) throws IOException {
        Map<String,Object> paramMap = service.readBody(request.getReader());
        this.addMap(paramMap);
        String sql = "SELECT MAX(book_purchase_id) AS max FROM "+"book_purchase";
        Query select = service.runCountSql(sql);
        Integer max = (Integer) select.getSingleResult();
        sql = ("SELECT count(*) count FROM `textbook_books` INNER JOIN `book_purchase` ON textbook_books.textbook_name=book_purchase.textbook_name WHERE textbook_books.number_of_books &#60; book_purchase.purchase_quantity AND book_purchase.book_purchase_id="+max).replaceAll("&#60;","<");
        select = service.runCountSql(sql);
        Integer count = Integer.valueOf(String.valueOf(select.getSingleResult()));
        if(count>0){
            sql = "delete from "+"book_purchase"+" WHERE "+"book_purchase_id"+" ="+max;
            select = service.runCountSql(sql);
            select.executeUpdate();
            return error(30000,"库存不足!");
        }
        sql = "UPDATE `textbook_books` INNER JOIN `book_purchase` ON textbook_books.textbook_name=book_purchase.textbook_name SET textbook_books.number_of_books = textbook_books.number_of_books - book_purchase.purchase_quantity WHERE book_purchase.book_purchase_id="+max;
        select = service.runCountSql(sql);
        select.executeUpdate();
        return success(1);
    }

}
