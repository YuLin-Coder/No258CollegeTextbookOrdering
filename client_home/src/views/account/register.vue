<template>
	<div class="page_account" id="account_register">
		<div class="warp">
			<div class="container">
				<div class="row">
					<div class="col-12 col-md-6">
						<div class="card">
							<!-- 注册账户 -->
							<div class="form_register">
								<b-form>
									<b-form-group id="input-group-1" label="账号:" label-for="input-1">
										<b-form-input id="input-1" v-model="form.username" type="text" placeholder="账号"
											trim></b-form-input>
									</b-form-group>
									
									<b-form-group id="input-group-2" label="设置密码:" label-for="input-2">
										<b-form-input id="input-2" v-model="form.password" type="password"
											placeholder="5个字符到16个字符" trim></b-form-input>
									</b-form-group>

									<b-form-group id="input-group-3" label="确认密码:" label-for="input-3">
										<b-form-input id="input-3" v-model="confirm_password" type="password"
											placeholder="确认密码" trim></b-form-input>
									</b-form-group>
									
									<b-form-group id="input-group-4" label="昵称:" label-for="input-4">
										<b-form-input id="input-4" v-model="form.nickname" type="text" placeholder="2个字符到12个字符"
											trim></b-form-input>
									</b-form-group>
									
									<b-form-group id="input-group-5" label="邮箱:" label-for="input-5">
										<b-form-input id="input-5" v-model="form.email" type="email"
											placeholder="例: example@123.com" trim></b-form-input>
									</b-form-group>
									
									<b-form-group id="input-group-6" label="手机号:" label-for="input-6">
										<b-form-input id="input-6" v-model="form.phone" type="text"
											placeholder="例: 18955552312" trim></b-form-input>
									</b-form-group>
									
									<!-- 身份选择 -->
									<b-form-group id="input-group-7" label="身份:" label-for="input-7">
										<b-form-select id="user_group" v-model="form.user_group"
											:options="list_user_group" placeholder="请选择身份"></b-form-select>
									</b-form-group>
									<!--教师用户-->
									<form_teacher_user v-if="form.user_group === '教师用户'" :form="form_sub"></form_teacher_user>

									<div class="btns_bottom">
										<div class="btn_item" @click="submit()">注册</div>
										<div class="forgot_nav" @click="$router.push('/account/forgot')">
											忘记密码
										</div>
									</div>
								</b-form>
							</div>
						</div>
					</div>
					<div class="col-12 col-md-6">
						<div class="card">
							<!-- 跳转登录 -->
							<div class="register_nav identify_choose">
								<div style="text-align: center; margin-bottom: 20px">
									已有账户?
								</div>
								<div class="btn_item" @click="$router.push('/account/login')">登录</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>


