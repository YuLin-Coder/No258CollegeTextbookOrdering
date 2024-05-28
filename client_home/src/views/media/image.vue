<template>
  <div class="page_media" id="media_img">
    <div class="container">
      <div class="row">
        <div class="col">
          <div class="download_box">
            <a :href="$fullUrl(query.filename)" download class="download_btn">
                <span>下载</span>
                <b-icon icon="arrow-down-circle" class="icon_download"></b-icon>
            </a>
          </div>
            <div class="img_show">
              <img
                id="image"
                :src="$fullUrl(query.filename)"
                @error="imgError"
              />
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
      errMsg: "图片路径加载失败",
      query: {
        filename: "/static/upload/dXp9rCELkYJ029e1f365faa4fa226e0c4581c0068f06.jpg",
      },
    };
  },
  methods: {
    imgError() {
      console.error(this.errMsg);
    },
    save_img() {
    },
  },
};
</script>

<style scoped>
#media_img {
  min-height: 800px;
  position: relative;
  width: 100%;
}

#media_img .img_show {
  display: flex;
  justify-content: space-between;
  margin-top: 100px;
}

#media_img .img_show img {
  width: 600px;
  height: 600px;
  margin: auto;
}
#media_img .download_box {
  display: block;
  position: relative;
  height: 30px;
  line-height: 30px;
  width: 60px;
  text-align: center;
  float: right;
  margin: 1rem 0;
  cursor: pointer;
}
#media_img .download_box .download_btn {
  color: rgb(184, 51, 51);
  font-weight: bold;
}
#media_img .download_box .download_btn .icon_download {
  margin-left: 5px;
}
</style>
