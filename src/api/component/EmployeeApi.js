import BaseApi from "../base/BaseApi";

class EmployeeApi extends BaseApi{
    constructor() {
        super();
        this.controller = "Employees"
    }
    
}

export default new EmployeeApi();