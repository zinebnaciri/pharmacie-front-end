import { Navigate } from "react-router-dom"


 const Protected= ({children})=>{

    if(localStorage.getItem('access_token')==null){
     return   <Navigate to='/'/>
    }
    return children;
}

export default Protected;