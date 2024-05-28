<template>
	<el-main class="bg table_wrap">
		<el-form label-position="right" :model="query" class="form p_4" label-width="120">
			<el-row>
				<el-col :xs="24" :sm="24" :lg="8" class="el_form_search_wrap">
					<el-form-item label="标题">
						<el-input v-model="query.title"></el-input>
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
							<el-button v-if="user_group == '管理员' || $check_action('/slides/table','del')" class="float-right search_btn_del" type="danger" @click="delInfo()">删除</el-button>
							<router-link v-if="user_group == '管理员' || $check_action('/slides/view')" class="el-button float-right el-button--default el-button--primary search_btn_add"
								to="./view?">添加
							</router-link>
						</el-form-item>
					</el-col>
				</el-col>

			</el-row>
		</el-form>

		<el-table border :data="list" @selection-change="selectionChange" @sort-change="$sortChange" style="width: 100%" stripe>

			<!-- 多选按钮 -->
			<el-table-column fixed type="selection" tooltip-effect="dark" width="55">
			</el-table-column>
			<!-- /多选按钮 -->

			<el-table-column label="轮播图" prop="img" min-width="110">
				<template slot-scope="scope">
					<el-image style="height: 100px" :src="scope.row.img">
						<div slot="error" class="image-slot">
							<img :src="$fullUrl(scope.row.img)" style="width: 100%;max-height: 90px" />
						</div>
					</el-image>
				</template>
			</el-table-column>

			<el-table-column label="标题" prop="title" sortable min-width="100">
			</el-table-column>

			<!--<el-table-column label="正文" prop="content" min-width="200">
			</el-table-column>

			<el-table-column label="链接" prop="url" min-width="100">
			</el-table-column>

			<el-table-column label="点击量" prop="hits" sortable min-width="100">
			</el-table-column>-->

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
				field: "slides_id",
				url_get_list: "~/api/slides/get_list?like=0",
				url_del: "~/api/slides/del?",

				query: {
					size: 10,
					page: 1,
				},

				// 数据
				list: [],

				// 获取用户信息
				list_user: [],
			}
		},
		methods: {
			table_class({row, column, rowIndex, columnIndex}){
				return "table_class";
			}
		},
		created() {

		}
	}
</script>

<style>
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
</style>
