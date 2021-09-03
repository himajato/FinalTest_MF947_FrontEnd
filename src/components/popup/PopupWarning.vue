<template>
  <div class="dialog">
    <div class="popup-content">
      <div class="popup-main-content">
        <div class="icon-popup"></div>
        <div class="description-popup">{{ popupInfor.popUpDescription }}</div>
      </div>
      <div class="popup-footer">
          <BaseButton
          @clickFunction="closePopup"
          :buttonInfor="cancelButtonInfor"/>
          <BaseButton
          @clickFunction="onConfirmDeleteClick"
          style="margin-left: auto"
          :buttonInfor="confirmButtonInfor"/>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from "../../components/Button.vue";
export default {
  props:{
      popupInfor:{
          type: Object,
          require: true,
      }
  },
  
  components: {
    BaseButton,
  },
  
  methods:{
      closePopup(){
          this.$emit("closePopup");
      },
      onConfirmDeleteClick(){
        this.$emit('onConfirmDeleteClick')
      }
  },
  
  data() {
    return {
      confirmButtonInfor:{
          buttonTitle: "Có",
          isPrimaryButton: true,
      },
      cancelButtonInfor:{
          buttonTitle: "Không",
          isSecondaryButton: true,
      }
    };
  },
};
</script>

<style scoped>
@import url("../../assets/css/component/PopupWarning.css");
</style>