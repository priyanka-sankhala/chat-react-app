
import {axiosAuth as axios } from "./axios";

export const sendMessage = (values) => {
    console.log("here in login request",values);
    const headers = {
        app_version:1,
        os_version:1,
    };
    return axios
        .post("users/chat", values, headers)
        .then((response) => {
          console.log("chat.service", response);
            if (response.data) {
                console.log("here return ",response.data);
                
                return response.data;

                    } else {
                        console.log("user service else", response.data.status);
                        
                return response.data;
            }

           // return response.data;
        })
        .catch((error) => {
            // console.log(error.stack);
            
             console.log("[Auth service]" + error);
             console.log(error.response.data);
             
            return error.response.data
        });
};

export const getMessages = (userID) => {
    console.log("here in login request",userID);
    const headers = {
        app_version:1,
        os_version:1,
    };
    return axios
        .get("users/chat/"+userID, headers)
        .then((response) => {
          console.log("chat.service", response);
            if (response.data) {
                console.log("here return ",response.data);
                
                return response.data;

                    } else {
                        console.log("user service else", response.data.status);
                        
                return response.data;
            }

           // return response.data;
        })
        .catch((error) => {
            // console.log(error.stack);
            
             console.log("[Auth service]" + error);
             console.log(error.response.data);
             
            return error.response.data
        });
};