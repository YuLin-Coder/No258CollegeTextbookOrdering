<template>
  <div class="page_search">
    <div class="warp">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="card_result_search">
              <div class="title">搜索结果</div>

              <!-- 搜索栏 -->
              <div class="search_box">
                <b-form-input
                  size="sm"
                  class="mr-sm-2"
                  :placeholder="'继续搜索'+query.search_title"
                  v-model.trim="search_val"
                  @keyup.enter="submit_search"
                ></b-form-input>
                <b-button size="sm" @click="submit_search"
                  ><b-icon icon="search"></b-icon
                ></b-button>
              </div>
              <list_result_search
                :list="list_result"
                :title="this.query.source_title"
                :source_table="this.query.search_type"
              ></list_result_search>
              <div class="pager">
                <b-pagination
                  v-model="page_result"
                  :total-rows="count"
                  :per-page="size"
                  @change="jumpTo"
                ></b-pagination>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from "@/mixins/page.js";
import list_result_search from "@/components/diy/list_result_search.vue";

export default {
  mixins: [mixin],
  data() {
    return {
      query: {
        word: "",
        search_key: "",
        search_type: "",
        search_title: "",
      },
      search_val: "",
      list_result: [],
      page_result: 1,
      size: 10,
      count: 0,
    };
  },
  methods: {
    /**
     *  获得结果
     * */
    get_result(page_result = 1) {
      if (word == "") {
        return;
      }
      var params = {};
      var { word, search_key, search_type } = this.query;
      params[search_key] = word;
      params.page = page_result;
      params.size = this.size;
      this.$get("~/api/" + search_type + "/get_list?like=0", params, (res) => {
        if (res.result) {
          var list_result = res.result.list || [];
          list_result.map((o) => {
            var title = o[search_key];
            o.title =title;
          });
          this.list_result = list_result
          this.count = res.result.count;
        }
      });
    },
    /**
     *  跳转
     * */
    jumpTo(page_result) {
      this.get_result(page_result);
    },

    /**
     *  搜索
     * */
    submit_search() {
      this.query.word = this.search_val
      this.get_result();
    },
    /**
     *  获取地址栏参数
     * */
    getQueryParams(){
      for (const key in this.query) {
        this.query[key] = this.$route.query[key]
      }
    }
  },
  components: { list_result_search },
  mounted() {
    this.getQueryParams();
    this.get_result();
  },
};
</script>

<style scoped>
.card_search {
  text-align: center;
}
.card_result_search > .title {
  text-align: center;
  padding: 10px 0;
}
.pager {
  display: flex;
  justify-content: center;
}
.search_box {
  display: flex;
  margin-bottom: 1rem;
}
</style>
