<template>
  <div class="score_star">
    <span class="icon_wrap" v-for="i in 5" :key="i">
      <b-icon icon="star-fill" v-if="score >= i"></b-icon>
      <b-icon
        icon="star-half"
        v-else-if="Math.ceil(score) ===i "
      ></b-icon>
      <b-icon icon="star" v-else></b-icon>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    score: {
      type: Number,
      default() {
        return 0;
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
.score_star {
  display: flex;
  align-items: center;
  color: var(--color_primary);
}
.icon_wrap {
  padding-right: 3px;
}
</style>
