<template>
  <div class="page_pay" id="page_pay">
    <div class="warp">
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-6">
            <b-card no-body style="">
              <template #header>
                <h4 class="text-center">总支付：￥{{ query.sum_price }}</h4>
              </template>

              <b-card-body>
                <b-tabs content-class="mt-3">
                  <b-tab title="微信" :active="true">
                    <div class="row">
                      <div class="col">
                        <div style="width: 60%;margin: 0 auto"><img src="../../../public/img/wx.png"></div>
                        <b-card-footer style="margin-top: 10px" class="text-center">
                          <b-button variant="outline-primary" @click="pay" block
                          >支付</b-button
                          >
                        </b-card-footer>
                      </div>
                    </div>
                  </b-tab>
                  <b-tab title="支付宝" :active="false">
                    <div class="row">
                      <div class="col">
                        <div style="width: 60%;margin: 0 auto"><img src="../../../public/img/aplipay.png"></div>
                        <b-card-footer style="margin-top: 10px" class="text-center">
                          <b-button variant="outline-primary" @click="pay" block
                          >支付</b-button
                          >
                        </b-card-footer>
                      </div>
                    </div>
                  </b-tab>
                  <b-tab title="网银" :active="false">
                    <div class="row">
                      <div class="col">
                        <div style="width: 80%;margin: 0 auto;margin-top: 30px;">
                          <div style="width: 80%;margin: 0 auto;">
                            <div style="line-height: 40px">请输入网银账号：</div>
                          </div>
                          <div style="width: 80%;margin: 0 auto;">
                            <input v-model="pay_obj.account" placeholder="请输入网银账号" />
                          </div>
                        </div>
                        <div style="width: 80%;margin: 0 auto;margin-top: 20px;">
                          <div style="width: 80%;margin: 0 auto;">
                            <div style="line-height: 40px">请输入支付密码，6位数字：</div>
                          </div>
                          <div style="width: 80%;margin: 0 auto;">
                            <input placeholder="请输入密码" type="password" v-model="pay_obj.password" maxlength="6" />
                          </div>
                        </div>
                        <b-card-footer style="margin-top: 10px" class="text-center">
                          <b-button variant="outline-primary" @click="pay" block
                          >支付</b-button
                          >
                        </b-card-footer>
                      </div>
                    </div>
                  </b-tab>
                </b-tabs>
                <!--<b-form-group label="支付方式" v-slot="{ ariaDescribedby }">-->
                  <!--<b-form-radio-->
                    <!--v-model="selected"-->
                    <!--:aria-describedby="ariaDescribedby"-->
                    <!--name="some-radios"-->
                    <!--value="A"-->
                  <!--&gt;-->
                    <!--支付宝-->
                  <!--</b-form-radio>-->
                  <!--<b-form-radio-->
                    <!--v-model="selected"-->
                    <!--:aria-describedby="ariaDescribedby"-->
                    <!--name="some-radios"-->
                    <!--value="B"-->
                  <!--&gt;-->
                    <!--微信-->
                  <!--</b-form-radio>-->
                <!--</b-form-group>-->
              </b-card-body>

            </b-card>
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

  components: {},
  data() {
    return {
      query: {
        sum_price: "",
        order_number:"",
        selected: ""
      },
      pay_obj:{
        payActiveName:"微信",
        account:"",
        password:"",
        id:""
      }
    };
  },

  methods: {
    async update_goods_inventory(o){
      await this.$get("~/api/goods/get_obj?", {"goods_id":o.goods_id}, (json) => {
        if (json.result && json.result.obj) {
          let inventory = {"inventory":json.result.obj.inventory-o.num};
          this.$post('~/api/goods/set?goods_id='+o.goods_id, inventory, (res) => {
            if(res.result && json.result.obj.source_table && json.result.obj.source_field && json.result.obj.source_id){
              let inventory_sub = {"cart_inventory":inventory.inventory};
              this.$post('~/api/'+json.result.obj.source_table+'/set?'+json.result.obj.source_field+'='+json.result.obj.source_id, inventory_sub, (res_sub) => {
                console.log(res_sub)
              })
            }
          })
        }
      })
    },
    pay() {
      let _this = this;
      this.$post("~/api/order/set?order_number="+_this.query.order_number,{
        state:"已付款"
      },(res)=>{
        if(res.result){
          console.log(res.result);
          this.$get("~/api/order/get_list?", {"order_number":_this.query.order_number}, (json) => {
            if (json.result && json.result.list) {
              //修改数量
              for(let i=0;i<json.result.list.length;i++){
                _this.update_goods_inventory(json.result.list[i]);
              }
            }
          })

          this.$toast("支付成功")
          this.$router.push("/order/list?state=已付款")
        }
      })
    },
  },
  mounted() {
  },
};
</script>

<style scoped>
.container {
  min-height: 800px;
}
</style>
