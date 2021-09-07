import BaseApi from "../base/BaseApi";
import BaseApiConfig from '../base/BaseApiConfig.js'

class EmployeeApi extends BaseApi{
    constructor() {
        super();
        this.controller = "Employees"
    }
    
    getAllCode(){
        return BaseApiConfig.get(`${this.controller}/AllCode`);
    }
}

export default new EmployeeApi();