<template>
    <div class="dropdown">
        <div class="input-and-button" @click="toggleDataList">
            <input
            v-model="recordPerPage"
            style="width: 200px; font-size: 14px"
            type="text" 
            readonly id="">
            <div class="dropdown-btn">
                <div class="dropdown-icon">
                </div>
            </div>
        </div>
        <div 
        v-show="isShowDataList"
        class="dropdown-data-list">
            <div class="list-data">
                <div v-for="item in items" :key="item.count"
                @click="selectRecordPerPage(item)"
                class="item-data" 
                :class="{'item-data-active': item.IsActive}">
                    {{item.Name}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {

    created(){
         window.addEventListener("click", (e) => {
            if (!this.$el.contains(e.target)) {
            this.isShowDataList = false;
        }
      })
    },

    methods:{
        toggleDataList(){
            this.isShowDataList = !this.isShowDataList;
        },
        selectRecordPerPage(itemSelect){
            this.items.forEach(item => {
                item.IsActive = false;
                if(itemSelect == item){
                    item.IsActive = true;
                }
            });
            this.recordPerPage = itemSelect.Name;
            this.isShowDataList = false;
            this.$emit("selectRecordPerPage", itemSelect.Count);
        }
    },

    data(){
        return{
            isShowDataList: false,
            recordPerPage: "10 Bản ghi trên 1 trang",
            items:[
                {
                    Name: "10 Bản ghi trên 1 trang",
                    Count: 10,
                    IsActive: true,
                },
                {
                    Name: "20 Bản ghi trên 1 trang",
                    Count: 20,
                    IsActive: false,
                },
                {
                    Name: "30 Bản ghi trên 1 trang",
                    Count: 30,
                    IsActive: false,
                },
                {
                    Name: "50 Bản ghi trên 1 trang",
                    Count: 50,
                    IsActive: false,
                },
                {
                    Name: "100 Bản ghi trên 1 trang",
                    Count: 100,
                    IsActive: false,
                },
            ],
        }
    }
}
</script>

<style>
    @import url('../assets/css/component/Dropdown.css');
</style>