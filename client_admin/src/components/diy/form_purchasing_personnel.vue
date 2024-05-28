<template>
	<div>
		<el-form-item v-if="$check_register_field('add','personnel_name','/purchasing_personnel/view')" label="人员姓名" prop="personnel_name">
		<el-input id="personnel_name" v-model="form['personnel_name']" placeholder="请输入人员姓名"></el-input>
		</el-form-item>
		<el-form-item v-if="$check_register_field('add','personnel_gender','/purchasing_personnel/view')" label="人员性别" prop="personnel_gender">
		<el-select id="personnel_gender" v-model="form['personnel_gender']">
			<el-option v-for="o in list_personnel_gender" :key="o" :label="o" :value="o">
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
						"personnel_name":'',
						"personnel_gender":'',
					}
				}
			},

		},
		data() {
			return {
				field: "purchasing_personnel_id",
				url_add: "~/api/purchasing_personnel/add?",
				url_set: "~/api/purchasing_personnel/set?",
				url_upload: "~/api/purchasing_personnel/upload?",
				list_personnel_gender: ['男','女'],

				rules: {
					"personnel_name": [ ],
					"personnel_gender": [ ],
				}

			}
		},
		methods: {

		},
		created() {
		}
	}
</script>
