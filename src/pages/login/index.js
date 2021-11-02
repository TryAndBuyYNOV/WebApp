import React, { useRef, useState } from 'react';
import styles from "./Login.module.scss"
import {gql , useLazyQuery } from '@apollo/client'
import jwt_decode  from 'jwt-decode'
import {useRouter} from 'next/router'

const index = () => {

    const router = useRouter()
    const [Forms , setForms] = useState({
        email:"",
        password:"",
        
    })
    
    const isUpdated = useRef(false)

        const LoginQuery = gql`
    query LoginQuery($email : String! , $password:String!){
  login(email:$email , password:$password){auth token}  
} `

 const [LoginQueryFunction, { called, loading, data }] = useLazyQuery(
    LoginQuery)
   
   
     async function  SubmitLogin (e){
        e.preventDefault()
       LoginQueryFunction({ variables: { email: Forms.email , password :Forms.password } })
    }

    const OnChangeLogin = (e)=>{
        const name = e.target.name
        const value = e.target.value
        setForms({
            ...Forms,
            [name] : value,
        })
    }

  
   
         if(called===true  && data){
            console.log("is loged");
             isUpdated.current = false
            const token = data["login"].token
           
             const decoded = jwt_decode(token)
             const userData = JSON.stringify(decoded)

         localStorage.setItem("user" , userData)

           console.log(JSON.parse(localStorage.getItem("user")));
        }     
         
        if(called===true && !data){
            console.log("not loged");
            isUpdated.current = true
        }

    
    return (
        <div className={styles.container}>

                <h1> Login</h1>

              <p style={{display : isUpdated.current ? "block" : "none"}} className={styles.ErrorMessage} > email ou mot de passe erroné</p>

            <form onSubmit={SubmitLogin} >

            <input className={styles.signupForms} type="text" name="email" id="" placeholder="email..."  value={Forms.email} onChange={OnChangeLogin}/>
            <input className={styles.signupForms} type="password" placeholder="password..." value={Forms.password} name="password" onChange={OnChangeLogin} />

                <button className={styles.signupForms+" "+styles.SubmitButton} type="submit">Login</button>
            </form>
            
        </div>
    );
};

export default index;