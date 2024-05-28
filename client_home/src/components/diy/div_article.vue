<template>
    <div class="div_article">
        <div class="title">{{ obj[vm.title] }}</div>
        <div class="aside list">
            <div class="aside_2 col-12 col-sm-6">
                <div class="aside_row">
                    <span class="tag ellipsis_1 mr-1">{{ obj[vm.tag] }}</span>
                    <router-link to="obj[vm.url]" v-if="obj[vm.source]">
                        <span class="source">{{ obj[vm.source] }}</span>
                    </router-link>
                    <span class="time">{{ $toTime( obj[vm.create_time],"yyyy-MM-dd hh:mm:ss") }}</span>
                </div>
                <div class="aside_row">
                    <div class="praise">
                        <span>点赞数：{{ obj[vm.praise_len] }}</span>
                    </div>
                    <div class="see">
                        <span>点击数：{{ obj[vm.hits] }}</span>
                    </div>
                </div>
            </div>

            <div class="btns_interact col-12 col-sm-6">
                <!-- 收藏按钮 -->
                <b-button v-if="this.$store.state.user.user_id" @click="add_collect()" variant="outline-info">
                    <b-icon v-if="check_collected" icon="heart-fill"/>
                    <b-icon v-else icon="heart"/>
                    <span>收藏</span>
                </b-button>
                <b-button v-else @click="$router.push('/account/login')" variant="outline-info">
                    <b-icon v-if="check_collected" icon="heart-fill"/>
                    <b-icon v-else icon="heart"/>
                    <span>收藏</span>
                </b-button>

                <!-- 点赞按钮 -->
                <b-button class="ml" variant="outline-info" @click="add_praise()">
                    <b-icon icon="hand-thumbs-up"/>
                    <span>点赞</span>
                </b-button>

            </div>
        </div>
        <div class="description">{{ obj[vm.description] }}</div>
        <div v-html="obj[vm.content]" class="content"></div>
    </div>
</template>

<script>
    export default {
        props: {
            obj: {
                type: Object,
                default: function () {
                    return {};
                },
            },
            vm: {
                type: Object,
                default: function () {
                    return {
                        img: "img",
                        tag: "tag",
                        url: "url",
                        title: "title",
                        source: "source",
                        description: "description",
                        content: "content",
                        create_time: "create_time",
                        hits: "hits",
                        praise_len: "praise_len",
                    };
                },
            },
        },
        data() {
            return {
                // 是否已点赞
                check_praised: false,
                // 是否已收藏
                check_collected: false,
            };
        },
        methods: {
            /**
             * 获取点赞
             */
            get_praise() {
                var user_id = this.$store.state.user.user_id;
                console.log(this.obj.article_id)
                this.$get("~/api/praise/count?", {
                    source_table: "article",
                    source_field: "article_id",
                    source_id: this.obj.article_id,
                    user_id
                }, (res) => {
                    if (res.result || res.result === 0) {
                        console.log("sadsfasf"+JSON.stringify(res))
                        this.check_praised = res.result ? true : false;
                        console.log("点赞状态：" ,this.check_praised);
                    }
                    else if (res.error){
                        this.$toast(res.error.message);
                        console.error(res.error);
                    }
                })
            },
            /**
             * 添加点赞
             */
            add_praise() {
                var body = {
                    source_table: "article",
                    source_field: "article_id",
                    source_id: this.obj.article_id,
                    user_id: this.$store.state.user.user_id,
                };
                var _this = this;
                _this.obj.praise_len = parseInt(_this.obj.praise_len)
                if (!this.check_praised) {
                    this.check_praised = true;
                    this.$post("~/api/praise/add?", body, (res) => {
                        if (res.result) {
                            _this.obj.praise_len += 1;
                            var praise_len = _this.obj.praise_len;
                            this.$post('~/api/article/set?article_id=' + _this.obj["article_id"], {
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
                } else {
                    this.check_praised = false;
                    this.$get("~/api/praise/del", body, (res) => {
                        if(res.result){
                            _this.obj.praise_len -= 1;
                            var praise_len = _this.obj.praise_len;
                            this.$post('~/api/article/set?article_id=' + _this.obj["article_id"], {
                                praise_len
                            }, (res) => {
                                if(res.result){
                                    console.log("取消点赞数状态：" ,res.result);
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
                }
            },
            /**
             * 添加收藏
             */
            add_collect() {
                var {title, img, article_id} = this.obj;
                var body = {
                    title,
                    img,
                    source_table: "article",
                    source_field: "article_id",
                    source_id: article_id,
                    user_id: this.$store.state.user.user_id,
                };
                if (!this.check_collected) {
                    this.check_collected = true;
                    this.$post("~/api/collect/add?", body, (res) => {
                        this.$toast("收藏成功");
                    });
                } else {
                    this.check_collected = false;
                    this.$get("~/api/collect/del",
                        {
                            user_id: this.$store.state.user.user_id,
                            source_id: article_id,
                        }, (res) => {
                            this.$toast("取消收藏");
                        });
                }
            },
            check_collect() {
                var user_id = this.$store.state.user.user_id;
                var article_id = this.obj.article_id;
                this.$get('~/api/collect/count?', {
                    user_id,
                    source_table: "article",
                    source_field: "article_id",
                    source_id: article_id
                }, (res) => {
                    this.check_collected = res.result
                });
            }
        },
        mounted() {
            setTimeout(() => {
                this.check_collect();
                this.get_praise();
            }, 1000);
        }
    };
</script>

<style scoped>
    .ellipsis_1 {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
    }

    div {
        user-select: none;
    }

    .div_article {
        padding: 1.5rem 1rem;
    }

    .aside {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        margin: 0 0.625rem 0.625rem 0;
        font-size: 0.875rem;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        color: rgba(0, 0, 0, 0.3);
    }

    .aside_row {
        height: 2rem;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    aside_2 {
        display: flex;
        flex-direction: column;
    }

    .source {
        color: #576b95;
        margin: 0 0.2rem;
    }

    .tag {
        display: flex;
        align-items: center;
        padding: 0 0.25rem;
        font-size: 0.75rem;
        border-radius: 0.125rem;
        background: rgba(0, 0, 0, 0.05);
        color: rgba(0, 0, 0, 0.3);
    }


    .title {
        font-size: 1.35rem;
        line-height: 1.4;
        margin-bottom: 1rem;
        font-weight: 400;
    }

    .time {
        position: relative;
        top: 0.125rem;
    }

    .description {
        margin-bottom: 1rem;
        color: #292828;
    }

    .div_article .see {
        margin-left: 1rem;
    }

    .div_article .time {
        color: #999;
    }

    .btns_interact {
        height: 4rem;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    .btns_interact button {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    @media (max-width: 576px) {
        >>>.content img{
          width: 100%;
          height: 100%;
        }
    }

</style>
