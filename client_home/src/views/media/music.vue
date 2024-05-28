<template>
  <div class="page_media" id="media_music">
    <div class="container">
      <div class="row">
        <div class="col">
          <div class="page-section page-section-gap" style="text-align: center">
            <audio
              style="text-align: left"
              :src="$fullUrl(query.filename)"
              :poster="current.poster"
              :name="current.name"
              :author="current.author"
              :action="audioAction"
              controls
            ></audio>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from "@/mixins/page.js";
export default {
	mixins: [mixin],
  data() {
    return {
      current: {
        poster:
          "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-uni-app-doc/7fbf26a0-4f4a-11eb-b680-7980c8a877b8.png",
        name: "致爱丽丝",
        author: "暂无",
        // src:
		// "/static/upload/movie.mp4"
        //   "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-hello-uniapp/2cc220e0-c27a-11ea-9dfb-6da8e309e0d8.mp3",
      },
      audioAction: {
        method: "pause",
      },
	  query:{
		  filename:"/static/upload/movie.mp4",
	  },
    };
  },
  methods: {},
};
</script>

<style scoped>
.container{
	min-height: 750px;
}
#media_music {
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
}
</style>