<script>
	import mixin from "@/mixins/page.js";
	/* 教师用户 */
	import form_teacher_user from "@/components/diy/form_teacher_user";

	export default {
		components: {
			/* 教师用户 */
			form_teacher_user,
		},
		
		mixins: [mixin],
		
		data() {
			return {
				url_submit: "~/api/user/register?",

				form: {
					username: "",
					password: "",
					nickname: "",
					email: "",
					phone: "",
					user_group: ""
				},

				confirm_password: "",

				form_sub: {},

				list_user_group: [
					{
						value: "买家",
						text: "买家"
					},
					{
						value: "商家",
						text: "商家"
					}
				],

				user_group: [],

			};
		},
		methods: {
			
			/**
			 *  获取用户组
			 */
			get_list_user_group() {
				this.$get("~/api/user_group/get_list?register_max=3&register_min=2", {}, (res) => {
					if (res.result.list) {
						var lt = [];
						var list = res.result.list;
						list.map((x) => {
							lt.push({
								"value": x.name,
								"text": x.name
							})
						});
						this.list_user_group = lt;
						this.user_group = list;
					} else if (res.error) {
						console.error(res.error);
						alert(res.error.message);
					}
				})
			},
			
			/**
			 * 提交事件
			 * @param {Object} param 表单
			 * @param {Object} func 返回函数
			 */
			async submit(param, func) {
			    // console.log('提交事件', param);
			    if (!param) {
			        param = this.form;
			    }
			    // 提交前事件
			    var pm = this.events("submit_before", Object.assign({}, param)) || param;
			    // 提交前验证事件
			    var msg = await this.events("submit_check", pm);
			    var ret;
				
				console.log("提交前错误信息msg：" ,msg);
			    // 判断错误
			    if (msg) {
			        this.$toast(msg, 'danger');
			    } else {
			        // 提交表单
			        ret = this.events("submit_main", pm, func);
			    }
			    // 返回结果
			    return ret;
			},
			
			/**
			 * 提交前事件
			 * @param {Object} param
			 */
			submit_before(param){
				var user_group = param.user_group;
				if(user_group === "教师用户"){
				}
			},
			
			/**
			 * 提交前校验
			 * @param {Object} param
			 */
			async submit_check(param){
				var ret = null;
				
				var email_regular = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
				var phone_regular = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
				
				var {username ,password ,nickname ,user_group ,email ,phone} = param;
				
				var confirm_password = this.confirm_password;
				
				console.log("表单校验username ,password ,email ,nickname ,user_group" ,username ,password ,email ,nickname ,user_group);
				
				if(!username){
					ret = "账号不能为空";
				}
				else if(username.length > 16 || username.length < 5){
					ret = "账号长度应为5到16个字符之间！";
				}
				else if(!password){
					ret = "密码不能为空!";
				}
				else if(password.length > 16 || password.length < 5){
					ret = "密码长度应为5到16个字符之间！";
				}
				else if(nickname && nickname.length > 12 || nickname.length < 2){
					ret = "昵称长度应为2个字符到12个字符之间";
				}
				else if(email && !email_regular.test(email)){
					ret = "请输入正确的邮箱地址 例：test@test.com!";
				}
				else if(phone && !phone_regular.test(phone)){
					ret = "请输入正确的手机号码 例：18955552312!";
				}
				else if(password != confirm_password){
					ret = "确认密码与密码不一致！";
				}
				else if(!user_group){
					ret = "请选择用户组!";
				}
				
				if(!ret && user_group){
					if(user_group === "教师用户"){
						var form_sub = Object.assign({} ,this.form_sub);
					}
				}
				
				var p = {"username": param.username};
				
				if(!ret){
					var res = await this.$get("~/api/user/count?" ,p);
					
					if (res.result) {
						ret = "用户已存在!";
					}
				}
				
				return ret;
			},
			
			/**
			 *  注册后事件
			 */
			submit_after(json, func) {
				var form = Object.assign({}, this.form);
				delete form.password;
				console.log("查询表单form",form)
				var table = this.user_group.getVal("source_table",{"name": form.user_group});
				console.log("关联表:" ,table);
				if(table){
					this.get_submit(form ,table);
				}else{
					console.log("用户组没有关联表");
				}
			},

			/**
			 *  获取提交信息
			 */
			get_submit(form ,table) {
				var form_sub = this.form_sub;
				this.$get("~/api/user/get_obj?", form, (res) => {
					console.log("注册表信息res",res);
					if (res.result && res.result.obj) {
						form_sub.user_id = res.result.obj.user_id;
						this.submit_sub(form_sub, table);
					} else if (res.error) {
						console.error(res.error);
						alert(res.error.message);
					}
				});
			},

			/**
			 *  提交附加信息
			 */
			submit_sub(form ,table) {
				this.$post("~/api/" + table +"/add?", form, (res) => {
					console.log("提交结果res：" ,res);
					if(res.result){
						this.$toast("注册成功!");
						this.$router.push("/");
					}
					else if(res.error){
						console.error(res.error);
						this.$toast(res.error.message);
					}
				})
			}

		},
		created() {
			this.get_list_user_group();
		}
	};
</script>

<style scoped>
	.page_account {
		min-height: 800px;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.flex_cc {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.form_register {
		padding: 1rem;
	}

	.register_nav {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		padding: 1rem;
		margin: auto 0;
	}

	.register_nav .btns_bottom {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.btn_item {
		cursor: pointer;
		width: 100%;
		background-color: var(--color_primary);
		color: #fff;
		text-align: center;
		height: 48px;
		line-height: 48px;
	}

	.forgot_nav {
		text-align: left;
		font-size: 10px;
		margin-top: 5px;
		cursor: pointer;
	}
</style>
