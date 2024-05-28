import page_header from '../components/common/page_header.vue'
import page_footer from '../components/common/page_footer.vue'
import page_side from '../components/common/page_side.vue'
import div_video from "../components/diy/div_video.vue";
import div_audio from "../components/diy/div_audio.vue";


// 引用富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// 引入富文本样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

var host = "http://127.0.0.1/";

export default {
	/**
	 * 安装
	 * @param {Object} Vue vue类
	 * @param {Object} optons 配置参数
	 */
	install(Vue, optons) {
		// 富文本编辑器实例化
		Vue.use(VueQuillEditor)

		Vue.component('page_header', page_header);
		Vue.component('page_footer', page_footer);
		Vue.component('page_side', page_side);
		Vue.component('div_video',div_video);
		Vue.component('div_audio',div_audio);

		if (optons.host) {
			host = optons.host;
		}

		var redirect_url = "/";
		Vue.mixin({
			data() {
				return {}
			},
			methods: {
                /**
                 *  改变时间
                 */
                $changeTime(o){
                    for (var k in o) {
                        if (k.indexOf('time') !== -1 || k.indexOf('date') !== -1) {
                            if (typeof(k) == 'string') {
                                var val = o[k];
                                if (val || val.indexOf('T') !== -1) {
                                    var v = new Date(o[k]);
                                    o[k] = v.toStr('yyyy-MM-dd hh:mm:ss');
                                } else if (/\d+/.test(val)) {
                                    if (o[k].length == 10) {
                                        var v = new Date(o[k] * 1000);
                                        o[k] = v.toStr('yyyy-MM-dd hh:mm:ss');
                                    } else if (o[k].length == 13) {
                                        var v = new Date(o[k] * 1000);
                                        o[k] = v.toStr('yyyy-MM-dd hh:mm:ss');
                                    }
                                } else if (typeof(val) == 'number') {
                                    var v = new Date(o[k]);
                                    o[k] = v.toStr('yyyy-MM-dd hh:mm:ss');
                                }
                            }
                        }
                    }
                },

				$get_rand(len) {
					var rand = Math.random();
					return Math.ceil(rand * 10 ** len);
				},
				/**
				 * 获取当前时间戳
				 */
				$get_stamp() {
					return new Date().getTime();
				},
				/**
				 * 下载
				 * @param {String} url 下载地址
				 * @param {String} name 保存的名字
				 */
				$download(url, name) {
					var anchor = document.createElement('a');
					if (!name) {
						var arr = url.split("/");
						name = arr[arr.length - 1];
					}
					if ('download' in anchor) {
						anchor.href = url.replace("~/", host);
						anchor.setAttribute("download", name);
						anchor.className = "download-js-link";
						anchor.style.display = "none";
						document.body.appendChild(anchor);
						setTimeout(function() {
							anchor.click();
							document.body.removeChild(anchor);
						}, 66);
						return true;
					}
				},
				/**
				 * @description 获取用户信息
				 * @param {Function} func 回调函数
				 */
				$get_user(func) {
					var _this = this;

					// 获取用户状态
					this.$get('~/api/user/state', null, function(json, status) {
						if (json.result) {
                            var user = json.result;
							if(user.obj){
								user = user.obj;
							}
							// 存储用户信息
							_this.$store.commit('user_set', user);

							// 获取用户权限
							_this.$get_auth(user.user_group, function() {
								// 传入回调函数
								if (func) {
									func();
								}
							});
						} else if (json.error) {
							// 非法访问或未登录
							// 删除登录
							_this.$store.commit('quit');
							// 跳转登录页
							_this.$router.push("/login");
						} else {
							_this.$toast('服务器连接失败！');
						}
					});
				},
				/**
				 * 跳转地址
				 * @param {String} url
				 */
				$redirect(url) {
					if (url) {
						redirect_url = url;
					} else {
						return redirect_url;
					}
				},
				/**
				 * @description 提示框
				 * @param {String} text 提示内容
				 * @param {String} type 显示类型
				 */
				$toast(text, type = 'dark') {
					if (type == 'danger' || type == 'error') {
						this.$message.error(text);
					} else {
						this.$message({
							message: text,
							type
						});
					}
				},
				/**
				 * 转换时间格式
				 * @param {String} time 时间字符串
				 * @param {String} format 格式
				 */
				$toTime(time, format) {
					var ret = "";
					console.log("执行【转换时间格式】函数");
					console.log("源参数" ,time);
                    if(time){
						var is_date = time instanceof Date;
						var is_num = typeof(time) == 'number';
						console.log("校验类型 date ,number ,string" ,is_date ,is_num ,typeof(time) == 'string');
						if(is_date){
							ret = time.toStr(format);
							console.log("源参数:日期型 结果:" ,ret);
						}
                        else if(is_num){
                            var t = new Date(time);
                            ret = t.toStr(format);
							console.log("源参数:数字型" ,ret);
                        }
                        else {
							let reg = /^(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/;
							let regExp = new RegExp(reg);
							if(regExp.test(time)){
								ret = time;
							}else {
								ret = time.toTime().toStr(format);
							}
							console.log("源参数:文本型" ,ret);
                        }
                    }
                    return ret;
				},
				/**
				 * @description 过滤数组
				 * @param {Array} arr 被过滤的数组
				 * @param {String} key 判断的键
				 * @param {Object} value 判断的值
				 * @return {Array} 返回过滤后的数组
				 */
				$filter(arr, key, value) {
					var ar = [];
					for (var i = 0; i < arr.length; i++) {
						var o = arr[i];
						if (o[key] === value) {
							ar.push(o);
						}
					}
					return ar;
				},

				/**
				 * @description 转url字符串
				 * @param {Object} obj 被转换的对象
				 * @param {String} url 请求地址
				 * @return {String} url参数格式字符串
				 */
				$toUrl(obj, url) {
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
				},
				/**
				 * 转换名称
				 * @param {Array} list 数组
				 */
				$toName(list, value, value_key = 'name', key = 'value') {
					var ret = "";
					for (var i = 0; i < list.length; i++) {
						var o = list[i];
						if (o[key] === value) {
							ret = o[value_key];
						}
					}
					return ret;
				},
				/**
				 * 补全请求url
				 * @param {String} url 现地址
				 * @return {String} 新地址
				 */
				$fullUrl(url) {
					var url_new = "";
					if (url) {
						if (url.indexOf("~/") === 0) {
							url_new = url.replace('~/', host);
						} else if (url.indexOf("/http://") === 0) {
							url_new = url.replace('/http://', 'http://');
						} else if (url.indexOf("/") === 0) {
							url_new = url.replace('/', host);
						} else {
							url_new = url;
						}
					}
					return url_new;
				},
				/**
				 * GET请求
				 * @param {String} url 请求地址
				 * @param {Object} body 请求参数
				 * @param {Funciton} func 回调函数，可以为空，为空则采用await返回值
				 * @return {Object} 返回请求结果
				 */
				async $get(url, body, func) {
					url = url.replace('~/', host);
					var token = this.$store.state.user.token || $.db.get("token") || null;
					if (body) {
						url = this.$toUrl(body, url);
					}
					if (func) {
						// 如果回调函数存在, 则采用异步
						this.$axios.get(url, {
							headers: {
								'x-auth-token': token
							}
						}).then((res) => {
							func(res.data);
						}).catch((res) => {
							func(res);
						});
					} else {
						// 否则采用同步
						var res = await this.$axios.get(url, {
							headers: {
								'x-auth-token': token
							}
						});
						return res.data;
					}
				},
				/**
				 * POST请求
				 * @param {String} url 请求地址
				 * @param {Object} body 请求参数
				 * @param {Funciton} func 回调函数，可以为空，为空则采用await返回值
				 * @return {Object} 返回请求结果
				 */
				async $post(url, body, func) {
					url = url.replace('~/', host);
					var token = this.$store.state.user.token || $.db.get("token") || null;
					if (func) {
						// 如果回调函数存在, 则采用异步
						this.$axios.post(url, body, {
							headers: {
								'x-auth-token': token,
								'Content-Type': 'application/json'
							}
						}).then((res) => {
							func(res.data);
						}).catch((res) => {
							func(res);
						});
					} else {
						// 否则采用同步
						var res = await this.$axios.post(url, body, {
							headers: {
								'x-auth-token': token,
								'Content-Type': 'application/json'
							}
						});
						return res.data;
					}
				},
				/**
				 * 上传文件
				 * @param {String} url 请求地址
				 * @param {Object} body 请求参数
				 * @param {Funciton} func 回调函数，可以为空，为空则采用await返回值
				 * @return {Object} 返回请求结果
				 */
				async $upload(url, body, func) {
					url = url.replace('~/', host);
					var token = this.$store.state.user.token || $.db.get("token") || null;
					if (func) {
						// 如果回调函数存在, 则采用异步
						this.$axios.post(url, body, {
							headers: {
								'x-auth-token': token,
								'Content-Type': 'multipart/form-data'
							}
						}).then((res) => {
							func(res.data);
						}).catch((res) => {
							func(res);
						});
					} else {
						// 否则采用同步
						var res = await this.$axios.post(url, body, {
							headers: {
								'x-auth-token': token,
								'Content-Type': 'multipart/form-data'
							}
						});
						return res.data;
					}
				},
				/**
				 * POST请求
				 * @param {String} url 请求地址
				 * @param {Object} body 请求参数
				 * @param {Funciton} func 回调函数，可以为空，为空则采用await返回值
				 * @return {Object} 返回请求结果
				 */
				async $put(url, body, func) {
					var token = this.$store.state.user.token || $.db.get("token") || null;
					if (func) {
						// 如果回调函数存在, 则采用异步
						this.$axios.put(url, body, {
							headers: {
								'x-auth-token': token,
								'Content-Type': 'application/json'
							}
						}).then(func);
					} else {
						// 否则采用同步
						return await this.$axios.put(url, body, {
							headers: {
								'x-auth-token': token,
								'Content-Type': 'application/json'
							}
						});
					}
				},
				/**
				 * 获取用户组权限
				 * @param {String} user_group 用户组
				 * @param {Function} func 回调函数
				 */
				async $get_auth(user_group = "游客", func) {
					if(!user_group){
						user_group = "游客";
					}
					// 查询权限
					this.$get("~/api/auth/get_list?", {
						user_group
					}, (json) => {
						// 清空权限
						this.$store.commit("set_auth", []);

						// 判断查询结果
						if(json.result && json.result.list){
							// 权限缓存
							this.$store.commit("set_auth", json.result.list);

							// 如果有回调函数则执行回调函数
							if(func){
								func();
							}
						}else if(json.error){
							console.error(json.error)
						}
					});
				},

				/**
				 * 获取路径对应操作权限 鉴权
				 * @param {String} action 操作名
				 */
				$check_action(path, action = "get") {
					var o = this.$get_power(path);
					if (o && o[action] != 0 && o[action] != false) {
						return true;
					}
					return false;
				},

				/**
				 * 获取权限
				 * @param {String} path 路由路径
				 */
				$get_power(path) {
					var list = this.$store.state.web.auth;
					var obj;
					for (var i = 0; i < list.length; i++) {
						var o = list[i];
						if (o.path === path) {
							obj = o;
							break;
						}
					}
					return obj;
				},

				/**
				 * 注册时是否有显示或操作字段的权限
				 * @param {String} action 操作名
				 * @param {String} field 查询的字段
				 * @param {String} path 路径
				 */
				$check_register_field(action, field,path) {
					var o = this.$get_power(path);
					var auth;
					if (o && o[action] != 0 && o[action] != false) {
						auth = o["field_" + action];
					}
					if (auth) {
						return auth.indexOf(field) !== -1;
					}
					return false;
				},

				/**
				 * 是否有显示或操作字段的权限
				 * @param {String} action 操作名
				 * @param {String} field 查询的字段
				 */
				$check_field(action, field) {
					var o = this.$get_power(this.$route.path);
					var auth;
					if (o && o[action] != 0 && o[action] != false) {
						auth = o["field_" + action];
					}
					if (auth) {
						return auth.indexOf(field) !== -1;
					}
					return false;
				},

				/**
				 * 获取路径对应操作权限 鉴权
				 * @param {String} action 操作名
				 */
				$check_exam(path, action = "get") {
					var o = this.$get_power(path);
					if (o) {
						var option = JSON.parse(o.option);
						if (option[action])
							return true
					}
					return false;
				},

				/**
				 * 是否有审核字段的权限
				 */
				$check_examine() {
					var path = this.$route.path.replace("view","table")
					var o = this.$get_power(path);
					if (o){
						var option = JSON.parse(o.option);
						if (option.examine)
							return true
					}
					return false;
				},

				/**
				 * 是否有支付字段的权限
				 */
				$check_pay() {
					var path = this.$route.path;
					var o = this.$get_power(path);
					if (o){
						var option = JSON.parse(o.option);
						if (option.pay)
							return true
					}
					return false;
				},

				/**
				 * 是否有统计字段的权限
				 */
				$check_figure(path) {
					var o = this.$get_power(path);
					if (o){
						var option = JSON.parse(o.option);
						if (option.figure)
							return true
					}
					return false;
				},

				$check_comment(path) {
					var o = this.$get_power(path);
					if (o){
						var option = JSON.parse(o.option);
						if (option.can_show_comment)
							return true
					}
					return false;
				},

				/**
				 * 获取页面标题
				 * @param {String} path 路由路径
				 */
				$page_title(path) {
					console.log(111111)
					console.log(path)
					console.log(this.$get_power);
					var o = this.$get_power(path);
					if (o) {
						return o.page_title || o.mod_name;
					}
					return "";
				},

				/**
				 * 用户组是否有这个权限
				 * @param {Array} user_group 权限组
				 */
				$check_group(user_group) {
					var list = this.$store.state.web.auth;
					var bl = false;
					for (var i = 0; i < user_group.length; i++) {
						bl = this.$check_action(user_group[i]);
						if (bl == true) {
							break;
						}
					}
					return bl;
				},

				/**
				 * 按目标排序
				 * @param {Object} sort 排序条件
				 */
				$sortChange(sort) {
					if (sort.order) {
						var orderby = "`" + sort.prop + "` " + sort.order.replace("ending", "");
						this.query.orderby = orderby;
					}else{
						this.query.orderby = "";
					}
					this.search();
				},

				/**
				 * 验证手机号
				 * @param {Object} rule
				 * @param {Object} value 验证值
				 * @param {Object} callback 返回函数
				 */
				$is_phone(rule, value, callback) {
					if (!value || /^[1][3,4,5,7,8,9][0-9]{9}$/.test(value)) {
						callback();
					} else {
						callback(new Error('手机号必须是11位的手机号格式'));
					}
				},

				/**
				 * 验证电话
				 * @param {Object} rule
				 * @param {Object} value 验证值
				 * @param {Object} callback 返回函数
				 */
				$is_tel(rule, value, callback) {
					if (!value || /^[1][3,4,5,7,8,9][0-9]{9}$/.test(value) || /^\d{3}-\d{7,8}|\d{4}-\d{7,8}|\d{8}$/.test(value)) {
						callback();
					} else {
						callback(new Error('电话必须是11位或者8位数的电话格式'));
					}
				},

				/**
				 * 验证邮箱
				 * @param {Object} rule
				 * @param {Object} value 验证值
				 * @param {Object} callback 返回函数
				 */
				$is_email(rule, value, callback) {
					if (!value || /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(value)) {
						callback();
					} else {
						callback(new Error('必须是邮箱格式，例：test@test.com'));
					}
				},

				/**
				 * 验证网址
				 * @param {Object} rule
				 * @param {Object} value 验证值
				 * @param {Object} callback 返回函数
				 */
				$is_url(rule, value, callback) {
					if (!value || /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/|www\.)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/.test(value)) {
						callback();
					} else {
						callback(new Error('必须是网址格式，例：www.test.com'));
					}
				},

				// /**
				//  * 验证身份证
				//  * @param {Object} rule
				//  * @param {Object} value 验证值
				//  * @param {Object} callback 返回函数
				//  */
				// is_phone(rule, value, callback) {
				// 	if (/^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(value)) {
				// 		callback();
				// 	} else {
				// 		callback(new Error("您输入身份证格式不正确,请按照`地址码``年份码``月份码``日期码``顺序码``校验码`的格式输入"));
				// 	}
				// },

			}
		})
	}
}
