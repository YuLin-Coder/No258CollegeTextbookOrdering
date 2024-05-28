<template>
  <div class="list_collect">
    <div class="item_collect" v-for="(o, i) in list" :key="i">
      <router-link
        class="collect_box"
        :to="
          '/' +
          o[vm.source_table] +
          '/details?' +
          o[vm.source_field] +
          '=' +
          o[vm.source_id]
        "
      >
        <div class="left_block">
          <img
            style="width: 3rem; height: 3rem"
            :src="o[vm.img] ? $fullUrl(o[vm.img]) : '/img/default.png'"
          />
        </div>
        <div class="right_block">
          <div class="top_comment">
            <div class="title">
              {{ o[vm.title] }}
            </div>
            <div class="time">
              {{ o[vm.create_time] | formatDate}}
            </div>
          </div>
        </div>
      </router-link>
      <b-icon class="btn_delete" icon="trash" @click="del_collect(o[vm.collect_id], i)"></b-icon>
    </div>
  </div>
</template>

<script>
import mixin from "@/mixins/page.js";
export default {
  mixins: [mixin],
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
          title: "title",
          create_time: "create_time",
          collect_id: "collect_id",
          source_table: "source_table",
          source_field: "source_field",
          source_id: "source_id",
        };
      },
    },
  },
  methods: {
    /**
     * 删除收藏
     * @param { Number } collect_id 收藏id
     * @param { Number } index 删除位置
      */
    del_collect(collect_id, index) {
      this.$get(
        "~/api/collect/del",
        {
          collect_id,
        },
        (res) => {
          this.list.splice(index, 1);
        }
      );
    },
  },
};
</script>

<style scoped>
.item_collect {
  position: relative;
  background-color: #ffffff;
  margin-bottom: 0.8rem;
}

.collect_box {
  display: flex;
  padding: 0.3rem 0.6rem;
}

.left_block {
  display: inline-block;
  width: 20%;
  padding: 0.3rem;
  padding-right: 0.5rem;
}

.right_block {
  display: inline-block;
  width: 80%;
}

.time {
  color: #999;
}

.top_comment {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.6rem;
}
.top_comment .title {
  flex: 0 0 55%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.top_comment .time {
  flex: 20%;
  font-size: 0.5rem;
}

.btn_delete {
  position: absolute;
  right: 0.7rem;
  bottom: 0.8rem;
  line-height: 20px;
  font-size: 15px;
}
.btn_delete:hover {
  background: var(--color_primary_b);
  border-color: var(--color_primary_b);
}
</style>
