import React from 'react';
import {useRouter} from "next/router"

const withAuth = (ProtectedComponent) => {
    return (props)=>{
         const router = useRouter()
        const isLogin = localStorage.getItem("user")


        if(!isLogin){
        router.push("/")
        return null
        }

        return <ProtectedComponent  {...props} />

    }
   
    
    
};

export default withAuth;