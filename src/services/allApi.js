import { commonApi } from "./commonApi"
import {base_url} from "./base_url"
//register user 
export const registerApi = async (userData) =>{
    return await commonApi("POST",`${base_url}/user/register`,userData,"")
}

//login 
export const loginApi = async (data) =>{
    return await commonApi("POST",`${base_url}/user/login`,data,"")
}