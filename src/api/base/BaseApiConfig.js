import APIConfig from '../APIConfig/APIConfig';
import axios from 'axios'

var BaseApiConfig = axios.create({
    baseURL: APIConfig,
    headers: { 'Content-type': 'application/json' }
});

export default BaseApiConfig;