<template>
  <div class="table-content">
    <div class="table-function">
      <div class="filter-refresh-export">
        <div class="input-search">
          <input
            v-model="filter"
            autofocus
            style="width: 240px"
            placeholder="Tìm theo mã, tên nhân viên"
          />
          <div class="icon-search"></div>
        </div>
        <div class="refresh-button-container">
          <div
          @click="onRefreshClick"
           class="refresh-button"></div>
        </div>
        <div 
        @click="exportExcel"
        class="export-btn"></div>
      </div>
    </div>
    <div class="table-container">
      <table>
        <thead>
          <tr style="height: 34px">
            <th class="empty-row"></th>
            <th class="th-checkbox col-checkbox">
            </th>
            <th class="col-code">MÃ NHÂN VIÊN</th>
            <th class="col-name">TÊN NHÂN VIÊN</th>
            <th style="width: 105px">GIỚI TÍNH</th>
            <th style="text-align: center">NGÀY SINH</th>
            <th>SỐ CMTND</th>
            <th>CHỨC DANH</th>
            <th>TÊN ĐƠN VỊ</th>
            <th>SỐ TÀI KHOẢN</th>
            <th>TÊN NGÂN HÀNG</th>
            <th>CHI NHÁNH NGÂN HÀNG</th>
            <th class="col-function">CHỨC NĂNG</th>
            <th class="last-col"></th>
          </tr>
        </thead>
        <tbody>
          <tr 
          v-for="employee in employees" :key="employee.EmployeeId"
          @dblclick="getEmployeeIdUpdate(employee.EmployeeId)">
            <td class="empty-row"></td>
            <td class="col-checkbox">
                <input type="checkbox">
            </td>
            <td class="col-code">{{employee.EmployeeCode}}</td>
            <td class="col-name">{{employee.FullName}}</td>
            <td>{{employee.Gender}}</td>
            <td style="text-align: center">{{employee.DateOfBirth}}</td>
            <td>{{employee.IdentityNumber}}</td>
            <td>{{employee.PositionName}}</td>
            <td>{{employee.DepartmentName}}</td>
            <td>{{employee.BankAccountNumber}}</td>
            <td>{{employee.BankName}}</td>
            <td>{{employee.BankBranch}}</td>
            <td class="col-function td-function">
              <div 
              @click="getEmployeeIdUpdate(employee.EmployeeId)"
              style="margin-right: 8px; cursor: pointer;">Sửa</div>
              <div class="drop-function" @click="getPosition($event,employee)"></div>
            </td>
            <td class="last-col"></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="paging-bar">
      <div class="total-record">
        Tổng số:<span style="font-weight: bold; padding: 0 4px"> {{totalRecord}} </span> bản ghi
      </div>
     <div class="pagin-container"> 
        <Dropdown
        ref="dropdownRecord"
        @selectRecordPerPage="getDataPaging"
        style="margin-right: 20px"
        />
        <b-pagination
        limit = 4
        prev-text = "Trước"
        next-text = "Sau"
        v-model="currentPage"
        :total-rows="totalPage"
        :per-page="perPage"
        first-number
        last-number
      ></b-pagination>
     </div>
    </div>
  </div>
</template>

<script>

import Dropdown from "../../../components/Dropdown.vue"
//import EmployeeApi from "../../../api/component/EmployeeApi.js"
export default {
  created(){
    },

  props:{
    totalPage:{
       type: Number,
      require: true,
    },
    totalRecord:{
      type: Number,
      require: true,
    },
    employees: {
      type: Array,
      require: true,
    }
  },
  components: {
    Dropdown,
  },

  watch:{
    currentPage: function (val) {
      this.$emit("currentPage",val);
    },

    filter: function(val){
      clearTimeout(this.timeOut);
      this.timeOut = setTimeout(() =>{
          this.$emit('onFilterInput', val);
      },400);
    }
  },

  methods:{
    /**
     * Sự kiện khi click vào nút suất excel, emit lên component cha
     * created by: NHNGHIA (03/09/2021)
     */
    exportExcel(){
      this.$emit('exportExcel');
    },

    /**
     * Gửi id của nhân viên muốn update lên component cha 
     * creatd by: NHNGHIA (01/09/2021)
     */
    getEmployeeIdUpdate(id){
      this.$emit("getEmployeeIdUpdate", id);
    },

    /**
     * Sự kiện chọn số bản ghi trên một trang muốn hiện thị trong dropdown, gửi lên component cha
     * created by: NHNGHIA (01/09/2021)
     */
    getDataPaging(count){
      this.$emit("getDataPaging", count);
    },

    /**
     * Sự kiện click vào nút refresh 
     * created by: NHNGHIA (01/09/2021)
     */
    onRefreshClick(){
      this.filter = '';
      this.$emit('onRefreshClick');
    },

    /**
     * Sự kiện click chọn trang để hiện thị
     * created by: NHNGHIA (01/09/2021)
     */
    setCurrentPage(number){
      this.currentPage = number;
    },

    /**
     * Sự kiện lấy vị trí và thông tin nhân viên tại con trỏ chuột khi click
     * created by: NHNGHIA (02/09/2021)
     */
    getPosition(e,employee){
      this.$emit("getPosition",e.x , e.y,employee.EmployeeId);
    }
  },
  data(){
    return{
      timeOut: null,
      filter: '',
      perPage: 1,
      currentPage: 1,
    }
  }
};
</script>

<style>
@import url("../../css/layout/TableContent.css");
</style>