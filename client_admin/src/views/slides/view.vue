<template>
	<el-main class="bg edit_wrap">
		<el-form ref="form" :model="form" status-icon label-width="80px">

			<el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="轮播图" prop="img">
					<el-upload class="avatar-uploader" drag accept="image/gif, image/jpeg, image/png, image/jpg" action=""
					 :http-request="uploadimg" :show-file-list="false">
						<img v-if="form.img" :src="$fullUrl(form.img)" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>
			</el-col>

			<el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="标题" prop="title">
					<el-input v-model="form.title" placeholder="请输入用户名"></el-input>
				</el-form-item>
			</el-col>

			<!--<el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">-->
				<!--<el-form-item label="内容" prop="content">-->
					<!--<el-input v-model="form.content" placeholder="请输入昵称"></el-input>-->
				<!--</el-form-item>-->
			<!--</el-col>-->

			<!--<el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">-->
				<!--<el-form-item label="链接" prop="url">-->
					<!--<el-input v-model="form.url" placeholder="请输入链接"></el-input>-->
				<!--</el-form-item>-->
			<!--</el-col>-->

			<!--<el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">-->
				<!--<el-form-item label="点击量" prop="hits">-->
					<!--<el-input-number v-model="form.hits"></el-input-number>-->
				<!--</el-form-item>-->
			<!--</el-col>-->

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

				table: "slides",
				field: "slides_id",

				url_add: "~/api/slides/add?",
				url_set: "~/api/slides/set?",
				url_get_obj: "~/api/slides/get_obj?",
				url_upload: "~/api/slides/upload?",

				query: {
					slides_id: 0
				},

				form: {
					slides_id: 0,
					title: "",
					content: "",
					url: "",
					img: "",
					hits: 0
				},


			}
		},
		methods: {
			submit_check(params) {
				var msg = "";
				if (params.title === "") {
					msg = "标题不能为空";
					return msg;
				}
				// if (params.content === "") {
				// 	msg = "内容不能为空";
				// 	return msg;
				// }
				// if (params.url === "") {
				// 	msg = "连接不能为空";
				// 	return msg;
				// }
			},
			/**
			 * 上传文件
			 * @param {Object} param
			 */
			uploadimg(param) {
				this.uploadFile(param.file);
			}
		},
		created() {}
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
