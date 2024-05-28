<template>
	<article class="sign_in register_wrap">
		<div class="warp">
			<el-row>
				<el-col>
					<el-form :model="form" ref="form" label-width="80px" class="form">
						<h1>注册</h1>

						<el-form-item label="账号" prop="username">
							<el-input type="text" v-model="form.username" placeholder="账号">
							</el-input>
						</el-form-item>

						<el-form-item label="密码" prop="password">
							<el-input type="password" v-model="form.password" placeholder="5 到 16 个字符"
								autocomplete="off">
							</el-input>
						</el-form-item>

						<el-form-item label="确认密码" prop="confirm_password">
							<el-input type="password" v-model="confirm_password" placeholder="5 到 16 个字符"
								autocomplete="off">
							</el-input>
						</el-form-item>

						<el-form-item label="昵称" prop="nickname">
							<el-input type="text" v-model="form.nickname" placeholder="昵称">
							</el-input>
						</el-form-item>

						<el-form-item label="邮箱" prop="email">
							<el-input type="email" v-model="form.email" placeholder="例：test@test.com!">
							</el-input>
						</el-form-item>

						<el-form-item label="手机号" prop="phone">
							<el-input type="phone" v-model="form.phone" placeholder="例: 18955552312">
							</el-input>
						</el-form-item>

						<el-form-item label="身份" prop="user_group">
							<el-select v-model="form.user_group" placeholder="身份">
								<el-option v-for="(o,i) in list_user_group" :key="i" :value="o" :label="o"></el-option>
							</el-select>
						</el-form-item>
						<!-- 发行人员 -->
						<form_issuer v-if="form.user_group === '发行人员'" :form="form_sub" ></form_issuer>
						<!-- 采购人员 -->
						<form_purchasing_personnel v-if="form.user_group === '采购人员'" :form="form_sub" ></form_purchasing_personnel>

						<el-button type="primary" @click="submit()" >注册</el-button>
						<router-link class="el-button el-button--primary" to="./login" >返回</router-link>

					</el-form>
				</el-col>
			</el-row>
		</div>
	</article>
</template>

<script>
	import mixin from "@/mixins/page.js";
	/* 发行人员 */
	import form_issuer from "@/components/diy/form_issuer";
	/* 采购人员 */
	import form_purchasing_personnel from "@/components/diy/form_purchasing_personnel";

	export default {
		mixins: [mixin],
		data: function() {
			return {
				oauth: {
					signIn: false
				},

				url_submit: "~/api/user/register?",

				web: this.$store.state.web,

				form: {
					username: "",
					password: "",
					nickname: "",
					email: "",
					phone: "",
					user_group: ""
				},

				form_sub: {},

				confirm_password: "",

				list_user_group: [],
				user_group: []
			}
		},
		methods: {

			/**
			 * 获取用户组
			 */
			async get_user_group() {
				var res = await this.$get("~/api/user_group/get_list?register_min=1&register_max=2");
				if(res.result && res.result.list){
					var list = [""];
					var lt = res.result.list;
					lt.map(o=>{
						list.push(o.name);
					});
					this.list_user_group = list;
					this.user_group = lt;
					console.log("list_user_group" ,list ,"user_group" ,lt);
				}else if(res.error){
					console.error(res.error);
					this.$toast(res.error.message ,"error");
				}
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
				if(user_group === "发行人员"){
				}
				if(user_group === "采购人员"){
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
					if(user_group === "发行人员"){
						var form_sub = Object.assign({} ,this.form_sub);
					}
					if(user_group === "采购人员"){
						var form_sub = Object.assign({} ,this.form_sub);
					}
				}

				var p = {"username": param.username};

				var res = await this.$get("~/api/user/count?" ,p);

				if (res.result) {
					ret = "用户已存在!";
				}

				return ret;
			},

			// 提交成功后
			submit_after(json ,func){
				var form = Object.assign({} ,this.form);
				delete form.password;
				console.log("查询表单form",form)
				var table = this.user_group.getVal("source_table",{"name": form.user_group});
				console.log("关联表:" ,table);
				if(table){
					this.get_register(form ,table);
				}else{
					console.log("用户组没有关联表");
				}
			},

			/**
			 * 获取注册表信息
			 * @param {Object} form
			 * @param {Object} table
			 */
			get_register(form ,table){
				var form_sub = this.form_sub;
				this.$get("~/api/user/get_obj?",form,(res)=>{
					console.log("注册表信息res",res);
					if(res.result && res.result.obj){
						form_sub.user_id = res.result.obj.user_id;
						this.submit_sub(form_sub,table);
					}else if(res.error){
						console.error(res.error);
						this.$toast(res.error.message ,"error");
					}
				})
			},


			// 提交附加信息
			submit_sub(form_sub ,table){
				// 循环参数
				for(var key in form_sub){
					// 错误回调
					try{
						var value = form_sub[key];
						// 值判断与值校验
						console.log("键 ,值 ,类型" ,key ,value ,value instanceof Date);
						if(value && value instanceof Date){
							form_sub[key] = this.$toTime(value ,"yyyy-MM-dd hh:mm:ss");
						}
					}
					catch(err){
						console.log(key ,"转日期错误：" ,err ,"收到请无视!");
					}
				}
				// 提交事件
				this.$post("~/api/" + table + "/add?", form_sub, (res)=>{
					console.log("提交结果res：" ,res)
					if(res.result){
						this.$toast("注册成功!" ,"info");
						this.$store.commit("quit");
						this.$router.push("/login");
					} else if(res.error){
						console.error(res.error);
						this.$toast(res.error.message,"error");
					}
				});
			}
		},
		created() {
			this.get_user_group();
		},
		components:{
			/* 发行人员 */
			form_issuer,
			/* 采购人员 */
			form_purchasing_personnel,
		}
	}
</script>

<style>
	.sign_in {
		box-sizing: border-box;
		height: 100vh;
		padding: .5rem;
		width: 100%;
		background: url(/img/bg.jpg) no-repeat;
		background-size: 100% 100%;
		color: #fff;
	}

	.sign_in h1,
	.sign_in .btns {
		text-align: center;
	}

	.sign_in .btns .el-button {
		width: 40%;
	}

	.sign_in .el-form-item__label {
		color: #fff;
	}

	.sign_in .form {
		box-sizing: border-box;
		padding: 1rem 3rem;
		margin: auto;
		margin-top: 13rem;
		width: 100%;
		max-width: 25rem;
		box-shadow: 0 0 0 1px hsla(240, 0%, 100%, .3) inset,
			0 .5em 1em rgba(50, 50, 50, 0.6);
		text-shadow: 0 1px 1px hsla(240, 0%, 100%, .5);
		overflow: hidden;
		/* background-color: rgba(255, 255, 255, .5); */
		border-radius: 0.5rem;
	}

	.sign_in .form:after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(255, 255, 255, 0.8);
		z-index: -1;

		background-image: url(/img/bg.jpg);
		background-position: center top;
		background-size: cover;
		background-attachment: fixed;
		-webkit-filter: blur(20px);
		-moz-filter: blur(20px);
		-ms-filter: blur(20px);
		-o-filter: blur(20px);
		filter: blur(20px);
	}
</style>
