<template>
  <div class="dialog">
    <div class="popup-content">
      <div class="popup-main-content">
        <div class="icon-popup"></div>
        <div class="description-popup">Mã nhân viên &lt;{{ popupInfor.duplicateCode }}&gt; đã tồn tại trong hệ thống, vui lòng kiểm tra lại</div>
      </div>
      <div class="popup-footer">
        <BaseButton
          @clickFunction="onCloseDuplicatePopup"
          style="margin-left: auto"
          :buttonInfor="closeButtonInfor"
        />
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from "../../components/Button.vue"
export default {
    components:{
        BaseButton,
    },

    props: {
        popupInfor: {
            type: Object,
            require: true,
        }
    },

    methods:{
        onCloseDuplicatePopup(){
            this.$emit('onCloseDuplicatePopup');
        }
    },

    data(){
        return{
            closeButtonInfor: {
                isPrimaryButton: true,
                buttonTitle: 'Đóng',
            }
        }
    }
};
</script>

<style>
@import url("../../assets/css/component/PopupDuplicate.css");
</style>