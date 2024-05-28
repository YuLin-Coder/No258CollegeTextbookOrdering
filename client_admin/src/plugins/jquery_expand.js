/**
 * @fileOverview JavaScript拓展函数
 * @author xxx
 * @version 1.2
 */

/* == 基础函数 == */
/**
 * @description 延迟执行（休眠）
 * @param {Number} milliSeconds 毫秒
 * @param {Object} obj 判断对象或函数
 * @param {String} key 判断的对象属性, 为存在的情况下提成退出循环
 * @example var obj = {ok: false}; sleep(2000, obj, 'ok');
 * @example sleep(2000);
 */
function sleep(milliSeconds, obj, key) {
  var endTime = new Date().getTime() + milliSeconds;
  if (obj) {
    if (key) {
      while (new Date().getTime() < endTime) {
        if (obj[key]) {
          continue;
        }
      }
    } else {
      var func = obj;
      while (new Date().getTime() < endTime) {
        if (!func()) {
          continue;
        }
      }
    }
  } else {
    while (new Date().getTime() < endTime) {}
  }
}

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

/**
 * @description 测试函数执行速度
 * @param {Function()} func 测试的函数
 * @param {Number} times = [value] 测试次数
 */
function speeds(func, times) {
  if (!times) {
    times = 1000000;
  }
  var t1 = (new Date()).valueOf();
  for (var i = 0; i < times; i++) {
    func();
  }
  var t2 = (new Date()).valueOf();
  var s = t2 - t1;
  console.log('耗时' + s + '毫秒, 平均' + (s / times) + 'ms/次');
}


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

/**
 * @description 查看所有属性
 * @param {Object} obj 查看的对象
 * @param {String} file 保存位置
 */
function keys(obj, file) {
  var text = "";
  for (var k in obj) {
    text += k + '\r\n'
  }
  console.log(text);
}

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



/**
 * @namespace
 * @property {Object} pool 数据连接池, 用于存储有关数据库的操作类
 * @property {Object} task 任务池, 用于存储定时任务操作类
 * @property {Object} api API接口，用于存储有关接口的操作类
 * @property {Object} val 全局变量，用于存储全局的配置
 * @property {Object} dict 字典，用于查询变量替换名
 * @property {Object} lang 语言包, 用于全局的语言替换
 * @property {String} sleep 延迟(休眠)
 * @property {Function()} speed 测试执行速度函数
 * @property {Function(Object, Object, Boolean):Boolean} as 判断对象是否相似
 * @property {Function(Object, Object):Boolean} push 为对象添加属性
 * @property {Function(Object):String} toJson 对象转json字符串
 * @property {Function(Object):String} toUrl 对象转url字符串
 * @property {Function(Object):Object} copy 复制一个新对象
 * @property {Function(Object):String} keys 查询获取对象属性键
 */
var funcs = {
  // 数据连接池, 用于存储有关数据库的操作类
  pool: {},
  // 任务池, 用于存储定时任务操作类
  task: {},
  // API接口，用于存储有关接口的操作类
  api: {},
  // 全局变量，用于存储全局的配置
  val: {
    // 默认作用域, sys表示系统
    scope: "sys"
  },
  /**
   * @description 字典，用于查询变量替换名
   * @property {String} session_id session的ID
   * @property {String} user_id 用户的ID，用于数据库时查询用户唯一标识
   */
  dict: {
    session_id: "mm:uuid",
    user_id: "user_id",
    token: "x-auth-token"
  },
  /**
   * @description 语言包, 用于全局的语言替换
   * @property {String} now = [chinese|english] 当前语言
   * @property {Object} chinese 中文语言包
   * @property {Object} english 英文语言包
   */
  lang: {
    now: "chinese",
    chinese: {},
    english: {}
  },
  // 延迟
  sleep: sleep,
  // 测试执行速度函数
  speeds: speeds,
  // 判断对象是否相似
  as: as,
  // 添加对象
  push: push,
  // 清空对象值
  clear: clear,
  // 对象转json字符串
  toJson: toJson,
  // 对象转url字符串
  toUrl: toUrl,
  // 复制一个新对象
  copy: copy,
  // 查询获取对象属性键
  keys: keys,
  // 删除对象属性
  delete: delete_prop
};
if (typeof($) === "undefined") {
  window.$ = funcs
} else {
  push($, funcs, true);
}


