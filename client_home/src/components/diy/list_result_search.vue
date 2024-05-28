<template>
  <div class="list_result_search">
    <div class="title_type">{{ title }}</div>
    <div class="list_result" v-if="list.length">
      <router-link
        :to="
          '/' +
          source_table +
          '/details?' +
          source_table +
          '_id=' +
          o[source_table + '_id']
        "
        class="item"
        v-for="(o, i) in list"
        :key="i"
      >
        <div class="title">{{i+1}} , {{ o.title }}</div>
      </router-link>
    </div>
    <div v-else class="no_result">
      没有找到{{title}}相关内容
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default() {
        return [];
      },
    },
    title: {
      type: String,
      default() {
        return "";
      },
    },
    source_table: {
      type: String,
      default() {
        return "";
      },
    },
  },
  data() {
    return {};
  },
  methods: {},
  components: {},
};
</script>

<style scoped>
.title_type {
  font-weight: 600;
}
.title{
  text-indent: 2em;
  border-bottom: 1px solid var(--color_border);
}
.list_result .item{
  display: block;
  margin: 10px 0;
}
.list_result .description{
  color: var(--color_grey);
  font-size: 0.875rem;
}
.no_result{
  margin: 10px 0;
  color: var(--color_grey);
  font-size: 0.875rem;
}
</style>
