<template>
	<div class="page_user" id="user_info">
		<div class="warp">
			<div class="container">
				<div class="row">
					<div class="col-12 col-md-3">
						<div class="card_menu">
							<!-- 左侧边栏 -->
							<list_menu_user :list_info="list_info"></list_menu_user>
						</div>
					</div>

					<div class="col-12 col-md-9">
						<div class="card_info pl-2">
							<!-- 个人资料 -->
							<div class="div_info">
								<span> 个人资料 </span>
								<div class="content_msg">
									<div class="left_msg">
										<div class="figure_avatar">
											<span>头像：</span>
											<b-img class="user_avator"
												:src="obj.avatar ? $fullUrl(obj.avatar) : '/img/default.png'" alt=""
												style="width: 3rem; height: 3rem" />
										</div>
										<div class="nickname">
											<div>
												<span>昵称：</span>
											</div>
											<div :style="'display:' + display_name + ';'">
												<span style="font-size: 1.2rem; color: var(--color_grey)">
													{{ obj.nickname }}
												</span>
											</div>
											<div class="input_nickname" :style="'display:' + display_input + ';'">
												<input type="text" id="nickname" v-model="form.nickname"
													:focus="focus_input" />
												<div class="btn_save" @click="save_nickname()">
													保存
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="right_msg">
									<div class="change_avatar_box">
										<div class="change_avatar">
											<span>修改头像</span>
										</div>
										<div class="right_wrap">
											<b-icon icon="arrow-right-square"></b-icon>
										</div>
										<input type="file" @change="change_avatar($event.target.files)" id="input_file"
											title=" " />
									</div>
									<div class="change_nickname_box" @click="change_nickname()">
										<div class="change_nickname">
											<span>修改昵称</span>
										</div>
										<div class="right_wrap">
											<b-icon icon="arrow-right-square"></b-icon>
										</div>
									</div>
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
	import list_menu_user from "@/components/diy/list_menu_user.vue";

	export default {
		mixins: [mixin],
		data() {
			return {
				url_get_obj: "~/api/user/get_obj?",
				query: {
					user_id: this.$store.state.user.user_id
				},
				display_input: "none",
				display_name: "block",
				form: {},
				// 输入聚焦
				focus_input: false,
				list_info: [{
						title: "个人资料",
						url: "/user/info",
						icon: "house-fill",
						selected: true,
					},
					{
						title: "密码修改",
						url: "/user/password",
						icon: "person-fill",
						selected: false,
					},
					{
						title: "收藏",
						url: "/user/collect",
						icon: "heart-fill",
						selected: false,
					},
				],
				file: null,
			};
		},
		methods: {
			/**
			 * 修改头像
			 * @param { Object } files 上传文件对象
			 */
			async change_avatar(files) {
				var _this = this;
				var form = new FormData();
				form.append("file", files[0]);
				var res = await this.$post("~/api/user/upload?", form);
				console.log(res)
				if (res.result) {
					var avatar = res.result.url;
					this.$post(
						"~/api/user/set?user_id=" + _this.user.user_id, {
							avatar,
						},
						(res) => {
							this.user.avatar = avatar;
							this.obj.avatar = avatar;
						}
					);
				} else {
					this.$toast(res.error.message);
				}
			},
			/**
			 * 跳出修改昵称输入框
			 */
			change_nickname() {
				this.display_input = "flex";
				this.display_name = "none";
				this.focus_input = true;
			},
			/**
			 * 保存昵称修改
			 */
			save_nickname() {
				var user_id = this.user.user_id;
				var nickname = this.form.nickname;
				this.$post(
					"~/api/user/set?user_id=" + user_id, {
						nickname,
					},
					(res) => {
						console.log(res);
						this.focus_input = false;
						this.display_input = "none";
						this.display_name = "block";
						this.user.nickname = nickname;
						this.obj.nickname = nickname;
					}
				);
			},
			get_obj_before(params) {
				params.user_id = this.$store.state.user.user_id;
				return params
			}

		},
		components: {
			list_menu_user,
		},
	};
</script>

<style scoped>
	.container {
		min-height: 800px;
	}

	.content_msg {
		justify-content: space-between;
		align-items: center;
		margin-bottom: 30px;
		/* border-bottom: 1px solid var(--color_default_h);
        margin-right: 5px; */
	}

	.figure_avatar {
		padding: 5px;
		height: 60px;
		line-height: 60px;
	}

	.nickname {
		display: flex;
		padding: 5px;
		line-height: 30px;
	}

	.input_nickname .btn_save {
		width: 4rem;
		text-align: center;
		height: 31px;
		line-height: 31px;
		border: 1px solid var(--color_grey);
		border-radius: 5px;
		margin-right: 4px;
	}

	.btn_save:hover {
		background-color: var(--color_success);
		border: none;
		color: white;
	}

	.right_msg {
		margin: auto;
	}

	.right_msg .change_avatar_box {
		cursor: pointer;
		position: relative;
		display: flex;
		margin-left: 5px;
	}

	.right_wrap {
		margin: 0 10px;
	}

	.right_msg .change_avatar_box #input_file {
		cursor: pointer;
		position: absolute;
		width: 100%;
		height: 100%;
		opacity: 0;
		z-index: 1000;
		font-size: 0;
	}

	.change_nickname_box {
		margin-top: 10px;
		cursor: pointer;
		display: flex;
		margin-left: 5px;
	}
</style>
