package com.project.demo.service.base;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.project.demo.constant.FindConfig;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.servlet.http.HttpServletRequest;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.lang.reflect.ParameterizedType;
import java.net.URLDecoder;
import java.security.MessageDigest;
import java.util.*;

/**
 */
@Slf4j
public class BaseService <E>{

    @Autowired
    @PersistenceContext
    private EntityManager entityManager;

    Class<E> eClass = (Class<E>)((ParameterizedType)getClass().getGenericSuperclass()).getActualTypeArguments()[0];

    private final String table = humpToLine(eClass.getSimpleName());

    public Query runEntitySql(String sql){
        return entityManager.createNativeQuery(sql, eClass);
    }

    public Query runCountSql(String sql){
        return entityManager.createNativeQuery(sql);
    }

    public void insert(Map<String,Object> body){
        StringBuffer sql = new StringBuffer("INSERT INTO ");
        sql.append("`").append(table).append("`").append(" (");
        for (Map.Entry<String,Object> entry:body.entrySet()){
            sql.append("`"+humpToLine(entry.getKey())+"`").append(",");
        }
        sql.deleteCharAt(sql.length()-1);
        sql.append(") VALUES (");
        for (Map.Entry<String,Object> entry:body.entrySet()){
            Object value = entry.getValue();
            if (value instanceof String){
                sql.append("'").append(entry.getValue()).append("'").append(",");
            }else {
                sql.append(entry.getValue()).append(",");
            }
        }
        sql.deleteCharAt(sql.length() - 1);
        sql.append(")");
        log.info("[{}] - 插入操作：{}",table,sql);
        Query query = runCountSql(sql.toString());
        query.executeUpdate();
    }

    @Transactional
    public void update(Map<String,String> query,Map<String,String> config,Map<String,Object> body){
        StringBuffer sql = new StringBuffer("UPDATE ").append("`").append(table).append("`").append(" SET ");
        for (Map.Entry<String,Object> entry:body.entrySet()){
            Object value = entry.getValue();
            if (value instanceof String){
                sql.append("`"+humpToLine(entry.getKey())+"`").append("=").append("'").append(value).append("'").append(",");
            }else {
                sql.append("`"+humpToLine(entry.getKey())+"`").append("=").append(value).append(",");
            }

        }
        sql.deleteCharAt(sql.length()-1);
        sql.append(toWhereSql(query,"0".equals(config.get(FindConfig.LIKE))));
//        sql.append(";");
        log.info("[{}] - 更新操作：{}",table,sql);
        Query query1 = runCountSql(sql.toString());
        query1.executeUpdate();
    }

    public Map<String,Object> selectToPage(Map<String,String> query,Map<String,String> config){
        Query select = select(query, config);
        Map<String,Object> map = new HashMap<>();
        map.put("list",select.getResultList());
        map.put("count",count(query,config).getSingleResult());
        return map;
    }

    public Map<String,Object> selectToList(Map<String,String> query,Map<String,String> config){
        Query select = selectGroupCount(query, config);
        Map<String,Object> map = new HashMap<>();
        map.put("list",select.getResultList());
        return map;
    }

    public Map<String,Object> selectBarGroup(Map<String,String> query,Map<String,String> config){
        Query select = barGroup(query, config);
        Map<String,Object> map = new HashMap<>();
        map.put("list",select.getResultList());
        return map;
    }

