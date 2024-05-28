<template>
	<div class="page_root" id="root_index">
		<div class="warp">
			<div class="container-fluid">
				<el-row>
					<el-col :span="4">
						<mm_label bg_color="bg_purple" icon="el-icon-user-solid" :url="url_user_count" unit="人"
								  title="用户数量"></mm_label>
					</el-col>
				</el-row>

				<el-row>
					<el-col v-if="user_group == '管理员' || $check_figure('/textbook_books/table')" :span="8">
						<div class="card chart">
							<newBarChart v-if="bar_obj_textbook_books.values.length > 0" id="bar_obj_textbook_books" :vm="bar_obj_textbook_books" :title="'教材书籍统计'">
							</newBarChart>
							<div v-if="!bar_obj_textbook_books.values.length">教材书籍没有符合条件的数据</div>
						</div>
					</el-col>
					<el-col v-if="user_group == '管理员' || $check_figure('/book_purchase/table')" :span="8">
						<div class="card chart">
							<newLineChart v-if="line_obj_book_purchase.values.length > 0" id="line_obj_book_purchase" :vm="line_obj_book_purchase" :title="'书籍购买统计'">
							</newLineChart>
							<div v-if="!line_obj_book_purchase.values.length">书籍购买没有符合条件的数据</div>
						</div>
					</el-col>
					<el-col v-if="user_group == '管理员' || $check_figure('/book_receiving_information/table')" :span="8">
						<div class="card chart">
							<newLineChart v-if="line_obj_book_receiving_information.values.length > 0" id="line_obj_book_receiving_information" :vm="line_obj_book_receiving_information" :title="'领书信息统计'">
							</newLineChart>
							<div v-if="!line_obj_book_receiving_information.values.length">领书信息没有符合条件的数据</div>
						</div>
					</el-col>
				</el-row>
			</div>
		</div>
	</div>
