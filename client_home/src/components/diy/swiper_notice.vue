<template>
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      img-height="200"
      background="#FFF"
    >
      <b-carousel-slide v-for="(o, i) in list" :key="i">
        <template #img>
		  <router-link class="swiper_notice" :to="'/notice/details?notice_id='+o.notice_id">
			  <p class="title">{{o.title}}</p>
			  <p class="content" v-html="o.content">
			  </p>
			</router-link>
        </template>
      </b-carousel-slide>
    </b-carousel>
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
    // vm: {
    //   type: Object,
    //   default: function () {
    //     return {
    //       title: "title",
    //     };
    //   },
    // },
  },
  data() {
    return {
      slide: 0,
      sliding: null,
    };
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    },
  },
};
</script>


<style scoped>

  .title {
    padding: 0.65rem 0;
    height: 2.5rem;
    margin: 0 1.5rem;
    font-size: 1.2rem;
    font-weight: bold;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }

  .content {
    color: #6a737d;
    padding: 0.5rem 1.5rem;
    text-align: left;
    height: 12.25rem;
    font-size: 1rem;
    overflow: hidden;
  }

  .content:before {
    position: absolute;
    content: '';
    width: 100%;
    height: 2rem;
    left: 0;
    bottom: 0;
    background-color: rgba(255,255,255,.6);
  }

  .content >>> p {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    /*-webkit-line-clamp: 3;*/
    overflow: hidden;
  }
</style>