    public Query barGroup(Map<String,String> query,Map<String,String> config){
        StringBuffer sql = new StringBuffer(" SELECT ");
        if (config.get(FindConfig.GROUP_BY) != null && !"".equals(config.get(FindConfig.GROUP_BY))){
            sql.append(config.get(FindConfig.GROUP_BY));
            if (config.get(FindConfig.FIELD) != null && !"".equals(config.get(FindConfig.FIELD))){
                String[] fieldList = config.get(FindConfig.FIELD).split(",");
                for (int i=0;i<fieldList.length;i++)
                    sql.append(" ,SUM(").append(fieldList[i]).append(")");
            }
            sql.append(" FROM ").append("`").append(table).append("`");
            sql.append(toWhereSql(query, "0".equals(config.get(FindConfig.LIKE))));
            sql.append(" ").append("GROUP BY ").append(config.get(FindConfig.GROUP_BY));
        }else {
            sql.append(" SUM(").append(config.get(FindConfig.GROUP_BY)).append(") FROM ").append("`").append(table).append("`");
            sql.append(toWhereSql(query, "0".equals(config.get(FindConfig.LIKE))));
        }
        log.info("[{}] - 查询操作，sql: {}",table,sql);
        return runCountSql(sql.toString());
    }

    public Query selectGroupCount(Map<String,String> query,Map<String,String> config){
        StringBuffer sql = new StringBuffer("select COUNT(*) AS count_value, ");
        sql.append(config.get(FindConfig.GROUP_BY)).append(" ");
        sql.append("from ").append("`").append(table).append("` ");
        sql.append(toWhereSql(query, "0".equals(config.get(FindConfig.LIKE))));
        if (config.get(FindConfig.GROUP_BY) != null && !"".equals(config.get(FindConfig.GROUP_BY))){
            sql.append("group by ").append(config.get(FindConfig.GROUP_BY)).append(" ");
        }
        log.info("[{}] - 查询操作，sql: {}",table,sql);
        return runCountSql(sql.toString());
    }

    public Query select(Map<String,String> query,Map<String,String> config){
        StringBuffer sql = new StringBuffer("select ");
        sql.append(config.get(FindConfig.FIELD) == null || "".equals(config.get(FindConfig.FIELD)) ? "*" : config.get(FindConfig.FIELD)).append(" ");
        sql.append("from ").append("`").append(table).append("`").append(toWhereSql(query, "0".equals(config.get(FindConfig.LIKE))));
        if (config.get(FindConfig.GROUP_BY) != null && !"".equals(config.get(FindConfig.GROUP_BY))){
            sql.append("group by ").append(config.get(FindConfig.GROUP_BY)).append(" ");
        }
        if (config.get(FindConfig.ORDER_BY) != null && !"".equals(config.get(FindConfig.ORDER_BY))){
            sql.append("order by ").append(config.get(FindConfig.ORDER_BY)).append(" ");
        }
        if (config.get(FindConfig.PAGE) != null && !"".equals(config.get(FindConfig.PAGE))){
            int page = config.get(FindConfig.PAGE) != null && !"".equals(config.get(FindConfig.PAGE)) ? Integer.parseInt(config.get(FindConfig.PAGE)) : 1;
            int limit = config.get(FindConfig.SIZE) != null && !"".equals(config.get(FindConfig.SIZE)) ? Integer.parseInt(config.get(FindConfig.SIZE)) : 10;
            sql.append(" limit ").append( (page-1)*limit ).append(" , ").append(limit);
        }
        log.info("[{}] - 查询操作，sql: {}",table,sql);
        return runEntitySql(sql.toString());
    }

    @Transactional
    public void delete(Map<String,String> query,Map<String,String> config){
        StringBuffer sql = new StringBuffer("DELETE FROM ").append("`").append(table).append("`").append(" ");
        sql.append(toWhereSql(query, "0".equals(config.get(FindConfig.GROUP_BY))));
        log.info("[{}] - 删除操作：{}",table,sql);
        Query query1 = runCountSql(sql.toString());
        query1.executeUpdate();
    }

