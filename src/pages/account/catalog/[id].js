import React from 'react';
import Navbar from 'components/Account/Navbar';
import styles from "./catalog.module.scss"
import Map from '../../../components/GoogleMap/map'
import {useRouter} from 'next/router'
import {gql , useQuery , useMutation} from '@apollo/client'
import {MdFavorite} from 'react-icons/all'
const Product = () => {

    let Product = {
        title : "",
        description : "",
        price : "",
        userId : null
    }
    const router = useRouter()
    const IDUSER = JSON.parse(localStorage.getItem("user")).id
    const ROLE  =  JSON.parse(localStorage.getItem("user")).role
    const idProduct = router.query.id
    
    // gql query 
    const QueryGetProduct = gql`
    query GetProduct($id:ID!){
  
            product(id : $id){
            id
            userId
            title
            priceHT
            description
            imgUrl
            category
            
                      }}`

    // gql mutation 
    
    const MutationAddToCart = gql `
    
    mutation AddToCart ($userId : ID ! , $productId : ID !){
  addToCart(userId : $userId,
    productId : $productId)
    {id}
} 
`
// call gql api 
const {loading , error , data} = useQuery(QueryGetProduct , {variables : {id : idProduct}})
const [AddToCartFunction , {dataCart , loadingCart , errorCart }] = useMutation(MutationAddToCart)

const AddToCartHandler = ()=>{
    AddToCartFunction({variables : {
        userId : IDUSER ,
        productId : idProduct
    }}).then(result=>{

        alert("produit ajouté à votre liste de commandes")

    }).catch(error=>{
        console.log(error);
    })
}

if(loading) console.log(loading);
if(error) console.log(error);
if(data){
    const product = data["product"]

    Product = {
        title : product.title,
        description : product.description,
        price : product.priceHT,
        userId : product.userId

    }

}

console.log(Product);
    return (
        <div>
            <Navbar role = {ROLE} />

            <div className={styles.container}>

                <div className={styles.productPictur}>
                    <img className={styles.productImg} src="https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy,c_fill,g_auto/a8080c6d00924b9f8673a9c300cf22f9_9366/Chaussure_U_Path_Run_Noir_G27636_01_standard.jpg" alt="" />      
                </div>

                <div className={styles.productInfo}>
                    <h1 className={styles.productTitle}> {Product.title} </h1>
                    <p className={styles.productDescription}> {Product.description}</p>
                    
                    <h3 className={styles.productPrice}>{Product.price} €
</h3>
                   <div className={styles.buttonContainer}>

                        <button onClick={AddToCartHandler} className={styles.AddCart}> Ajouter à cart</button>
                   
                    <span> <MdFavorite className={styles.AddWish} />  </span>
                   </div>
                </div>

            </div>
            
            {Product.userId ? <Map userAdress = {Product.userId}  /> : <p> loading ...</p>}

             
        </div>
    );
};

export default Product;