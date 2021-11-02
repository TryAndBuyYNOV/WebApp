import React, { useEffect, useRef, useState } from 'react';
import {useRouter} from 'next/router'
import NavBarAdmin from '../../../Components/Admin/NavBarAdmin';
import {gql , useQuery , useMutation} from '@apollo/client'
import styles from '../../../Components/Admin/SearchBar.module.css'
const User = () => {

    // React Hooks
    const router = useRouter()
    const [Forms , setForms] = useState({
        firstName : "",
        lastName :"",
        Phone:"",
        Email:"" ,
        Address : "" ,
        Role : ""
    }) 
    let isUpdated = useRef(false);
   
    // event functions
    const changeHandler = (event)=>{
      

        
    setForms({
        ...Forms ,
        [event.target.name] : event.target.value
        
    })
    }
      const onSubmitUser = (event)=>{
    event.preventDefault();
     const submitTpe = event.nativeEvent.submitter.name
     if (submitTpe=="modifier") ModifyPerson()
     if(submitTpe=="supprimer") DeletePerson()
  }

 // graphql Query   
const UserQuery = gql`
query GetUser($id : ID!){
  user(id : $id){
    id  
    firstName
    lastName
    phoneNumber
    email
    avatar
    address{
        localisation
    }
    role
  }
}
`
const queryModifayUser = gql`

        mutation ModifyPerson($id: ID!
    $firstName:String!
    $lastName:String!
    $phoneNumber:String!
    $address:String!
    $email:String!
  	$password:String!
    $avatar:String!
    $role:String!){

        updateUser(id:$id
    firstName:$firstName
    lastName:$lastName
    phoneNumber:$phoneNumber
    address:$address
    email:$email
  	password:$password
    avatar:$avatar
    role:$role) {
        id
    }
    }
      
`
const queryDeleteUser = gql`
mutation DeleteUser($id:ID!){
  
  deleteUser(id:$id){
    id
  }
}
`      

// API calls
     const { loading, error, data } = useQuery(UserQuery, {
    variables: { id : router.query.id },
                                                                 });
    const [ModifyPersonM, { dataModify, loadingModify, errorModify }] = useMutation(queryModifayUser);
    const [DeleteUser, { dataDelete, loadingDelete, errorDelete }] = useMutation(queryDeleteUser);

// for updating the forms 
  useEffect(()=>{

    if(data!=null&&!isUpdated.current){
        isUpdated.current = true 
        const user = data["user"]
        setForms({
            firstName:user.firstName,
            lastName:user.lastName,
            Phone : user.phoneNumber,
            Email:user.email,
            Address : user.address.localisation,
            Role : user.role
        })
    }

  })

  // logic functions
  const ModifyPerson  = ()=>{
    
 

      ModifyPersonM({
          variables:{
              id:router.query.id,
              firstName : Forms.firstName,
              lastName : Forms.lastName ,
              phoneNumber : Forms.Phone,
              address : Forms.Address,
              email:Forms.Email,
              password : "new pass word",
              avatar : "new avatar",
              role : Forms.Role

          }
      }).then(result=>{

        alert("utilisateur modifié :)")

      }).catch(error=>{
          console.log(error);
      })
  
  }

  const DeletePerson = ()=>{
      console.log("delete");
            DeleteUser({
                variables:{
                    id : router.query.id
                }
            }).then(result=>{
              alert("utilisateur supprimé")
              router.push("/admin/users")   
            }).catch(error=>{
                console.log(error);
            })
  }



    return (
     <div style={{
                display :"flex",
            
                alignItems:"flex-start",
                width :"100vw",
                height:"100vh",
                margin :'3rem 2rem'
            }}>

            <NavBarAdmin />

            <div style={{
                marginLeft:"10rem"
            }}>
              

                <form onSubmit={onSubmitUser}>
                      <label htmlFor="firstName" className={styles.Label}>Nom:</label>
                <input type="text" style={{
                    marginLeft:"4rem"
                }} className={styles.SearchAdmin} name="firstName" id="firstName"  value={Forms.firstName} onChange={changeHandler} />


                <label htmlFor="lastName" className={styles.Label}>Prénom:</label>
                <input type="text" style={{
                    marginLeft:"4rem"
                }} className={styles.SearchAdmin} name="lastName" id="lastName" value={Forms.lastName} onChange={changeHandler} />

                  <label htmlFor="phone" className={styles.Label}>Numéro télephone:</label>
                <input type="text" style={{
                    marginLeft:"4rem"
                }} className={styles.SearchAdmin} name="Phone" id="phone" value={Forms.Phone} onChange={changeHandler} />

                  <label htmlFor="email" className={styles.Label}>Email:</label>
                <input type="text" style={{
                    marginLeft:"4rem"
                }} className={styles.SearchAdmin} name="Email" id="email" value={Forms.Email} onChange={changeHandler} />

                <label htmlFor="address" className={styles.Label}>Address:</label>
                <input type="text" style={{
                    marginLeft:"4rem"
                }} className={styles.SearchAdmin} name="Address" id="address" value={Forms.Address} onChange={changeHandler} />
                 <label htmlFor="role" className={styles.Label}>Role:</label>
                <select  onChange={changeHandler} style={{
                    marginLeft:"4rem"
                }} className={styles.SearchAdmin} name="Role" id="role">
                    <option selected={Forms.Role=="Buyer" || "" ? true : false} value="Buyer">Acheteur</option>
                    <option selected={Forms.Role=="Seller" ? true : false}  value="Seller"> Vendeur</option>
                </select>

                <button name="modifier" style={{
                    marginLeft:"4rem",
                    background:'#969892',
                    cursor:"pointer"
                    
                }} className={styles.SearchAdmin} type="submit"> Modifier </button>

                <button name="supprimer" style={{
                    marginLeft:"4rem",
                    background:'#DC143C',
                    color:'#fff',
                    cursor:"pointer"
                    
                }} className={styles.SearchAdmin} type="submit"> Supprimer </button>



                </form>

                


            </div>

            </div>
    );
};

export default User;