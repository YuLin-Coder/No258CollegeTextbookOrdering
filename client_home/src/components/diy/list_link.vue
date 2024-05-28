<template>
    <div class="list_link">
        <div class="link_title">友情链接</div>
        <div class="row_link">
            <div v-for="(o, i) in list" :key="i" class="link">
                <a :href="o[vm.url]">
                    <div class="img_box">
                        <img
                                :src="$fullUrl(o[vm.img])"
                                class="img"
                                v-default-img="'/img/default.png'"
                        />
                    </div>
                    <div class="link_name">
                        <span>{{ o[vm.name] }}</span>
                    </div>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            list: {
                type: Array,
                default: function () {
                    return [];
                },
            },
            vm: {
                type: Object,
                default: function () {
                    return {
                        img: "img",
                        name: "name",
                        url: "url",
                    };
                },
            },
        },
        data() {
            var col = 12 / this.span;
            return {
                col,
            };
        },

    };
</script>

<style scoped>

    .link {
        width: calc(25% - 3rem);
        margin: 1.5rem 1.5rem 0 1.5rem;
        border-radius: 0.5rem;
        background-color: #909399;
    }

    .link:hover{
        box-shadow: 0 0 0.5rem var(--color_primary);
    }

    .link > .link_name{
        color: var(--color_primary);
    }

    .link_title {
        height: 4rem;
        width: 15rem;
        background-color: black;
        color: white;
        font-size: 1.5rem;
        display: flex;
        font-weight: bold;
        align-items: center;
        justify-content: center;
        border-radius: 0 2.5rem 2.5rem 0;
        margin: 1rem 0.5rem;
    }

    .row_link {
        height: auto;
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 2rem;
    }

    .row_link .link .img_box {
        height: 6rem;
        padding: 0.25rem;
        background-color: #fff;
        border: 1px solid #dee2e6;
        border-radius: 0.5rem 0.5rem 0 0 ;
    }

    .row_link .link .img_box img {
        border-radius: 0.5rem;
        width: 100%;
        height: 100%;
    }

    .row_link .link .link_name {
        color: white;
        font-size: 1.2rem;
        font-weight: 500;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        /*word-break: break-word;*/
        /*word-wrap: break-word;*/
    }

    @media (max-width: 992px) {

        .link {
            width: calc(33% - 3rem);;
        }

    }

    @media (max-width: 768px) {

        .link {
            width: calc(50% - 3rem);;
        }

    }


</style>
