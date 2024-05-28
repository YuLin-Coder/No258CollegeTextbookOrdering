import page_header from '@/components/common/page_header.vue';
import page_footer from '@/components/common/page_footer.vue';

// 引用富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// 引入富文本样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

var host = "http://127.0.0.1:5000/";

export default {
	/**
	 * 安装
	 * @param {Object} Vue vue类
	 * @param {Object} optons 配置参数
	 */
	install(Vue,optons) {
		// 富文本编辑器实例化
		Vue.use(VueQuillEditor)

		Vue.component('page_header', page_header);
		Vue.component('page_footer', page_footer);

		if (optons && optons.host) {
			host = optons.host;
		}

		var redirect_url = "/";
		Vue.mixin({
			data() {
				return {}
			},
			methods: {

				// /**
				//  *  消息
				//  */
				// $message(content, type = "none") {
				// 	$.toast({
				// 		title: content,
				// 		icon: type,
				// 		duration: 2000
				// 	});
				// },

                /**
                 *  改变时间
                 */
                $changeTime(o){
                    for (var k in o) {
                        if (k.indexOf('time') !== -1) {
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
                                } else if (typeof(k) == 'number') {
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
				async $get_user(func) {
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

							if(func){
								func(user);
							}
						} else if (json.error) {
							console.log(json.error);
							this.$get("quit");
							_this.$store.commit('sign_out');
							if(func){
								func(user);
							}
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
					// if (type == 'danger' || type == 'error') {
					// 	this.$message.error(text);
					// } else {
					// 	this.$message({
					// 		message: text,
					// 		type
					// 	});
					// }
					alert(text);
				},

				/**
				 * 转换时间格式
				 * @param {String} time 时间字符串
				 * @param {String} format 格式
				 */
				$toTime(time, format) {
					var ret = "";
                    if(time){
                        if(typeof(time) == 'number'){
                            var t = new Date(time);
                            ret = t.toStr(format);
                        }
                        else
                        {
                            ret = time.toTime().toStr(format);
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
						if(url.indexOf("/http://") === 0){
							url_new = url.replace('/http://','http://');
						}else if (url.indexOf("~/") === 0) {
							url_new = url.replace('~/', host);
						}else if (url.indexOf("/") === 0) {
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
					if (body) {
						url = this.$toUrl(body, url);
					}

					var token = this.$store.state.user.token || $.db.get("token") || null;

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

				$get_auth(user_group,func){
					// 查询权限
					this.$get("~/api/auth/get_list?", {
						user_group
					}, (json) => {

						// 清空权限
						this.$store.commit("set_auth", []);
						// 判断查询结果
						if(json.result && json.result.list){
							var auth = json.result.list;

							// 权限缓存
							this.$store.commit("set_auth", auth);

							// 如果有回调函数则执行回调函数
							if(func){
								func();
							}

						}else if(json.error){
							this.$toast(json.error.message,"error");
							console.error(json.error);
						}
					});
				},

				/**
				 * 是否有审核字段的权限
				 */
				$check_examine() {
					var path = this.$route.path.replace("edit","table");
					var o = this.$get_power(path);
					if (o){
						var option = JSON.parse(o.option);
						if (option.examine)
							return true
					}
					return false;
				},

				/**
				 * 获取路径对应操作权限 鉴权
				 * @param {String} action 操作名
				 */
				$check_action(path, action = "get") {
					var o = this.$get_power(path);
					if (o && o[action]!= 0 && o[action]!= false) {
						return true;
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
				$check_cart_page(path) {
					var o = this.$get_power(path);
					if (o){
						var option = JSON.parse(o.option);
						if (option.cart_page)
							return true
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
				$check_field(action, field, path) {
					var o
					if (path)
						o = this.$get_power(path);
					else
						o = this.$get_power(this.$route.path);
					var auth;
					if (o && o[action]) {
						auth = o["field_" + action];
					}
					if (auth) {
						return auth.indexOf(field) !== -1;
					}
					return false;
				},

				/**
				 * 获取页面标题
				 * @param {String} path 路由路径
				 */
				$page_title(path) {
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
				}

			},
		})
	}
}