    public Query count(Map<String,String> query,Map<String,String> config){
        StringBuffer sql = new StringBuffer("SELECT ");
//        log.info("拼接统计函数前");
        if (config.get(FindConfig.GROUP_BY) != null && !"".equals(config.get(FindConfig.GROUP_BY))){
            sql.append(config.get(FindConfig.GROUP_BY)).append(" ,COUNT(").append(config.get(FindConfig.GROUP_BY)).append(") FROM ").append("`").append(table).append("`");
            sql.append(toWhereSql(query, "0".equals(config.get(FindConfig.LIKE))));
//            sql.append(" ").append("GROUP BY ").append(config.get(FindConfig.GROUP_BY));
        }else {
            sql.append("COUNT(*) FROM ").append("`").append(table).append("`");
            sql.append(toWhereSql(query, "0".equals(config.get(FindConfig.LIKE))));
        }
        log.info("[{}] - 统计操作，sql: {}",table,sql);
        return runCountSql(sql.toString());
    }

    public Query sum(Map<String,String> query,Map<String,String> config){
        StringBuffer sql = new StringBuffer(" SELECT ");
        if (config.get(FindConfig.GROUP_BY) != null && !"".equals(config.get(FindConfig.GROUP_BY))){
            sql.append(config.get(FindConfig.GROUP_BY)).append(" ,SUM(").append(config.get(FindConfig.FIELD)).append(") FROM ").append("`").append(table).append("`");
            sql.append(toWhereSql(query, "0".equals(config.get(FindConfig.LIKE))));
            sql.append(" ").append("GROUP BY ").append(config.get(FindConfig.GROUP_BY));
        }else {
            sql.append(" SUM(").append(config.get(FindConfig.FIELD)).append(") FROM ").append("`").append(table).append("`");
            sql.append(toWhereSql(query, "0".equals(config.get(FindConfig.LIKE))));
        }
        log.info("[{}] - 查询操作，sql: {}",table,sql);
        return runCountSql(sql.toString());
    }

    public Query avg(Map<String,String> query,Map<String,String> config){
        StringBuffer sql = new StringBuffer(" SELECT ");
        if (config.get(FindConfig.GROUP_BY) != null && !"".equals(config.get(FindConfig.GROUP_BY))){
            sql.append(config.get(FindConfig.GROUP_BY)).append(" ,AVG(").append(config.get(FindConfig.FIELD)).append(") FROM ").append("`").append(table).append("`");
            sql.append(toWhereSql(query, "0".equals(config.get(FindConfig.LIKE))));
            sql.append(" ").append("GROUP BY ").append(config.get(FindConfig.GROUP_BY));
        }else {
            sql.append(" AVG(").append(config.get(FindConfig.FIELD)).append(") FROM ").append("`").append(table).append("`");
            sql.append(toWhereSql(query, "0".equals(config.get(FindConfig.LIKE))));
        }
        log.info("[{}] - 查询操作，sql: {}",table,sql);
        return runCountSql(sql.toString());
    }

    public String toWhereSql(Map<String,String> query, Boolean like) {
        if (query.size() > 0) {
            try {
                StringBuilder sql = new StringBuilder(" WHERE ");
                for (Map.Entry<String, String> entry : query.entrySet()) {
                    if (entry.getKey().contains(FindConfig.MIN_)) {
                        String min = humpToLine(entry.getKey()).replace("_min", "");
                        sql.append("`"+min+"`").append(" >= '").append(URLDecoder.decode(entry.getValue(), "UTF-8")).append("' and ");
                        continue;
                    }
                    if (entry.getKey().contains(FindConfig.MAX_)) {
                        String max = humpToLine(entry.getKey()).replace("_max", "");
                        sql.append("`"+max+"`").append(" <= '").append(URLDecoder.decode(entry.getValue(), "UTF-8")).append("' and ");
                        continue;
                    }
                    if (like == true) {
                        sql.append("`"+humpToLine(entry.getKey())+"`").append(" LIKE '%").append(URLDecoder.decode(entry.getValue(), "UTF-8")).append("%'").append(" and ");
                    } else {
                        sql.append("`"+humpToLine(entry.getKey())+"`").append(" = '").append(URLDecoder.decode(entry.getValue(), "UTF-8")).append("'").append(" and ");
                    }
                }
                sql.delete(sql.length() - 4, sql.length());
                sql.append(" ");
                return sql.toString();
            } catch (UnsupportedEncodingException e) {
                log.info("拼接sql 失败：{}", e.getMessage());
            }
        }
        return "";
    }

