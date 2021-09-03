<template>
  <div class="dialog">
    <div class="popup-content_empty">
      <div class="popup-main-content_empty">
        <div class="icon-popup-empty"></div>
        <div class="description-popup">{{ emptyField }} không được để trống</div>
      </div>
      <div class="popup-footer">
          <BaseButton
          @clickFunction="closeEmptyPopup"
          :buttonInfor="confirmButtonInfor"/>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from "../../components/Button.vue";
export default {
  props:{
      emptyField:{
          type: String,
          require: true,
      }
  },
  
  components: {
    BaseButton,
  },
  
  methods:{
      closeEmptyPopup(){
          this.$emit("closeEmptyPopup");
      }
  },
  
  data() {
    return {
      confirmButtonInfor:{
          buttonTitle: "Đóng",
          isPrimaryButton: true,
      },
    };
  },
};
</script>

<style scoped>
@import url("../../assets/css/component/PopupEmpty.css");
</style>