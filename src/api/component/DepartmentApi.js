import BaseApi from "../base/BaseApi";

class DepartmentApi extends BaseApi{
    constructor() {
        super();
        this.controller = "Deparments"
    }
    
}

export default new DepartmentApi();