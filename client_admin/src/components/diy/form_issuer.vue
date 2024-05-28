<template>
	<div>
		<el-form-item v-if="$check_register_field('add','employee_name','/issuer/view')" label="员工姓名" prop="employee_name">
		<el-input id="employee_name" v-model="form['employee_name']" placeholder="请输入员工姓名"></el-input>
		</el-form-item>
		<el-form-item v-if="$check_register_field('add','employee_gender','/issuer/view')" label="员工性别" prop="employee_gender">
		<el-select id="employee_gender" v-model="form['employee_gender']">
			<el-option v-for="o in list_employee_gender" :key="o" :label="o" :value="o">
			</el-option>
		</el-select>
		</el-form-item>

	</div>
</template>

<script>
	import mixin from "@/mixins/component.js";

	export default {
		mixins: [mixin],
		props:{

			form:{
				type: Object,
				default: function(){
					return {
						"employee_name":'',
						"employee_gender":'',
					}
				}
			},

		},
		data() {
			return {
				field: "issuer_id",
				url_add: "~/api/issuer/add?",
				url_set: "~/api/issuer/set?",
				url_upload: "~/api/issuer/upload?",
				list_employee_gender: ['男','女'],

				rules: {
					"employee_name": [ ],
					"employee_gender": [ ],
				}

			}
		},
		methods: {

		},
		created() {
		}
	}
</script>
