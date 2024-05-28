<template>
	<div class="page_account" id="account_login">
		<div class="warp">
			<div class="container">
				<div class="row">
					<div class="col-12 col-md-6">
						<div class="card">
							<!-- 忘记密码 -->
							<div class="forget_container">
								<b-form>
									<b-form-group id="input-group-1" label="用户名:" label-for="input-1"
										:state="validation_username" invalid-feedback="账户名长度为在5-16个字符"
										valid-feedback="校验通过">
										<b-form-input id="input-1" v-model="form.username" type="text" placeholder="用户名"
											trim></b-form-input>
									</b-form-group>

									<b-form-group id="input-group-2" label="密码:" label-for="input-2"
										:state="validation_password" invalid-feedback="密码长度为在5-16个字符"
										valid-feedback="校验通过">
										<b-form-input id="input-2" v-model="form.password" type="password"
											placeholder="密码" trim></b-form-input>
									</b-form-group>

									<b-form-group id="input-group-2" label="确认密码:" label-for="input-2"
										:state="validation_confirm_password" invalid-feedback="两次密码不一致"
										valid-feedback="校验通过">
										<b-form-input id="input-2" v-model="confirm_password" type="password"
											placeholder="密码" trim></b-form-input>
									</b-form-group>
									<b-form-group id="input-group-2" label="邮箱:" label-for="input-2"
										:state="validation_email" invalid-feedback="邮箱格式example@123.com"
										valid-feedback="">
										<b-form-input id="input-2" v-model="form.email" type="email" placeholder="邮箱"
											trim></b-form-input>
									</b-form-group>

									<b-form-group id="input-group-2" label="验证码:" label-for="input-2"
										:state="validation_code" invalid-feedback="验证码错误">
										<b-input-group>
											<b-form-input id="input-2" v-model="form.code" type="text" placeholder="验证码"
												trim>
											</b-form-input>
											<b-input-group-append>
												<b-button @click="get_code()" variant="success" :style="{ paddingTop: '2px !important' }">
													发送验证码</b-button>
											</b-input-group-append>
										</b-input-group>
									</b-form-group>
									<div class="btns_bottom">
										<div class="btn_item" @click="forgot()">找回密码</div>
									</div>
								</b-form>
							</div>
						</div>
					</div>
					<div class="col-12 col-md-6">
						<div class="card">
							<!-- 创建一个账户 -->
							<div class="more_nav">
								<div style="text-align: center; margin-bottom: 20px">
									没有账户?
								</div>
								<div class="btn_item" @click="$router.push('/account/register')">
									创建一个账户
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>


<script>
	export default {
		data() {
			return {
				form: {
					username: "",
					password: "",
					email: "",
					code: "",
				},
				confirm_password: "",
			};
		},
		onLoad() {},
		onReady() {},
		methods: {
			get_code(){
				var random = Math.floor(Math.random()*9999);
				for(var i = random.length;i < 4;i++){
					random = "0" + random;
				}
				this.form.code = random.toString();
			},
			
			/**
			 * 忘记密码
			 */
			forgot() {
				var condition =
					this.validation_username &&
					this.validation_password &&
					this.validation_confirm_password &&
					this.validation_email &&
					this.validation_code;
				if (!condition) {
					alert("输入不合法");
					return;
				}
				var form = Object.assign({},this.form);
				this.$post("~/api/user/forget_password?", form, (res) => {
					if (res.result) {
						this.$router.push("/account/login");
					} else if (res.error) {
						console.log(res.error);
						alert(res.error.message);
					}
				});
			},

			/**
			 * 手动重置表单
			 */
			resetForm() {
				this.$refs.form.resetFields();
			},
		},
		computed: {
			/**
			 * 验证用户名
			 * @return {Boolean}
			 */
			validation_username() {
				var length = this.form.username.length;
				if (!length) {
					return null;
				}
				return length > 4 && length < 17;
			},

			/**
			 * 验证密码
			 * @return {Boolean}
			 */
			validation_password() {
				var length = this.form.password.length;
				if (!length) {
					return null;
				}
				return length > 4 && length < 17;
			},

			/**
			 * 再次验证密码
			 * @return {Boolean}
			 */
			validation_confirm_password() {
				var length = this.confirm_password.length;
				if (!length) {
					return null;
				}
				return this.confirm_password === this.form.password;
			},

			/**
			 * 验证邮箱
			 * @return {Boolean}
			 */
			validation_email() {
				var length = this.form.email.length;
				if (!length) {
					return true;
				}
				return length > 4 && length < 17;
			},

			/**
			 * 验证验证码
			 * @return {Boolean}
			 */
			validation_code() {
				var length = this.form.code.length;
				if (!length) {
					return null;
				}
				return length === 4;
			},
		},
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

	.forget_container {
		padding: 1rem;
	}

	.more_nav {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		padding: 1rem;
		margin: auto 0;
	}

	.more_nav .btns_bottom {
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
		margin-top: 20px;
		cursor: pointer;
	}
</style>
