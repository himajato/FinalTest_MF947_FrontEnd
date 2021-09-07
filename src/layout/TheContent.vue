<template>
    <div
    :class="{'thecontent-toggle': isToggle}"
     class="thecontent">
       <EmployeePage/>
    </div>
</template>

<script>
import EmployeePage from '../assets/page/employee/EmployeePage.vue'
export default {
    props: {
        isToggle: {
           type : Boolean,
            require: true,
        }
    },

    components:{
        EmployeePage,
    },

}
</script>

<style scoped>
    @import url('../assets/css/layout/TheContent.css');
</style>