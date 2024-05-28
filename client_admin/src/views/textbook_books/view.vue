<template>
	<el-main class="bg edit_wrap">
		<el-form ref="form" :model="form" status-icon label-width="120px" v-if="is_view()">
			<el-col v-if="user_group === '管理员' || $check_field('get','textbook_name') || $check_field('add','textbook_name') || $check_field('set','textbook_name')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="教材名称" prop="textbook_name">
					<el-input id="textbook_name" v-model="form['textbook_name']" placeholder="请输入教材名称"
							  v-if="user_group === '管理员' || (form['textbook_books_id'] && $check_field('set','textbook_name')) || (!form['textbook_books_id'] && $check_field('add','textbook_name'))" :disabled="disabledObj['textbook_name_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','textbook_name')">{{form['textbook_name']}}</div>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','textbook_type') || $check_field('add','textbook_type') || $check_field('set','textbook_type')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="教材类型" prop="textbook_type">
					<el-input id="textbook_type" v-model="form['textbook_type']" placeholder="请输入教材类型"
							  v-if="user_group === '管理员' || (form['textbook_books_id'] && $check_field('set','textbook_type')) || (!form['textbook_books_id'] && $check_field('add','textbook_type'))" :disabled="disabledObj['textbook_type_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','textbook_type')">{{form['textbook_type']}}</div>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','textbook_subjects') || $check_field('add','textbook_subjects') || $check_field('set','textbook_subjects')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="教材科目" prop="textbook_subjects">
					<el-input id="textbook_subjects" v-model="form['textbook_subjects']" placeholder="请输入教材科目"
							  v-if="user_group === '管理员' || (form['textbook_books_id'] && $check_field('set','textbook_subjects')) || (!form['textbook_books_id'] && $check_field('add','textbook_subjects'))" :disabled="disabledObj['textbook_subjects_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','textbook_subjects')">{{form['textbook_subjects']}}</div>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','book_pictures') || $check_field('add','book_pictures') || $check_field('set','book_pictures')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="书籍图片" prop="book_pictures">
					<el-upload :disabled="disabledObj['book_pictures_isDisabled']" id="book_pictures" class="avatar-uploader" drag
						accept="image/gif, image/jpeg, image/png, image/jpg" action="" :http-request="upload_book_pictures"
						:show-file-list="false" v-if="user_group === '管理员' || (form['textbook_books_id'] && $check_field('set','book_pictures')) || (!form['textbook_books_id'] && $check_field('add','book_pictures'))">
						<img v-if="form['book_pictures']" :src="$fullUrl(form['book_pictures'])" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
					<el-image v-else-if="$check_field('get','book_pictures')" style="width: 100px; height: 100px"
						:src="$fullUrl(form['book_pictures'])" :preview-src-list="[$fullUrl(form['book_pictures'])]">
						<div slot="error" class="image-slot">
							<img src="../../../public/img/error.png" style="width: 90px; height: 90px" />
						</div>
					</el-image>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','book_author') || $check_field('add','book_author') || $check_field('set','book_author')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="书籍作者" prop="book_author">
					<el-input id="book_author" v-model="form['book_author']" placeholder="请输入书籍作者"
							  v-if="user_group === '管理员' || (form['textbook_books_id'] && $check_field('set','book_author')) || (!form['textbook_books_id'] && $check_field('add','book_author'))" :disabled="disabledObj['book_author_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','book_author')">{{form['book_author']}}</div>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','publication_date') || $check_field('add','publication_date') || $check_field('set','publication_date')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="出版日期" prop="publication_date">
					<el-date-picker :disabled="disabledObj['publication_date_isDisabled']" v-if="user_group === '管理员' || (form['textbook_books_id'] && $check_field('set','publication_date')) || (!form['textbook_books_id'] && $check_field('add','publication_date'))" id="publication_date"
						v-model="form['publication_date']" type="date" placeholder="选择日期">
					</el-date-picker>
					<div v-else-if="$check_field('get','publication_date')">{{form['publication_date']}}</div>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','publishing_unit') || $check_field('add','publishing_unit') || $check_field('set','publishing_unit')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="出版单位" prop="publishing_unit">
					<el-input id="publishing_unit" v-model="form['publishing_unit']" placeholder="请输入出版单位"
							  v-if="user_group === '管理员' || (form['textbook_books_id'] && $check_field('set','publishing_unit')) || (!form['textbook_books_id'] && $check_field('add','publishing_unit'))" :disabled="disabledObj['publishing_unit_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','publishing_unit')">{{form['publishing_unit']}}</div>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','book_price') || $check_field('add','book_price') || $check_field('set','book_price')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="书籍价格" prop="book_price">
					<el-input id="book_price" v-model="form['book_price']" placeholder="请输入书籍价格"
							  v-if="user_group === '管理员' || (form['textbook_books_id'] && $check_field('set','book_price')) || (!form['textbook_books_id'] && $check_field('add','book_price'))" :disabled="disabledObj['book_price_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','book_price')">{{form['book_price']}}</div>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','number_of_books') || $check_field('add','number_of_books') || $check_field('set','number_of_books')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="书籍数量" prop="number_of_books">
					<el-input id="number_of_books" v-model="form['number_of_books']" placeholder="请输入书籍数量"
							  v-if="user_group === '管理员' || (form['textbook_books_id'] && $check_field('set','number_of_books')) || (!form['textbook_books_id'] && $check_field('add','number_of_books'))" :disabled="disabledObj['number_of_books_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','number_of_books')">{{form['number_of_books']}}</div>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','issuer') || $check_field('add','issuer') || $check_field('set','issuer')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="发行人员" prop="issuer">
						<div v-if="user_group !== '管理员'">
							{{ get_user_session_issuer(form['issuer']) }}
							<!--<el-input id="business_name" v-model="form['issuer']" placeholder="请输入发行人员"-->
							<!--v-if="user_group === '管理员' || (form['textbook_books_id'] && $check_field('set','issuer')) || (!form['textbook_books_id'] && $check_field('add','issuer'))" :disabled="disabledObj['issuer_isDisabled']"></el-input>-->
							<!--<div v-else-if="$check_field('get','issuer')">{{form['issuer']}}</div>-->
							<el-select v-if="user_group === '管理员' || (form['textbook_books_id'] && $check_field('set','issuer')) || (!form['textbook_books_id'] && $check_field('add','issuer'))" id="issuer" v-model="form['issuer']" :disabled="disabledObj['issuer_isDisabled']">
								<el-option v-for="o in list_user_issuer" :key="o['username']" :label="o['nickname'] + '-' + o['username']"
										   :value="o['user_id']">
								</el-option>
							</el-select>
							<el-select v-else-if="$check_field('get','issuer')" id="issuer" v-model="form['issuer']" :disabled="true">
								<el-option v-for="o in list_user_issuer" :key="o['username']" :label="o['nickname'] + '-' + o['username']"
										   :value="o['user_id']">
								</el-option>
							</el-select>
						</div>
						<el-select v-else id="issuer" v-model="form['issuer']" :disabled="disabledObj['issuer_isDisabled']">
							<el-option v-for="o in list_user_issuer" :key="o['username']" :label="o['nickname'] + '-' + o['username']"
									   :value="o['user_id']">
							</el-option>
						</el-select>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','book_introduction') || $check_field('add','book_introduction') || $check_field('set','book_introduction')" :xs="24" :sm="24" :lg="24" class="el_form_editor_warp">
				<el-form-item label="书籍简介" prop="book_introduction">
					<quill-editor v-model.number="form['book_introduction']"
						v-if="user_group === '管理员' || (form['textbook_books_id'] && $check_field('set','book_introduction')) || (!form['textbook_books_id'] && $check_field('add','book_introduction')) ">
					</quill-editor>
					<div v-else-if="$check_field('get','book_introduction')" v-html="form['book_introduction']"></div>
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
				field: "textbook_books_id",
				url_add: "~/api/textbook_books/add?",
				url_set: "~/api/textbook_books/set?",
				url_get_obj: "~/api/textbook_books/get_obj?",
				url_upload: "~/api/textbook_books/upload?",

				query: {
					"textbook_books_id": 0,
				},

				form: {
					"textbook_name":'', // 教材名称
					"textbook_type":'', // 教材类型
					"textbook_subjects":'', // 教材科目
					"book_pictures":'', // 书籍图片
					"book_author":'', // 书籍作者
					"publication_date":'', // 出版日期
					"publishing_unit":'', // 出版单位
					"book_price":'', // 书籍价格
					"number_of_books":'', // 书籍数量
					"issuer": 0, // 发行人员
					"book_introduction":'', // 书籍简介
					"textbook_books_id": 0, // ID

				},
				disabledObj:{
					"textbook_name_isDisabled": false,
					"textbook_type_isDisabled": false,
					"textbook_subjects_isDisabled": false,
					"book_pictures_isDisabled": false,
					"book_author_isDisabled": false,
					"publication_date_isDisabled": false,
					"publishing_unit_isDisabled": false,
					"book_price_isDisabled": false,
					"number_of_books_isDisabled": false,
					"issuer_isDisabled": false,
					"book_introduction_isDisabled": false,
				},
				// 用户列表
				list_user_issuer: [],
				// 用户组
				group_user_issuer: "",
			}
		},
		methods: {
			/**
			 * 上传书籍图片
			 * @param {Object} param图片参数
			 */
			upload_book_pictures(param){
				this.uploadFile(param.file, "book_pictures");
			},
			/**
			 * 获取发行人员用户列表
			 */
			async get_list_user_issuer() {
                // if(this.user_group !== "管理员" && this.form["issuer"] === 0) {
                //     this.form["issuer"] = this.user.user_id;
                // }
                var json = await this.$get("~/api/user/get_list?user_group=发行人员");
                if(json.result && json.result.list){
                    this.list_user_issuer = json.result.list;
                }
                else if(json.error){
                    console.error(json.error);
                }
			},
			/**
			 * 获取发行人员用户组
			 */
			async get_group_user_issuer() {
				this.form["issuer"] = this.user.user_id;
				var json = await this.$get("~/api/user_group/get_obj?name=发行人员");
				if(json.result && json.result.obj){
					this.group_user_issuer = json.result.obj;
				}
				else if(json.error){
					console.error(json.error);
				}
			},
			get_user_session_issuer(id){
				var _this = this;
				var user_id = {"user_id":id}
				var url = "~/api/"+_this.group_user_issuer.source_table+"/get_obj?"
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
                    if (arr[i] !== "issuer") {
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
			get_user_issuer(id){
				var obj = this.list_user_issuer.getObj({"user_id":id});
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

			/**
			 * 获取对象之前
			 * @param {Object} param
			 */
			get_obj_before(param) {
				var form = "";
				/**
				* 请求列表前
				* @param {Object} param
				*/
				var user_group = this.user.user_group;
				if (user_group !== "管理员") {
					switch (user_group) {
						case "发行人员":
							if(param["issuer"] > 0){
								param["issuer"] = this.user.user_id;
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
        if (this.form["publication_date"].indexOf("-")===-1){
          this.form["publication_date"] = this.$toTime(parseInt(this.form["publication_date"]),"yyyy-MM-dd")
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
        if(this.form["publication_date"]=="0000-00-00"){
          this.form["publication_date"] = null;
        }
				if(parseInt(this.form["publication_date"]) > 9999){
					this.form["publication_date"] = this.$toTime(parseInt(this.form["publication_date"]),"yyyy-MM-dd")
				}
			},

			is_view(){
				var bl = this.user_group == "管理员";

				if(!bl){
					bl = this.$check_action('/textbook_books/table','add');
					console.log(bl ? "你有表格添加权限视作有添加权限" : "你没有表格添加权限");
				}
				if(!bl){
					bl = this.$check_action('/textbook_books/table','set');
					console.log(bl ? "你有表格添加权限视作有修改权限" : "你没有表格修改权限");
				}
				if(!bl){
					bl = this.$check_action('/textbook_books/view','add');
					console.log(bl ? "你有视图添加权限视作有添加权限" : "你没有视图添加权限");
				}
				if(!bl){
					bl = this.$check_action('/textbook_books/view','set');
					console.log(bl ? "你有视图修改权限视作有修改权限" : "你没有视图修改权限");
				}
				if(!bl){
					bl = this.$check_action('/textbook_books/view','get');
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
			this.get_list_user_issuer();
			this.get_group_user_issuer();
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
