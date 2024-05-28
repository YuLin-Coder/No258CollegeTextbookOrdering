<template>
  <b-carousel
    id="carousel"
    v-model="slide"
    :interval="4000"
    controls
    indicators
    background="#ababab"
    style="text-shadow: 1px 1px 2px #333"
    @sliding-start="onSlideStart"
    @sliding-end="onSlideEnd"
  >
    <b-carousel-slide
      v-for="(o, i) in list"
      :key="i"
      @click.native="$router.push(o[vm.url])"
    >
      <template #img>
		<div class="swiper-imgs" :style="{backgroundImage: 'url(' + $fullUrl(o[vm.img]) + ')'}"></div>
        <!-- <img
          class="d-block w-100"
          style="max-height:300px"
          :src="$fullUrl(fullImg(o[vm.img]))"
          :alt="o[vm.title]"
        /> -->
      </template>
    </b-carousel-slide>
  </b-carousel>
</template>

<script>
import mixin from "@/mixins/component.js";
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
          url: "url",
        };
      },
    },
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
    // fullImg(img){
    //   return "/api/img/slide/"+img;
    // },
  },
};
</script>

<style scoped>
	.swiper-imgs{
		background-repeat: no-repeat;
		background-size: cover;
		height: 18.75rem;
	}
	@media (max-width: 996px) {
	    .swiper-imgs {
	        height: 12.5rem;
	    }
	}
</style>
