<template>
	<div class="diy_edit page_book_purchase" id="book_purchase_edit">
		<div class='warp'>
			<div class='container'>
				<div class='row diy_edit_content_box'>
					<div v-if="$check_field('set','textbook_name') || $check_field('add','textbook_name') || $check_field('get','textbook_name')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>教材名称:
							</span>
						</div>
						<!-- 文本 -->
						<div class="diy_field diy_text">
							<input type="text" id="form_textbook_name" v-model="form['textbook_name']" placeholder="请输入教材名称" v-if="(form['textbook_name'] && $check_field('set','textbook_name')) || (!form['textbook_name'] && $check_field('add','textbook_name'))"  :disabled="disabledObj['textbook_name_isDisabled']"/>
							<span v-else-if="$check_field('get','textbook_name')">{{ form[''] }}</span>
						</div>
					</div>
					<div v-if="$check_field('set','textbook_type') || $check_field('add','textbook_type') || $check_field('get','textbook_type')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>教材类型:
							</span>
						</div>
						<!-- 文本 -->
						<div class="diy_field diy_text">
							<input type="text" id="form_textbook_type" v-model="form['textbook_type']" placeholder="请输入教材类型" v-if="(form['textbook_type'] && $check_field('set','textbook_type')) || (!form['textbook_type'] && $check_field('add','textbook_type'))"  :disabled="disabledObj['textbook_type_isDisabled']"/>
							<span v-else-if="$check_field('get','textbook_type')">{{ form[''] }}</span>
						</div>
					</div>
					<div v-if="$check_field('set','textbook_subjects') || $check_field('add','textbook_subjects') || $check_field('get','textbook_subjects')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>教材科目:
							</span>
						</div>
						<!-- 文本 -->
						<div class="diy_field diy_text">
							<input type="text" id="form_textbook_subjects" v-model="form['textbook_subjects']" placeholder="请输入教材科目" v-if="(form['textbook_subjects'] && $check_field('set','textbook_subjects')) || (!form['textbook_subjects'] && $check_field('add','textbook_subjects'))"  :disabled="disabledObj['textbook_subjects_isDisabled']"/>
							<span v-else-if="$check_field('get','textbook_subjects')">{{ form[''] }}</span>
						</div>
					</div>
					<div v-if="$check_field('set','book_price') || $check_field('add','book_price') || $check_field('get','book_price')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>书籍价格:
							</span>
						</div>
						<!-- 文本 -->
						<div class="diy_field diy_text">
							<input type="text" id="form_book_price" v-model="form['book_price']" placeholder="请输入书籍价格" v-if="(form['book_price'] && $check_field('set','book_price')) || (!form['book_price'] && $check_field('add','book_price'))"  :disabled="disabledObj['book_price_isDisabled']"/>
							<span v-else-if="$check_field('get','book_price')">{{ form[''] }}</span>
						</div>
					</div>
					<div v-if="$check_field('set','buy_teachers') || $check_field('add','buy_teachers') || $check_field('get','buy_teachers')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>购买教师:
							</span>
						</div>
						<div class="diy_field diy_down">
							<select id="form_buy_teachers" :disabled="disabledObj['buy_teachers_isDisabled']" v-model="form['buy_teachers']" v-if="(form['buy_teachers'] && $check_field('set','buy_teachers')) || (!form['buy_teachers'] && $check_field('add','buy_teachers'))" >
								<option v-for="o in list_user_buy_teachers" :value="o['user_id']">
									{{o['nickname'] + '-' + o['username']}}
								</option>
							</select>
							<span v-else-if="$check_field('get','buy_teachers')">{{ form['buy_teachers'] }}</span>
						</div>
					</div>
					<div v-if="$check_field('set','purchase_quantity') || $check_field('add','purchase_quantity') || $check_field('get','purchase_quantity')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>购买数量:
							</span>
						</div>
						<!-- 文本 -->
						<div class="diy_field diy_text">
							<input type="text" id="form_purchase_quantity" v-model="form['purchase_quantity']" placeholder="请输入购买数量" v-if="(form['purchase_quantity'] && $check_field('set','purchase_quantity')) || (!form['purchase_quantity'] && $check_field('add','purchase_quantity'))"  :disabled="disabledObj['purchase_quantity_isDisabled']"/>
							<span v-else-if="$check_field('get','purchase_quantity')">{{ form[''] }}</span>
						</div>
					</div>
					<div v-if="$check_field('set','purchase_date') || $check_field('add','purchase_date') || $check_field('get','purchase_date')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>购买日期:
							</span>
						</div>
						<!-- 日期 -->
						<div class="diy_field diy_date">
							<input type="date" :disabled="disabledObj['purchase_date_isDisabled']" id="form_purchase_date" v-model="form['purchase_date']" placeholder="请输入购买日期" v-if="(form['purchase_date'] && $check_field('set','purchase_date')) || (!form['purchase_date'] && $check_field('add','purchase_date'))" />
							<span v-else-if="$check_field('get','purchase_date')">{{ form[''] }}</span>
						</div>
					</div>
					<div v-if="$check_field('set','total_price') || $check_field('add','total_price') || $check_field('get','total_price')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>共计价格:
							</span>
						</div>
						<!-- 文本 -->
						<div class="diy_field diy_text">
							<input type="text" id="form_total_price" v-model="form['total_price']" placeholder="请输入共计价格" v-if="(form['total_price'] && $check_field('set','total_price')) || (!form['total_price'] && $check_field('add','total_price'))"  @focus="set_total_price()" :disabled="disabledObj['total_price_isDisabled']"/>
							<span v-else-if="$check_field('get','total_price')">{{ form[''] }}</span>
						</div>
					</div>
					<div v-if="$check_field('set','book_purchase_remarks') || $check_field('add','book_purchase_remarks') || $check_field('get','book_purchase_remarks')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>购书备注:
							</span>
						</div>
						<!-- 文本 -->
						<div class="diy_field diy_text">
							<input type="text" id="form_book_purchase_remarks" v-model="form['book_purchase_remarks']" placeholder="请输入购书备注" v-if="(form['book_purchase_remarks'] && $check_field('set','book_purchase_remarks')) || (!form['book_purchase_remarks'] && $check_field('add','book_purchase_remarks'))"  :disabled="disabledObj['book_purchase_remarks_isDisabled']"/>
							<span v-else-if="$check_field('get','book_purchase_remarks')">{{ form[''] }}</span>
						</div>
					</div>
				</div>
				<div class="diy_edit_submit_box row">
					<div class="col-12">
						<div class="btn_box">
							<button class="btn_submit" @click="submit()">提交</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import mixin from "@/mixins/page.js";
	export default {
		mixins: [mixin],
		components: {},
		data() {
			return {
				url_get_obj: "~/api/book_purchase/get_obj?",
				url_add: "~/api/book_purchase/add?",
				url_set: "~/api/book_purchase/set?",

				// 登录权限
				oauth: {
					"signIn": true,
					"user_group": []
				},

				// 查询条件
				query: {
					"textbook_name": "",
					"textbook_type": "",
					"textbook_subjects": "",
					"book_price": "",
					"buy_teachers": 0,
					"purchase_quantity": "",
					"purchase_date": "",
					"total_price": "",
					"book_purchase_remarks": "",
					"book_purchase_id": 0,
				},

				obj: {
					"textbook_name":'', // 教材名称
					"textbook_type":'', // 教材类型
					"textbook_subjects":'', // 教材科目
					"book_price":'', // 书籍价格
					"buy_teachers": 0, // 购买教师
					"purchase_quantity":'', // 购买数量
					"purchase_date": new Date().getTime(),
					"total_price":'', // 共计价格
					"book_purchase_remarks":'', // 购书备注
					"book_purchase_id": 0,
				},

				// 表单字段
				form: {
					"textbook_name":'', // 教材名称
					"textbook_type":'', // 教材类型
					"textbook_subjects":'', // 教材科目
					"book_price":'', // 书籍价格
					"buy_teachers": 0, // 购买教师
					"purchase_quantity":'', // 购买数量
					"purchase_date": new Date().getTime(),
					"total_price":'', // 共计价格
					"book_purchase_remarks":'', // 购书备注
					"book_purchase_id": 0,
				},
				disabledObj:{
					"textbook_name_isDisabled": false,
					"textbook_type_isDisabled": false,
					"textbook_subjects_isDisabled": false,
					"book_price_isDisabled": false,
					"buy_teachers_isDisabled": false,
					"purchase_quantity_isDisabled": false,
					"purchase_date_isDisabled": false,
					"total_price_isDisabled": false,
					"book_purchase_remarks_isDisabled": false,
				},
				// 用户列表
				list_user_buy_teachers: [],

				// ID字段
				field: "book_purchase_id",
			}
		},
		methods: {
			/**
			 * 获取教师用户用户列表
			 */
			async get_list_user_buy_teachers() {
				// if(this.user_group !== "管理员" && this.form["buy_teachers"] === 0) {
				//     this.form["buy_teachers"] = this.user.user_id;
				// }
				var json = await this.$get("~/api/user/get_list?user_group=教师用户");
				if(json.result && json.result.list){
					this.list_user_buy_teachers = json.result.list;
				}
				else if(json.error){
					console.error(json.error);
				}
			},
			async get_user_session_buy_teachers(){
				var _this = this;
				var json = await this.$get("~/api/user_group/get_obj?name=教师用户");
				if(json.result && json.result.obj){
					var source_table = json.result.obj.source_table;
					var user_id = _this.$store.state.user.user_id;
					if (user_id){
						var url = "~/api/"+source_table+"/get_obj?"
						this.$get(url, {"user_id":_this.$store.state.user.user_id}, function(res) {
							if (res.result && res.result.obj) {
								var arr = []
								for (let key in res.result.obj) {
									arr.push(key)
								}
								var arrForm = []
								for (let key in _this.form) {
									arrForm.push(key)
								}
								_this.form["buy_teachers"] = user_id
								_this.disabledObj['buy_teachers' + '_isDisabled'] = true
								for (var i=0;i<arr.length;i++){
                  if (arr[i]!=='examine_state' && arr[i]!=='examine_reply') {
                    for (var j = 0; j < arrForm.length; j++) {
                      if (arr[i] === arrForm[j]) {
                        if (arr[i] !== "buy_teachers") {
                          _this.form[arrForm[j]] = res.result.obj[arr[i]]
                          _this.disabledObj[arrForm[j] + '_isDisabled'] = true
                          break;
                        }
                      }
                    }
                  }
								}
							}
						});
					}
				}
				else if(json.error){
					console.error(json.error);
				}
			},
			set_total_price(){
				this.form.total_price =this.form.purchase_quantity * this.form.book_price
			},

			/**
			 * 修改文件
			 * @param { Object } files 上传文件对象
			 * @param { String } str 表单的属性名
			 */
			change_file(files, str) {
				var form = new FormData();
				form.append("file", files[0]);
				this.$post("~/api/book_purchase/upload?", form, (res) => {
					if (res.result) {
						this.form[str] = res.result.url;
					} else if (res.error) {
						this.$toast(res.error.message);
					}
				});
			},

			/**
			 * 获取对象后获取缓存表单
			 * @param {Object} json
			 * @param {Object} func
			 */
			get_obj_before(param){
				var form = $.db.get("form");
				// if (form) {
        //   delete(form.examine_state)
        //   delete(form.examine_reply)
        //   this.obj = $.push(this.obj ,form);
				// 	this.form = $.push(this.form ,form);
				// }
				// var arr = []
				// for (let key in form) {
				// 	arr.push(key)
				// }
				// for (var i=0;i<arr.length;i++){
				// 	this.disabledObj[arr[i] + '_isDisabled'] = true
				// }
        if (form) {
          var arr = []
          for (let key in form) {
            arr.push(key)
          }
          var arrForm = []
          for (let key in this.form) {
            arrForm.push(key)
          }
          for (var i=0;i<arr.length;i++){
            if (arr[i]!=='examine_state' && arr[i]!=='examine_reply') {
              for (var j = 0; j < arrForm.length; j++) {
                if (arrForm[j] === arr[i]) {
                  this.form[arrForm[j]] = form[arr[i]]
                  this.obj[arrForm[j]] = form[arr[i]]
                  this.disabledObj[arrForm[j] + '_isDisabled'] = true
                  break;
                }
              }
            }
          }
        }
        if (JSON.stringify(this.form["purchase_date"]).indexOf("-")===-1) {
          this.form["purchase_date"] = this.$toTime(parseInt(this.form["purchase_date"]), "yyyy-MM-dd")
        }

        $.db.del("form");
				return param;
			},

			/**
			 * 获取对象后获取缓存表单
			 * @param {Object} json
			 * @param {Object} func
			 */
			get_obj_after(json ,func){
				// var form = $.db.get("form");
				// var obj = Object.assign({} ,form ,this.obj);
				// if (obj) {
        //   delete(obj.examine_state)
        //   delete(obj.examine_reply)
				// 	this.obj = $.push(this.obj ,obj);
				// }
				// if (form) {
        //   delete(form.examine_state)
        //   delete(form.examine_reply)
				// 	this.form = $.push(this.form ,form);
				// }
				if(func){
					func(json);
				}
			},

		},
		created() {
			this.get_user_session_buy_teachers();
			this.get_list_user_buy_teachers();
		},
	}
</script>

<style>
</style>
