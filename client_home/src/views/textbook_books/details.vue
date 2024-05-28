<template>
	<div class="diy_details page_textbook_books" id="textbook_books_details">
		<div class='warp'>
			<div class='container'>
				<div class='row'>
					<div class='col'>
						<div class='card_textbook_books'>
							<div_textbook_books :obj="obj"></div_textbook_books>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 评论区 -->
		<div class="warp" v-if="$check_action('/comment/list', 'get')">
			<div class="container">
				<div class="row">
					<!-- 评论区 -->
					<div class="col">
						<bar_title class="mt" title="评论区"	v-if="list_comment.length"/>
						<div class="comment_box"	v-if="list_comment.length">
							<list_comment
									class="w-100"
									:list="list_comment"
									:obj="form_comment"
							/>
							<b-pagination-nav
									:base-url="$route.path"
									:number-of-pages="count_pages"
									:link-gen="link_gen"
									@change="change_page"
									first-number
									last-number
							/>
						</div>

						<!-- 发表评论 -->
						<div class="form_editor form_edit_box">							
							<div class="details_form_editor_title">发表评论</div>
							<div class="fl ml-3 answer_title" v-show="form_comment.reply_to_id">
								对 <i>{{ respondent }}</i> 回复:
							</div>
							<div class="fr mr-3" v-show="form_comment.reply_to_id">
								<b-button
										variant="outline-primary reset_answer_personnel"
										size="sm"
										@click="form_comment.reply_to_id = 0"
								>重置回复人
								</b-button
								>
							</div>
							<form_editor
									class="fn"
									:form="form_comment"
									@update_comment="update_comment"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import div_textbook_books from "@/components/diy/div_textbook_books.vue";
	import list_comment from "@/components/diy/list_comment.vue";
	import bar_title from "@/components/diy/bar_title.vue";
	import form_editor from "@/components/diy/form_editor.vue";
	import mixin from "@/mixins/page.js";
	export default {
		mixins:[mixin],
		components:{
			list_comment,
			bar_title,
			form_editor,
			div_textbook_books
		},
		data(){
			return{
				url_get_obj: "~/api/textbook_books/get_obj?",

				field: "textbook_books_id",

				obj: {
					"praise_len": 0,
				},

				query: {
					"textbook_name": "",
					"textbook_type": "",
					"textbook_subjects": "",
					"book_pictures": "",
					"book_author": "",
					"publication_date": "",
					"publishing_unit": "",
					"book_price": "",
					"number_of_books": "",
					"issuer": 0,
					"book_introduction": "",
					"textbook_books_id":0,
				},
				// 点赞
				praise: 0,
				// 点赞状态
				state_praise: false,
				// 收藏状态
				state_collect: false,
				list_comment: [],
				form_comment: {
					source_table: "textbook_books",
					source_field: "textbook_books_id",
					source_id: 0,
					reply_to_id: 0,
				},
				count_pages: 1, // 页面数
				
			}
		},
		methods:{
			/**
			 * 添加访问量
			 */
			add_hits(obj) {
				obj["hits"] = obj["hits"] + 1;
				var hits = obj["hits"];
				this.$post('~/api/textbook_books/set?textbook_books_id=' + obj["textbook_books_id"], {
					hits
				}, (res) => {
					if(res.result){
						console.log("添加访问量状态：" ,res.result);
						var body = {
							source_table: "textbook_books",
							source_field: "textbook_books_id",
							source_id: this.obj.textbook_books_id,
							user_id: this.$store.state.user.user_id,
						};
						this.$post("~/api/hits/add?", body, (res) => {
							console.log(res);
						});
					}
					else if(res.error){
						console.error(res.error);
					}
				});
			},
			get_obj_after(json) {
				// 判断是否获取到数据
				if (json && json.result && json.result.obj) {
					console.log(json.result.obj)
					var obj = json.result.obj;
					this.obj = obj
					// 增加点击数
					this.add_hits(obj);
					// 获取点赞数
					this.get_praise(obj);
					// 初始化收藏状态
					this.get_collect(obj);
					this.get_comment(obj);
					this.form_comment.source_id = this.obj.textbook_books_id;
				}
			},
			/**
			 * 初始化收藏状态
			 * @param {Object} obj
			 */
			get_collect(obj) {
				var user_id = this.user.user_id;

				var query = {
					source_table: "textbook_books",
					source_field: "textbook_books_id",
					source_id: obj["textbook_books_id"],
					user_id
				};

				this.$get('~/api/collect/count?', query, (res) => {
					console.log(res);
					if (res.result || res.result === 0) {
						var bl = res.result ? true : false;
						this.state_collect = bl;
						console.log("收藏状态：" + bl);
					}
					else if(res.error) {
						console.error(res.error);
					}
				});
			},
		 /****
			 * 分享点击
			 * 
			 *  */ 
			toShare(e){
				window.open(e);
			},
			/**
			 * 改变收藏状态
			 */
			change_collect() {
				var user_id = this.user.user_id;

				var query = {
					source_table: "textbook_books",
					source_field: "textbook_books_id",
					source_id: this.obj["textbook_books_id"],
					user_id
				};

				// 收藏状态
				if (this.state_collect) {
					this.state_collect = false;
					this.$get('~/api/collect/del?', query, (res) => {
						if(res.result){
							this.$toast("取消收藏");
						}
						else if (res.error){
							this.$toast(res.error.message);
							console.error(res.error);
						}
					});
				} else {
					this.state_collect = true;
					query.title = this.obj.textbook_name
					query.img = this.obj.book_pictures
					this.$post('~/api/collect/add?', query, (res) => {
						if (res.result) {
							this.$toast("收藏成功");
						}
						else if (res.error) {
							this.$toast(res.error.message);
							console.error(res.error);
						}
					});
				};
			},
			/**
			 * 获取点赞
			 * @param {Object} obj
			 */
			get_praise(obj) {
				var user_id = this.user.user_id;

				this.$get("~/api/praise/count?", {
					source_table: "textbook_books",
					source_field: "textbook_books_id",
					source_id: obj["textbook_books_id"]
				}, (res) => {
					if (res.result || res.result === 0) {
						this.praise = res.result;
						console.log("点赞数：" ,res.result);
					}
					else if (res.error){
						this.$toast(res.error.message);
						console.error(res.error);
					}
				});

				this.$get("~/api/praise/count?", {
					source_table: "textbook_books",
					source_field: "textbook_books_id",
					source_id: obj["textbook_books_id"],
					user_id
				}, (res) => {
					if (res.result || res.result === 0) {
						this.state_praise = res.result ? true : false;
						console.log("点赞状态：" ,res.result);
					}
					else if (res.error){
						this.$toast(res.error.message);
						console.error(res.error);
					}
				})
			},

			/**
			 * 改变点赞数
			 */
			change_praise(obj) {
				var user_id = this.user.user_id;

				var query = {
					source_table: "textbook_books",
					source_field: "textbook_books_id",
					source_id: this.obj["textbook_books_id"],
					user_id
				};

				var _this = this;
        _this.obj.praise_len = parseInt(_this.obj.praise_len)
				// 点赞状态
				if (this.state_praise) {
					this.state_praise = false;
					this.$get('~/api/praise/del?', query, (res) => {
						if(res.result){
							var praise_len = _this.obj.praise_len-1
							this.$post('~/api/textbook_books/set?textbook_books_id=' + _this.obj["textbook_books_id"], {
								praise_len
							}, (res) => {
								if(res.result){
									console.log("添加点赞数状态：" ,res.result);
								}
								else if(res.error){
									console.error(res.error);
								}
							});
							this.$toast("取消点赞");
						}
						else if (res.error){
							this.$toast(res.error.message);
							console.error(res.error);
						}
					});
				} else {
					this.state_praise = true;
					this.$post('~/api/praise/add?', query, (res) => {
						if (res.result) {
							var praise_len = _this.obj.praise_len+1
							this.$post('~/api/textbook_books/set?textbook_books_id=' + _this.obj["textbook_books_id"], {
								praise_len
							}, (res) => {
								if(res.result){
									console.log("添加点赞数状态：" ,res.result);
								}
								else if(res.error){
									console.error(res.error);
								}
							});
							this.$toast("点赞成功");
						}
						else if (res.error) {
							this.$toast(res.error.message);
							console.error(res.error);
						}
					});
				};
			},
			/**
			 * 分页器
			 * @param { Number } page_num 分页数
			 * @return { Object } 查询对象
			 */
			link_gen(page_num) {
				return {
					query: this.query,
				};
			},
			/**
			 *加载下一页
			 */
			change_page(page_num) {
				this.get_comment(this.obj, page_num);
				this.form_comment.reply_to_id = 0;
			},
			/**
			 * 更新评论
			 */
			update_comment() {
				this.get_comment(this.obj);
			},
			/**
			 * 获取评论
			 * @param { Object } obj 文章对象
			 * @param { Number } page 分页数
			 * @param { Number } size 评论显示条数
			 */
			get_comment(obj, page = 1, size = 5) {
				this.$get(
						"~/api/comment/get_list?",
						{
							source_table: "textbook_books",
							source_field: "textbook_books_id",
							source_id: this.obj["textbook_books_id"],
							page,
							size,
							reply_to_id: "0",
							orderby: "create_time desc",
						},
						(json) => {
							if (json.result) {
								var list_comment = json.result.list;
								list_comment.map((o) => {
									o.list_reply = [];
								});
								this.add_reply(list_comment).then((list) => {
									this.list_comment = list;
								});
								this.count_pages = Math.ceil(json.result.count / size) || 1
							}
						}
				);
			},
			/**
			 * @param { Array } list 评论列表
			 * 添加回复到评论列表
			 */
			add_reply(list) {
				return new Promise((resolve) => {
					for (let idx = 0; idx < list.length; idx++) {
						const obj = list[idx];
						this.$get(
								"~/api/comment/get_list?",
								{
									source_table: "textbook_books",
									source_field: "textbook_books_id",
									source_id: this.obj["textbook_books_id"],
									orderby: "create_time desc",
									reply_to_id: obj.comment_id,
								},
								(res) => {
									if (res.result) {
										obj.list_reply = res.result.list;
									}
								}
						);
					}
					resolve(list);
				});
			},
		},
		computed: {
			respondent() {
				var reply_to_id = this.form_comment.reply_to_id;
				var respondent = "";
				this.list_comment.map((o) => {
					if (o.comment_id === reply_to_id) {
						respondent = o.nickname;
					}
				});
				return respondent;
			},
		},
		
		mounted() {
			
		},
		
	}
</script>

<style>
.qecode {
  display: flex;
  align-content: center;
  width: 270px;
  background: white;
  position: absolute;
  left: 20%;
  top: 20px;
  z-index: 999;
}
.qecodeImg {
  display: flex;
  flex-direction: column;
  align-content: center;
  text-align: center;
  padding-top: 10px;
  margin: 0 auto;
}
.btn_share{
	display: inline-block;
	position: relative;
	top: 15px;
	background: rgb(240, 238, 238);
	border: 1px solid #ccc;
	height: 38px;
	margin-left: 10px;
	padding: 3px 10px;
	cursor: pointer;
	overflow: hidden;
	border-radius: 5px;
}
.btn_share_icon{
	width: 30px;
	height: 28px;
	float: left;
	margin-right: 10px;
}
.share_box{
	display: none;
	float: left;
}
.share_box img{
	width: 30px;
	height: 28px;
	margin-right: 10px;
}
.btn_share:hover .share_box{
	display: block;
}
</style>
