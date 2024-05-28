<template>
	<el-main class="bg edit_wrap">
		<el-form ref="form" :model="form" status-icon label-width="80px">
			<el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="用户组名" prop="name">
					<el-input v-model="form.name" placeholder="请输入用户组名"></el-input>
				</el-form-item>
			</el-col>

			<el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="显示顺序" prop="display">
					<el-input-number v-model="form.display"></el-input-number>
				</el-form-item>
			</el-col>

			<el-col :xs="24" :sm="12" :lg="16" class="el_form_item_warp">
				<el-form-item label="描述" prop="description">
					<el-input type="textarea" autosize v-model="form.description" placeholder="请输入描述"></el-input>
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
				field: "group_id",

				url_add: "~/api/user_group/add?",
				url_set: "~/api/user_group/set?",
				url_get_obj: "~/api/user_group/get_obj?",
				url_upload: "~/api/user_group/upload?",

				query: {
					group_id: 0
				},

				form: {
					group_id: 0,
					name: '',
					description:""
				}
			}
		},
		methods: {
			/**
			 * 上传文件
			 * @param {Object} param
			 */
			uploadimg(param) {
				this.uploadFile(param.file, "icon");
			},
		},
		created() {

		}
	}
</script>

<style>
	.bg {
		background: white;
	}

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