/* MD5加密类 */
(function() {
	/* md5加密（开始） */
	var hexcase = 0;
	/* hex output format. 0 - lowercase; 1 - uppercase  */
	var b64pad = "";
	/* base-64 pad character. "=" for strict RFC compliance */
	var chrsz = 8;
	/* bits per input character. 8 - ASCII; 16 - Unicode  */

	/*
	 * Perform a simple self-test to see if the VM is working
	 */
	function md5_vm_test() {
		return hex_md5("abc") == "900150983cd24fb0d6963f7d28e17f72";
	}
	/*
	 * Calculate the MD5 of an array of little-endian words, and a bit length
	 */
	function core_md5(x, len) {
		/* append padding */
		x[len >> 5] |= 0x80 << len % 32;
		x[(len + 64 >>> 9 << 4) + 14] = len;
		var a = 1732584193;
		var b = -271733879;
		var c = -1732584194;
		var d = 271733878;
		for (var i = 0; i < x.length; i += 16) {
			var olda = a;
			var oldb = b;
			var oldc = c;
			var oldd = d;
			a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
			d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
			c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
			b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
			a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
			d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
			c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
			b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
			a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
			d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
			c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
			b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
			a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
			d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
			c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
			b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);
			a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
			d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
			c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
			b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
			a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
			d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
			c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
			b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
			a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
			d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
			c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
			b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
			a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
			d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
			c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
			b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);
			a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
			d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
			c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
			b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
			a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
			d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
			c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
			b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
			a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
			d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
			c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
			b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
			a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
			d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
			c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
			b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);
			a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
			d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
			c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
			b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
			a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
			d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
			c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
			b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
			a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
			d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
			c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
			b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
			a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
			d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
			c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
			b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);
			a = safe_add(a, olda);
			b = safe_add(b, oldb);
			c = safe_add(c, oldc);
			d = safe_add(d, oldd);
		}
		return Array(a, b, c, d);
	}
	/*
	 * These functions implement the four basic operations the algorithm uses.
	 */
	function md5_cmn(q, a, b, x, s, t) {
		return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
	}

	function md5_ff(a, b, c, d, x, s, t) {
		return md5_cmn(b & c | ~b & d, a, b, x, s, t);
	}

	function md5_gg(a, b, c, d, x, s, t) {
		return md5_cmn(b & d | c & ~d, a, b, x, s, t);
	}

	function md5_hh(a, b, c, d, x, s, t) {
		return md5_cmn(b ^ c ^ d, a, b, x, s, t);
	}

	function md5_ii(a, b, c, d, x, s, t) {
		return md5_cmn(c ^ (b | ~d), a, b, x, s, t);
	}
	/*
	 * Calculate the HMAC-MD5, of a key and some data
	 */
	function core_hmac_md5(key, data) {
		var bkey = str2binl(key);
		if (bkey.length > 16) bkey = core_md5(bkey, key.length * chrsz);
		var ipad = Array(16),
			opad = Array(16);
		for (var i = 0; i < 16; i++) {
			ipad[i] = bkey[i] ^ 0x36363636;
			opad[i] = bkey[i] ^ 0x5C5C5C5C;
		}
		var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
		return core_md5(opad.concat(hash), 512 + 128);
	}
	/*
	 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
	 * to work around bugs in some JS interpreters.
	 */
	function safe_add(x, y) {
		var lsw = (x & 0xFFFF) + (y & 0xFFFF);
		var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
		return msw << 16 | lsw & 0xFFFF;
	}
	/*
	 * Bitwise rotate a 32-bit number to the left.
	 */
	function bit_rol(num, cnt) {
		return num << cnt | num >>> 32 - cnt;
	}
	/*
	 * Convert a string to an array of little-endian words
	 * If chrsz is ASCII, characters >255 have their hi-byte silently ignored.
	 */
	function str2binl(str) {
		var bin = Array();
		var mask = (1 << chrsz) - 1;
		for (var i = 0; i < str.length * chrsz; i += chrsz) {
			bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << i % 32;
		}
		return bin;
	}
	/*
	 * Convert an array of little-endian words to a string
	 */
	function binl2str(bin) {
		var str = "";
		var mask = (1 << chrsz) - 1;
		for (var i = 0; i < bin.length * 32; i += chrsz) {
			str += String.fromCharCode(bin[i >> 5] >>> i % 32 & mask);
		}
		return str;
	}
	/*
	 * Convert an array of little-endian words to a hex string.
	 */
	function binl2hex(binarray) {
		var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
		var str = "";
		for (var i = 0; i < binarray.length * 4; i++) {
			str += hex_tab.charAt(binarray[i >> 2] >> i % 4 * 8 + 4 & 0xF) + hex_tab.charAt(binarray[i >> 2] >> i % 4 * 8 & 0xF);
		}
		return str;
	}
	/*
	 * Convert an array of little-endian words to a base-64 string
	 */
	function binl2b64(binarray) {
		var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
		var str = "";
		for (var i = 0; i < binarray.length * 4; i += 3) {
			var triplet = (binarray[i >> 2] >> 8 * (i % 4) & 0xFF) << 16 | (binarray[i + 1 >> 2] >> 8 * ((i + 1) % 4) & 0xFF) <<
				8 | binarray[i + 2 >> 2] >> 8 * ((i + 2) % 4) & 0xFF;
			for (var j = 0; j < 4; j++) {
				if (i * 8 + j * 6 > binarray.length * 32) str += b64pad;
				else str += tab.charAt(triplet >> 6 * (3 - j) & 0x3F);
			}
		}
		return str;
	}

	$.hex_md5 = function hex_md5(s) {
		return binl2hex(core_md5(str2binl(s), s.length * chrsz));
	};
	$.b64_md5 = function b64_md5(s) {
		return binl2b64(core_md5(str2binl(s), s.length * chrsz));
	};
	$.str_md5 = function str_md5(s) {
		return binl2str(core_md5(str2binl(s), s.length * chrsz));
	};
	$.hex_hmac_md5 = function hex_hmac_md5(key, data) {
		return binl2hex(core_hmac_md5(key, data));
	};
	$.b64_hmac_md5 = function b64_hmac_md5(key, data) {
		return binl2b64(core_hmac_md5(key, data));
	};
	$.str_hmac_md5 = function str_hmac_md5(key, data) {
		return binl2str(core_hmac_md5(key, data));
	};

	$.md5 = $.hex_md5;
})();