    public Map<String,Object> readBody(BufferedReader reader){
        BufferedReader br = null;
        StringBuilder sb = new StringBuilder("");
        try{
            br = reader;
            String str;
            while ((str = br.readLine()) != null){
                sb.append(str);
            }
            br.close();
            String json = sb.toString();
            return JSONObject.parseObject(json, Map.class);
        }catch (IOException e){
            e.printStackTrace();
        }finally{
            if (null != br){
                try{
                    br.close();
                }catch (IOException e){
                    e.printStackTrace();
                }
            }
        }
        return null;
    }

    public Map<String,String> readQuery(HttpServletRequest request){
        String queryString = request.getQueryString();
        if (queryString != null && !"".equals(queryString)) {
            String[] querys = queryString.split("&");
            Map<String, String> map = new HashMap<>();
            for (String query : querys) {
                String[] q = query.split("=");
                map.put(q[0], q[1]);
            }
            map.remove(FindConfig.PAGE);
            map.remove(FindConfig.SIZE);
            map.remove(FindConfig.LIKE);
            map.remove(FindConfig.ORDER_BY);
            map.remove(FindConfig.FIELD);
            map.remove(FindConfig.GROUP_BY);
            map.remove(FindConfig.MAX_);
            map.remove(FindConfig.MIN_);
            return map;
        }else {
            return new HashMap<>();
        }
    }

    public Map<String,String> readConfig(HttpServletRequest request){
        Map<String,String> map = new HashMap<>();
        map.put(FindConfig.PAGE,request.getParameter(FindConfig.PAGE));
        map.put(FindConfig.SIZE,request.getParameter(FindConfig.SIZE));
        map.put(FindConfig.LIKE,request.getParameter(FindConfig.LIKE));
        map.put(FindConfig.ORDER_BY,request.getParameter(FindConfig.ORDER_BY));
        map.put(FindConfig.FIELD,request.getParameter(FindConfig.FIELD));
        map.put(FindConfig.GROUP_BY,request.getParameter(FindConfig.GROUP_BY));
        map.put(FindConfig.MAX_,request.getParameter(FindConfig.MAX_));
        map.put(FindConfig.MIN_,request.getParameter(FindConfig.MIN_));
        return map;
    }

