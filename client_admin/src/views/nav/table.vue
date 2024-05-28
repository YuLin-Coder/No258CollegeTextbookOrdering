<template>
	<el-main class="bg table_wrap">
		<el-form label-position="right" :model="query" class="form p_4" label-width="120">
			<el-row>

				<el-col :xs="24" :sm="24" :lg="8" class="el_form_search_wrap">
					<el-form-item label="导航名">
						<el-input v-model="query.name"></el-input>
					</el-form-item>
				</el-col>

				<el-col :xs="24" :sm="14" :lg="8" class="el_form_search_wrap">
					<el-form-item label="位置">
						<el-select v-model="query.location" placeholder="请选择">
							<el-option key="" label="" value=""></el-option>
							<el-option v-for="obj in list_location" :key="obj.value" :label="obj.text" :value="obj.value">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>

				<el-col :xs="24" :sm="14" :lg="8" class="el_form_search_wrap">
					<el-form-item label="跳转方式">
						<el-select v-model="query.target" placeholder="请选择">
							<el-option key="" label="" value=""></el-option>
							<el-option v-for="obj in list_target" :key="obj.value" :label="obj.text" :value="obj.value">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>

				<el-col :xs="24" :sm="24" :lg="24" class="search_btn_wrap">
					<el-col :xs="24" :sm="12" :lg="12" class="search_btn_1">
						<el-form-item>
							<el-button type="primary" @click="search()" class="search_btn_find">查询</el-button>
							<el-button @click="reset()" class="search_btn_reset">重置</el-button>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :lg="12" class="search_btn_2">
						<el-form-item>
							<el-button v-if="user_group == '管理员' || $check_action('/nav/table','del')" class="float-right search_btn_del" type="danger" @click="delInfo()">删除</el-button>
							<router-link v-if="user_group == '管理员' || $check_action('/nav/view')" class="el-button float-right el-button--default el-button--primary search_btn_add"
								to="./view?">添加
							</router-link>
						</el-form-item>
					</el-col>
				</el-col>

			</el-row>
		</el-form>

		<el-table border :data="list" @selection-change="selectionChange" @sort-change="$sortChange" style="width: 100%" stripe>

			<el-table-column fixed type="selection" tooltip-effect="dark" width="55">
			</el-table-column>

			<el-table-column fixed prop="name" label="导航名" sortable width="120">
			</el-table-column>

			<el-table-column prop="father_id" label="父级" sortable min-width="120">
				<template slot-scope="scope">
					{{getObj(list,scope.row.father_id,"nav_id").name || "无"}}
				</template>
			</el-table-column>

			<el-table-column prop="location" label="位置" sortable min-width="120">
				<template slot-scope="scope">
					{{getObj(list_location,scope.row.location).text}}
				</template>
			</el-table-column>

			<el-table-column prop="target" label="跳转方式" sortable min-width="120">
				<template slot-scope="scope">
					{{getObj(list_target,scope.row.target).text || (scope.row.target ? "自定义" : "本页面") }}
				</template>
			</el-table-column>

			<el-table-column prop="url" label="地址" min-width="120">
				<template slot-scope="scope">
					<span>
						{{scope.row.url}}
					</span>
				</template>
			</el-table-column>

			<el-table-column prop="create_time" label="创建时间" min-width="200">
			    <template slot-scope="scope">
			    	{{ $toTime(scope.row["create_time"],"yyyy-MM-dd hh:mm:ss") }}
			    </template>
			</el-table-column>

			<el-table-column prop="update_time" label="更新时间" min-width="200">
			    <template slot-scope="scope">
			    	{{ $toTime(scope.row["update_time"],"yyyy-MM-dd hh:mm:ss") }}
			    </template>
			</el-table-column>

			<!-- 操作 -->
			<el-table-column fixed="right" label="操作" width="80">
				<template slot-scope="scope">
					<router-link class="el-button el-button--small is-plain el-button--primary"
						:to="'./view?' + field + '=' + scope.row[field]" size="small">
            详情
					</router-link>
				</template>
			</el-table-column>
			<!-- /操作 -->

		</el-table>

		<!-- 分页器 -->
		<div class="mt text_center">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="query.page"
			 :page-sizes="[7, 10, 30, 100]" :page-size="query.size" layout="total, sizes, prev, pager, next, jumper" :total="count">
			</el-pagination>
		</div>
		<!-- /分页器 -->

	</el-main>
</template>

<script>
	import mixin from "../../mixins/page.js";

	export default {
		mixins: [mixin],
		data() {
			return {
				// 获取连接地址
				url_get_list: "~/api/nav/get_list?like=0",
				url_del: "~/api/nav/del?",

				// 字段ID
				field: "nav_id",

				// 查询
				query: {
					size: 10,
					page: 1,
					name: "",
					location:"",
					target:""
				},

				// 数据
				list: [],

				// 跳转位置
				list_location: [
					{
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
				list_target: [
					{
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

			}
		},
		methods:{
			table_class({row, column, rowIndex, columnIndex}){
				return "table_class";
			}
		}
	}
</script>

<style type="text/css">
	.bg {
		background: white;
	}

	.form.p_4 {
		padding: 1rem;
	}

	.form .el-input {
		width: initial;
	}

	.mt {
		margin-top: 1rem;
	}

	.float-right {
		float: right;
	}

	.mr-1 {
		margin-right: 1rem;
	}

	.el-table .table_class {
		background: rgba(150, 150, 150, 0.1);
		text-align: center;
	}

	.text_center {
		text-align: center;
	}

	.float-right {
		float: right;
	}
</style>
