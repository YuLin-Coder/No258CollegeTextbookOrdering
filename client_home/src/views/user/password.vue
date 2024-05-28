<template>
	<div class="page_user" id="user_password">
		<div class="warp">
			<div class="container">
				<div class="row justify-content-between">
					<div class="col-12 col-md-3">
						<div class="card_menu">
							<!-- 左侧边栏 -->
							<list_menu_user :list_info="list_info"></list_menu_user>
						</div>
					</div>
					<div class="col-12 col-md-9">
						<div class="card_password pl-2">
							<div>密码修改</div>
							<!-- 密码修改 -->
							<b-form>
								<b-form-group id="input-group-2" label="输入原始密码:" label-for="input-2"
									:state="validation_o_password" invalid-feedback="密码长度为在5-16个字符"
									valid-feedback="校验通过">
									<b-form-input id="input-2" v-model="form.o_password" type="password"
										placeholder="原始密码" trim></b-form-input>
								</b-form-group>
								<b-form-group id="input-group-2" label="设置新密码:" label-for="input-2"
									:state="validation_password" invalid-feedback="密码长度为在5-16个字符" valid-feedback="校验通过">
									<b-form-input id="input-2" v-model="form.password" type="password"
										placeholder="设置新密码" trim></b-form-input>
								</b-form-group>
								<b-form-group id="input-group-2" label="确认密码:" label-for="input-2"
									:state="validation_confirm_password" invalid-feedback="密码不一致" valid-feedback="">
									<b-form-input id="input-2" v-model="confirm_password" type="password"
										placeholder="确认密码" trim></b-form-input>
								</b-form-group>
							</b-form>
							<div class="password_confim">
								<div class="btn_item" @click="change_password()">确认修改</div>
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
	import list_menu_user from "@/components/diy/list_menu_user.vue";

	export default {
		mixins: [mixin],

		data() {
			return {
				form: {
					o_password: "",
					password: "",
				},

				confirm_password: "",

				list_info: [{
						title: "个人资料",
						url: "/user/info",
						icon: "house-fill",
						selected: false,
					},
					{
						title: "密码修改",
						url: "/user/password",
						icon: "person-fill",
						selected: true,
					},
					{
						title: "收藏",
						url: "/user/collect",
						icon: "heart-fill",
						selected: false,
					},
				],
			};
		},
		computed: {
			/**
			 * 验证原始密码
			 */
			validation_o_password() {
				var length = this.form.password.length;
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
			/**
			 * 再次验证密码
			 */
			validation_confirm_password() {
				return this.confirm_password === this.form.password;
			},
		},
		methods: {
			/**
			 * 修改密码
			 */
			change_password() {
				var form = Object.assign({},this.form);

				if(this.form.password === this.confirm_password && this.form.o_password){
					this.$post("~/api/user/change_password?", form, (res) => {
						if (res.result) {
							//弹出更改成功，3秒后调到主页，退出账户
							this.$store.commit("sign_out");
							this.$router.push("/account/login")
						} else if (res.error) {
							console.log(res.error);
							alert(res.error.message);
						}
					});
				}
			},
		},
		components: {
			list_menu_user,
		},
		mounted() {
			// console.log(this.user);
		},
	};
</script>

<style scoped>
	.container {
		min-height: 800px;
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

	.card_password {
		padding: 10px;
		width: 500px;
		margin: auto;
	}
</style>
