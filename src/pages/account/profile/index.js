import React, { useEffect, useRef, useState } from 'react';
import {useRouter} from 'next/router'
import {gql , useQuery , useMutation} from '@apollo/client'
import styles from '../../../Components/Admin/SearchBar.module.css'
import AutoComplete from 'react-google-autocomplete'
import Navbar from '../../../components/Account/Navbar'
const Profile = () => {

    // React Hooks
    const router = useRouter()
    const [Forms , setForms] = useState({
        firstName : "",
        lastName :"",
        Phone:"",
        Email:"" ,
        Address : {
            lat:0,
            lng:0,
            localisation : ""
        } ,
        Role : ""
    }) 
    let isUpdated = useRef(false);

    // user ID constant 

    const ID = JSON.parse(localStorage.getItem("user")).id
    const   ROLE = JSON.parse(localStorage.getItem("user")).role
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
        lat
        lng
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
    $address:AddressInput!
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
    variables: { id : ID },
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
            Address : {
                lat :user.address.lat,
                lng :user.address.lng,
                localisation :user.address.localisation
            },
            Role : user.role
        })
    }

  })

  // logic functions
  const ModifyPerson  = ()=>{
    
 

      ModifyPersonM({
          variables:{
              id:ID,
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
                    id : ID
                }
            }).then(result=>{
              alert("utilisateur supprimé")
              router.push("/admin/users")   
            }).catch(error=>{
                console.log(error);
            })
  }



  const AutoCompletComponent = ({state})=>{

        const [inputValue , setInputValue] = useState(state.Address.localisation)

        const onChangeInputHandler= (event)=>{
            const value = event.target.value
                setInputValue(value)
            
        }
 
        return (
            <AutoComplete className={styles.SearchAdmin} 
            value={inputValue}
            style={{
                    marginLeft:"4rem"
                }}
           onChange={onChangeInputHandler}
        apiKey={"AIzaSyAXcZLzg7Ut2hABj8Yo2ekpYuowcwKeBas"}
        onPlaceSelected={(place)=>{
            const lat = place.geometry.location.lat()
            const lng = place.geometry.location.lng()
            const localisation = place.formatted_address
            setForms({
                ...state,
                Address : {
                        lat : lat,
                        lng : lng,
                        localisation : localisation
                }
            })
        }} options={{types: [ "address" ]}} />
        )
    }

console.log(Forms);
    return (
     <div
      style={{
         display:"flex",
         
      
     }}
     >
         <div>
         <Navbar role={ROLE} />
         </div>
            <div>
            
            <div style={{
                marginLeft:"10rem",
                 textAlign:'center',
            }}>
              <h1> Mon profile</h1>

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
               

                <AutoCompletComponent state={Forms}/>

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

            </div>
    );
};

export default Profile;