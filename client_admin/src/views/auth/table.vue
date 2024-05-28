<template>
	<el-main class="bg table_wrap">

		<el-form label-position="right" :model="query" class="form p_4" label-width="120">
			<el-row>
				<el-col :xs="24" :sm="24" :lg="8" class="el_form_search_wrap">
					<el-form-item label="模块名">
						<el-input v-model="query.mod_name"></el-input>
					</el-form-item>
				</el-col>

				<el-col :xs="24" :sm="24" :lg="8" class="el_form_search_wrap">
					<el-form-item label="用户组">
						<el-select v-model="query.user_group">
							<el-option v-for="(o,i) in list_user_group" :label="o.name" :value="o.value" :key="i" ></el-option>
						</el-select>
					</el-form-item>
				</el-col>

				<el-col :xs="24" :sm="24" :lg="8" class="el_form_search_wrap">
					<el-form-item label="页面标题">
						<el-input v-model="query.page_title"></el-input>
					</el-form-item>
				</el-col>

				<el-col :xs="24" :sm="24" :lg="8" class="el_form_search_wrap">
					<el-form-item label="位置">
						<el-select v-model="query.position">
							<el-option value="" :key="-1" label=""></el-option>
							<el-option v-for="(o,i) in list_position" :value="o.value" :label="o.name" :key="i">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>

				<el-col :xs="24" :sm="24" :lg="8" class="el_form_search_wrap">
					<el-form-item label="添加权限">
						<el-select v-model="query.add">
							<el-option value="" :key="-1" label=""></el-option>
							<el-option v-for="(o,i) in list_state" :value="o.value" :label="o.name" :key="i">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>

				<el-col :xs="24" :sm="24" :lg="8" class="el_form_search_wrap">
					<el-form-item label="修改权限">
						<el-select v-model="query.set">
							<el-option value="" :key="-1" label=""></el-option>
							<el-option v-for="(o,i) in list_state" :value="o.value" :label="o.name" :key="i">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>

				<el-col :xs="24" :sm="24" :lg="8" class="el_form_search_wrap">
					<el-form-item label="删除权限">
						<el-select v-model="query.del">
							<el-option value="" :key="-1" label=""></el-option>
							<el-option v-for="(o,i) in list_state" :value="o.value" :label="o.name" :key="i">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>

				<el-col :xs="24" :sm="24" :lg="8" class="el_form_search_wrap">
					<el-form-item label="查询权限">
						<el-select v-model="query.get">
							<el-option value="" :key="-1" label=""></el-option>
							<el-option v-for="(o,i) in list_state" :value="o.value" :label="o.name" :key="i">
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
							<el-button v-if="user_group == '管理员' || $check_action('/auth/table','del')"
								class="float-right search_btn_del" type="danger" @click="delInfo()">删除</el-button>
							<router-link v-if="user_group == '管理员' || $check_action('/auth/view')"
								class="el-button float-right el-button--default el-button--primary search_btn_add" to="./view?">添加
							</router-link>
						</el-form-item>
					</el-col>
				</el-col>
			</el-row>
		</el-form>

		<el-table border :data="list" @selection-change="selectionChange" style="width: 100%">

			<!-- 多选按钮 -->
			<el-table-column fixed type="selection" tooltip-effect="dark" width="55">
			</el-table-column>
			<!-- /多选按钮 -->

			<el-table-column fixed prop="user_group" label="用户组">
			</el-table-column>

			<el-table-column prop="mod_name" label="模块名">
			</el-table-column>

			<el-table-column prop="page_title" label="页面标题">
			</el-table-column>

			<el-table-column prop="position" label="位置" width="80">
				<template slot-scope="scope">
					{{list_position.getVal('name',{"value":scope.row.position})}}
				</template>
			</el-table-column>

			<el-table-column prop="add" label="添加权限" width="80">
				<template slot-scope="scope">
					{{scope.row.add ? "有" : "无"}}
				</template>
			</el-table-column>

			<el-table-column prop="set" label="修改权限" width="80">
				<template slot-scope="scope">
					{{scope.row.set ? "有" : "无"}}
				</template>
			</el-table-column>

			<el-table-column prop="del" label="删除权限" width="80">
				<template slot-scope="scope">
                    {{scope.row.del ? "有" : "无"}}
				</template>
			</el-table-column>

			<el-table-column prop="get" label="查询权限" width="80">
				<template slot-scope="scope">
					{{scope.row.get ? "有" : "无"}}
				</template>
			</el-table-column>

			<el-table-column prop="table_nav_name" label="跨表按钮名">
			</el-table-column>

			<el-table-column sortable prop="create_time" label="创建时间" min-width="200">
			    <template slot-scope="scope">
			        {{ $toTime(scope.row["create_time"],"yyyy-MM-dd hh:mm:ss") }}
			    </template>
			</el-table-column>

			<el-table-column sortable prop="update_time" label="更新时间" min-width="200">
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
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
				:current-page="query.page" :page-sizes="[7, 10, 30, 100]" :page-size="query.size"
				layout="total, sizes, prev, pager, next, jumper" :total="count">
			</el-pagination>
		</div>
		<!-- /分页器 -->

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
				url_get_list: "~/api/auth/get_list?like=0",
				url_del: "~/api/auth/del?",

				query: {
					size: 10,
					page: 1,
					mod_name: "",
					user_group: "",
					add: "",
					set: "",
					del: "",
					get: "",
					page_title: "",
				},

				// 数据
				list: [],

				list_position: [{name:"顶部",value:"top"},{name:"侧边",value:"side"},{name:"底部",value:"bottom"}],

				// 获取状态
				list_state: [{
					name: "无",
					value: "0"
				}, {
					name: "有",
					value: "1"
				}],

				list_user_group: []
			}
		},
		methods: {
			async get_list_user_group(){
				var json = await this.$get("~/api/user_group/get_list?");
				if(json.result){
					this.user_group = json.result.list;
				}
				else if(json.error){
					console.error(json.error);
				}
			},

			table_class({
				row,
				column,
				rowIndex,
				columnIndex
			}) {
				return "table_class";
			}
		},
		created() {
			this.get_list_user_group();
		}
	}
</script>

<style>

</style>