/**
 * 定时任务管理器
 */
(function() {
	function Timer() {
		/**
		 * @description 回调对象集合
		 * @example
		 * [{
			 // 名称
			 name: "",
			 // 执行函数
			 async run(){}
			}]
		 */
		var list = [];

		// 定时器核心
		this.core;

		/**
		 * @description 执行
		 */
		Timer.prototype.run = function() {
			var len = list.length;
			for (var i = 0; i < len; i++) {
				var run = list[i].run;
				if (run) {
					run();
				}
			}
		};

		/**
		 * @description 启动
		 */
		Timer.prototype.start = function() {
			var _this = this;
			if (!this.core) {
				this.core = setInterval(this.run, 1000);
			}
		};

		/**
		 * @description 结束
		 */
		Timer.prototype.end = function() {
			clearInterval(this.core);
			this.core = undefined;
		};

		/**
		 * @description 添加定时执行任务
		 */
		Timer.prototype.add = function(obj) {
			if (typeof(obj) === "object") {
				if (obj.name && obj.run && typeof(obj.run) === 'function') {
					list.push(obj);
				}
			}
		};
		/**
		 * @description 删除定时执行任务
		 */
		Timer.prototype.del = function(name) {
			if (typeof(obj) === "object") {
				list.del({
					name: name
				}, true);
			}
		};
	};
	$.timer = new Timer();
})();

