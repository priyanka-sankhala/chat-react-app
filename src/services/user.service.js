import {axiosInstance as axios} from "./axios";
import {axiosAuth } from "./axios";

export const register = (values) => {
    //console.log("here in login request");
    const headers = {
        app_version:1,
        os_version:1,
    };
    return axios
        .post("auth/register", values, headers)
        .then((response) => {
          console.log("user.service", response);
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

export const login = (values)=>{
    const headers = {
        app_version:1,
        os_version:1,
    };
    return axios
        .post("auth/login", values, headers)
        .then((response) => {
          console.log("user.service", response);
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
            console.log("user service login");
            
            console.log(error);
            
             console.log("[Auth service]" + error.response);
             console.log(error.data);
             
            return error.data
        });
}

export const refreshToken = (values)=>{
    const headers=[]
    const refreshToken = localStorage.getItem('refreshToken')
    return axios
        .post("auth/refresh-tokens", {refreshToken}, headers)
        .then((response) => {
          console.log("user.service", response);
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
            console.log("user service login");
            
            console.log(error);
            
             console.log("[Auth service]" + error.response);
             console.log(error.data);
             
            return error.data
        });
}

export const getUsers=()=>{
    return axiosAuth.get('users').then((result)=>{
        console.log("Api =>", result.data.user);
        return result.data.user;
    }).catch(error=>{
        console.log(error.data);
        return error.data;
    })
}

export const list=(params)=>{
    
   return axiosAuth
    .post('/users/list', params)
    .then(response=>{
        return response.data

    }).catch(error=>{
        console.log("Error", error);
        return error.response.data;

    })

}

export const userDetail=(id)=>{
    return axiosAuth.get(`users/${id}`).then((result)=>{
        console.log(result.data);
        return result.data;
    }).catch(error=>{
        console.log(error.data);
        return error.data;
    })
}

export const editUser=(id,userdata)=>{
    return axiosAuth.patch(`users/${id}`, userdata).then((result)=>{
        console.log(result.data);
        return result.data;
    }).catch(error=>{
        console.log(error.data);
        return error.data;
    })
}

