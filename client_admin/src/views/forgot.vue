<template>
	<article class="sign_in forgot_wrap">
		<div class="warp">
			<el-row>
				<el-col>
					<el-form :model="form" ref="form" label-width="80px" class="form">
						<h1>忘记密码</h1>
						
						<el-form-item label="用户名" prop="username">
							<el-input v-model="form.username" placeholder="用户名"></el-input>
						</el-form-item>
						
						<el-form-item label="找回方式" prop="mode">
							<el-select v-model="mode">
								<el-option :key="1" :value="'手机号'" :label="'手机号'"></el-option>
								<el-option :key="2" :value="'邮箱'" :label="'邮箱'"></el-option>
							</el-select>
						</el-form-item>
						
						<el-form-item v-show="mode === '手机号'" label="手机号" prop="phone">
							<el-input v-model="form.phone" placeholder="手机">
							</el-input>
						</el-form-item>
						
						<el-form-item v-show="mode === '邮箱'" label="邮箱" prop="email">
							<el-input v-model="form.email" placeholder="邮箱">
							</el-input>
						</el-form-item>
						
						<el-form-item v-show="mode !== ''" label="验证码" prop="code">
							<el-input v-model="form.code" placeholder="验证码">
								<el-button @click="send()" slot="append">发送验证码</el-button>
							</el-input>
						</el-form-item>
						
						<el-form-item label="新密码" prop="password">
							<el-input v-model="form.password" placeholder="新密码" show-password>
							</el-input>
						</el-form-item>
						
						<el-form-item label="确认密码" prop="confirm_password">
							<el-input v-model="confirm_password" placeholder="确认密码" show-password>
							</el-input>
						</el-form-item>
						
						<div class="btns">
							<el-button type="primary" @click="submit()">提交</el-button>
						</div>
						
						<div class="btns">
							<router-link to="./login">取消</router-link>
						</div>
					</el-form>
				</el-col>
			</el-row>
		</div>
	</article>
</template>

<script>
	import mixin from "@/mixins/page.js";
	export default {
		mixins: [mixin],
		data: function() {
			return {
				url_submit:"~/api/user/forget_password?",
				mode: "",
				
				confirm_password: "",
				
				oauth: {
					signIn: false
				},
				
				form: {
					username: "",
					phone: "",
					email: "",
					password: "",
					code: ""
				}
			}
		},
		methods: {
			send(){
				var random = Math.floor(Math.random()*9999);
				for(var i = random.length;i < 4;i++){
					random = "0" + random;
				}
				this.form.code = random.toString();
			},
			
			/**
			 *  提交前校验
			 *  @param {Object} param
			 */
			submit_check(param){
				var msg = "";
				
				var email_regular = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
				var phone_regular = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
				
				var {username ,phone ,email ,password ,code} = param;
				
				if(!username){
					msg = "用户名不能为空!";
				}
				else if(phone && !phone_regular.test(phone) ){
					msg = "手机号格式不正确 例：18988886666";
				}
				else if(email && !email_regular.test(email) ){
					msg = "邮箱格式不正确 例：test@test.com";
				}
				else if(password !== this.confirm_password){
					msg = "密码和确认密码不一致。";
				}
				else if(!code){
					msg = "验证码不能为空！";
				}
				
				console.log("验证结果：" ,msg);
				
				return msg;
			},
			
			submit_before(param){
				var p = Object.assign({} ,param);
				console.log("提交前信息：" ,p);
				
				return p;
			}
		},
		created() {
			
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
		margin-top: 15rem;
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
