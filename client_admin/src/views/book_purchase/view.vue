<template>
	<el-main class="bg edit_wrap">
		<el-form ref="form" :model="form" status-icon label-width="120px" v-if="is_view()">
			<el-col v-if="user_group === '管理员' || $check_field('get','textbook_name') || $check_field('add','textbook_name') || $check_field('set','textbook_name')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="教材名称" prop="textbook_name">
					<el-input id="textbook_name" v-model="form['textbook_name']" placeholder="请输入教材名称"
							  v-if="user_group === '管理员' || (form['book_purchase_id'] && $check_field('set','textbook_name')) || (!form['book_purchase_id'] && $check_field('add','textbook_name'))" :disabled="disabledObj['textbook_name_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','textbook_name')">{{form['textbook_name']}}</div>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','textbook_type') || $check_field('add','textbook_type') || $check_field('set','textbook_type')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="教材类型" prop="textbook_type">
					<el-input id="textbook_type" v-model="form['textbook_type']" placeholder="请输入教材类型"
							  v-if="user_group === '管理员' || (form['book_purchase_id'] && $check_field('set','textbook_type')) || (!form['book_purchase_id'] && $check_field('add','textbook_type'))" :disabled="disabledObj['textbook_type_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','textbook_type')">{{form['textbook_type']}}</div>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','textbook_subjects') || $check_field('add','textbook_subjects') || $check_field('set','textbook_subjects')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="教材科目" prop="textbook_subjects">
					<el-input id="textbook_subjects" v-model="form['textbook_subjects']" placeholder="请输入教材科目"
							  v-if="user_group === '管理员' || (form['book_purchase_id'] && $check_field('set','textbook_subjects')) || (!form['book_purchase_id'] && $check_field('add','textbook_subjects'))" :disabled="disabledObj['textbook_subjects_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','textbook_subjects')">{{form['textbook_subjects']}}</div>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','book_price') || $check_field('add','book_price') || $check_field('set','book_price')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="书籍价格" prop="book_price">
					<el-input id="book_price" v-model="form['book_price']" placeholder="请输入书籍价格"
							  v-if="user_group === '管理员' || (form['book_purchase_id'] && $check_field('set','book_price')) || (!form['book_purchase_id'] && $check_field('add','book_price'))" :disabled="disabledObj['book_price_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','book_price')">{{form['book_price']}}</div>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','buy_teachers') || $check_field('add','buy_teachers') || $check_field('set','buy_teachers')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="购买教师" prop="buy_teachers">
						<div v-if="user_group !== '管理员'">
							{{ get_user_session_buy_teachers(form['buy_teachers']) }}
							<!--<el-input id="business_name" v-model="form['buy_teachers']" placeholder="请输入购买教师"-->
							<!--v-if="user_group === '管理员' || (form['book_purchase_id'] && $check_field('set','buy_teachers')) || (!form['book_purchase_id'] && $check_field('add','buy_teachers'))" :disabled="disabledObj['buy_teachers_isDisabled']"></el-input>-->
							<!--<div v-else-if="$check_field('get','buy_teachers')">{{form['buy_teachers']}}</div>-->
							<el-select v-if="user_group === '管理员' || (form['book_purchase_id'] && $check_field('set','buy_teachers')) || (!form['book_purchase_id'] && $check_field('add','buy_teachers'))" id="buy_teachers" v-model="form['buy_teachers']" :disabled="disabledObj['buy_teachers_isDisabled']">
								<el-option v-for="o in list_user_buy_teachers" :key="o['username']" :label="o['nickname'] + '-' + o['username']"
										   :value="o['user_id']">
								</el-option>
							</el-select>
							<el-select v-else-if="$check_field('get','buy_teachers')" id="buy_teachers" v-model="form['buy_teachers']" :disabled="true">
								<el-option v-for="o in list_user_buy_teachers" :key="o['username']" :label="o['nickname'] + '-' + o['username']"
										   :value="o['user_id']">
								</el-option>
							</el-select>
						</div>
						<el-select v-else id="buy_teachers" v-model="form['buy_teachers']" :disabled="disabledObj['buy_teachers_isDisabled']">
							<el-option v-for="o in list_user_buy_teachers" :key="o['username']" :label="o['nickname'] + '-' + o['username']"
									   :value="o['user_id']">
							</el-option>
						</el-select>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','purchase_quantity') || $check_field('add','purchase_quantity') || $check_field('set','purchase_quantity')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="购买数量" prop="purchase_quantity">
					<el-input id="purchase_quantity" v-model="form['purchase_quantity']" placeholder="请输入购买数量"
							  v-if="user_group === '管理员' || (form['book_purchase_id'] && $check_field('set','purchase_quantity')) || (!form['book_purchase_id'] && $check_field('add','purchase_quantity'))" :disabled="disabledObj['purchase_quantity_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','purchase_quantity')">{{form['purchase_quantity']}}</div>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','purchase_date') || $check_field('add','purchase_date') || $check_field('set','purchase_date')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="购买日期" prop="purchase_date">
					<el-date-picker :disabled="disabledObj['purchase_date_isDisabled']" v-if="user_group === '管理员' || (form['book_purchase_id'] && $check_field('set','purchase_date')) || (!form['book_purchase_id'] && $check_field('add','purchase_date'))" id="purchase_date"
						v-model="form['purchase_date']" type="date" placeholder="选择日期">
					</el-date-picker>
					<div v-else-if="$check_field('get','purchase_date')">{{form['purchase_date']}}</div>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','total_price') || $check_field('add','total_price') || $check_field('set','total_price')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="共计价格" prop="total_price">
					<el-input id="total_price" v-model="form['total_price']" placeholder="请输入共计价格"
							  v-if="user_group === '管理员' || (form['book_purchase_id'] && $check_field('set','total_price')) || (!form['book_purchase_id'] && $check_field('add','total_price'))"  @focus="set_total_price()" :disabled="disabledObj['total_price_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','total_price')">{{form['total_price']}}</div>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','book_purchase_remarks') || $check_field('add','book_purchase_remarks') || $check_field('set','book_purchase_remarks')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="购书备注" prop="book_purchase_remarks">
					<el-input id="book_purchase_remarks" v-model="form['book_purchase_remarks']" placeholder="请输入购书备注"
							  v-if="user_group === '管理员' || (form['book_purchase_id'] && $check_field('set','book_purchase_remarks')) || (!form['book_purchase_id'] && $check_field('add','book_purchase_remarks'))" :disabled="disabledObj['book_purchase_remarks_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','book_purchase_remarks')">{{form['book_purchase_remarks']}}</div>
				</el-form-item>
			</el-col>
			<el-col :xs="24" :sm="12" :lg="8" class="el_form_btn_warp">
				<el-form-item>
					<el-button type="primary" @click="submit()">提交</el-button>
					<el-button @click="cancel()">取消</el-button>
				</el-form-item>
			</el-col>

		</el-form>
	</el-main>
