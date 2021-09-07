<template>
  <div class="employee-page" style="position: relative">
    <div class="title-and-button">
      <div class="title">Nhân viên</div>
      <BaseButton
        style="margin-left: auto"
        @clickFunction="openDialog"
        :buttonInfor="addButtonInfor"
      />
    </div>

    <TableContent
      ref="tableContent"
      @exportExcel="exportExcel"
      @onFilterInput="onFilterInput"
      @onRefreshClick="onRefreshClick"
      @getEmployeeIdUpdate="getEmployeeUpdate"
      @getDataPaging="getListBySize"
      @currentPage="getListByPage"
      @getPosition="getPosition"
      :totalRecord="totalRecord"
      :totalPage="totalPage"
      :employees="employees"
    />

    <EmployeeDialog
      :dialogMode="dialogMode"
      :employee="employeeUpdate"
      ref="EmployeeDialog"
      @closeDialog="closeDialog"
      @reloadPage="reloadPage"
      @showAddSuccessToast="showAddSuccessToast"
      @showErrorToast="showError"
      @showUpdateSuccessToast="showUpdateSuccessToast"
      v-show="isShowDialog"
    />

    <PopupWarning
      @onConfirmDeleteClick="onConfirmDeleteClick"
      :popupInfor="confirmDeletePopUp"
      v-show="isShowDeletePopup"
      @closePopup="closePopUp"
    />

    <DropdownFunction
      @onCoppyClick="onCoppyClick"
      @onDeleteClick="onDeleteClick"
      :position="positionFunctionDropDown"
      ref="dropdownFunction"
      v-show="isShowDropdownFunction"
    />

    <Loader v-show="isShowLoader" />
    <transition name="slide-fade">
        <ToastMessenger :toastInfor="toastInfor" v-show="isShowToast" />
    </transition>
  </div>
</template>

<script>
import BaseButton from "../../../components/Button.vue"
import EmployeeDialog from '../../../layout/EmployeeDialog.vue'
import TableContent from "../../page/employee/TableContent.vue"
import PopupWarning from "../../../components/popup/PopupWarning.vue"
import EmployeeApi from "../../../api/component/EmployeeApi.js"
import DropdownFunction from "../../../components/DropdownFunction.vue"
import Loader from "../../../components/Loader.vue"
import Format from "../../../js/utils/common/Format.js"
import EmployeeModel from "../../../models/EmployeeModel.js"
import ToastMessenger from "../../../components/ToastMesenger.vue"
import {MISA_RESOUCE} from "../../../js/resouce/resouce.js"

