<template>
  <div class="slide-picture slide-picture-hide">
    <!-- <div class="close" @click="closeView()">
      <img src="@/assets/images/close-picture.jpg">
    </div> -->
    <div class="title">
      <div>完成拼图验证</div>
      <div>换一张</div>
    </div>
    <div id="captcha"></div>
  </div>
</template>

<script>
import "@/assets/style/jigsaw.css";
import "@/assets/js/jigsawes6.js";

export default {
  name: "slidePicture",
  mounted() {
    const _this = this;
    jigsaw.init(
      document.getElementById("captcha"),
      function () {
        _this.$emit("slidePictureState", true);
      },
      function () {
        _this.$emit("slidePictureState", false);
        _this.$message.error("校验失败");
      }
    );
  },
  methods: {
    closeView() {
      this.$emit("slidePictureState", false);
    },
  },
};
</script>

<style>
.slide-picture {
  background: #fff;
  width: 352px;
  box-sizing: border-box;
  padding: 10px 20px 20px 20px;

  border-radius: 6px;
}

.slide-picture .title {
  width: calc(100% - 25px);
  height: 30px;
  line-height: 30px;
  margin-top: 10px;
  margin-bottom: 10px;
}

.slide-picture .title div {
  display: inline-block;
}
.slide-picture .title div:nth-child(1) {
  color: #333;
  float: left;
}
.slide-picture .title div:nth-child(2) {
  color: #333;
  float: right;
  margin-left: 10px;
}

#captcha {
  position: relative;
}

.close {
  position: absolute;
  right: 12px;
  top: 12px;
}
.close img {
  width: 13px;
  height: 13px;
  cursor: pointer;
}
</style>
