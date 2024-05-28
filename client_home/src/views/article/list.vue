<template>
    <div class="page_article" id="article_list">
        <div class="warp" v-if="$check_action('/article/list','get')">
            <div class="container">
                <div class="row">
                    <div class="col-12 col-md-9">
                        <div class="card_article h-100 mb">
                            <div class="article_list_title">
                                <span class="title">{{$page_title("/article/list") || "文章列表"}}</span>
                                <!-- 搜索栏 -->
                                <div class="search_box">
                                    <b-form-input
                                            size="sm"
                                            class="mr-sm-2"
                                            placeholder="局部搜索"
                                            v-model.trim="search_val"
                                            @keyup.enter="submit_search"
                                    />
                                    <b-button size="sm" @click="submit_search"
                                    >
                                        <b-icon icon="search"/>
                                    </b-button>
                                </div>
                            </div>
                            <div class="filter_block">
                                <!-- 筛选 -->
                                <div class="bar_filter">
                                    <b-dropdown :text="title" variant="outline-dark" left>
                                        <b-dropdown-item
                                                v-for="(o, i) in list_article_type"
                                                :key="i"
                                                @click="filter_article(o)"
                                        >
                                            {{ o }}
                                        </b-dropdown-item>
                                    </b-dropdown>
                                </div>
                                <!-- /筛选 -->
                                <!-- 排序 -->
                                <div
                                        class="bar_sort"
                                        :class="{ active: query.orderby == '`hits` desc' }"
                                >
                                    <b-dropdown text="排序" variant="outline-dark" left>
                                        <b-dropdown-item
                                                v-for="(o, i) in sort_list"
                                                :key="i"
                                                @click="sort_goods(o)"
                                        >
                                            {{ o.name }}
                                        </b-dropdown-item>
                                    </b-dropdown>
                                </div>
                                <!-- /排序 -->
                            </div>
                            <!-- 文章列表 -->
                            <list_article :list="list"/>
                            <!-- 分页器 -->
                            <div class="col overflow-auto flex_cc">
                                <b-pagination
                                    v-model="query.page"
                                    :total-rows="count"
                                    :per-page="query.size"
                                    @change="goToPage"
                                />
                            </div>
                        </div>
                    </div>

                    <div class="col-12 col-md-3">
                        <div class="card_article_hot">
                            <div class="hot_title">
                                {{$page_title("/article/list")+"热门列表" || "文章热门列表"}}
                            </div>
                            <!-- 文章热门列表card_article_hot -->
                            <list_article_hot :list="list_hot"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import list_article from "@/components/diy/list_article.vue";
    import list_article_hot from "@/components/diy/list_article_hot.vue";
    import mixin from "@/mixins/page.js";

    export default {
        mixins: [mixin],
        components: {
            list_article,
            list_article_hot,
        },
        data() {
            return {
                url_get_list: "~/api/article/get_list?",
                list: [],
                query: {
                    page: 1,
                    size: 8,
                },
                list_hot: [],
                count_pages: 1,
                list_article_type: [],
                title: "",
                sort_list: [
                    {
                        name: "热度从高到低",
                        value: "hits desc",
                    },
                    {
                        name: "热度从低到高",
                        value: "hits asc",
                    },
                    {
                        name: "更新时间从高到低",
                        value: "create_time desc",
                    },
                    {
                        name: "更新时间从低到高",
                        value: "create_time asc",
                    },
                ],
                search_val: ""
            };
        },
        methods: {
            /**
             * 请求文章列表后
             * @param {Object} json 响应对象
             */
            get_list_after(json) {
            },
            /**
             * 重新获取全部商品
             */
            get_all_list() {
                this.query = {
                    page: 1,
                    size: 10,
                };
                this.get_list();
            },

            /**
             *  搜索
             * */
            submit_search() {
                this.$router.push({
                    path: "/search/details",
                    query: {
                        word: this.search_val,
                        search_key: "title",
                        search_type: "article",
                        search_title: "文章",
                    },
                });
            },
            /**
             * 获取热门文章
             */
            get_hot_article() {
                this.$get(
                    "~/api/article/get_list",
                    {
                        page: 1,
                        size: 8,
                        orderby: "hits",
                    },
                    (res) => {
                        if (res.result) {
                            this.list_hot = res.result.list;
                        }
                    }
                );
            },
            /**
             * 获取文章类型
             */
            get_article_type() {
                this.$get(
                    "~/api/article_type/get_list",
                    {
                        page: 1,
                        size: 0,
                    },
                    (res) => {
                        if (res.result) {
                            console.log(res.result)
                            this.list_article_type.push("全部");
                            res.result.list.map((o) => this.list_article_type.push(o.name));
                        }
                    }
                );
            },
            /**
             * 商品筛选选择
             */
            filter_article(o) {
                if (o == "全部") {
                    this.query.type = 0;
                } else {
                    this.query.type = o;
                }
                this.search();
            },
            /**
             * 排序
             */
            sort_goods(o) {
                this.query.orderby = o.value;
                this.search();
            },
            goToPage(v){
              this.query.page = v;
              this.goToNew(v)
            }
        },
        mounted() {
            this.title = "筛选";
            this.get_hot_article();
            this.get_article_type();
        },
    };
</script>

<style scoped>

    .article_list_title {
      margin: 0 0.5rem;
      background-color: #d2d2d2;
      color: white;
      display: flex;
      height: 4rem;
      align-items: center;
      justify-content: space-between;
      border-radius: 0.5rem;
    }

    .title {
      font-size: 1.5rem;
      font-weight: bold;
      padding-left: 1rem;
    }

    .search_box {
      width: 12rem;
      display: flex;
      height: 4rem;
      justify-content: center;
      align-items: center;
      padding-right: 1rem;
    }

    .flex_cc {
        margin-top: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .card_article_hot{
        color: white;
        background-color: var(--color_primary);
        margin: 0.5rem;
        border-radius: 0.5rem;
    }

    .hot_title {
        height: 4rem;
        font-size: 1.2rem;
        font-weight: bold;
        align-items: center;
        justify-content: center;
        display: flex;
        margin-bottom: 1rem;
    }

    [class*="card_"] {
        padding: 0.5rem;
    }

    .article_list h4 {
        font-size: 20px;
    }

    .article_list {
        padding-left: 1px;
    }

    .container {
        min-height: 800px;
    }

    .list_hot h4 {
        font-size: 20px;
    }

    .filter_block {
      margin: 1rem 0.5rem 0.5rem 0.5rem;
      display: flex;
      flex-direction: row;
      justify-content: start;
    }

    .bar_filter {
        display: flex;
        align-items: center;
    }

    li {
        list-style: none;
    }

    .bar_sort {
        margin-left: 5px;
    }


</style>
