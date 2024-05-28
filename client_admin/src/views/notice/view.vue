<template>
	<el-main class="bg edit_wrap">
		<el-form ref="form" :model="form" status-icon label-width="80px">

			<el-col :xs="24" :sm="12" :lg="12" class="el_form_item_warp">
				<el-form-item label="标题" prop="title">
					<el-input v-model="form.title" placeholder="请输入标题"></el-input>
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

				"title": "notice",
				field: "notice_id",

				url_add: "~/api/notice/add?",
				url_set: "~/api/notice/set?",
				url_get_obj: "~/api/notice/get_obj?",

				query: {
					notice_id: 0
				},

				form: {
					notice_id: 0,
					title: "",
					content: ""
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
				if (params.content === "") {
					msg = "内容不能为空";
					return msg;
				}
			},
		},
		created() {

		}
	}
</script>

<style>
</style>
