<template>
  <div class="list_menu">
    <router-link
      :to="o.url"
      class="menu_item"
      :class="{ selected: o.selected }"
      v-for="(o, i) in list_info"
      :key="i"
    >
      <span class="left_span">{{ o.title }}</span>
      <span class="right_span"><b-icon :icon="o.icon"></b-icon></span>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    list_info: {
      type: Array,
      default() {
        return [
          {
            title: "个人资料",
            url: "/user/info",
            icon: "house-fill",
            selected: false,
          },
          {
            title: "密码修改",
            url: "/user/password",
            icon: "person-fill",
            selected: false,
          },
          {
            title: "收货地址",
            url: "/user/address",
            icon: "map-fill",
            selected: false,
          },
          {
            title: "收藏",
            url: "/user/collect",
            icon: "heart-fill",
            selected: false,
          },
          {
            title: "订单",
            url: "/order/list",
            icon: "file-earmark-minus-fill",
            selected: false,
          },
          {
            title: "购物车",
            url: "/cart/list",
            icon: "cart-fill",
            selected: false,
          },
        ];
      },
    },
  },
  methods: {},
  components: {},
};
</script>

<style scoped>
.list_menu {
  flex: 0 0 25%;
  border-bottom: 1px solid #eee;
}
.menu_item {
  display: flex;
  justify-content: space-between;
  padding: 15px 20px;
  border: 1px solid #eee;
  border-bottom: none;
  background-color: #fff;
}
.menu_item.selected {
  background-color: #000;
}
.menu_item.selected span {
  color: #fff !important;
}
.content {
  flex: 0 0 74%;
}
</style>