    public void importDb(MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            return;
        }
        List<Map<String,String>> body = new ArrayList<>();
        String fileName = file.getOriginalFilename();
        if (fileName == null){
            return;
        }
        String suffix = fileName.substring(fileName.lastIndexOf(".")+1);
        InputStream ins = file.getInputStream();
        Workbook wb = null;
        if(suffix.equals("xlsx")){
            wb = new XSSFWorkbook(ins);
        }else{
            wb = new HSSFWorkbook(ins);
        }
        Sheet sheet = wb.getSheetAt(0);
        if(null != sheet){
            for(int line = 0; line <= sheet.getLastRowNum();line++){
                Row row = sheet.getRow(line);
                if(null == row){
                    continue;
                }
                Iterator<Cell> cellIterator = row.cellIterator();
                StringBuffer sql = new StringBuffer("INSERT INTO ").append(table).append(" VALUES (null,");
                while (cellIterator.hasNext()){
                    sql.append(cellIterator.next().getStringCellValue()).append(",");
                }
                sql.deleteCharAt(sql.length());
                sql.append(")");
                runCountSql(sql.toString());
            }
        }
    }

    public HSSFWorkbook exportDb(Map<String,String> query,Map<String,String> config){
        Query select = select(query, config);
        List<Map<String,String>> resultList = select.getResultList();
        HSSFWorkbook workbook = new HSSFWorkbook();
        HSSFSheet sheet = workbook.createSheet(table);
        HSSFCellStyle headerStyle = workbook.createCellStyle();
        headerStyle.setFillForegroundColor(IndexedColors.YELLOW.index);
        headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        for (int i = 0; i < resultList.size(); i++) {
            HSSFRow row = sheet.createRow(i);
            Map<String,String> map = resultList.get(i);
            int j = 0;
            for (Map.Entry<String,String> entry:map.entrySet()){
                row.createCell(j).setCellValue(new HSSFRichTextString(entry.getValue()));
            }
        }
        return workbook;
    }

    @Transactional
    public void save(E e){
        String s = JSONObject.toJSONString(e);
        Map map = JSONObject.parseObject(s, Map.class);
        insert(map);
    }

    public E findOne(Map<String, String> map){
        try {
            Query select = select(map, new HashMap<>());
            return (E) select.getSingleResult();
        }catch (Exception e){
            return null;
        }
    }


    public String encryption(String plainText) {
        String re_md5 = new String();
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            md.update(plainText.getBytes());
            byte b[] = md.digest();

            int i;

            StringBuffer buf = new StringBuffer("");
            for (int offset = 0; offset < b.length; offset++) {
                i = b[offset];
                if (i < 0)
                    i += 256;
                if (i < 16)
                    buf.append("0");
                buf.append(Integer.toHexString(i));
            }

            re_md5 = buf.toString();

        } catch (Exception e) {
            e.printStackTrace();
        }
        return re_md5;
    }


    public static String humpToLine(String str) {
        if (str == null) {
            return null;
        }
        // 将驼峰字符串转换成数组
        char[] charArray = str.toCharArray();
        StringBuilder buffer = new StringBuilder();
        //处理字符串
        for (int i = 0, l = charArray.length; i < l; i++) {
            if (charArray[i] >= 65 && charArray[i] <= 90) {
                buffer.append("_").append(charArray[i] += 32);
            } else {
                buffer.append(charArray[i]);
            }
        }
        String s = buffer.toString();
        if (s.startsWith("_")){
            return s.substring(1);
        }else {
            return s;
        }
    }


    public JSONObject covertObject(JSONObject object) {
        if (object == null) {
            return null;
        }
        JSONObject newObject = new JSONObject();
        Set<String> set = object.keySet();
        for (String key : set) {
            Object value = object.get(key);
            if (value instanceof JSONArray) {
                //数组
                value = covertArray(object.getJSONArray(key));
            } else if (value instanceof JSONObject) {
                //对象
                value = covertObject(object.getJSONObject(key));
            }
            //这个方法自己写的改成下划线
            key = humpToLine(key);
            newObject.put(key, value);
        }
        return newObject;
    }

    public JSONArray covertArray(JSONArray array) {
        if (array == null) {
            return null;
        }
        JSONArray newArray = new JSONArray();
        for (int i = 0; i < array.size(); i++) {
            Object value = array.get(i);
            if (value instanceof JSONArray) {
                //数组
                value = covertArray(array.getJSONArray(i));
            } else if (value instanceof JSONObject) {
                //对象
                value = covertObject(array.getJSONObject(i));
            }
            newArray.add(value);
        }
        return newArray;
    }


    public static void main(String[] args) {
        String re_md5 = new String();
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            md.update("123456".getBytes());
            byte b[] = md.digest();

            int i;

            StringBuffer buf = new StringBuffer("");
            for (int offset = 0; offset < b.length; offset++) {
                i = b[offset];
                if (i < 0)
                    i += 256;
                if (i < 16)
                    buf.append("0");
                buf.append(Integer.toHexString(i));
            }

            re_md5 = buf.toString();

        } catch (Exception e) {
            e.printStackTrace();
        }

        System.out.println(re_md5);  ;
    }
}
