<template>
  <div class="dialog">
    <div class="popup-content-inforchange">
      <div class="popup-main-content_infor">
        <div class="icon-popup-inforchange"></div>
        <div class="description-popup">
          Dữ liệu đã bị thay đổi, bạn có muốn cất không
        </div>
      </div>
      <div class="popup-footer">
          <BaseButton
          @clickFunction="closePopUp"
          :buttonInfor="closeButtonInfor"/>
        <div style="margin-left: auto; display: flex">
          <BaseButton
          style="margin-right: 8px"
          @clickFunction="forceClose"
            :buttonInfor="cancelButtonInfor"
          />
          <BaseButton 
          @clickFunction="saveInfor"
          :buttonInfor="confirmButtonInfor" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from "../../components/Button.vue";
export default {
  components: {
    BaseButton,
  },

  methods: {
      /**
       * Custom event đóng popup để gửi lên component cha
       */
      closePopUp(){
          this.$emit("closePopup")
      },

      forceClose(){
        this.$emit('forceClose');
      },

      saveInfor(){
        this.$emit('saveInfor');
      }
  },

  data() {
    return {
        closeButtonInfor:{
            buttonTitle: "Hủy",
            isSecondaryButton: true,
        },
      confirmButtonInfor: {
        buttonTitle: "Có",
        isPrimaryButton: true,
      },
      cancelButtonInfor: {
        buttonTitle: "Không",
        isSecondaryButton: true,
      },
      
    };
  },
};
</script>

<style scoped>
@import url("../../assets/css/component/PopupInforChange.css");
</style>