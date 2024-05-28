<template>
	<el-main class="bg edit_wrap">
		<el-form ref="form" :model="form" status-icon label-width="70px">

			<el-col :xs="24" :sm="12" :lg="6" class="el_form_item_warp">
				<el-form-item label="封面图" prop="img">
					<el-upload class="avatar-uploader" drag accept="image/gif, image/jpeg, image/png, image/jpg"
						action="" :http-request="uploadImg" :show-file-list="false">
						<img v-if="form.img" :src="$fullUrl(form.img)" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>
			</el-col>

			<el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="标题" prop="title">
					<el-input v-model="form.title">
					</el-input>
				</el-form-item>
			</el-col>

			<el-col :xs="24" :sm="12" :lg="6" class="el_form_item_warp">
				<el-form-item label="分类" prop="type">
					<el-select v-model="form.type" placeholder="请选择">
						<el-option v-for="(obj ,i) in list_artcle_type" :key="obj.name" :label="obj.name"
							:value="obj.name">
						</el-option>
					</el-select>
				</el-form-item>
			</el-col>

			<!--<el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="来源" prop="source">
					<el-input v-model="form.source"></el-input>
				</el-form-item>
			</el-col>

			<el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="来源地址" prop="url">
					<el-input v-model="form.url" placeholder="请输入来源地址"></el-input>
				</el-form-item>
			</el-col>-->

			<el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="标签" prop="tag">
					<el-input v-model="form.tag" placeholder="请输入标签"></el-input>
				</el-form-item>
			</el-col>

			<!--<el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="点击数" prop="hits">
					<el-input-number v-model="form.hits"></el-input-number>
				</el-form-item>
			</el-col>-->

			<el-col :xs="24" :sm="24" :lg="8" class="el_form_item_warp">
				<el-form-item label="描述" prop="content">
					<el-input type="textarea" v-model="form.description" :rows="5">
					</el-input>
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
				field: "article_id",
				url_add: "~/api/article/add?",
				url_set: "~/api/article/set?",
				url_get_obj: "~/api/article/get_obj?",
				url_upload: "~/api/article/upload?",

				query: {
					article_id: 0
				},

				form: {
					article_id: 0,
					title: "",
					type: "",
					hits: 0,
					source: "",
					url: "",
					tag: "",
					content: "",
					img: "",
					description: "",
				},

				list_artcle_type: []
			}
		},
		methods: {

			/**
			 * 上传文件
			 * @param {Object} param
			 */
			uploadImg(param) {
				this.uploadFile(param.file, "img");
			},

			/**
			 * 获取文章分类
			 */
			async get_artcle_type() {
				var json = await this.$get("~/api/article_type/get_list?");
				if (json.result) {
					this.list_artcle_type = json.result.list;
				} else if (json.error) {
					console.error(json.error);
				}
			},

		},
		created() {
			this.get_artcle_type();
		}
	}
</script>

<style>
	.bg {
		background-color: #FFFFFF;
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