</template>

<script>
	import mixin from "@/mixins/page.js";

	export default {
		mixins: [mixin],
		data() {
			return {
				field: "book_purchase_id",
				url_add: "~/api/book_purchase/add?",
				url_set: "~/api/book_purchase/set?",
				url_get_obj: "~/api/book_purchase/get_obj?",
				url_upload: "~/api/book_purchase/upload?",

				query: {
					"book_purchase_id": 0,
				},

				form: {
					"textbook_name":'', // 教材名称
					"textbook_type":'', // 教材类型
					"textbook_subjects":'', // 教材科目
					"book_price":'', // 书籍价格
					"buy_teachers": 0, // 购买教师
					"purchase_quantity":'', // 购买数量
					"purchase_date":'', // 购买日期
					"total_price":'', // 共计价格
					"book_purchase_remarks":'', // 购书备注
					"book_purchase_id": 0, // ID

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
				// 用户组
				group_user_buy_teachers: "",
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
			/**
			 * 获取教师用户用户组
			 */
			async get_group_user_buy_teachers() {
				this.form["buy_teachers"] = this.user.user_id;
				var json = await this.$get("~/api/user_group/get_obj?name=教师用户");
				if(json.result && json.result.obj){
					this.group_user_buy_teachers = json.result.obj;
				}
				else if(json.error){
					console.error(json.error);
				}
			},
			get_user_session_buy_teachers(id){
				var _this = this;
				var user_id = {"user_id":id}
				var url = "~/api/"+_this.group_user_buy_teachers.source_table+"/get_obj?"
				this.$get(url, user_id, function(res) {
					if (res.result && res.result.obj) {
						var arr = []
						for (let key in res.result.obj) {
							arr.push(key)
						}
						var arrForm = []
						for (let key in _this.form) {
							arrForm.push(key)
						}
						for (var i=0;i<arr.length;i++){
						  if (arr[i]!=='examine_state' && arr[i]!=='examine_reply') {
                for (var j = 0; j < arrForm.length; j++) {
                  if (arr[i] === arrForm[j]) {
                    if (arr[i] !== "buy_teachers") {
                      _this.form[arrForm[j]] = res.result.obj[arr[i]]
                      _this.disabledObj[arrForm[j] + '_isDisabled'] = true
                      break;
                    } else {
                      _this.disabledObj[arrForm[j] + '_isDisabled'] = true
                    }
                  }
                }
              }
						}
					}
				});
			},
			get_user_buy_teachers(id){
				var obj = this.list_user_buy_teachers.getObj({"user_id":id});
				var ret = "";
				if(obj){
					if(obj.nickname){
						ret = obj.nickname;}
					else{
						ret = obj.username;
					}
				}
				return ret;
			},
			set_total_price(){
				this.form.total_price =this.form.purchase_quantity * this.form.book_price
			},

			/**
			 * 获取对象之前
			 * @param {Object} param
			 */
			get_obj_before(param) {
				var form = "";
				// 获取缓存数据附加
				form = $.db.get("form");
				$.push(this.form ,form);
				/**
				* 请求列表前
				* @param {Object} param
				*/
				var user_group = this.user.user_group;
				if (user_group !== "管理员") {
					switch (user_group) {
						case "购买教师":
							if(param["buy_teachers"] > 0){
								param["buy_teachers"] = this.user.user_id;
							}
							break;
					}
				}
				if(this.form && form){
					Object.keys(this.form).forEach(key => {
						Object.keys(form).forEach(dbKey => {
							// if(dbKey === "charging_standard"){
							// 	this.form['charging_rules'] = form[dbKey];
							// 	this.disabledObj['charging_rules_isDisabled'] = true;
							// };
							if(key === dbKey){
								this.disabledObj[key+'_isDisabled'] = true;
							}
						})
					})
				}
        if (this.form["purchase_date"].indexOf("-")===-1){
          this.form["purchase_date"] = this.$toTime(parseInt(this.form["purchase_date"]),"yyyy-MM-dd")
        }
				$.db.del("form");
				return param;
			},

			/**
			 * 获取对象之后
			 * @param {Object} json
			 * @param {Object} func
			 */
			get_obj_after(json, func){
        if(this.form["purchase_date"]=="0000-00-00"){
          this.form["purchase_date"] = null;
        }
				if(parseInt(this.form["purchase_date"]) > 9999){
					this.form["purchase_date"] = this.$toTime(parseInt(this.form["purchase_date"]),"yyyy-MM-dd")
				}
			},

			is_view(){
				var bl = this.user_group == "管理员";

				if(!bl){
					bl = this.$check_action('/book_purchase/table','add');
					console.log(bl ? "你有表格添加权限视作有添加权限" : "你没有表格添加权限");
				}
				if(!bl){
					bl = this.$check_action('/book_purchase/table','set');
					console.log(bl ? "你有表格添加权限视作有修改权限" : "你没有表格修改权限");
				}
				if(!bl){
					bl = this.$check_action('/book_purchase/view','add');
					console.log(bl ? "你有视图添加权限视作有添加权限" : "你没有视图添加权限");
				}
				if(!bl){
					bl = this.$check_action('/book_purchase/view','set');
					console.log(bl ? "你有视图修改权限视作有修改权限" : "你没有视图修改权限");
				}
				if(!bl){
					bl = this.$check_action('/book_purchase/view','get');
					console.log(bl ? "你有视图查询权限视作有查询权限" : "你没有视图查询权限");
				}

				console.log(bl ? "具有当前页面的查看权，请注意这不代表你有字段的查看权" : "无权查看当前页，请注意即便有字段查询权限没有页面查询权限也不行");

				return bl;
			},
			/**
			 * 上传文件
			 * @param {Object} param
			 */
			uploadimg(param) {
				this.uploadFile(param.file, "avatar");
			},

		},
		created() {
			this.get_list_user_buy_teachers();
			this.get_group_user_buy_teachers();
		},
	}
</script>

<style>
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}

	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}
</style>
