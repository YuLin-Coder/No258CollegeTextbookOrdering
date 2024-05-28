<template>
  <div v-if="publish_flag" class="form_editor">
    <div class="editor">
      <!-- 富文本编辑 -->
      <quill-editor v-model.trim="form.content" class="form_editor_block">
      </quill-editor>
    </div>
    <div class="btn_publish">
      <b-button variant="outline-primary" block @click="publish()">发表</b-button>
    </div>
  </div>
</template>

<script>
import mixin from "@/mixins/component.js";
export default {
  mixins: [mixin],
  props: {
    form: {
      type: Object,
      default() {
        return {
          content: "",
        };
      },
    },
    post_url: {
      type: String,
      default() {
        return "";
      },
    },
    publish_flag:{
      type: Boolean,
      default() {
        return true;
      },
    }
  },
  data() {
    return {};
  },
  methods: {
    /**
     * 发表评论
     */
    publish() {
      if (!this.user.user_id) {
        this.$router.push("/account/login");
        return
      }
      var form = this.form;
      form = Object.assign(form, {
        user_id: this.user.user_id,
        avatar: this.user.avatar,
        nickname: this.user.nickname,
      });
      if(!form.content){
        this.$toast("输入内容不能为空")
        return
      }
      var post_url = this.post_url
      if(!post_url){
        post_url = "~/api/comment/add?"
      }
      this.$post(post_url, form, (res) => {
        if (res.result) {
          this.$emit("update_comment");
          this.form.content = "";
        } else if (res.error) {
          this.$toast(res.error.message);
        }
      });
    },
  },
  components: {},
};
</script>

<style scoped>
.btn_publish {
  text-align: right;
  margin-top: 10px;
}
.btn_publish button {
  border-radius: 3px;
  cursor: pointer;
}
.btn_publish button:hover {
  background: var(--color_success_b);
  color: white;
}
</style>
