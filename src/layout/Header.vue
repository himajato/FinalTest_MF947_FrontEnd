<template>
  <div
  :class="{'header-toggle': isToggle}"
   class="header"
  >
    <a
    @click="toggleSidebar"
    v-show="!isToggle"
     class="icon-header"></a>
    <div class="company-name" >
      CÔNG TY TNHH SẢN XUẤT - THƯƠNG MẠI - DỊCH VỤ QUY PHÚC
    </div>
    <a class="icon-dropdown-header" href=""></a>
    <div class="user-infor">
        <a class="notification-icon"></a>
        <a class="user-avatar"></a>
        <div class="user-account" style="margin-right: 8px; font-family: SemiBold-NotoSans;">Nguyễn Huy Nghĩa</div>
        <a class="account-toggle"></a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isToggle: {
      type: Boolean,
      require: true,
    },
  },
  methods:{
    toggleSidebar(){
      this.$emit('toggleSideBar');
    }
  },

}
</script>

<style scoped>
@import url("../assets/css/layout/Header.css");
</style>