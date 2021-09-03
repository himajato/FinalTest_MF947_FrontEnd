<template>
    <div
    :class="{'border-success': toastInfor.isSucessToast, 'border-erro': toastInfor.isErrorToast}"
     class="toast-messenger">
        <div 
        :class="{'icon-success': toastInfor.isSucessToast, 'icon-erro': toastInfor.isErrorToast}"
        class="icon-toast">
            
        </div>
        <div class="toast-title">{{toastInfor.toastTitle}}</div>
    </div>
</template>

<script>
export default {
    props:{
        toastInfor:{
            type: Object,
            require: true,
        }
    },
    data(){
        return{
           
        }
    }
}
</script>

<style>
    @import url('../assets/css/component/ToastMessenger.css');
</style>