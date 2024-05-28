<template>
	<el-main class="bg edit_wrap">
		<el-form ref="form" :model="form" status-icon label-width="70px">

			<!--<el-col :xs="24" :sm="12" :lg="6" class="el_form_item_warp">
				<el-form-item label="分类图标" prop="icon">
					<el-upload class="avatar-uploader" drag accept="image/gif, image/jpeg, image/png, image/jpg"
						action="" :http-request="uploadIcon" :show-file-list="false">
						<img v-if="form.icon" :src="form.icon" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>
			</el-col>-->

			<el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="类型名称" prop="name">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
			</el-col>
			<!--<el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="外链地址" prop="url">
					<el-input v-model="form.url" placeholder="请输入外链地址"></el-input>
				</el-form-item>
			</el-col>

			<el-col :xs="24" :sm="16" :lg="16" class="el_form_item_warp">
				<el-form-item label="描述" prop="description">
					<el-input type="textarea" v-model="form.description" placeholder="请输入描述"></el-input>
				</el-form-item>
			</el-col>-->

			<el-col :xs="24" :sm="24" :lg="24" class="el_form_btn_warp">
				<el-form-item>
					<el-col :xs="24" :sm="12" :lg="12" class="el_form_btn el_form_btn_1">
						<el-button style="width: 100%; float: left;" type="primary" @click="submit()">提交</el-button>
					</el-col>
					<el-col :xs="24" :sm="12" :lg="12" class="el_form_btn el_form_btn_2">
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
				field: "type_id",
				url_add: "~/api/article_type/add?",
				url_set: "~/api/article_type/set?",
				url_get_obj: "~/api/article_type/get_obj?",
				url_upload: "~/api/article_type/upload?",

				query: {
					type_id: 0,
				},

				form: {
					type_id: 0,
					icon: "",
					name: "",
					father_id: 0,
					url: "",
					description: ""
				}
			}
		},
		methods: {
			/**
			 * 上传文件
			 * @param {Object} param
			 */
			uploadIcon(param) {
				this.uploadFile(param.file, "icon");
			},
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
