<template>
    <div 
    :style="{top: `${position.top}px`, left: `${position.left}px`}"
    class="function-container" ref="functionDropdown">
        <div 
        @click="onCoppyClick"
        class="function-item">Nhân bản</div>
        <div
        @click="onDeleteClick" 
        class="function-item">Xóa</div>
    </div>
</template>

<script>
export default {
    props:{
        position:{
               type: Object,
               require: true,
            }
    },

    created(){
    
    },

    methods:{
        /**
         * Sự kiện ấn vào nút nhân bản ở dropdown function
         * created by: NHNGHIA (01/09/2021)
         */
        onCoppyClick(){
            this.$emit('onCoppyClick');
        },

        /**
         * Sự kiện ấn vào nút xóa ở drop function
         * created by: NHNGHIA (01/09/2021)
         */
        onDeleteClick(){
            this.$emit('onDeleteClick');
        }
    },

    data(){
        return{
        }
    }
}
</script>

<style scoped>
    @import url('../assets/css/component/DropdownFunction.css');
</style>