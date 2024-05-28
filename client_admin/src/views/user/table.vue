<template>
	<el-main class="bg table_wrap">
		<el-form label-position="right" :model="query" class="form p_4" label-width="120">
			<el-row>
				<el-col :xs="24" :sm="24" :lg="8" class="el_form_search_wrap">
					<el-form-item label="昵称">
						<el-input v-model="query.nickname"></el-input>
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
							<el-button v-if="user_group == '管理员'" class="float-right search_btn_del" type="danger" @click="delInfo()">删除</el-button>
							<router-link v-if="user_group == '管理员'" class="el-button float-right el-button--default el-button--primary search_btn_add"
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

			<el-table-column fixed prop="nickname" label="昵称">
			</el-table-column>

			<el-table-column label="头像" min-width="110">
				<template slot-scope="scope">
					<el-avatar :src="$fullUrl(scope.row.avatar)" style="width: 80px;height: 80px;" >
						<img src="/img/error.png" />
					</el-avatar>
				</template>
			</el-table-column>

			<el-table-column prop="username" label="用户名" sortable width="120">
			</el-table-column>

			<el-table-column prop="user_group" label="用户组" sortable min-width="120">
				<template slot-scope="scope">
					{{scope.row.user_group}}
				</template>
			</el-table-column>

			<el-table-column prop="phone" label="手机号码" sortable min-width="120">
			</el-table-column>

			<el-table-column prop="phone_state" label="手机认证" sortable min-width="120">
				<template slot-scope="scope">
					{{list_is_state.getVal("text",{"value":scope.row.phone_state})}}
				</template>
			</el-table-column>

			<el-table-column prop="email" label="邮箱" sortable min-width="180">
			</el-table-column>

			<el-table-column prop="email_state" label="邮箱状态" sortable min-width="120">
				<template slot-scope="scope">
					{{list_is_state.getVal("text",{"value":scope.row.phone_state})}}
				</template>
			</el-table-column>

			<el-table-column prop="state" label="状态" sortable min-width="120">
				<template slot-scope="scope">
					{{list_is_state.getVal("text",{"value":scope.row.phone_state})}}
				</template>
			</el-table-column>

			<el-table-column prop="login_time" label="上次登录时间" sortable min-width="200">
                <template slot-scope="scope">
                    {{ $toTime(scope.row["login_time"],"yyyy-MM-dd hh:mm:ss") }}
                </template>
			</el-table-column>

			<el-table-column sortable prop="create_time" label="创建时间" min-width="200">
			    <template slot-scope="scope">
			        {{ $toTime(scope.row["create_time"],"yyyy-MM-dd hh:mm:ss") }}
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
	import mixin from "@/mixins/page.js";

	export default {
		mixins: [mixin],
		data() {
			return {
				// 获取数据地址
				url_get_list: "~/api/user/get_list?like=0",
				url_del: "~/api/user/del?",

				// 字段ID
				field:"user_id",

				// 查询
				query: {
					size: 10,
					page: 1,
					nickname: "",
					user_group: "管理员",
					login_time: "",
					create_time: ""
				},

				// 数据
				list: [],

				// 账号状态
				list_state: [{
					text: '可用',
					value: 1
				}, {
					text: '异常',
					value: 2
				}, {
					text: '已冻结',
					value: 3
				}, {
					text: '已注销',
					value: 4
				}],

				// 认证状态
				list_is_state: [{
					text: "未认证",
					value: 0
				}, {
					text: "认证中",
					value: 1
				}, {
					text: "已认证",
					value: 2
				}],

				// 用户组
				list_user_group: []
			}
		},
		methods: {
			deleteRow(index, rows) {
				rows.splice(index, 1);
			},

			async get_list_user_group(){
				var json = await this.$get("~/api/user_group/get_list?");
				if(json.result){
					this.list_user_group = json.result.list;
				}
				else if(json.error){
					console.error(json.error);
				}
			},

			table_class({row, column, rowIndex, columnIndex}){
				return "table_class";
			}
		},
		created(){
			this.get_list_user_group();
		}
	}
</script>

<style type="text/css">

</style>
