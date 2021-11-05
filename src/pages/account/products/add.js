import React, { useState } from 'react';
import styles from '../../../components/admin/SearchBar.module.css'
import Navbar from '../../../components/Account/Navbar'
import {gql, useMutation} from '@apollo/client' 

const AddProduct = () => {

    // React Hooks
    const [Forms , setForms] = useState({
        title : "" ,
        price :0.0 ,
        description :"" ,
        category : "Shoes"

    })
    
    const ID = JSON.parse(localStorage.getItem("user")).id
    const ROLE  = JSON.parse(localStorage.getItem("user")).role
    // event functions 
    const onSubmitProduct = (event)=>{
        event.preventDefault()

       
        AddProductFunction({variables:{
            title : Forms.title,
            priceHT :parseFloat(Forms.price),
            description : Forms.description,
            category : Forms.category ,
            imgUrl : ["",""] ,
            userId : ID
        }}).then(result=>{
                alert("produit ajouté avec succès")
        }).catch(error=>{
            console.log(error);
        })
      
    }

    const changeHandler = (event)=>{
       
        const name = event.target.name 
        const value = event.target.value
      setForms({
          ...Forms ,
          [name] : value
      })
    }


    // graphql query
    const ADD_PRODUCT  = gql`
    mutation AddProduct($title:String!,
  							$priceHT:Float!,
    						$description:String!,
    						$category:String!,
    						$imgUrl:[String!],
    						$userId:ID!){
  
  createProduct(title : $title ,
  priceHT : $priceHT,
  description : $description,
	category : $category ,
  imgUrl : $imgUrl,
  userId : $userId
  ){id}
}
 `

// Api Calls
const [AddProductFunction,{data , loading , error}] = useMutation(ADD_PRODUCT)

    // logic functions

    console.log(Forms);

      return (
     <div style={{
         textAlign:'center',
         display:"flex",
         flexDirection:'column',
         justifyContent:"center",
         alignItems:"center"
     }}>

            <Navbar role={ROLE} />

                    <h1> AJOUTER PRODUIT </h1>
                 <form onSubmit={onSubmitProduct}>
                <label htmlFor="title" className={styles.Label}>Titre:</label>
                <input type="text" style={{
                    marginLeft:"4rem"
                }} className={styles.SearchAdmin} name="title" id="title"  value={Forms.title} onChange={changeHandler} />

               <label htmlFor="price" className={styles.Label}>Prix:</label>
                <input type="number" step="0.01" style={{
                    marginLeft:"4rem"
                }} className={styles.SearchAdmin} name="price" id="price"  value={Forms.price} onChange={changeHandler} />  


                <label htmlFor="description" className={styles.Label}>Déscription:</label>
                <textarea  rows="7" style={{
                    marginLeft:"4rem"
                }} className={styles.SearchAdmin} name="description" id="description"  value={Forms.description} onChange={changeHandler} />  

                  <label htmlFor="category" className={styles.Label}>catégorie:</label>   
                 <select  onChange={changeHandler} style={{
                    marginLeft:"4rem"
                }} className={styles.SearchAdmin} name="category" id="category">
                       <option selected={Forms.category=="Shoes" || "" ? true : false} value="Shoes">Chaussures</option>

                    <option selected={Forms.category=="TShirt" ? true : false}  value="TShirt"> T-Shirt</option>

                     <option selected={Forms.category=="Pants" ? true : false}  value="Pants"> Pantalon</option>

                     <option selected={Forms.category=="Jacket" ? true : false}  value="Jacket"> Veste</option>

                      <option selected={Forms.category=="Coat" ? true : false}  value="Coat"> Manteau</option>

                    <option selected={Forms.category=="Accessory" ? true : false}  value="Accessory"> Accessoire</option>  
                     </select> 

                        <button name="modifier" style={{
                    marginLeft:"4rem",
                    background:'#969892',
                    cursor:"pointer"
                    
                }} className={styles.SearchAdmin} type="submit"> Ajouter </button>

             

                </form>
            </div>
      )
};

export default AddProduct;