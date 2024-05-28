<template>
	<div class="warp" id="user_password">
		<el-row class="card">
			<el-col :span="24">
				<h1 class="text-center">
					修改密码
				</h1>
			</el-col>
			<el-col :span="24">
				<el-form ref="form" :model="form" label-width="100px">

					<el-col :xs="24" :sm="24" :xl="8" class="el_form_item_warp">
						<el-form-item label="原密码">
							<el-input type="password" v-model="form.o_password" :minlength="0" :maxlength="16"
								placeholder="请输入原密码" />
						</el-form-item>
					</el-col>

					<el-col :xs="24" :sm="12" :xl="8" class="el_form_item_warp">
						<el-form-item label="新密码">
							<el-input type="password" v-model="form.password" :minlength="0" :maxlength="16"
								placeholder="请输入原密码" />
						</el-form-item>
					</el-col>

					<el-col :xs="24" :sm="12" :xl="8" class="el_form_item_warp">
						<el-form-item label="请确认密码">
							<el-input type="password" v-model="confirm_password" :minlength="0" :maxlength="16"
								placeholder="请输入确认新密码" />
						</el-form-item>
					</el-col>

					<el-col :xs="24" :sm="24" :xl="24" class="el_form_btn_warp">
						<el-col :xs="24" :sm="12" :lg="12" class="el_form_btn el_form_btn_1">
							<el-button style="width: 100%; float: left;" type="primary" @click="submit()">提交
							</el-button>
						</el-col>
						<el-col :xs="24" :sm="12" :lg="12" class="el_form_btn el_form_btn_2">
							<el-button style="width: 100%; float: right;" @click="cancel()">取消</el-button>
						</el-col>
					</el-col>
				</el-form>
			</el-col>
		</el-row>
	</div>
</template>


<script>
	import mixin from '@/mixins/page.js';

	export default {
		mixins: [mixin],
		components: {},
		data() {
			return {
				url_submit: "~/api/user/change_password?",
				field: "user_id",
				query: {},
				form: {
					"o_password": "",
					"password": '',
				},
				confirm_password: ''
			}
		},
		methods: {
			get_form() {
				var _this = this;
				this.$get(this.url_get_obj, null, function(res) {
					if (res.result && res.result.obj) {
						$.push(_this.form, res.result.obj);
					}
				});
			},
			submit_before(param){
				var p = Object.assign({},param);
				return p;
			},
			submit_check(param) {
				if (this.form.password !== this.confirm_password) {
					return "密码和确认密码不一致！"
				}
				return null;
			},
			submit_after(res, status) {
				this.$store.commit("quit");
				this.$router.push("/login");
			}
		},
		created() {
			this.form.username = this.user.username;
			this.get_form();
		}
	}
</script>

<style scoped="scoped">
	#user_password .card {
		padding: 2rem 1rem;
	}

	#user_password .text-center {
		text-align: center;
	}
</style>
