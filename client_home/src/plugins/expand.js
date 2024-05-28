
import $ from 'jquery';

/**
 * @fileOverview JavaScript拓展函数
 * @author xxx
 * @version 1.2
 */

/* == 基础函数 == */
/**
 * @description 判断对象是否相似
 * @param {Object} obj 被判断对象
 * @param {Object} query 用作判断的对象
 * @param {Boolean} all 是否完全相同
 * @return {Boolean} 相似返回true，否则返回false
 */
function as(obj, query, all) {
  if (obj) {
    var bl = true;
    var type = typeof(obj);
    if (type !== typeof(query)) {
      // 如果类型不一致 则两个无相似
      bl = false;
    } else if (type === 'string' || type === 'bool' || type === 'number') {
      bl = obj === query;
    } else if (obj.constructor == Array) {
      // 如果都是数组
      var lh = obj.length;
      if (all && lh !== query.length) {
        // 要求完全一致 而长度不一致 说明不相似
        bl = false;
      } else {
        // 否则判断数组里的每个成员是否相似
        for (var i = 0; i < lh; i++) {
          if (!as(obj[i], query[i])) {
            bl = false;
            break;
          }
        }
      }
    } else {
      // 如果类型为对象
      if (all && Object.getOwnPropertyNames(obj).length !== Object.getOwnPropertyNames(query).length) {
        // 如果要求完全一致, 而属性长度不一致，则不相似
        bl = false;
      } else {
        // 否则都为对象则判断其值是否一致
        for (var k in query) {
          if (!as(obj[k], query[k], all)) {
            bl = false;
            break;
          }
        }
      }
    }
    return bl;
  } else {
    return false;
  }
}

$.as = as;


/**
 * @description 添加对象属性
 * @param {Object} objA 被添加的对象
 * @param {Object} objB 用作添加的对象
 * @param {Boolean} bl 是否补充没有的对象
 * @return {Object} 新对象
 */
function push(objA, objB, bl) {
  if (!objA || !objB) {
    return;
  }
  if (bl) {
    for (var k in objB) {
      var value = objB[k];
      if (objA[k] === undefined || objA[k] === null || value === null) {
        objA[k] = value;
      } else {
        var type = typeof(objA[k]);
        var p = typeof(value);
        if (type !== p) {
          if (type === "number") {
            var n = Number(value);
            if (n === NaN) {
              n = 0;
            }
            objA[k] = n;
          } else if (type === "boolean") {
            if (value === '0' || value === 'false' || value === 'False') {
              objA[k] = false;
            } else {
              objA[k] = Boolean(value);
            }
          } else if (type === "string") {
            objA[k] = value.toString();
          } else {
            objA[k] = value;
          }
        } else if (type === "object") {
          if (objA[k].constructor == Array && value.constructor == Array) {
            objA[k].clear();
            objA[k].addList(value);
          } else {
            push(objA[k], value, bl);
          }
        } else {
          objA[k] = value;
        }
      }
    }
  } else {
    for (var k in objA) {
      var value = objB[k];
      if (value !== undefined && objA[k] !== null && value !== null) {
        var type = typeof(objA[k]);
        var p = typeof(value);
        if (type !== p) {
          if (type === "number") {
            var n = Number(value);
            if (n === NaN) {
              n = 0;
            }
            objA[k] = n;
          } else if (type === "boolean") {
            if (value === '0' || value === 'false' || value === 'False') {
              objA[k] = false;
            } else {
              objA[k] = Boolean(value);
            }
          } else if (type === "string") {
            objA[k] = value.toString();
          } else {
            objA[k] = value;
          }
        } else if (type === "object") {
          if (objA[k].constructor == Array && value.constructor == Array) {
            objA[k].clear();
            objA[k].addList(value);
          } else {
            push(objA[k], value, bl);
          }
        } else {
          objA[k] = value;
        }
      }
    }
  }
  return objA;
}

$.push = push;

/**
 * @description 清空对象值
 * @param {Object} obj 对象
 * @return {Object} 返回对象自身
 */
function clear(obj) {
  if (obj) {
    for (var k in obj) {
      var val = obj[k];
      if (val) {
        var name = typeof val === 'undefined' ? 'undefined' : typeof(val);
        switch (name) {
          case "string":
            obj[k] = "";
            break;
          case "number":
            obj[k] = 0;
            break;
          case "array":
            obj[k].clear();
            break;
          case "object":
            clear(obj[k]);
            break;
          case "function":
            break;
          case "symbol":
            obj[k] = "";
            break;
        }
      }
    }
  }
  return obj;
}

$.clear = clear;

/**
 * @description 转为json字符串
 * @param {Object} obj 被转换的对象
 * @param {Boolean} format 是否格式化
 * @return {String} json格式字符串
 */
function toJson(obj, format) {
  if (format) {
    return JSON.stringify(obj, null, 4);
  } else {
    return JSON.stringify(obj);
  }
}

/**
 * @description 转url字符串
 * @param {Object} obj 被转换的对象
 * @param {String} url 请求地址
 * @return {String} url参数格式字符串
 */
function toUrl(obj, url) {
  var queryStr = "";
  for (var key in obj) {
    var value = obj[key];
    if (typeof(value) === 'number') {
      if (value > 0) {
        queryStr += "&" + key + "=" + obj[key];
      }
    } else if (value) {
      queryStr += "&" + key + "=" + encodeURI(value);
    }
  }
  if (url) {
    if (url.endWith('?') || url.endWith('&')) {
      return url + queryStr.replace('&', '');
    } else if (url.indexOf('?') === -1) {
      return url + queryStr.replace('&', '?');
    } else {
      return url + queryStr;
    }
  } else {
    return queryStr.replace('&', '');
  }
};

$.toUrl = toUrl;

/**
 * @description 拷贝对象
 * @param {Object} obj 被拷贝的对象
 * @param {Boolean} has 是否非空拷贝，如果含有数据才拷贝，不含数据不拷贝
 * @return {Object} 新对象
 */
function copy(obj, has) {
  var newObj = {};
  if (has) {
    for (var attr in obj) {
      var o = obj[attr];
      if (o) {
        newObj[attr] = o;
      }
    }
  } else {
    for (var attr in obj) {
      newObj[attr] = obj[attr];
    }
  }
  return newObj;
};

$.copy = copy;


/**
 * @description 删除对象空属性
 * @param {Object} obj 对象
 * @param {Object} includeZero 是否包括0
 * @return {Object} 返回新对象
 */
function delete_prop(obj, includeZero) {
  var o = Object.assign({}, obj);
  if (includeZero) {
    for (var k in o) {
      var v = o[k];
      if (!v) {
        delete o[k];
      }
    }
  } else {
    for (var k in o) {
      var v = o[k];
      if (v === '' || v === null || v === undefined) {
        delete o[k];
      }
    }
  }
  return o;
}

$.delete_prop = delete_prop;

window.$ = $