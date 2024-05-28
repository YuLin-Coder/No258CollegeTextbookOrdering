<template>
	<div class="page_account" id="account_login">
		<div class="warp">
			<div class="container">
				<div class="row">
					<div class="col-12 col-md-6">
						<div class="card">
							<!-- 登录 -->
							<div class="form_login">
								<b-form>
									<b-form-group id="input-group-1" label="username:" label-for="input-1"
										:state="validation_username" invalid-feedback="账户名长度为在5-16个字符"
										valid-feedback="校验通过">
										<b-form-input id="input-1" v-model="form.username" type="text" placeholder="用户名"
											trim></b-form-input>
									</b-form-group>

									<b-form-group id="input-group-2" label="password:" label-for="input-2"
										:state="validation_password" invalid-feedback="密码长度为在5-16个字符"
										valid-feedback="校验通过">
										<b-form-input id="input-2" v-model="form.password" type="password"
											placeholder="密码" trim autocomplete="off"></b-form-input>
									</b-form-group>
									<div class="btns_bottom">
										<div class="btn_item" @click="submit()">登录</div>
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
	import mixin from "@/mixins/page.js";

	export default {
		mixins: [mixin],
		data() {
			return {
				form: {
					username: "",
					password: "",
				},
			};
		},
		methods: {
		
			/**
			 * 提交
			 */
			submit() {
				var _this = this;
				// var condition = this.validation_username && this.validation_password;
				// if (!condition) {
				// 	return this.$message.warning("输入不合法");
				// }
				// 极验开始
				if(!this.validation_username){
					return this.$message.warning("请输入正确账号")
				}else if(!this.validation_password){
					return this.$message.warning("请输入正确密码")
				}
			
				// 极验结束
				var form = Object.assign({}, this.form);
				this.$post("~/api/user/login?", form, (res) => {
					if (res.result && res.result.obj) {
						var obj = res.result.obj;

						$.db.set("token", obj.token);
						_this.$store.commit("user_set", obj);

						this.$get_auth(obj.user_group, () => {
							this.$router.push("/");
						});
						this.$message.success("登录成功！");
					} else if (res.error) {
						console.log(res.error);
					this.$message.error(res.error.message);
					}
				});
			},
		},
		computed: {
			/**
			 * 验证用户名
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
			 */
			validation_password() {
				var length = this.form.password.length;
				if (!length) {
					return null;
				}
				return length > 4 && length < 17;
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

	.form_login {
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
		margin-top: 5px;
		cursor: pointer;
	}

</style>
