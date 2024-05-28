<template>
  <div class="page_notice notice-detail" id="notice_list">
    <div class="warp">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="car_notice">
              <div class="notice_list">
                <span>公告</span>
                <div class="notice_title">
                  <h5>{{ obj.title }}</h5>
                </div>
                <div class="notice_creat_time">
                  {{ $toTime( obj.create_time,"yyyy-MM-dd hh:mm:ss") }}
                </div>
                <div class="notice_content" v-html="obj.content"></div>
              </div>
            </div>
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
      url_get_obj: "~/api/notice/get_obj?",
      field: "notice_id",
      query: {
        notice_id: 0,
      },
      obj: {},
    };
  },
  methods: {
    /**
     * 获取留言后
     * @param {Object} json 响应对象
     */
    get_obj_after(json) {
      console.log(JSON.stringify(json));
    },
  },
};
</script>

<style scoped>
.page_notice {
  text-align: center;
}
.container{
  min-height: 600px;
}
.notice_list >*{
  padding: 10px;
}
.page_notice > view {
  margin-top: 1rem;
}
.notice_title{
  margin-top: 20px;

}
.notice_creat_time{
  color: var(--color_tip);
}
.notice_content{
  color: var(--color_paragraph);
  text-align: left;
}
</style>
