<template>
    <div @click="clickFunction">
        <button
        :class="{'primary-button': buttonInfor.isPrimaryButton, 'secondary-button': buttonInfor.isSecondaryButton}"
        >{{buttonInfor.buttonTitle}}
        </button>
    </div>
</template>

<script>
export default {
    props:{
        buttonInfor:{
            type: Object,
            require: true,
        }
    },
    methods: {
        clickFunction(){
            this.$emit("clickFunction")
        }
    }
}
</script>

<style>
@import url("../assets/css/component/Button.css");
</style>