</template>
<script>
	import mixin from "@/mixins/page.js";
	import pieChart from "@/components/charts/pie_chart";
	import barChart from "@/components/charts/bar_chart";
	import newBarChart from "@/components/charts/new_bar_chart";
	import lineChart from "@/components/charts/line_chart";
	import newLineChart from "@/components/charts/new_line_chart";
	import mm_label from "@/components/mm_label.vue";
	export default {
		mixins: [mixin],
		name: "Home",
		components: {
			pieChart,
			barChart,
			newBarChart,
			lineChart,
			newLineChart,
			mm_label
		},
		data() {
			return {
				isAdmin: false,
				recognitionType: "",
				activeName: "third",
				bar_obj_textbook_books: {
					names:[],
					xAxis: [],
					values:[]
				},
				line_obj_book_purchase:{
					names:[],
					xAxis: [],
					values:[]
				},
				line_obj_book_receiving_information:{
					names:[],
					xAxis: [],
					values:[]
				},
				url_user_count: "~/api/user/count?",
			};
		},
		created() {
			this.getUserInfo();
			// 执行教材书籍数据获取
			this.get_list_textbook_books();
			// 执行书籍购买数据获取
			this.get_list_book_purchase();
			// 执行领书信息数据获取
			this.get_list_book_receiving_information();
			
			
		},
		mounted() {},
		methods: {
			async get_nickname(list,flag){
				if (flag) {
					for (let i=0;i<list.length;i++){
						await this.$get(
								"~/api/user/get_obj?user_id="+list[i],
								null,
								(json) => {
									if (json.result) {
										list[i] = json.result.obj.nickname;
									}
								});
					}
				}else {
					for (let i=0;i<list.length;i++){
						await this.$get(
								"~/api/user/get_obj?user_id="+list[i].name,
								null,
								(json) => {
									if (json.result) {
										list[i].name = json.result.obj.nickname;
									}
								});
					}
				}
			},
			// 获取教材书籍统计柱状图
			async get_list_textbook_books() {
				let name_list = [];
				let query_str = "";
				let group_by_value = "textbook_name";
				let flag = false;
				let date_flag = "其他"
				name_list.push("书籍数量");
				query_str = query_str+"number_of_books"+","
				this.bar_obj_textbook_books.names = name_list
				query_str = query_str.substr(0,query_str.length-1);
				let data2 = {};
				let user_group = this.$store.state.user.user_group;
				let user_id = this.$store.state.user.user_id;
				if (user_group!='管理员'){
					if (user_group=="发行人员"){
						data2.issuer = user_id;
					}
				}
				await this.$get(
						"~/api/textbook_books/bar_group?field="+query_str+"&groupby="+group_by_value,
						data2,
						(json) => {
							if (json.result) {
								let xAxis = [];
								let values = [];
								json.result.list.map((o) => {
									if (date_flag === "日期") {
										xAxis.push(this.$toTime(o[0] ,"yyyy-MM-dd"));
									}else if (date_flag === "时间") {
										xAxis.push(this.$toTime(o[0] ,"hh:mm:ss"));
									}else if (date_flag === "日长") {
                    xAxis.push(this.$toTime(o[0] ,"yyyy-MM-dd hh:mm:ss"));
                  }else {
										xAxis.push(o[0]);
									}
									values.push(o.splice(1))
								});
								this.bar_obj_textbook_books.xAxis = xAxis;
								this.bar_obj_textbook_books.values = values;
							}
							if (flag){
								this.get_nickname(this.bar_obj_textbook_books.xAxis,true);
							}
						});
			},
			// 获取书籍购买统计折线图
			async get_list_book_purchase() {
				let group_by_value = "textbook_name";
				let data2 = {};
				let flag = false;
				let user_group = this.$store.state.user.user_group;
				let user_id = this.$store.state.user.user_id;
				if (user_group!='管理员'){
					if (user_group=="教师用户"){
						data2.buy_teachers = user_id;
					}
				}
				await this.$get(
					"~/api/book_purchase/get_list?groupby="+group_by_value,data2,
					(json) => {
						if (json.result) {
							let list = json.result.list;
							let name_list = [];
							for (let i=0;i<list.length;i++){
								name_list.push(list[i].textbook_name);
							}
							this.line_obj_book_purchase.names = name_list;
							this.get_list_book_purchase_sub("textbook_name",flag);
						}
				});
			},
			async get_list_book_purchase_sub(v1,names_flag) {
				let data2 = {};
				let flag = false;
				let user_group = this.$store.state.user.user_group;
				let user_id = this.$store.state.user.user_id;
				if (user_group!='管理员'){
					if (user_group=="教师用户"){
						data2.buy_teachers = user_id;
					}
				}
				await this.$get(
					"~/api/book_purchase/get_list?groupby=purchase_date",data2,
					(json) => {
						if (json.result) {
							let list = json.result.list;
							let xAxis_list = [];
							for (let i=0;i<list.length;i++){
								xAxis_list.push(this.$toTime(list[i].purchase_date ,"yyyy-MM-dd"));
							}
							this.line_obj_book_purchase.xAxis = xAxis_list;
							this.get_list_book_purchase_sub_sub(v1,"purchase_date",names_flag,flag);
						}
				});
			},
			async get_list_book_purchase_sub_sub(v1,v2,names_flag,xAxis_flag) {
				let data_str = "{\""+v1+"\":\"\",\""+v2+"\":\"\"}";
				let data2 = JSON.parse(data_str);
				let user_group = this.$store.state.user.user_group;
				let user_id = this.$store.state.user.user_id;
				if (user_group!='管理员'){
					if (user_group=="教师用户"){
						data2.buy_teachers = user_id;
					}
				}
				for (let i=0;i<this.line_obj_book_purchase.xAxis.length;i++){
					let list = []
					for (let j=0;j<this.line_obj_book_purchase.names.length;j++){
						data2[v2] = this.line_obj_book_purchase.xAxis[i];
						data2[v1] = this.line_obj_book_purchase.names[j];
						await this.$get(
								"~/api/book_purchase/sum?field=total_price",
								data2,
								(json) => {
									if (json.result) {
										list[j] = json.result;
									}else {
										list[j] = 0;
									}
								});
					}
					this.line_obj_book_purchase.values.push(list)
				}
				if (names_flag){
					this.get_nickname(this.line_obj_book_purchase.names,true);
				}
				if (xAxis_flag){
					this.get_nickname(this.line_obj_book_purchase.xAxis,true);
				}
			},
			// 获取领书信息统计折线图
			async get_list_book_receiving_information() {
				let group_by_value = "textbook_name";
				let data2 = {};
				let flag = false;
				let user_group = this.$store.state.user.user_group;
				let user_id = this.$store.state.user.user_id;
				if (user_group!='管理员'){
					if (user_group=="教师用户"){
						data2.buy_teachers = user_id;
					}
				}
				await this.$get(
					"~/api/book_receiving_information/get_list?groupby="+group_by_value,data2,
					(json) => {
						if (json.result) {
							let list = json.result.list;
							let name_list = [];
							for (let i=0;i<list.length;i++){
								name_list.push(list[i].textbook_name);
							}
							this.line_obj_book_receiving_information.names = name_list;
							this.get_list_book_receiving_information_sub("textbook_name",flag);
						}
				});
			},
			async get_list_book_receiving_information_sub(v1,names_flag) {
				let data2 = {};
				let flag2 = false;
				let user_group2 = this.$store.state.user.user_group;
				let user_id2 = this.$store.state.user.user_id;
				if (user_group2!='管理员'){
					if (user_group2=="教师用户"){
						data2.buy_teachers = user_id2;
					}
				}
				await this.$get(
					"~/api/book_receiving_information/get_list?groupby=purchase_quantity",data2,
					(json) => {
						if (json.result) {
							let list = json.result.list;
							let xAxis_list = [];
							for (let i=0;i<list.length;i++){
								xAxis_list.push(list[i].purchase_quantity);
							}
							this.line_obj_book_receiving_information.xAxis = xAxis_list;
							this.get_list_book_receiving_information_sub_sub(v1,"purchase_quantity",names_flag,flag2);
						}
				});
				let data3 = {};
				let flag = false;
				let user_group = this.$store.state.user.user_group;
				let user_id = this.$store.state.user.user_id;
				if (user_group!='管理员'){
					if (user_group=="教师用户"){
						data3.buy_teachers = user_id;
					}
				}
				await this.$get(
					"~/api/book_receiving_information/get_list?groupby=collection_date",data3,
					(json) => {
						if (json.result) {
							let list = json.result.list;
							let xAxis_list = [];
							for (let i=0;i<list.length;i++){
								xAxis_list.push(this.$toTime(list[i].collection_date ,"yyyy-MM-dd"));
							}
							this.line_obj_book_receiving_information.xAxis = xAxis_list;
							this.get_list_book_receiving_information_sub_sub(v1,"collection_date",names_flag,flag);
						}
				});
			},
			async get_list_book_receiving_information_sub_sub(v1,v2,names_flag,xAxis_flag) {
			},
				getUserInfo(){
					let userGroup = window.localStorage.getItem('user_group');
						if(userGroup){
						let _userGroup =JSON.parse(userGroup);
						let _info = JSON.parse(_userGroup.value);
						this.isAdmin = _info["user_group"] == "管理员" ? true : false;
					}
			}

		},
		computed:{
			recognitionHeight(){
				if(this.recognitionType === "face"){
					return "1070px"
				}else{
					return "1180px"
				}
			},
			recognitionUrl(){
					if(this.recognitionType === "face"){
					return "https://www.sk-ai.com/Experience/face-compare"
				}else{
					return "https://www.sk-ai.com/Experience/recognition?type="
				}
			}
		}
	};
</script>

<style scoped="scoped">
	.chart {
		display: block;
		width: 100%;
		height: 400px;
		padding: 1rem;
		position: relative;
	}

	.el-col {
		padding: 0.5rem;
	}

	.card {
		overflow: hidden;
	}
	
	.iframe_box ,.iframe_box_change{
		width: 100%;
		height: 1180px;
		position: relative;
		margin-top: 25px;
	}
	.iframe_box_change{
		height: 580px;
		padding-top: 50px;
	}
.iframe_box	.iframe_box_content, .iframe_box_change .iframe_box_content{
	width: 100%;
	height: 100%;
}
.iframe_box_top{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100px;
	font-size: 25px;
	line-height: 100px;
	background: #fff;
	z-index: 99999999;
	padding-left: 50px;
}
</style>
