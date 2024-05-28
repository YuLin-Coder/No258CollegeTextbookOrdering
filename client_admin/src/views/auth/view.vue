<template>
	<el-main class="bg edit_wrap">
		<el-form ref="form" :model="form" status-icon label-width="100px">
			<el-col :xs="24" :sm="12" :lg="12" class="el_form_item_warp">
				<el-form-item label="用户组">
					<el-select v-model="form.user_group">
						<el-option v-for="(o ,i) in user_group" :key="o.name" :value="o.name" :label="o.name">
						</el-option>
					</el-select>
				</el-form-item>
			</el-col>

			<el-col :xs="24" :sm="12" :lg="12" class="el_form_item_warp">
				<el-form-item label="模块名">
					<el-input v-model="form.mod_name"></el-input>
				</el-form-item>
			</el-col>

			<el-col :xs="24" :sm="12" :lg="12" class="el_form_item_warp">
				<el-form-item label="表名">
					<el-input v-model="form.table_name"></el-input>
				</el-form-item>
			</el-col>

			<el-col :xs="24" :sm="12" :lg="12" class="el_form_item_warp">
				<el-form-item label="页面标题">
					<el-input v-model="form.page_title"></el-input>
				</el-form-item>
			</el-col>

			<el-col :xs="24" :sm="12" :lg="12" class="el_form_item_warp">
				<el-form-item label="跨表导航名称">
					<el-input v-model="form.table_nav_name"></el-input>
				</el-form-item>
			</el-col>

			<el-col :xs="24" :sm="12" :lg="12" class="el_form_item_warp">
				<el-form-item label="路由路径">
					<el-input v-model="form.path"></el-input>
				</el-form-item>
			</el-col>
			
			<el-col :xs="24" :sm="12" :lg="12" class="el_form_item_warp">
				<el-form-item label="位置">
					<el-select v-model="form.position">
						<el-option v-for="(o,i) in list_position" :key="o.name" :label="o.name" :value="o.value">
						</el-option>
					</el-select>
				</el-form-item>
			</el-col>

			<el-col :xs="24" :sm="12" :lg="6" class="el_form_item_warp">
				<el-form-item label="是否可增加">
					<el-switch v-model="form.add" active-text="是" inactive-text="否" active-value=1 inactive-value=0>
					</el-switch>
				</el-form-item>
			</el-col>

			<el-col :xs="24" :sm="12" :lg="6" class="el_form_item_warp">
				<el-form-item label="是否可删除">
					<el-switch v-model="form.del" active-text="是" inactive-text="否" active-value=1 inactive-value=0>
					</el-switch>
				</el-form-item>
			</el-col>

			<el-col :xs="24" :sm="12" :lg="6" class="el_form_item_warp">
				<el-form-item label="是否可修改">
					<el-switch v-model="form.set" active-text="是" inactive-text="否" active-value=1 inactive-value=0>
					</el-switch>
				</el-form-item>
			</el-col>

			<el-col :xs="24" :sm="12" :lg="6" class="el_form_item_warp">
				<el-form-item label="是否可查询">
					<el-switch v-model="form.get" active-text="是" inactive-text="否" active-value=1 inactive-value=0>
					</el-switch>
				</el-form-item>
			</el-col>

			<el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="添加字段">
					<el-input type="textarea" v-model="form.field_add"></el-input>
				</el-form-item>
			</el-col>

			<el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="修改字段">
					<el-input type="textarea" v-model="form.field_set"></el-input>
				</el-form-item>
			</el-col>

			<el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="查询字段">
					<el-input type="textarea" v-model="form.field_get"></el-input>
				</el-form-item>
			</el-col>

			<el-col class="el_form_btn_warp">
				<el-form-item>
					<el-button type="primary" @click="submit()">提交</el-button>
					<el-button @click="cancel()">取消</el-button>
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

				table: "auth",
				field: "auth_id",

				url_add: "~/api/auth/add?",
				url_set: "~/api/auth/set?",
				url_get_obj: "~/api/auth/get_obj?",
				url_upload: "~/api/auth/upload?",

				query: {
					auth_id: 0
				},

				form: {
					auth_id: 0,
					user_group: "",
					mod_name: "",
					table_name: "",
					page_title: "",
					path: "",
					add: "",
					del: "",
					set: "",
					get: "",
					position: "",
					field_add: "",
					field_set: "",
					field_get: "",
					table_nav_name: "",
					table_nav: "",
					option: ""
				},
				
				list_position: [{name:"无",value:""},{name:"顶部",value:"top"},{name:"侧边",value:"side"},{name:"底部",value:"bottom"}],
				
				user_group: []
				
			}
		},
		methods: {

			/**
			 * 上传文件
			 * @param {Object} param
			 */
			uploadimg(param) {
				this.uploadFile(param.file, "avatar");
			},

			// 获取用户列表
			async get_user_group() {
				var list = await this.$get("~/api/user_group/get_list?");
				this.user_group = list.result.list;
			},

		},
		created() {
			this.get_user_group()
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