(function() {
	/* == 网络请求 == */
	$.http = {
		/**
		 * @description GET请求——json
		 * @param {String} url 请求地址
		 * @param {Function} fun 回调函数
		 * @param {Object} headers 协议头
		 * @return {Object} 同步请求返回请求结果，否则返回undefined
		 */
		get: function get(url, fun, headers) {
			var json;
			var hp = {
				type: 'GET',
				url: url,
				async: fun !== null,
				// xhrFields: {
				// 	withCredentials: true
				// },
				// crossDomain: true,
				success: function success(data, status) {
					if (fun) {
						fun(data, status);
					} else {
						json = {
							data: data,
							status: status
						};
					}
				},
				error: function error(data, status) {
					if (fun) {
						fun(data, status);
					} else {
						json = {
							data: data,
							status: status
						};
					}
				},
				complete: function complete(XHR, TS) {
					XHR = null;
				}
			};
			if (headers) {
				hp.headers = headers;
			}
			$.ajax(hp);
			return json;
		},
		/**
		 * @description POST请求
		 * @param {String} url 请求地址
		 * @param {Object} param 请求参数
		 * @param {Function} fun 回调函数
		 * @param {Object} headers 协议头
		 * @param {String} type 内容类型
		 * @return {Object} 同步请求返回请求结果，否则返回undefined
		 */
		post: function post(url, param, fun, headers, type) {
			var contentType;
			var pm;
			if (type === 'xml') {
				contentType = "text/xml; charset=utf-8";
				pm = param;
			} else if (type === 'form') {
				contentType = "application/x-www-form-urlencoded; charset=utf-8";
				pm = param;
			} else {
				contentType = "application/json; charset=utf-8";
				pm = JSON.stringify(param);
			}
			var json;
			var hp = {
				type: 'POST',
				url: url,
				async: fun !== null,
				// xhrFields: {
				// 	withCredentials: true
				// },
				// crossDomain: true,
				data: pm,
				dataType: "json",
				contentType: contentType,
				success: function success(data, status) {
					if (fun) {
						fun(data, status);
					} else {
						json = {
							data: data,
							status: status
						};
					}
				},
				error: function error(data, status) {
					if (fun) {
						fun(data, status);
					} else {
						json = {
							data: data,
							status: status
						};
					}
				},
				complete: function complete(XHR, TS) {
					XHR = null;
				}
			};
			if (headers) {
				hp.headers = headers;
			}
			$.ajax(hp);
			return json;
		},
		/**
		 * @description 上传文件
		 * @param {String} url 请求地址
		 * @param {Object} file input file文件
		 * @param {Function} fun 回调函数
		 * @param {Object} headers 协议头
		 * @return {Object} 同步请求返回请求结果，否则返回undefined
		 */
		upload: function upload(url, file, fun, headers) {
			var form = new FormData();
			form.append("file", file);
			var json;
			var hp = {
				type: 'POST',
				url: url,
				async: fun !== null,
				data: form,
				dataType: "json",
				contentType: false,
				processData: false,
				success: function success(data, status) {
					if (fun) {
						fun(data, status);
					} else {
						json = {
							data: data,
							status: status
						};
					}
				},
				error: function error(data, status) {
					if (fun) {
						fun(data, status);
					} else {
						json = {
							data: data,
							status: status
						};
					}
				},
				complete: function complete(XHR, TS) {
					XHR = null;
				}
			};
			if (headers) {
				hp.headers = headers;
			}
			$.ajax(hp);
			return json;
		}
	};

	/* 缓存 */
	$.cookies = {
		/**
		 * @description 设置域
		 * @param {String} url 地址
		 */
		domain: function domain(url) {
			if (url) {
				_domain = url;
			}
			return ";path=/";
		},
		/**
		 * @description 设置缓存
		 * @param {String} name 缓存对象
		 * @param {Object} value 缓存值
		 * @param {Number} minutes 缓存时长，单位: 分钟
		 * @param {String} domain 作用域
		 */
		set: function set(name, value, minutes, domain) {
			if (!domain) {
				domain = $.cookies.domain();
			}
			var time = new Date();
			if (minutes) {
				time.setTime(time.getTime() + minutes * 60000);
				document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + time.toGMTString();
			} else {
				time.setTime(time.getTime() + 7 * 24 * 3600 * 60000);
				document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + time.toGMTString();
			}
		},

		/**
		 * @description 获取cookie
		 * @param {String} name 名称
		 */
		get: function get(name) {
			var value = null;
			var str = document.cookie;
			var arr = str.split("; ");
			for (var i = 0; i < arr.length; i++) {
				var ar = arr[i].split("=");
				if (ar[0] == name) {
					value = decodeURIComponent(ar[1]);
					break;
				}
			}
			return value;
		},

		/**
		 * @description 删除cookie
		 * @param {String} name 名称
		 */
		del: function del(name) {
			this.set(name, "", -1);
		}
	};

	/**
	 * @description 设置或查询cookie缓存
	 * @param {String} key 缓存对象名
	 * @param {Object} value 缓存值
	 * @param {Number} minutes 缓存时长，单位: 分钟
	 */
	$.cookie = function(key, value, minutes) {
		if (value != undefined) {
			if (!minutes) {
				if (value == null) {
					minutes = 0;
				} else {
					minutes = 120;
				}
			}
			$.cookies.set(key, value, minutes);
		} else {
			return $.cookies.get(key);
		}
	};

	/* === 多媒体 === */
	$.file = {
		/**
		 * @description 上传文件
		 * @param {String} url 提交网址
		 * @param {Object} obj 对象
		 * @param {Function} func 函数
		 * @param {Object} headers 协议头
		 */
		upload: function upload(url, obj, func, headers) {
			var formData = new FormData();
			for (var k in obj) {
				formData.append(k, obj[k]);
			}
			var hp = {
				type: 'POST',
				url: url,
				data: formData,
				processData: false,
				contentType: false,
				async: func !== null,
				xhrFields: {
					withCredentials: true
				},
				success: function success(json, status) {
					if (func) {
						if (json) {
							json["obj"] = obj;
						}
						func(json, status);
					}
				},
				complete: function complete(XHR, TS) {
					XHR = null;
				}
			};

			if (headers) {
				hp.headers = headers;
			}
			$.ajax(hp);
		}
	};
})();


