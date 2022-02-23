
import axios, { AxiosResponse } from "axios";

//import { DeviceUUID } from "device-uuid";
//import { store } from "../redux/storeConfig/store"
import {nuLifeSuccessToastr,nuLifeErrorToastr} from './../utility/nulifeToastr'
//import 'animate.css/animate.min.css';
import {history} from './../history'
const { detect } = require("detect-browser");

const browser = detect();
let  accessToken;
if(localStorage.getItem('accessToken')){
    accessToken = localStorage.getItem('accessToken');
}

//var uuid = new DeviceUUID().get();
 var axiosInstance = axios.create({
    //baseURL: "https://staging-api-nulife.appdesignproject.ie/v1/",
   baseURL: "http://localhost:3002/v1/",
    responseType: "json",
});

 var axiosAuth = axios.create({
  //  baseURL: "https://staging-api-nulife.appdesignproject.ie/v1/",
   baseURL: "http://localhost:3002/v1/",
    responseType: "json",
})
axiosInstance.defaults.timeout = 60000;
axiosInstance.defaults.headers.common["app_version"] = "1.0";
axiosInstance.defaults.headers.common["os_version"] = browser.os;
axiosInstance.defaults.headers.common["app_type"] = "Pharmacy";
axiosInstance.defaults.headers.common["device_type"] = "WEB";
axiosInstance.defaults.headers.common[
  "device_name"
] = `${browser.name}  ${browser.version}`;
//axiosInstance.defaults.headers.common["device_id"] = uuid;
axiosInstance.defaults.headers.common["device_token"] = "123456";
axiosInstance.defaults.headers.common["app_environment"] = "SANDBOX";
axiosInstance.defaults.headers.common["tm"] = "";
// axios.defaults.headers.common["locale_code"] = "en";
// axios.defaults.headers.common["app-signature"] = "";


axiosInstance.interceptors.response.use(
    (response) => {
        console.log("axios.js", response);
        
        //alert("axois response",response)
        console.log(response.data.status);
        if (response.data.status == 0) {
            
            let title = "Error!";
            let message = response.data.message;
           // nuLifeErrorToastr(message)
        } else {
            return response;
        }
    },
    (error) => {
        console.log("Error", error);
        console.log(error.response);
        console.log("Status==>", error.response.status);
        console.log("Message==>", error.response.data.message);
        
       if (error.message =='Network Error') {
            console.log("here in network error");
            //nuLifeErrorToastr(error.message)
          }

        if (error.response) {
            console.log("here in swich case",error.response.status);
            
            switch (error.response.status) {
                case 404:
                    console.log("err", error.response);
                    nuLifeErrorToastr(error.response)
                    break;
                case 401:
                    nuLifeErrorToastr(error.response.data.message);
                    let title = "Nulife Error"
                    history.push('/login')
                    return error.response; 
                case 400:
                    console.log("here in status 400");
                    nuLifeErrorToastr( error.response.data.message);
                   // history.push('/login'); 
                    break;   
                default:
                    console.log("axios default");
                  //  nuLifeSuccessToastr(error.response.data.message);
                    
            }
        }
        return Promise.reject(error); // 返回接口返回的错误信息
    }
);


axiosAuth.interceptors.response.use(
    (response) => {
        console.log("axios.js", response);
        
        //alert("axois response",response)
        console.log(response.data.status);
        if (response.data.status === 0) {
            
            let title = "Error!";
            let message = response.data.message;
            nuLifeErrorToastr(message)
        } else {
            let title = "Success!";
            let message = response.data.message;
           // nuLifeSuccessToastr(message)
            return response;
        }
    },
    (error) => {
        console.log(" Auth errot", error);
        
        if (error.message==='Network Error') {
            console.log("here in network error");
            nuLifeErrorToastr(error.message)
          }

        if (error.response) {
            console.log(error.response.status);
            
            switch (error.response.status) {
                case 404:
                    console.log("err", error.response);
                    console.log(error.response.data.message);
                    nuLifeErrorToastr(error.response.data.message);
                    break
                case 401:
                    console.log("401 ");
                   nuLifeSuccessToastr(error.response.data.message);
                    let title = "Nulife Error"
                    history.push('/login')
                    break
                case 400:
                    console.log("here n 400",error.response.data.message);
                    
                    nuLifeErrorToastr(error.response.data.message);
                   // history.push('/login');    
                   break
                case 500:
                    console.log("here n 500",error.response.data.message);
                    
                    nuLifeErrorToastr(error.response.data.message);
                   // history.push('/login');    
                   break   
                default:
                    console.log("axios default");
                   // nuLifeSuccessToastr(error.response.data.message);
                    
            }
        }
        return Promise.reject(error); // 返回接口返回的错误信息
    }
);
axiosAuth.interceptors.request.use(function (config) {
   
    config.headers= {
        "Access-Control-Allow-Origin" : "*"}
    //const token = localStorage.getItem("oauth")
    config.headers.Authorization = `Bearer ${accessToken}`
    
    return config
  })

export {
    axiosInstance,
    axiosAuth
} ;
