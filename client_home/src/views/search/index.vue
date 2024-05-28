<template>
  <div class="page_search">
	<div class="warp">
	  <div class="container">
		<div class="row">
		  <div class="col-12">
			<div class="card_result_search">
			  <div class="title">搜索结果</div>
				<!-- 文章搜索结果 -->
			  <list_result_search
				:list="result_article"
				title="教材资讯"
				source_table="article"
			  ></list_result_search>
			  <list_result_search
				v-if="$check_action('/teacher_user/list', 'get')"
				:list="result_teacher_user_teacher_name"
				title="教师用户教师姓名"
				source_table="teacher_user"
			  ></list_result_search>
			  <list_result_search
				v-if="$check_action('/issuer/list', 'get')"
				:list="result_issuer_employee_name"
				title="发行人员员工姓名"
				source_table="issuer"
			  ></list_result_search>
			  <list_result_search
				v-if="$check_action('/purchasing_personnel/list', 'get')"
				:list="result_purchasing_personnel_personnel_name"
				title="采购人员人员姓名"
				source_table="purchasing_personnel"
			  ></list_result_search>
			  <list_result_search
				v-if="$check_action('/textbook_books/list', 'get')"
				:list="result_textbook_books_textbook_name"
				title="教材书籍教材名称"
				source_table="textbook_books"
			  ></list_result_search>
			  <list_result_search
				v-if="$check_action('/textbook_books/list', 'get')"
				:list="result_textbook_books_textbook_type"
				title="教材书籍教材类型"
				source_table="textbook_books"
			  ></list_result_search>
			  <list_result_search
				v-if="$check_action('/textbook_books/list', 'get')"
				:list="result_textbook_books_textbook_subjects"
				title="教材书籍教材科目"
				source_table="textbook_books"
			  ></list_result_search>
			  <list_result_search
				v-if="$check_action('/book_purchase/list', 'get')"
				:list="result_book_purchase_textbook_name"
				title="书籍购买教材名称"
				source_table="book_purchase"
			  ></list_result_search>
			  <list_result_search
				v-if="$check_action('/book_purchase/list', 'get')"
				:list="result_book_purchase_textbook_type"
				title="书籍购买教材类型"
				source_table="book_purchase"
			  ></list_result_search>
			  <list_result_search
				v-if="$check_action('/book_purchase/list', 'get')"
				:list="result_book_purchase_textbook_subjects"
				title="书籍购买教材科目"
				source_table="book_purchase"
			  ></list_result_search>
			  <list_result_search
				v-if="$check_action('/book_receiving_information/list', 'get')"
				:list="result_book_receiving_information_textbook_name"
				title="领书信息教材名称"
				source_table="book_receiving_information"
			  ></list_result_search>
			  <list_result_search
				v-if="$check_action('/book_receiving_information/list', 'get')"
				:list="result_book_receiving_information_textbook_type"
				title="领书信息教材类型"
				source_table="book_receiving_information"
			  ></list_result_search>
			  <list_result_search
				v-if="$check_action('/book_receiving_information/list', 'get')"
				:list="result_book_receiving_information_textbook_subjects"
				title="领书信息教材科目"
				source_table="book_receiving_information"
			  ></list_result_search>
			  <list_result_search
				v-if="$check_action('/book_purchasing/list', 'get')"
				:list="result_book_purchasing_textbook_name"
				title="书籍采购教材名称"
				source_table="book_purchasing"
			  ></list_result_search>
			  <list_result_search
				v-if="$check_action('/book_purchasing/list', 'get')"
				:list="result_book_purchasing_textbook_type"
				title="书籍采购教材类型"
				source_table="book_purchasing"
			  ></list_result_search>
			  <list_result_search
				v-if="$check_action('/book_purchasing/list', 'get')"
				:list="result_book_purchasing_textbook_subjects"
				title="书籍采购教材科目"
				source_table="book_purchasing"
			  ></list_result_search>
			  <list_result_search
				v-if="$check_action('/book_shortage_information/list', 'get')"
				:list="result_book_shortage_information_textbook_name"
				title="缺书信息教材名称"
				source_table="book_shortage_information"
			  ></list_result_search>
			  <list_result_search
				v-if="$check_action('/book_shortage_information/list', 'get')"
				:list="result_book_shortage_information_textbook_type"
				title="缺书信息教材类型"
				source_table="book_shortage_information"
			  ></list_result_search>
			  <list_result_search
				v-if="$check_action('/book_shortage_information/list', 'get')"
				:list="result_book_shortage_information_textbook_subjects"
				title="缺书信息教材科目"
				source_table="book_shortage_information"
			  ></list_result_search>
			</div>
		  </div>
		</div>
	  </div>
	</div>
  </div>
