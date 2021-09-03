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
        onCoppyClick(){
            this.$emit('onCoppyClick');
        },
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