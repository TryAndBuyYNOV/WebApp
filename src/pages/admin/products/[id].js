import React, { useEffect, useRef, useState } from 'react';
import styles from '../../../Components/Admin/SearchBar.module.css'
import NavBarAdmin from '../../../Components/Admin/NavBarAdmin'
import {gql , useQuery , useMutation} from '@apollo/client' 
import { useRouter } from 'next/router';
import withAuth from 'HOC/withAuth';
const Product = () => {

    // React Hooks
    const [Forms , setForms] = useState({
        title : "" ,
        price :0.0 ,
        description :"" ,
        category : "",
        status:""

    })
    const router = useRouter()
    const ProductID = router.query.id
    const isUpdated = useRef(false)
    // event functions 
    const onSubmitProduct = (event)=>{
        event.preventDefault()
        const action = event.nativeEvent.submitter.name

        if(action=="modifier") updateProduct()
        else if(action=="supprimer") deleteProduct()
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

    const getProductById = gql`
    query GetProduct($id : ID!) {
            product(id:$id){
                id
                title
                priceHT
                description
                category
                productStatus
                     }
}`
    const updateProductQuery = gql`
        mutation UpdateProduct ($id : ID!,$title:String!,
                                $priceHT : Float! ,$description:String! ,
                                $category:String! ,
                                $status:String!
                                ){

    updateProduct(id:$id ,
      title :$title ,
      priceHT:$priceHT , 
      description :$description
      category : $category ,
      status:$status
      ){
    id
  }
}
`
const deleteProductquery = gql`
    mutation DeleteProduct($id: ID!){
        deleteProduct (id : $id){
            id
        }
    }

`

// Api Calls

const {loading , error , data} = useQuery(getProductById , {variables : {id : ProductID}})
const [updateProductFunction,{dataUpdate , loadingUpdate , errorUpdate}] = useMutation(updateProductQuery)
const [deleteProductFunction,{dataDelete , loadingDelete , errorDelete}] = useMutation(deleteProductquery)

// update forms values
useEffect(()=>{

    if(data!=null && !isUpdated.current){
        isUpdated.current = true
        const dataProduct = data["product"]
       setForms({
            title : dataProduct.title,
            price :  dataProduct.priceHT,
            description : dataProduct.description ,
            category : dataProduct.category ,
            status :dataProduct.productStatus
        })
    }
})

    // logic functions

    const deleteProduct = ()=>{
        deleteProductFunction({variables:{id:ProductID}}).then(result=>{
            alert("produit suprrimé :)")
            router.push("/admin/products")
        }).catch(error=>{
            console.log(error);
        })
    }

    const updateProduct = ()=>{
        
        
       
       const result =  updateProductFunction({variables:{
           id:ProductID,
           title: Forms.title,
           priceHT : parseFloat(Forms.price),
           description : Forms.description,
           category : Forms.category,
           status : Forms.status
        
        }}).then(result=>{
               alert("produit modifié :)")
            }).catch(error=>{
                console.log(error.message);
            })
        console.log(result);
    }

    console.log(Forms);
      return (
     <div style={{
                display :"flex",
            
                alignItems:"flex-start",
                width :"100vw",
                height:"100vh",
                margin :'3rem 2rem'
            }}>

            <NavBarAdmin />

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


                           <label htmlFor="status" className={styles.Label}>Status:</label>
                     <select  onChange={changeHandler} style={{
                    marginLeft:"4rem"
                }} className={styles.SearchAdmin} name="status" id="status">
                       
                       
                       <option selected={Forms.status=="ToSell" || "" ? true : false} value="ToSell">à vendre</option> 

                       <option selected={Forms.status=="SellingInProgress" ? true : false}  value="SellingInProgress"> vente en cours</option> 

                        <option selected={Forms.status=="Selled" ? true : false}  value="Selled"> vendu</option> 
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
      )
};

export default withAuth(Product);