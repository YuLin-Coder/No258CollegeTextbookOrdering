<template>
	<el-main class="bg edit_wrap">
		<el-form ref="form" :model="form" status-icon label-width="80px">
			<el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="导航名" prop="name">
					<el-input v-model="form.name" placeholder="请输入导航名"></el-input>
				</el-form-item>
			</el-col>

			<el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="位置" prop="location">
					<el-select v-model="form.location">
						<el-option v-for="obj in list_location" :key="obj.value" :label="obj.text" :value="obj.value">
						</el-option>
					</el-select>
				</el-form-item>
			</el-col>

			<el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="跳转方式" prop="target">
					<el-select v-model="form.target">
						<el-option v-for="obj in list_target" :key="obj.value" :label="obj.text" :value="obj.value">
						</el-option>
					</el-select>
				</el-form-item>
			</el-col>

			<el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="链接地址" prop="url">
					<el-input v-model="form.url" placeholder="请输入链接地址"></el-input>
				</el-form-item>
			</el-col>

			<el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="父级" prop="father_id">
					<el-select v-model="form.father_id">
						<el-option :key="-1" label="无" :value="0"></el-option>
						<el-option v-for="obj in list_nav" :key="obj.nav_id" :label="obj.name" :value="obj.nav_id">
						</el-option>
					</el-select>
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
	import mixin from "../../mixins/page.js";

	export default {
		mixins: [mixin],
		data() {
			return {
				field: "nav_id",
				
				url_add: "~/api/nav/add?",
				url_set: "~/api/nav/set?",
				url_get_obj: "~/api/nav/get_obj?",
				url_upload: "~/api/nav/upload?",
				
				query: {
					nav_id: 0
				},

				form: {
					nav_id: 0,
					name: '',
					location: '',
					target: "",
					url: "",
					father_id: 0
				},

				// 跳转位置
				list_location: [{
						text: "顶部",
						value: "top"
					},
					{
						text: "侧边",
						value: "side"
					},
					{
						text: "底部",
						value: "foot"
					}
				],

				// 跳转方式
				list_target: [{
						text: '新页面',
						value: "_blank"
					},
					{
						text: '本页面',
						value: "_self"
					},
					{
						text: '父窗口',
						value: "_parent"
					},
					{
						text: '全窗口',
						value: "_top"
					}
				],

				list_nav: []
			}
		},
		methods: {

			/**
			 * 获取导航组
			 */
			async get_list_nav() {
				var json = await this.$get("~/api/nav/get_list?");
				this.list_nav = json.result.list;
			},

		},
		created() {
			this.get_list_nav();
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