</template>

<script>
import mixin from "../../mixins/page.js";
import list_result_search from "../../components/diy/list_result_search.vue";

export default {
  mixins: [mixin],
  data() {
	return {
	  "query": {
		word: "",
	  },
	  "result_article": [],
			"result_teacher_user_teacher_name":[],
			"result_issuer_employee_name":[],
			"result_purchasing_personnel_personnel_name":[],
			"result_textbook_books_textbook_name":[],
			"result_textbook_books_textbook_type":[],
			"result_textbook_books_textbook_subjects":[],
			"result_book_purchase_textbook_name":[],
			"result_book_purchase_textbook_type":[],
			"result_book_purchase_textbook_subjects":[],
			"result_book_receiving_information_textbook_name":[],
			"result_book_receiving_information_textbook_type":[],
			"result_book_receiving_information_textbook_subjects":[],
			"result_book_purchasing_textbook_name":[],
			"result_book_purchasing_textbook_type":[],
			"result_book_purchasing_textbook_subjects":[],
			"result_book_shortage_information_textbook_name":[],
			"result_book_shortage_information_textbook_type":[],
			"result_book_shortage_information_textbook_subjects":[],
	};
  },
  methods: {
	/**
	 * 获取文章
	 */
	get_article() {
	  this.$get("~/api/article/get_list?like=0", { page: 1, size: 10, title: this.query.word }, (json) => {
		if (json.result) {
		  this.result_article = json.result.list;
		}
	  });
	},
	/**
	 * 获取teacher_name
	 */
	get_teacher_user_teacher_name(){
		this.$get("~/api/teacher_user/get_list?like=0", { page: 1, size: 10, "teacher_name": this.query.word }, (json) => {
		  if (json.result) {
			var result_teacher_user_teacher_name = json.result.list;
			result_teacher_user_teacher_name.map(o => o.title = o['teacher_name'])
	  			this.result_teacher_user_teacher_name = result_teacher_user_teacher_name
		 	}
		});
	},
	/**
	 * 获取employee_name
	 */
	get_issuer_employee_name(){
		this.$get("~/api/issuer/get_list?like=0", { page: 1, size: 10, "employee_name": this.query.word }, (json) => {
		  if (json.result) {
			var result_issuer_employee_name = json.result.list;
			result_issuer_employee_name.map(o => o.title = o['employee_name'])
	  			this.result_issuer_employee_name = result_issuer_employee_name
		 	}
		});
	},
	/**
	 * 获取personnel_name
	 */
	get_purchasing_personnel_personnel_name(){
		this.$get("~/api/purchasing_personnel/get_list?like=0", { page: 1, size: 10, "personnel_name": this.query.word }, (json) => {
		  if (json.result) {
			var result_purchasing_personnel_personnel_name = json.result.list;
			result_purchasing_personnel_personnel_name.map(o => o.title = o['personnel_name'])
	  			this.result_purchasing_personnel_personnel_name = result_purchasing_personnel_personnel_name
		 	}
		});
	},
	/**
	 * 获取textbook_name
	 */
	get_textbook_books_textbook_name(){
		this.$get("~/api/textbook_books/get_list?like=0", { page: 1, size: 10, "textbook_name": this.query.word }, (json) => {
		  if (json.result) {
			var result_textbook_books_textbook_name = json.result.list;
			result_textbook_books_textbook_name.map(o => o.title = o['textbook_name'])
	  			this.result_textbook_books_textbook_name = result_textbook_books_textbook_name
		 	}
		});
	},
	/**
	 * 获取textbook_type
	 */
	get_textbook_books_textbook_type(){
		this.$get("~/api/textbook_books/get_list?like=0", { page: 1, size: 10, "textbook_type": this.query.word }, (json) => {
		  if (json.result) {
			var result_textbook_books_textbook_type = json.result.list;
			result_textbook_books_textbook_type.map(o => o.title = o['textbook_type'])
	  			this.result_textbook_books_textbook_type = result_textbook_books_textbook_type
		 	}
		});
	},
	/**
	 * 获取textbook_subjects
	 */
	get_textbook_books_textbook_subjects(){
		this.$get("~/api/textbook_books/get_list?like=0", { page: 1, size: 10, "textbook_subjects": this.query.word }, (json) => {
		  if (json.result) {
			var result_textbook_books_textbook_subjects = json.result.list;
			result_textbook_books_textbook_subjects.map(o => o.title = o['textbook_subjects'])
	  			this.result_textbook_books_textbook_subjects = result_textbook_books_textbook_subjects
		 	}
		});
	},
	/**
	 * 获取textbook_name
	 */
	get_book_purchase_textbook_name(){
		this.$get("~/api/book_purchase/get_list?like=0", { page: 1, size: 10, "textbook_name": this.query.word }, (json) => {
		  if (json.result) {
			var result_book_purchase_textbook_name = json.result.list;
			result_book_purchase_textbook_name.map(o => o.title = o['textbook_name'])
	  			this.result_book_purchase_textbook_name = result_book_purchase_textbook_name
		 	}
		});
	},
	/**
	 * 获取textbook_type
	 */
	get_book_purchase_textbook_type(){
		this.$get("~/api/book_purchase/get_list?like=0", { page: 1, size: 10, "textbook_type": this.query.word }, (json) => {
		  if (json.result) {
			var result_book_purchase_textbook_type = json.result.list;
			result_book_purchase_textbook_type.map(o => o.title = o['textbook_type'])
	  			this.result_book_purchase_textbook_type = result_book_purchase_textbook_type
		 	}
		});
	},
	/**
	 * 获取textbook_subjects
	 */
	get_book_purchase_textbook_subjects(){
		this.$get("~/api/book_purchase/get_list?like=0", { page: 1, size: 10, "textbook_subjects": this.query.word }, (json) => {
		  if (json.result) {
			var result_book_purchase_textbook_subjects = json.result.list;
			result_book_purchase_textbook_subjects.map(o => o.title = o['textbook_subjects'])
	  			this.result_book_purchase_textbook_subjects = result_book_purchase_textbook_subjects
		 	}
		});
	},
	/**
	 * 获取textbook_name
	 */
	get_book_receiving_information_textbook_name(){
		this.$get("~/api/book_receiving_information/get_list?like=0", { page: 1, size: 10, "textbook_name": this.query.word }, (json) => {
		  if (json.result) {
			var result_book_receiving_information_textbook_name = json.result.list;
			result_book_receiving_information_textbook_name.map(o => o.title = o['textbook_name'])
	  			this.result_book_receiving_information_textbook_name = result_book_receiving_information_textbook_name
		 	}
		});
	},
	/**
	 * 获取textbook_type
	 */
	get_book_receiving_information_textbook_type(){
		this.$get("~/api/book_receiving_information/get_list?like=0", { page: 1, size: 10, "textbook_type": this.query.word }, (json) => {
		  if (json.result) {
			var result_book_receiving_information_textbook_type = json.result.list;
			result_book_receiving_information_textbook_type.map(o => o.title = o['textbook_type'])
	  			this.result_book_receiving_information_textbook_type = result_book_receiving_information_textbook_type
		 	}
		});
	},
	/**
	 * 获取textbook_subjects
	 */
	get_book_receiving_information_textbook_subjects(){
		this.$get("~/api/book_receiving_information/get_list?like=0", { page: 1, size: 10, "textbook_subjects": this.query.word }, (json) => {
		  if (json.result) {
			var result_book_receiving_information_textbook_subjects = json.result.list;
			result_book_receiving_information_textbook_subjects.map(o => o.title = o['textbook_subjects'])
	  			this.result_book_receiving_information_textbook_subjects = result_book_receiving_information_textbook_subjects
		 	}
		});
	},
	/**
	 * 获取textbook_name
	 */
	get_book_purchasing_textbook_name(){
		this.$get("~/api/book_purchasing/get_list?like=0", { page: 1, size: 10, "textbook_name": this.query.word }, (json) => {
		  if (json.result) {
			var result_book_purchasing_textbook_name = json.result.list;
			result_book_purchasing_textbook_name.map(o => o.title = o['textbook_name'])
	  			this.result_book_purchasing_textbook_name = result_book_purchasing_textbook_name
		 	}
		});
	},
	/**
	 * 获取textbook_type
	 */
	get_book_purchasing_textbook_type(){
		this.$get("~/api/book_purchasing/get_list?like=0", { page: 1, size: 10, "textbook_type": this.query.word }, (json) => {
		  if (json.result) {
			var result_book_purchasing_textbook_type = json.result.list;
			result_book_purchasing_textbook_type.map(o => o.title = o['textbook_type'])
	  			this.result_book_purchasing_textbook_type = result_book_purchasing_textbook_type
		 	}
		});
	},
	/**
	 * 获取textbook_subjects
	 */
	get_book_purchasing_textbook_subjects(){
		this.$get("~/api/book_purchasing/get_list?like=0", { page: 1, size: 10, "textbook_subjects": this.query.word }, (json) => {
		  if (json.result) {
			var result_book_purchasing_textbook_subjects = json.result.list;
			result_book_purchasing_textbook_subjects.map(o => o.title = o['textbook_subjects'])
	  			this.result_book_purchasing_textbook_subjects = result_book_purchasing_textbook_subjects
		 	}
		});
	},
	/**
	 * 获取textbook_name
	 */
	get_book_shortage_information_textbook_name(){
		this.$get("~/api/book_shortage_information/get_list?like=0", { page: 1, size: 10, "textbook_name": this.query.word }, (json) => {
		  if (json.result) {
			var result_book_shortage_information_textbook_name = json.result.list;
			result_book_shortage_information_textbook_name.map(o => o.title = o['textbook_name'])
	  			this.result_book_shortage_information_textbook_name = result_book_shortage_information_textbook_name
		 	}
		});
	},
	/**
	 * 获取textbook_type
	 */
	get_book_shortage_information_textbook_type(){
		this.$get("~/api/book_shortage_information/get_list?like=0", { page: 1, size: 10, "textbook_type": this.query.word }, (json) => {
		  if (json.result) {
			var result_book_shortage_information_textbook_type = json.result.list;
			result_book_shortage_information_textbook_type.map(o => o.title = o['textbook_type'])
	  			this.result_book_shortage_information_textbook_type = result_book_shortage_information_textbook_type
		 	}
		});
	},
	/**
	 * 获取textbook_subjects
	 */
	get_book_shortage_information_textbook_subjects(){
		this.$get("~/api/book_shortage_information/get_list?like=0", { page: 1, size: 10, "textbook_subjects": this.query.word }, (json) => {
		  if (json.result) {
			var result_book_shortage_information_textbook_subjects = json.result.list;
			result_book_shortage_information_textbook_subjects.map(o => o.title = o['textbook_subjects'])
	  			this.result_book_shortage_information_textbook_subjects = result_book_shortage_information_textbook_subjects
		 	}
		});
	},

  },
  components: { list_result_search },
	created(){
    this.query.word = this.$route.query.word || "";
  },
  mounted() {
	this.get_article();
		this.get_teacher_user_teacher_name();
		this.get_issuer_employee_name();
		this.get_purchasing_personnel_personnel_name();
		this.get_textbook_books_textbook_name();
		this.get_textbook_books_textbook_type();
		this.get_textbook_books_textbook_subjects();
		this.get_book_purchase_textbook_name();
		this.get_book_purchase_textbook_type();
		this.get_book_purchase_textbook_subjects();
		this.get_book_receiving_information_textbook_name();
		this.get_book_receiving_information_textbook_type();
		this.get_book_receiving_information_textbook_subjects();
		this.get_book_purchasing_textbook_name();
		this.get_book_purchasing_textbook_type();
		this.get_book_purchasing_textbook_subjects();
		this.get_book_shortage_information_textbook_name();
		this.get_book_shortage_information_textbook_type();
		this.get_book_shortage_information_textbook_subjects();
  },
  watch: {
	$route() {
	  $.push(this.query, this.$route.query);
	  this.get_article();
	  this.get_teacher_user_teacher_name();
	  this.get_issuer_employee_name();
	  this.get_purchasing_personnel_personnel_name();
	  this.get_textbook_books_textbook_name();
	  this.get_textbook_books_textbook_type();
	  this.get_textbook_books_textbook_subjects();
	  this.get_book_purchase_textbook_name();
	  this.get_book_purchase_textbook_type();
	  this.get_book_purchase_textbook_subjects();
	  this.get_book_receiving_information_textbook_name();
	  this.get_book_receiving_information_textbook_type();
	  this.get_book_receiving_information_textbook_subjects();
	  this.get_book_purchasing_textbook_name();
	  this.get_book_purchasing_textbook_type();
	  this.get_book_purchasing_textbook_subjects();
	  this.get_book_shortage_information_textbook_name();
	  this.get_book_shortage_information_textbook_type();
	  this.get_book_shortage_information_textbook_subjects();
	},
  },
};
</script>

<style scoped>
.card_search {
  text-align: center;
}
.card_result_search>.title {
  text-align: center;
  padding: 10px 0;
}
</style>
