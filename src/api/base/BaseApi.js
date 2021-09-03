import BaseApiConfig from "./BaseApiConfig";

export default class BaseApi{
    constructor(){
        this.controller = null
    }
    /**
     * Lấy tất cả dữ liệu
     * created by: NHNGHIA (02/08/2021)
     */
    getAll() {
        return BaseApiConfig.get(`${this.controller}`);
    }
    /**
     * Lấy dữ liệu theo id
     * @param {string} id 
     * @returns dữ liệu theo theo id
     * created by: NHNGHIA (02/08/2021)
     */
    getById(id){
        return BaseApiConfig.get(`${this.controller}/${id}`)
    }
    
    /**
     * Update dữ liệu theo id
     * @param {string} id 
     * @returns dữ liệu được cập nhật
     * created by: NHNGHIA (02/08/2021)
     */
    updateById(id, body) {
        return BaseApiConfig.put(`${this.controller}/${id}`, body)
    }

    /**
     * Xóa dữ liệu theo mã
     * @param {string} id 
     * @returns dữ liệu bị xóa
     * created by: NHNGHIA (02/08/2021)
     */
    deleteById(id){
        return BaseApiConfig.delete(`${this.controller}/${id}`)
    }

    /**
     * Lấy dữ liệu phân trang theo tham số đầu vào
     * @param {string} filter đầu lọc dữ liệu
     * @param {int} offSet số thứ tự bản ghi bắt đầu lấy
     * @param {int} size số lượng bản ghi một trang
     */
    getFilterPaging(filter,offset,size){
        return BaseApiConfig.get(`${this.controller}/filterpaging?filter=${filter}&offSet=${offset}&size=${size}`)
    }

    /**
     * Lấy mã mới 
     * @returns mã mới
     */
    getNewCode(){
        return BaseApiConfig.get(`${this.controller}/NewCode`);
    }
    /**
     * Thêm mới dữ liệu
     */
    add(object){
        return BaseApiConfig.post(`${this.controller}`, object);
    }

    export(filter,offset,size){
        return BaseApiConfig.get(`${this.controller}/export?filter=${filter}&offSet=${offset}&size=${size}`, {
            responseType: "blob",
          }
        )
    }
}