export default {
    components: {
        BaseButton,
        TableContent,
        EmployeeDialog,
        PopupWarning,
        DropdownFunction,
        Loader,
        ToastMessenger,
    },

    created(){
        //Hiện thị loadder
        this.isShowLoader = true;
        //Gọi api lấy dữ liệu theo filter và các tham số phân trang
        EmployeeApi.getFilterPaging('',0,10).
                then(res => {
                    this.isShowLoader = false;
                    res.data.employeeList.forEach(employee => {
                        employee.Gender = Format.genderFormat(employee.Gender);
                        employee.DateOfBirth = Format.dobFormat(employee.DateOfBirth);
                    });
                    this.employees = res.data.employeeList;
                    this.totalRecord = res.data.totalRecord;
                    this.totalPage = res.data.totalPage;
                    this.toastInfor.isSucessToast = true;
                    this.isShowToast = true;
                    setTimeout(() => {
                        this.isShowToast = false;
                    }, 2000);
                })
                .catch(() => {
                    this.isShowLoader = false;
                    this.toastInfor.isErrorToast = true;
                    this.toastInfor.toastTitle = MISA_RESOUCE.TOAST_ERROR;
                    this.isShowToast = true;
                    setTimeout(() => {
                        this.isShowToast = false;
                    }, 2000);
                })
    },

    methods:{
        /**
         * Hiện thị toast mess thêm thành công
         * created by: NHNGHIA (01/09/2021)
         */
        showAddSuccessToast(){
            this.toastInfor.isErrorToast = false;
            this.toastInfor.isSucessToast = true;
            this.toastInfor.toastTitle = MISA_RESOUCE.TOAST_ADD_SUCCESS;
            this.isShowToast = true;
            setTimeout(() => {
                this.isShowToast = false;
            }, 2000);
        },

        /**
         * Hiện thị toast cảnh báo lỗi
         * created by: NHNGHIA (01/09/2021)
         */
        showError(){
            this.toastInfor.isErrorToast = true;
            this.toastInfor.isSucessToast = false;
            this.toastInfor.toastTitle = MISA_RESOUCE.TOAST_ERROR;
            this.isShowToast = true;
            setTimeout(() => {
                this.isShowToast = false;
            }, 2000);
        },

        /**
         * Hiện thị toast sửa thành công
         */
        showUpdateSuccessToast(){
            this.toastInfor.isErrorToast = false;
            this.toastInfor.isSucessToast = true;
            this.toastInfor.toastTitle = MISA_RESOUCE.TOAST_UPDATE_SUCCESS;
            this.isShowToast = true;
            setTimeout(() => {
                this.isShowToast = false;
            }, 2000);
        },

        /**
         * Hiện thị toast xóa thành công
         */
        showDeleteSuccessToast(){
            this.toastInfor.isErrorToast = false;
            this.toastInfor.isSucessToast = true;
            this.toastInfor.toastTitle = MISA_RESOUCE.TOAST_DELETE_SUCCESS;
            this.isShowToast = true;
            setTimeout(() => {
                this.isShowToast = false;
            }, 2000);
        },

        /**
         * Sự kiện click vào nút export excel, gọi đến api export excel
         * created by : NHNGHIA (03/09/2021)
         */
        exportExcel(){
            var offset = this.size*(this.currentPage-1)
            EmployeeApi.export(this.filter,offset,this.size).then((response) => {
                if (response) {
                const blob = new Blob([response.data], {
                    type:
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                });
                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = MISA_RESOUCE.EXCEL_FILE_NAME;
                link.click();
                URL.revokeObjectURL(link.href);
                }
            });

        },
        /**
         * Khi người dùng tìm nhâp vào ô tìm kiếm, gọi đến api filter và phân trang
         * creadted by: NHNGHIA (02/09/2021)
         */
        onFilterInput(val){
            this.filter = val;
            this.isShowLoader = true;
            EmployeeApi.getFilterPaging(`${val}`,0,this.size).
                then(res => {
                    this.isShowLoader = false;
                    res.data.employeeList.forEach(employee => {
                        employee.Gender = Format.genderFormat(employee.Gender);
                        employee.DateOfBirth = Format.dobFormat(employee.DateOfBirth);
                    });
                    this.employees = res.data.employeeList;
                    this.totalRecord = res.data.totalRecord;
                    this.totalPage = res.data.totalPage;
                })
                .catch(err => {
                    this.isShowLoader = false;
                    alert(err); 
                })
        },

        /**
         * Load lại bảng với 10 nhân viên một trang và offset là 0
         * created by: NHNGHIA (01/09/2021)
         */
        reloadTable(){
            this.isShowLoader = true;
            this.$refs.tableContent.setCurrentPage(1);
            EmployeeApi.getFilterPaging('',0,this.size).
                then(res => {
                    this.isShowLoader = false;
                    //Format dữ liệu
                    res.data.employeeList.forEach(employee => {
                        employee.Gender = Format.genderFormat(employee.Gender);
                        employee.DateOfBirth = Format.dobFormat(employee.DateOfBirth);
                    });
                    this.employees = res.data.employeeList;
                    this.totalRecord = res.data.totalRecord;
                    this.totalPage = res.data.totalPage;
                }).catch(err =>{
                    this.isShowLoader = false;
                    console.log(err);
                    this.employees = [];
            })
        },
        
        /**
         * Load lại trang với (giữ nguyên filter và trang hiện tại)
         * created by: NHNGHIA (03/09/2021)
         */
        reloadPage(){
            this.isShowLoader = true;
            var offset = this.size*(this.currentPage-1)
            EmployeeApi.getFilterPaging(this.filter,offset,this.size).
                then(res => {
                    this.isShowLoader = false;
                    //Format dữ liệu
                    res.data.employeeList.forEach(employee => {
                        employee.Gender = Format.genderFormat(employee.Gender);
                        employee.DateOfBirth = Format.dobFormat(employee.DateOfBirth);
                    });
                    this.employees = res.data.employeeList;
                    this.totalRecord = res.data.totalRecord;
                    this.totalPage = res.data.totalPage;
                }).catch(err =>{
                    this.isShowLoader = false;
                    console.log(err);
                    this.employees = [];
            })
        },

        /**
         * Sự kiện nhân bản thông tin nhân viên
         * created by: NHNGHIA (01/09/2021)
         */
        onCoppyClick(){
            this.isShowDialog = true;
            this.dialogMode = MISA_RESOUCE.DIALOG_MODE_COPY;
            this.employeeUpdate = this.employeeDeleteOrCoppy;
            this.$refs.EmployeeDialog.forcusFirstInput();
            this.isShowDropdownFunction = false;    
        },

        /**
         * Sự kiện xóa nhân viên, hiện thị popup confirm delete
         * created by: NHNGHIA (01/09/2021)
         */
        onDeleteClick(){
             //`Bạn có thực sự muốn xóa Nhân Viên <${this.employeeDeleteOrCoppy.EmployeeCode}> không?`
            this.confirmDeletePopUp.popUpDescription = MISA_RESOUCE.POPUP_DELETE_CONFIRM.replace('EmployeeCode',`${this.employeeDeleteOrCoppy.EmployeeCode}`);
            this.isShowDeletePopup = true;
            this.isShowDropdownFunction = false;
            
        },

        /**
         * Sự kiện confirm xóa nhân viên, gọi đến api xóa
         * created by: NHNGHIA (01/09/2021)
         */
        onConfirmDeleteClick(){
            this.isShowLoader = true;
            this.isShowDeletePopup = false;
            EmployeeApi.deleteById(this.employeeDeleteOrCoppy.EmployeeId)
                        .then(() =>{
                            this.isShowLoader = false;
                            this.reloadPage();
                            this.showDeleteSuccessToast();
                        }).catch(() =>{
                            this.isShowLoader = false;
                            this.reloadPage();
                            this.showError();
                        })
        },

        /**
         * Sự kiện ấn vào nút refresh, reload lại toàn table
         * created by: NHNGHIA (01/09/2021)
         */
        onRefreshClick(){
            this.reloadTable();
        },

        /**
         * Tùy chỉnh số lượng bản ghi một trang
         * created by: NHNGHIA (31/08/2021)
         */
        getListBySize(count){
            this.isShowLoader = true;
            this.$refs.tableContent.setCurrentPage(1);
            this.size = count;
            EmployeeApi.getFilterPaging(this.filter,0,count).
                then(res => {
                    this.isShowLoader = false;
                    //Format dữ liệu
                    res.data.employeeList.forEach(employee => {
                        employee.Gender = Format.genderFormat(employee.Gender);
                        employee.DateOfBirth = Format.dobFormat(employee.DateOfBirth);
                    });
                    this.employees = res.data.employeeList;
                    this.totalRecord = res.data.totalRecord;
                    this.totalPage = res.data.totalPage;
                })
        },

        /**
         * Thực hiện lấy dữ liệu theo các trang 
         * created by: NHNGHIA (31/08/2021)
         */
        getListByPage(currentPage){
            this.currentPage = currentPage -1;
            this.isShowLoader = true;
            var offSet = this.currentPage*this.size;
            EmployeeApi.getFilterPaging(this.filter,offSet,this.size).
                then(res => {
                    this.isShowLoader = false;
                    //Format dữ liệu
                    res.data.employeeList.forEach(employee => {
                        employee.Gender = Format.genderFormat(employee.Gender);
                        employee.DateOfBirth = Format.dobFormat(employee.DateOfBirth);
                    });
                    this.employees = res.data.employeeList;
                    this.totalRecord = res.data.totalRecord;
                    this.totalPage = res.data.totalPage;
                })
        },

        /**
         * Lấy vị trí và thông tin nhân viên của sự kiện click khi ấn vào các nút cột chức năng
         */
        getPosition(x,y,employeeId){
            this.positionFunctionDropDown.top = y + 10 ;
            this.positionFunctionDropDown.left = x - 100; 
            this.isShowDropdownFunction = !this.isShowDropdownFunction;
            EmployeeApi.getById(employeeId).then(res =>{
                this.employeeDeleteOrCoppy = res.data;
            }).catch(err =>{
                this.showError();
                console.log(err)
            })
        },
        
        /**
         * Lấy dữ liệu nhân viên cần update để gán vào dialog
         * created by: NHNGHIA (01/09/2021)
         */
        getEmployeeUpdate(id){
            EmployeeApi.getById(id)
                .then(res =>{
                    this.dialogMode = MISA_RESOUCE.DIALOG_MODE_UPDATE;
                    this.isShowDialog = true;
                    this.employeeUpdate = res.data;
                    this.$refs.EmployeeDialog.forcusFirstInput();         
                })
                .catch(() =>{
                    this.showError();
                })
        },

        /**
         * Sự kiện đóng dialog
         */
        closeDialog(){
            this.isShowDialog = false
            this.dialogMode = MISA_RESOUCE.DIALOG_MODE_DEFAULT;
        },

        /**
         * Sự kiện khi click vào nút thêm mới nhân viên
         */
        openDialog(){   
           this.dialogMode = MISA_RESOUCE.DIALOG_MODE_ADD;
           this.isShowDialog = true;    
           this.isShowDropdownFunction = false;
           this.$refs.EmployeeDialog.forcusFirstInput();
        },

        /**
         * Hiện thị popup cảnh báo trước khi xóa
         */
        closePopUp(){
            this.isShowDeletePopup = false;
        },

    },

     data(){
        return{
            filter: '',
            currentPage: 1,
            dialogMode: MISA_RESOUCE.DIALOG_MODE_DEFAULT,
            isShowLoader: false,
            employeeUpdate: EmployeeModel.newEmployee(),
            employeeDeleteOrCoppy: EmployeeModel.newEmployee(),
            positionFunctionDropDown: {
                top: 0,
                left: 0,
            },
            isShowDropdownFunction: false,
            isShowToast: false,
            employees: [],
            totalRecord: 0,
            totalPage: 0,
            size: 10,
            isShowDeletePopup: false,
            isShowDialog : false,
            addButtonInfor:{
                buttonTitle: MISA_RESOUCE.BUTTON_ADD_NEW_EMPLOYEE,
                isPrimaryButton: true,
            },
            confirmDeletePopUp:{
                popUpDescription: "",
            },
            toastInfor:{
                toastTitle: MISA_RESOUCE.TOAST_LOAD_SUCCESS,
                isSucessToast: false,
                isErrorToast: false,
            },
        }
    }
}
</script>

<style>
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to{
  transform: translateX(10px);
  opacity: 0;
}
</style>