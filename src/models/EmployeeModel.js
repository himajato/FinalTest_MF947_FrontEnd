// export const EmployeeModel = {
//     Address: null,
//     BankAccountNumber: null,
//     BankBranch: null,
//     BankName: null,
//     CreatedBy: null,
//     CreatedDate: null,
//     DateOfBirth: null,
//     DepartmentId: 'fa33f5f3-32d8-44c1-a871-b430a1cbdb9a',
//     DepartmentName: null,
//     Email: null,
//     EmployeeCode: null,
//     EmployeeId: '00000000-0000-0000-0000-000000000000',
//     FullName: null,
//     Gender: null,
//     GenderName: null,
//     IdentityPlace: null,
//     IdentityDate: null,
//     IdentityNumber: null,
//     MobilePhoneNumber: null,
//     ModifyBy: null,
//     ModifyDate: null,
//     PositionName: null,
//     TelePhoneNumber: null,
// }
class EmployeeModel {
    constructor() {

    }

    newEmployee() {
        return {
            Address: null,
            BankAccountNumber: null,
            BankBranch: null,
            BankName: null,
            CreatedBy: null,
            CreatedDate: null,
            DateOfBirth: null,
            DepartmentId: null,
            DepartmentName: null,
            Email: null,
            EmployeeCode: null,
            EmployeeId: '00000000-0000-0000-0000-000000000000',
            FullName: null,
            Gender: null,
            GenderName: null,
            IdentityPlace: null,
            IdentityDate: null,
            IdentityNumber: null,
            MobilePhoneNumber: null,
            ModifyBy: null,
            ModifyDate: null,
            PositionName: null,
            TelePhoneNumber: null,
        }
    }
}

export default new EmployeeModel();