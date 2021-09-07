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
          :buttonInfor="closeButtonInfor"
        />
        <div style="margin-left: auto; display: flex">
          <BaseButton
            style="margin-right: 8px"
            @clickFunction="forceClose"
            :buttonInfor="cancelButtonInfor"
          />
          <BaseButton
            @clickFunction="saveInfor"
            :buttonInfor="confirmButtonInfor"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from "../../components/Button.vue";
import { MISA_RESOUCE } from '../../js/resouce/resouce';
export default {
  components: {
    BaseButton,
  },

  methods: {
    /**
     * Custom event đóng popup để gửi lên component cha
     */
    closePopUp() {
      this.$emit("closePopup");
    },

    /**
     * Custom event đóng popup mà không cần hỏi
     */
    forceClose() {
      this.$emit("forceClose");
    },

    /*
    * Custom event cất dữ liệu
    */
    saveInfor() {
      this.$emit("saveInfor");
    },
  },

  data() {
    return {
      closeButtonInfor: {
        buttonTitle: MISA_RESOUCE.BUTTON_CANCEL,
        isSecondaryButton: true,
      },
      confirmButtonInfor: {
        buttonTitle: MISA_RESOUCE.BUTTON_OK,
        isPrimaryButton: true,
      },
      cancelButtonInfor: {
        buttonTitle: MISA_RESOUCE.BUTTON_NO,
        isSecondaryButton: true,
      },
    };
  },
};
</script>

<style scoped>
@import url("../../assets/css/component/PopupInforChange.css");
</style>