/* 通讯 */
(function() {
	$.html = {
		tag: function(tag, prop, value) {
			var obj;
			var list = document.getElementsByTagName(tag);
			var len = list.length;
			for (var i = 0; i < len; i++) {
				var o = list[i];
				if (o && o.getAttribute(prop) && o.getAttribute(prop).has(value)) {
					obj = o;
					break;
				}
			}
			return obj;
		}
	};

	/**
	 * 本地临时缓存,关闭浏览器后小时
	 */
	$.cache = {
		/**
		 * 设置值
		 * @param {String} key 键
		 * @param {Object} value 值
		 */
		set: function(key, value) {
			window.sessionStorage.setItem(key, value);
		},
		/**
		 * 获取值
		 * @param {String} key 键
		 * @return {Object} 值
		 */
		get: function(key) {
			return window.sessionStorage.getItem(key);
		},
		/**
		 * 删除值
		 * @param {Object} key 键
		 */
		del: function(key) {
			window.sessionStorage.removeItem(key);
		},
		/**
		 * 清除所有缓存
		 */
		clear: function() {
			window.sessionStorage.clear();
		}
	};

	/**
	 * 本地数据库存储
	 */
	$.db = {
		/**
		 * 设置值
		 * @param {String} key 键
		 * @param {Object} value 值
		 * @param {Number} longTime 保存时长（单位:分钟）
		 */
		set: function(key, value, longTime) {
			var expires = null;
			if (longTime) {
				var time = Date.now();
				expires = time + longTime * 60000;
			}
			var data = {
				value,
				expires
			};
			window.localStorage.setItem(key, JSON.stringify(data));
		},
		/**
		 * 获取值
		 * @param {String} key 键
		 * @return {Object} 值
		 */
		get: function(key) {
			var value;
			var text = window.localStorage.getItem(key);
			if (text && text.indexOf('{') === 0) {
				try {
					var data = JSON.parse(text);
					if (data) {
						if (data.expires) {
							var time = new Date(data.expires);
							if (time > Date.now()) {
								value = data.value;
							} else {
								window.localStorage.removeItem(key);
							}
						} else {
							value = data.value;
						}
					}
				} catch (e) {
					console.log(e);
					value = text;
				}
			} else {
				value = text;
			}
			return value;
		},
		/**
		 * 删除值
		 * @param {Object} key 键
		 */
		del: function(key) {
			window.localStorage.removeItem(key);
		}
	};

	/**
	 * web socket通讯组
	 */
	$.ws = {};

	/* 封装 WebSocket 实例化的方法  */
	var CreateWebSocket = (function(url) {
		return function(url) {
			var ws;
			try {
				if (window.WebSocket) {
					ws = new WebSocket(url)
				} else if (window.MozWebSocket) {
					ws = new MozWebSocket(url)
				};
			} catch (e) {
				//TODO handle the exception
			}
			return ws;
		}
	})();

	/**
	 * 等待连接成功, 然后发送消息
	 */
	function connect(_this) {
		if (_this.try_connect) {
			return;
		}
		_this.try_connect = true;
		var ws = CreateWebSocket(_this.url);
		ws.onmessage = function(event) {
			_this.message(event);
		};
		ws.onclose = function() {
			reconnect(_this);
		};
		ws.onerror = function(event) {
			_this.noticy("error", event);
		};
		ws.onopen = function() {
			_this.try_connect = false;
			var arr = _this.arr_message;
			var len = arr.length;
			for (var i = 0; i < len; i++) {
				if (ws.readyState === 1) {
					_this.ws.send(arr[i]);
				}
			}
			// 发送成功, 清空消息组
			_this.arr_message.clear();
			// 重置重新连接次数
			_this.try_times = 0;
		}
		_this.ws = ws;
	};

	/**
	 * 重新连接
	 * @param {Object} _this ws对象
	 */
	function reconnect(_this) {
		_this.try_times++;
		if (_this.try_times <= _this.try_max_times) {
			_this.try_connect = false;
			// 没连接上会一直重连，设置延迟避免请求过多
			setTimeout(function() {
				connect(_this)
			}, _this.seconds);
			_this.noticy('reconnect', _this.try_times);
		} else {
			_this.noticy('error', '服务器连接失败!');
		}
	};

	/**
	 * 构造通讯函数
	 * @param {String} url
	 * @param {Function} noticy 通知函数
	 * @param {Function} receive 响应回调函数
	 * @param {Function} noticy 信息捕捉函数
	 * @param {String} name 名称
	 * @param {Number} seconds 重新连接次数
	 * @return {Object} 返回发信服务
	 */
	function WS(url, receive, noticy, name, seconds) {
		if (noticy) {
			this.noticy = noticy;
		} else {
			/**
			 * 通知函数
			 * @param {String} type 通知类型
			 */
			this.noticy = function(type, content) {
				console.log(type, content);
			};
		}

		if (!window.WebSocket) {
			console.error('错误: 浏览器不支持websocket');
			this.noticy('error', '浏览器不支持websocket');
			return;
		}

		var u;
		if (url.indexOf('//') !== -1) {
			u = url.replace("https", "ws").replace("http", "ws");
		} else {
			u = "ws://" + url;
		}
		// 连接地址
		this.url = u;

		if (name) {
			this.name = name
		} else {
			this.name = u;
		}

		this.receive = receive;

		// 消息数组, 在等待连接的过程中, 如果有多条消息, 则保存至此, 等待连接成功后发送
		this.arr_message = [];

		if (seconds) {
			this.seconds = seconds;
		} else {
			this.seconds = 6000;
		}

		/**
		 * 尝试重连次数
		 */
		this.try_times = 0;

		/**
		 * 最大尝试次数, 如果每次重试间隔1分钟, 那么10分钟后就不再重连
		 */
		this.try_max_times = 10;

		/**
		 * 是否正在尝试连接
		 */
		this.try_connect = false;

		// 连接 socket服务
		connect(this);
	}


	/**
	 * 打开服务
	 */
	WS.prototype.open = function() {
		connect(this);
	};

	/**
	 * 关闭服务
	 */
	WS.prototype.close = function() {
		this.ws.onclose = function(event) {};
		this.ws.close()
	};


	/**
	 * 释放
	 */
	WS.prototype.clear = function() {
		this.close();
		delete $.ws[key];
	};

	/**
	 * 收到消息
	 */
	WS.prototype.message = function(event) {
		var data = event.data;
		if (data && this.receive) {
			this.receive(data);
		}
	};


	/**
	 * 发送数据
	 * @param {String} bodyStr 消息主体字符串
	 */
	WS.prototype.send = function(bodyStr) {
		var ws = this.ws;
		switch (ws.readyState) {
			case 0:
				// CONNECTING 正在连接
				// 先将消息加入队列等待连接成功再发送
				this.arr_message.push(bodyStr);
				break;
			case 1:
				// OPEN 连接成功，可以通信了
				ws.send(bodyStr);
				break;
			case 2:
				// CLOSING 连接正在关闭
				// 先将消息加入队列, 等待关闭 > 重新连接 > 连接成功 再发送消息
				this.arr_message.push(bodyStr);
				break;
			default:
				if (this.try_times > 9) {
					this.try_times = 0;
					this.try_connect = false;
				}
				// CLOSED 连接已经关闭，或者打开连接失败
				// 先将消息加入队列, 重新连接 > 连接成功 再发送消息
				this.arr_message.push(bodyStr);
				connect(this);
				break;
		}
	};

	/**
	 * 主动关闭连接
	 */
	WS.prototype.close = function() {
		this.ws.close();
	};

	/**
	 * 创建web socket通讯服务
	 * @param {String} url URL地址
	 * @param {Function} receive 响应回调函数
	 * @param {Function} noticy 信息捕捉函数
	 * @param {String} name 名称
	 * @param {String} seconds 秒
	 * @return {Object} 返回发信服务
	 */
	$.socket = function(url, receive, noticy, name, seconds) {
		// 使用键方式去查询多个通讯
		// 需要多通讯的原因是: 像交易所可能需要即时通讯的同时还需要试试变化交易信息
		if (!name) {
			name = url;
		}
		if (!$.ws[name]) {
			$.ws[name] = new WS(url, receive, noticy, name, seconds);
		} else {
			$.ws[name].try_times = 0;
		}
		return $.ws[name];
	};

	/**
	 * 路由
	 */
	$.route = {
		/**
		 * 重定向地址
		 */
		redirect_url: "/",
		/**
		 * 路由历史记录
		 */
		history: {
			list: [],
			push: function(url) {
				if (this.list.length > 0) {
					var end_url = this.list[this.list.length - 1];
					if (end_url !== url) {
						this.list.push(url);
					}
				} else {
					this.list.push(url);
				}
			}
		},

		/**
		 * 添加路由
		 * @param {String} url
		 * @param {String} title
		 */
		push: function(url, title) {
			history.pushState({
				status: 0
			}, title, url);
		}
	};

	/**
	 * 浏览器
	 */
	$.os = function() {
		var u = navigator.userAgent;
		return {
			version: navigator.appVersion,
			isApp: u.indexOf("Html5Plus") !== -1,
			device: {
				// 是否为移动终端
				mobile: /AppleWebKit.*Mobile.*/.test(u),
				// ios终端
				ios: /\(i[^;]+;( U;)? CPU.+Mac OS X/.test(u),
				// android终端或Linux浏览器
				android: u.indexOf('Android') !== -1 || u.indexOf('Linux') !== -1,
				// 是否为iPhone或者QQHD浏览器
				iPhone: u.indexOf('iPhone') !== -1,
				// 是否iPad
				iPad: u.indexOf('iPad') !== -1,
				// 是否电脑
				pc: u.indexOf('Window') !== -1,
			},
			app: {
				// 微信
				wechat: /MicroMessenger/i.test(u),
				// 微博
				weibo: /WeiBo/i.test(u),
				// QQ
				qq: /QQ/i.test(u)
			},
			browser: {
				// 浏览器版本信息
				// IE内核
				trident: u.indexOf('Trident') > -1,
				// opera内核
				presto: u.indexOf('Presto') > -1,
				// 苹果、谷歌内核
				webKit: u.indexOf('AppleWebKit') > -1,
				// 火狐内核
				gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
				// 苹果默认浏览器
				safari: u.indexOf('Safari') === -1
			}
		}
	}();
})();


(function() {
	/**
	 * @description 添加对象属性
	 * @param {Object} obj 对象
	 * @param {Object} query 查询条件
	 * @param {Object} value 添加值
	 * @return {Object} 返回添加的局部对象
	 */
	function add(obj, query, value) {
		if (query) {
			var oj = get(obj, query);
			if (oj) {
				$.push(oj, value, true);
			}
			return oj;
		} else {
			$.push(obj, value, true);
			return obj;
		}
	};
	$.add = add;

	/**
	 * @description 删除对象属性
	 * @param {Object} obj 对象
	 * @param {Object} query 查询条件
	 * @param {Object} item 查询条件
	 * @return {Object} 返回删除结果
	 */
	function del(obj, query, item) {
		var o = {};
		if (query) {
			o = get(obj, query);
		} else {
			o = obj;
		}
		if (!item) {
			item = Object.assign(o);
		}
		if (Array.isArray(o)) {
			o.clear();
		} else if (Array.isArray(item)) {
			for (var i = 0; i < item.length; i++) {
				var val = item[i];
				if (typeof(val) === "object") {
					del(o, null, val);
				} else {
					delete o[val];
				}
			}
		} else if (typeof(item) === "object") {
			for (var k in item) {
				if (Array.isArray(o[k])) {
					delete o[k];
				} else if (typeof(o[k]) === "object") {
					var type = typeof(item[k]);
					if (type === "object") {
						del(o[k], null, item[k]);
					} else if (type === "string" || type === "number") {
						delete o[k][item[k]];
					} else {
						delete o[k];
					}
				} else {
					delete o[k];
				}
			}
		} else {
			delete o[item];
		}
		for (var k in o) {
			if (Object.keys(o[k]).length === 0) {
				delete o[k]
			}
		}
		return o;
	};
	$.del = del;

	/**
	 * @description 修改对象属性
	 * @param {Object} obj 对象
	 * @param {Object} query 查询条件
	 * @param {Object} value 返回修改的局部对象
	 */
	function set(obj, query, value) {
		if (query) {
			var oj = get(obj, query);
			if (oj) {
				$.push(oj, value);
			}
			return oj;
		} else {
			$.push(obj, value);
			return obj;
		}
	};
	$.set = set;

	function arrToObj(arr) {
		var obj = {};
		var ret = obj;
		var len = arr.length;
		for (var i = 0; i < len; i++) {
			var k = arr[i];
			if (typeof(k) == "object") {
				if (Array.isArray(k)) {
					$.push(obj, arrToObj(k), true);
				} else {
					$.push(obj, k, true);
				}
			} else if (!obj[k]) {
				if (len - i > 1) {
					obj[k] = {};
				} else {
					obj[k] = true;
				}
				obj = obj[k];
			}
		}
		return ret;
	}

	/**
	 * @description 查询对象属性
	 * @param {Object} obj 对象
	 * @param {Object} query
	 * @return {Object} 返回查询结果
	 */
	function get(obj, query) {
		var ret;
		if (typeof(obj) === 'object' && !Array.isArray(obj)) {
			// 只有非数组的对象才进行操作
			if (Array.isArray(query)) {
				var ret = obj;
				// 如果是数字则循环数组
				for (var i = 0; i < query.length; i++) {
					var o = query[i];
					if (Array.isArray(o)) {
						ret = get(ret, o);
					} else if (typeof(o) === 'object') {
						var oj = {};
						for (var k in o) {
							if (o[k]) {
								oj[k] = get(ret[k], o[k]);
							} else {
								oj[k] = ret[k];
							}
						}
						ret = oj;
					} else {
						ret = ret[o];
						if (typeof(ret) !== 'object') {
							break;
						}
					}
				}

			} else if (typeof(query) === 'object') {
				var ret = {};
				// 如果是对象则遍历对象
				for (var k in query) {
					ret[k] = get(obj[k], query[k]);
				}
				ret = ret;
			} else if (query) {
				if (typeof(query) == "string" || typeof(query) == "number") {
					ret = {};
					ret[query] = obj[query];
				} else {
					ret = obj;
				}
			} else {
				// 如果query为空则返回整个对象
				ret = null;
			}
		} else {
			// 否则直接返回值
			ret = obj;
		}
		return ret;
	};
	$.get = get;

	/**
	 * 遍历读写对象
	 * @param {Object} obj
	 * @param {String} key 键 多级对象用.分隔
	 * @param {Object} value 值，如果不传为查询，传为修改
	 */
	function obj_for(obj, key, value) {
		if (!key) {
			return undefined;
		}
		var keys = key.split('.');
		var len = keys.length;
		if (len == 0) {
			return undefined;
		}
		var k = keys[0];
		var o = obj[k];
		if (len == 1 && value !== undefined) {
			obj[k] = value;
			o = value;
		} else if (typeof(o) == 'object') {
			if (len > 1) {
				return obj_for(o, keys.splice(1, len).join('.'), value);
			}
		} else if (len > 1) {
			return undefined;
		}
		return o;
	}

	$.obj = obj_for;
})();

/**
 * 跨站校验
 */
function ifame_check() {
	var domain = document.domain;
	var _self = Object.assign({}, window.self.location);
	try {
		var host = window.top.location.host;
	} catch (e) {
		console.log('跨域嵌套ifame');
		window.location.href = "/404.html";
	}
}

ifame_check();
