import React, { useRef, useState } from 'react';
import styles from  './SignUp.module.scss'
import {gql , useMutation} from '@apollo/client'
import AutoComplete from 'react-google-autocomplete'
import {useRouter} from 'next/router'
const index = () => {

    // Hooks
    const [Forms , setForms] = useState({
        firstName : "" ,
        lastName :"" ,
        numero:"",
        email :"" ,
        password : "",
        address : {
            lat:0,
            lng:0,
            localisation:""
        },
        role: "Seller",
        avatar:""
    })
    const [isError , setError] = useState(false)
    const router = useRouter()
    const isRef = useRef(false)
    //GraphQl queries 

    const creatUser = gql`
    mutation CreateUser($firstName:String! , $lastName:String! ,
    $phoneNumber:String! , $address:AddressInput! , $email:String! ,
    $password :String! , $avatar:String! , $role:String! )
    {
  createUser(firstName:$firstName,lastName : $lastName ,
    phoneNumber :$phoneNumber , address : $address , email:$email ,
 		password : $password , avatar : $avatar , role :$role
  ){
    id
  }
}
`

const [createUserFunction , {data , loading , error}] = useMutation(creatUser)
    
    // Event functions 
    const SubmitForms = (e)=>{
        e.preventDefault()
        isRef.current = true
        createUserFunction({variables:{
            firstName : Forms.firstName,
            lastName : Forms.lastName,
            phoneNumber : Forms.numero,
            address : Forms.address,
            email : Forms.email,
            password : Forms.password ,
            avatar : Forms.avatar ,
            role : Forms.role
        }}).then(result=>{  
           if(result.data.createUser==null){
               setError(true)

           }else{
               alert("utilisateur crée avec succès")
                router.push("/login")
           }
            
           
        }).catch(error=>{
            console.log(error);
        })
   
    }
    const FormsOnChange = (e)=>{
        const name = e.target.name
        const value = e.target.value
        setForms({
            ...Forms,
            [name] : value
        })
    }

   
   
  

    const AutoCompletComponent = ({state})=>{
        return (
            <AutoComplete className={styles.signupForms} 
            value={state.address.localisation!="" ? state.address.localisation : null}
           
        apiKey={"AIzaSyAXcZLzg7Ut2hABj8Yo2ekpYuowcwKeBas"}
        onPlaceSelected={(place)=>{
            const lat = place.geometry.location.lat()
            const lng = place.geometry.location.lng()
            const localisation = place.formatted_address
            setForms({
                ...state,
                address : {
                        lat : lat,
                        lng : lng,
                        localisation : localisation
                }
            })
        }} options={{types: [ "address" ]}} />
        )
    }
    return (
        <div className={styles.container}>
            <h1> Sign Up</h1>
            <p style={{display : isError ? "block" : "none"}} className={styles.ErrorMessage}> email existe dèja</p>
         <form onSubmit={SubmitForms}>
            <input type="text" className={styles.signupForms} placeholder="Nom..." name="firstName" value={Forms.firstName} onChange={FormsOnChange} />
            <input type="text" className={styles.signupForms} placeholder="Prénom..." name="lastName" value={Forms.lastName} onChange={FormsOnChange} />
            <input type="text" className={styles.signupForms} placeholder="Numéro de télephone..." name="numero" value={Forms.numero} onChange={FormsOnChange} />
            <input type="email" className={styles.signupForms} placeholder="Email..." name="email" value={Forms.email} onChange={FormsOnChange} />
            <input type="password" className={styles.signupForms} placeholder="mot de passe..." name="password"  value={Forms.password} onChange={FormsOnChange}/>
           
            <AutoCompletComponent state = {Forms} />

            <select onChange={FormsOnChange}  className={styles.signupForms} name="" id="" name="role" >
                <option selected value="Seller">Vendeur</option>
                <option value="Buyer">Acheteur</option>
            </select>

            <button className={styles.signupForms+" "+styles.SubmitButton} type="submit">Sign Up</button>

         </form>
             
        </div>
    );
};

export default index;