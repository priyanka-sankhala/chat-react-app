import { toast } from 'react-toastify'
//import 'react-toastify/dist/ReactToastify.css';



const nuLifeSuccessToastr=async(message)=>{
    toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        })
}

const nuLifeErrorToastr=async(message)=>{
    toast.error(message, { hideProgressBar: true })
}
export{
    nuLifeSuccessToastr,
    nuLifeErrorToastr
}