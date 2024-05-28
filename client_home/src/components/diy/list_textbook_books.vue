<template>
	<div class="diy_home diy_list diy_textbook_books" id="diy_textbook_books_list">
		<!-- 列表 -->
		<div class="diy_view_list list list-x" v-if="show">
			<router-link class="diy_card goods diy_list_box_wrap" v-for="(o, i) in list" :key="i"
				:to="'/textbook_books/details?textbook_books_id=' + o['textbook_books_id']">
				<!-- 图片 -->
				<div class="diy_list_img_box" v-if="imgList.length" >
					<div class="diy_row" v-for="(item,index) in imgList" :key="item+index" v-show="$check_field('get',item.name,'/textbook_books/details') && +item.is_img_list">
						<div class="diy_title diy_list_img_title">
							<span>{{item.title}}:</span>
						</div>
						<div class="diy_field diy_img">
							<img :src="$fullUrl(o[item.name])" style="width:100%;height:100%" />
						</div>
					</div>
				</div>
				<!-- 内容 -->
				<div class="diy_list_item_box">
					<div class="diy_list_item_content" v-for="(item,index) in showItemList" :key="item+index">
						<div class="diy_row" :class="{[item.name]:true}" v-if="$check_field('get',item.name,'/textbook_books/details') && +item.is_img_list">
							<div class="diy_title">
								<span>{{item.title}}:</span>
							</div>
							<div class="diy_field diy_text">
								<span v-if="item.type == 'UID'" v-text="get_user_name(o[item.name])"></span>
								<span v-else-if="item.type == '日期'" v-text="$toTime(o[item.name],'yyyy-MM-dd')"></span>
								<span v-else-if="item.type == '时间'" v-text="$toTime(o[item.name],'hh:mm:ss')"></span>
								<span v-else-if="item.type == '日长'" v-text="$toTime(o[item.name],'yyyy-MM-dd hh:mm:ss')"></span>
								<span v-else v-text="o[item.name]"></span>
							</div>
						</div>
					</div>
				</div>
			</router-link>
		</div>
		<!-- 表格 -->
		<div class="diy_view_table" v-else>
			<table class="diy_table">
				<tr class="diy_row">
					<th class="diy_title" v-if="$check_field('get','textbook_name')">教材名称
					</th>
					<th class="diy_title" v-if="$check_field('get','textbook_type')">教材类型
					</th>
					<th class="diy_title" v-if="$check_field('get','textbook_subjects')">教材科目
					</th>
					<th class="diy_title" v-if="$check_field('get','book_pictures')">书籍图片
					</th>
					<th class="diy_title" v-if="$check_field('get','book_author')">书籍作者
					</th>
					<th class="diy_title" v-if="$check_field('get','publication_date')">出版日期
					</th>
					<th class="diy_title" v-if="$check_field('get','publishing_unit')">出版单位
					</th>
					<th class="diy_title" v-if="$check_field('get','book_price')">书籍价格
					</th>
					<th class="diy_title" v-if="$check_field('get','number_of_books')">书籍数量
					</th>
					<th class="diy_title" v-if="$check_field('get','issuer')">发行人员
					</th>
				</tr>
				<tr class="diy_row" v-for="(o,i) in list" :key="o+i">
					<td class="diy_field diy_text" v-if="$check_field('get','textbook_name')">
						<span>
							{{ o["textbook_name"] }}
						</span>
					</td>
					<td class="diy_field diy_text" v-if="$check_field('get','textbook_type')">
						<span>
							{{ o["textbook_type"] }}
						</span>
					</td>
					<td class="diy_field diy_text" v-if="$check_field('get','textbook_subjects')">
						<span>
							{{ o["textbook_subjects"] }}
						</span>
					</td>
					<td class="diy_field" v-if="$check_field('get','book_pictures')">
						<img class="diy_img" :src="o['book_pictures']" />
					</td>
					<td class="diy_field diy_text" v-if="$check_field('get','book_author')">
						<span>
							{{ o["book_author"] }}
						</span>
					</td>
					<td class="diy_field diy_date" v-if="$check_field('get','publication_date')">
						<span>
							{{ $toTime(o["publication_date"] ,"yyyy-MM-dd") }}
						</span>
					</td>
					<td class="diy_field diy_text" v-if="$check_field('get','publishing_unit')">
						<span>
							{{ o["publishing_unit"] }}
						</span>
					</td>
					<td class="diy_field diy_text" v-if="$check_field('get','book_price')">
						<span>
							{{ o["book_price"] }}
						</span>
					</td>
					<td class="diy_field diy_text" v-if="$check_field('get','number_of_books')">
						<span>
							{{ o["number_of_books"] }}
						</span>
					</td>
					<td class="diy_field diy_uid" v-if="$check_field('get','issuer')">
						<span>
							{{ get_user_name(o['issuer']) }}
						</span>
					</td>
				</tr>
			</table>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default: function() {
					return [];
				},
			},
			show: {
				type: Boolean,
				default: function(){
					return true;
				}
			}
		},
		data() {
			return {
						imgList: [
						{
							title: "书籍图片",
							name: "book_pictures",
							type: "图片",
							is_img_list: "1"
						},
						],
						itemList: [
								{
									title: "教材名称",
									name: "textbook_name",
									type: "文本",
									is_img_list: "1"
								},
								{
									title: "教材类型",
									name: "textbook_type",
									type: "文本",
									is_img_list: "0"
								},
								{
									title: "教材科目",
									name: "textbook_subjects",
									type: "文本",
									is_img_list: "1"
								},
								{
									title: "书籍作者",
									name: "book_author",
									type: "文本",
									is_img_list: "0"
								},
								{
									title: "出版日期",
									name: "publication_date",
									type: "日期",
									is_img_list: "0"
								},
								{
									title: "出版单位",
									name: "publishing_unit",
									type: "文本",
									is_img_list: "0"
								},
								{
									title: "书籍价格",
									name: "book_price",
									type: "文本",
									is_img_list: "0"
								},
								{
									title: "书籍数量",
									name: "number_of_books",
									type: "文本",
									is_img_list: "0"
								},
								{
									title: "发行人员",
									name: "issuer",
									type: "UID",
									is_img_list: "0"
								},
						],
						richList: [
								{
									title: "书籍简介",
									name: "book_introduction",
									type: "编辑"
								},
						],
				// 用户列表
				list_user_issuer: [],
			};
		},
		methods: {
			/**
			 * 获取发行人员用户列表
			 */
			async get_list_user_issuer() {
				var json = await this.$get("~/api/user/get_list?user_group=发行人员");
				if(json.result && json.result.list){
					this.list_user_issuer = json.result.list;
				}
				else if(json.error){
					console.error(json.error);
				}
			},
			get_user_name(id){
				var obj = this.list_user_issuer.getObj({"user_id":id});
				var ret = "";
				if(obj){
					ret = obj.nickname+"-"+obj.username;
					// if(obj.nickname){
					// 	ret = obj.nickname;
					// }
					// else{
					// 	ret = obj.username;
					// }
				}
				return ret;
			},
		},
		created() {
			this.get_list_user_issuer();
		},
		computed:{
			showItemList(){
				let arr = [];
				let _type = ["视频","音频","文件"];
				this.itemList.forEach(item => {
					if(_type.indexOf(item.type) === -1 && !!+item.is_img_list){
						arr.push(item)
					}
				})
				return arr.slice(0,4);
			}
		}
	};
</script>

<style scoped>
	.media {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		flex-basis: 75%;
		min-height: 10rem;
	}

	.goods {
		display: flex;
		width: calc(25% - 1rem);
		margin: 0.5rem;
		padding: 0.5rem;
		flex-direction: column;
		justify-content: space-between;
		background-color: white;
		border-radius: 0.5rem;
	}

	.goods:hover {
		border: 0.2rem solid #909399;
		box-shadow: 0 0.1rem 0.3rem rgba(0, 0, 0, 0.15);
	}

	.goods:hover img {
		filter: blur(1px);
	}

	.price {
		font-size: 1rem;
		margin-right: 3px;
	}

	.price_ago {
		text-decoration: line-through;
		font-size: 0.5rem;
		color: #999;

	}

	.title {
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-weight: 700;
		padding: .25rem;
	}

	.icon_cart {
		color: #FF5722;
		float: right;
	}

	@media (max-width: 992px) {

		.goods {
			width: calc(33% - 1rem);
			;
		}

	}

	@media (max-width: 768px) {

		.goods {
			width: calc(50% - 1rem);
			;
		}

	}
</style>

