<template>
	<el-main class="bg edit_wrap">
		<el-form ref="form" :model="form" status-icon label-width="100px">
			
			<el-col :xs="24" :sm="24" :lg="24" v-if="query.reply_to_id" class="el_form_item_warp">
				<el-form-item label="被回复人" prop="nickname">
					{{reply_obj.nickname}}
				</el-form-item>
			</el-col>
			
			<el-col :xs="24" :sm="24" :lg="24" v-if="query.reply_to_id" class="el_form_item_warp">
				<el-form-item label="被回复内容" prop="reply_to_id">
					{{reply_obj.content}}
				</el-form-item>
			</el-col>
			
			<el-col :xs="24" :sm="12" :lg="8" v-if="!query.reply_to_id" class="el_form_item_warp">
				<el-form-item label="头像" prop="avatar" >
					<el-upload class="avatar-uploader" drag accept="image/gif, image/jpeg, image/png, image/jpg"
						action="" :http-request="uploadAvatar" :show-file-list="false">
						<img v-if="form.avatar" :src="$fullUrl(form.avatar)" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>
			</el-col>

			<el-col :xs="24" :sm="12" :lg="8" v-if="!query.reply_to_id" class="el_form_item_warp">
				<el-form-item label="昵称" prop="nickname">
					<el-input v-model="form.nickname" placeholder="请输入昵称"></el-input>
				</el-form-item>
			</el-col>

			<el-col :xs="24" :sm="24" :lg="24" class="el_form_editor_warp">
				<el-form-item label="正文" prop="content">
					<quill-editor v-model="form.content">
					</quill-editor>
				</el-form-item>
			</el-col>

			<el-col :xs="24" :sm="24" :lg="24" class="el_form_btn_warp">
				<el-form-item>
					<el-col :xs="24" :sm="24" :lg="12" class="el_form_btn el_form_btn_1">
						<el-button style="width: 100%; float: left;" type="primary" @click="submit()">提交</el-button>
					</el-col>
					<el-col :xs="24" :sm="24" :lg="12" class="el_form_btn el_form_btn_2">
						<el-button style="width: 100%; float: right;" @click="cancel()">取消</el-button>
					</el-col>
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
				field: "comment_id",
				url_add: "~/api/comment/add?",
				url_set: "~/api/comment/set?",
				url_get_obj: "~/api/comment/get_obj?",
				url_upload: "~/api/comment/upload?",

				query: {
					comment_id: 0,
					reply_to_id: 0
				},

				form: {
					comment_id: 0,
					avatar: "",
					content: "",
					reply_to_id: 0
				},

				reply_obj: {
					nickname: "",
					content: ""
				}

			}
		},
		methods: {

			/**
			 * 上传文件
			 * @param {Object} param
			 */
			uploadAvatar(param) {
				this.uploadFile(param.file, "avatar");
			},

			/**
			 * 获取被回复内容
			 */
			async get_obj_comment() {
				var res = await this.$get("~/api/comment/get_obj?comment_id=" + this.query.reply_to_id);
				if (res.result) {
					this.reply_obj = res.result.obj;
				} else if (res.error) {
					console.error(res.error)
				}
			},
			
			get_obj_before(param){
				if(!param.source_id){
					var form = this.form;
					var user = this.user;
					form.reply_to_id = param.reply_to_id || 0;
					form.avatar = user.avatar;
					form.nickname = user.nickname;
				}
				return param;
			}
			
		},
		created() {
			this.get_obj_comment();
		}
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
