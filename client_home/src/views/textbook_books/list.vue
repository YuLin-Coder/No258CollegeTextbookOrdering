<template>
	<div class="diy_list page_textbook_books" id="textbook_books_list">
		<div class="warp">
			<div class="container diy_list_container">
				<div class="diy_list_title">
					<div class="col">
						<span class="title">教材书籍列表</span>
					</div>
				</div>
				<div class="row diy_list_search">
					<div class="col">
						<!-- 搜索栏 -->
						<div class="view">							
							<span class="diy_list_search_title">关键字搜索：</span>
							<b-form-input size="sm" class="mr-sm-2" placeholder="教材名称搜索" v-model="query['textbook_name']" />
							<b-form-input size="sm" class="mr-sm-2" placeholder="教材类型搜索" v-model="query['textbook_type']" />
							<b-form-input size="sm" class="mr-sm-2" placeholder="教材科目搜索" v-model="query['textbook_subjects']" />
							<b-form-input size="sm" class="mr-sm-2" placeholder="发行人员搜索" v-model="query['issuer']" />
							<b-button size="sm" @click="search()" >
								<b-icon icon="search"/>
							</b-button>
						</div>
						<!-- /搜索栏 -->
					</div>
				</div>
				<div class="diy_list_select_box">
					<span class="diy_list_select_title">下拉搜索：</span>
						<div class="diy_list_dropdown_box">
						<div class="col">
							<!-- 筛选 -->
							<div class="view">
								<b-dropdown text="发行人员" variant="outline-dark" left>
									<b-dropdown-item @click="filter_set('全部','issuer')">全部</b-dropdown-item>
									<b-dropdown-item v-for="o in list_issuer" :key="o['user_id']" @click="filter_set(o['user_id'],'issuer')">
										{{ o['nickname'] + '-' + o['username'] }}
									</b-dropdown-item>
								</b-dropdown>
							</div>
							<!-- /筛选 -->
						</div>
					</div>
					<div class="diy_list_sort_box">
						<div class="col">
							<!-- 排序 -->
							<div class="view">
								<b-dropdown text="排序" variant="outline-dark" left>
										<b-dropdown-item v-for="(o, i) in list_sort" :key="i" @click="set_sort(o)" >
												{{ o.name }}
										</b-dropdown-item>
								</b-dropdown>
							</div>
							<!--/排序 -->
						</div>
					</div>
				</div>
				<div class="row diy_list_box">
					<div class="col">
						<!-- 列表 -->
						<list_textbook_books :list="list" />
						<!-- /列表 -->
					</div>
				</div>
				<div class="row diy_list_page_box">
					<div class="col overflow-auto flex_cc">
						<!-- 分页器 -->
<!--						<diy_pager v-model="query['page']" :size="query['size']" :count="count" v-on:toPage="toPage" v-on:toSize="toSize" ></diy_pager>-->
            <b-pagination
                v-model="query.page"
                :total-rows="count"
                :per-page="query.size"
                @change="goToPage"
            />
						<!-- /分页器 -->
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import list_textbook_books from "@/components/diy/list_textbook_books.vue";
	import diy_pager from "@/components/diy/diy_pager";
	import mixin from "@/mixins/page.js";

	export default {
		mixins: [mixin],
		components: {
			diy_pager,
			list_textbook_books
		},
		data() {
			return {
				url_get_list: "~/api/textbook_books/get_list?like=0",

				// 查询条件
				query: {
					keyword: "",
					page: 1,
					size: 10,
					"textbook_name": "", // 教材名称
					"textbook_type": "", // 教材类型
					"textbook_subjects": "", // 教材科目
					"issuer": 0, // 发行人员
				},

				// 排序内容
				list_sort: [{
						name: "创建时间从高到低",
						value: "create_time desc",
					},
					{
						name: "创建时间从低到高",
						value: "create_time asc",
					},
					{
						name: "更新时间从高到低",
						value: "update_time desc",
					},
					{
						name: "更新时间从低到高",
						value: "update_time asc",
					},
					{
						name: "教材名称正序",
						value: "textbook_name asc",
					},
					{
						name: "教材名称倒序",
						value: "textbook_name desc",
					},
					{
						name: "教材类型正序",
						value: "textbook_type asc",
					},
					{
						name: "教材类型倒序",
						value: "textbook_type desc",
					},
					{
						name: "教材科目正序",
						value: "textbook_subjects asc",
					},
					{
						name: "教材科目倒序",
						value: "textbook_subjects desc",
					},
					{
						name: "发行人员正序",
						value: "issuer asc",
					},
					{
						name: "发行人员倒序",
						value: "issuer desc",
					},
				],
				list_issuer: [],
			}
		},
		methods: {
      get_list_before(param) {
      },
			/**
			 * 筛选选择
			 */
			filter_set(o,key) {
			    if (o == "全部") {
			        this.query[key] = "";
			    } else {
			        this.query[key] = o;
			    }
			    this.search();
			},

			/**
			 * 排序
			 */
			set_sort(o) {
			    this.query.orderby = o.value;
			    this.search();
			},

			/**
			 * 筛选
			 */
			/**
			 * 获取发行人员列表
			 */
			async get_list_issuer() {
				var json = await this.$get("~/api/user/get_list?user_group=发行人员");
				if(json.result && json.result.list){
					this.list_issuer = json.result.list;
				}
				else if(json.error){
					console.error(json.error);
				}
			},

			/**
			 * 重置
			 */
			reset() {
				this.query.textbook_name = ""
				this.query.textbook_type = ""
				this.query.textbook_subjects = ""
				this.query.issuer = ""
				this.search();
			},

			// 返回条数
			toSize(i){
				this.query.size = i;
				this.first();
			},

			// 返回页数
			toPage(i){
				this.query.page = i;
				this.first();
			},

      goToPage(v){
        this.query.page = v;
        this.goToNew(v)
      },
		},
		computed: {
		},
		created() {
			this.get_list_issuer();
		}
	}
</script>

<style>
</style>
