<template>
  <div class="combobox">
    <div style="display: flex; width: 100%; align-items: center;">
      <input
        ref="inputDepartment"
        @keyup.down="onArrowKeyDownPress"
        @keydown.up="onArrowKeyUpPress"
        @keydown.tab="onTabPress"
        @keydown.enter="onItemEnter"
        @input="onComboboxInput"
        :value="inputCombobox"
        type="text"
        style="width: 100%"
      />
      <div class="btn-dropdown" @click="toggleComboboxData">
        <div class="dropdown-icon"></div>
      </div>
    </div>
    <div class="combobox-data" v-show="isShowComboboxData">
      <div class="combobox-data-header">
        <div class="item-code">Mã đơn vị</div>
        <div class="item-name">Tên đơn vị</div>
      </div>
      <div class="combobox-data-items">
        <div
          v-for="(item) in dataItems"
          :key="item.Id"
          :id="item.Id"
          class="data-item"
          ref="dataItem"
          @click="dataItemSelect(item)"
        >
          <div class="item-code">{{ item.Code }}</div>
          <div class="item-name">{{ item.Name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DepartmentApi from '../../src/api/component/DepartmentApi.js'
export default {
  async created() {
    window.addEventListener("click", (e) => {
      if (!this.$el.contains(e.target)) {
        this.isShowComboboxData = false;
      }
    });
    await DepartmentApi.getAll().then(res =>{
      res.data.forEach(item => {
          var itemInCombobox = {
            Id: item.DepartmentId,
            Code: item.DepartmentCode,
            Name: item.DepartmentName,
          }
          this.dataItems.push(itemInCombobox);
      });
    })
    this.dataItemsClone = this.dataItems;
  },

  props:{
    deparmentName:{
      type: String,
    },
  },

  methods: {
    /**
     * Bắt sự kiện khi ấn enter để chọn item trong combobox
     * created by: NHNGHIA (30/08/2021)
     */
    onItemEnter(){
        this.inputCombobox = this.$refs["dataItem"][this.indexData].childNodes[1].innerHTML;
        this.$refs["dataItem"][this.indexData].classList.remove('data-item-active')
        var selectId = this.$refs["dataItem"][this.indexData].id;
        this.indexData = -1;
        this.isShowComboboxData = false;
        this.dataItems = this.dataItemsClone;
        this.$emit('onItemEnter',selectId);
    },

    /**
     * Sự kiện cho nút bật tắt data combobox
     * created by: NHNGHIA (30/08/2021)
     */
    toggleComboboxData() {
      this.isShowComboboxData = !this.isShowComboboxData;
    },

    /**
     * Sự kiện click chọn vào một item trong combobox data
     * created by : NHNGHIA (30/08/2021)
     */
    dataItemSelect(item) {
      this.inputCombobox = item.Name;
      this.isShowComboboxData = false;
      this.$emit('dataItemSelect',item.Id);
    },

    /**
     * Sự kiện khi nhập vào ô input combobox, filter dữ liệu theo giá trị nhập
     */
    onComboboxInput(){
      this.indexData = -1;
      var val = this.$refs.inputDepartment.value;
      this.inputCombobox = val;
      this.isShowComboboxData = true;
      var self = this;
      this.dataFilter = [];
      if (val != "") {
        self.dataItemsClone.forEach((item) => {
          if (
            item.Name.trim().toLowerCase().includes(val.toLowerCase()) ||
            item.Code.trim().toLowerCase().includes(val.toLowerCase())
          ) {
            self.dataFilter.push(item);
          }
          self.dataItems = self.dataFilter;
        });
      } else {
        this.dataItems = this.dataItemsClone;
      }
    },

    /**
     * Sự kiện khi ấn nút mũi tên lên tại combobox
     * created by: NHNGHIA (02/09/2021)
     */
    onArrowKeyUpPress(){
      if (this.indexData == -1) {
        this.indexData = this.dataItems.length -1;
      }
      if(this.indexData <= this.dataItems.length-1){
          this.$refs["dataItem"][this.indexData].classList.remove('data-item-active');
      }
        this.isShowComboboxData = true;
        --this.indexData;
      if (this.indexData == -1) {
        this.indexData = this.dataItems.length -1;
      }
      this.$refs["dataItem"][this.indexData].classList.add('data-item-active');
    },

    /**
     * Bắt sự kiện khi bấm nút mũi tên xuống
     * created by: NHNGHIA (30/08/2021)
     */
    onArrowKeyDownPress() {
        if(this.indexData >= 0){
          this.$refs["dataItem"][this.indexData].classList.remove('data-item-active');
      }
        this.isShowComboboxData = true;
        ++this.indexData;
      if (this.indexData == this.dataItems.length) {
        this.indexData = 0;
      }

      this.$refs["dataItem"][this.indexData].classList.add('data-item-active');
    },

    /**
     * Sự kiện tab vào Combobox, hiện thị combobox data
     * created by: NHNGHIA (30/08/2021)
     */
    onTabPress() {
      if(this.inputCombobox != ''){
          this.isShowComboboxData = false;
      }
    },

    /**
     * Forcus vào ô input
     */
    focusInput(){
      this.$refs.inputDepartment.focus();
    }
  },

  watch: {
    deparmentName: function(val) {
      this.inputCombobox = val;
    },
    dataItems: function (val) {
      this.dataItems = val;
    },

  },

  data() {
    return {
      indexData: -1,
      inputCombobox: "",
      flagIsEnter: false,
      isShowComboboxData: false,
      dataItemsClone: "",
      dataFilter: [],
      dataItems: [
      ],
    };
  },
};
</script>

<style scoped>
@import url("../assets/css/component/Combobox.css");
</style>