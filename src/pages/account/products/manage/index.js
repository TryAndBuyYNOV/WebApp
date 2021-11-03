import React, {useState } from 'react';
import {gql , useQuery} from '@apollo/client'
import Navbar from 'components/Account/Navbar';
import ProductList from '../../../../Components/Admin/ProductList';
const ManageProduct = () => {

  
    let [UIResult , setUIResult ]= useState(<p></p>)
    const [filter , setFilter] = useState("all")
    const ID = JSON.parse(localStorage.getItem("user")).id
    const ROLE = JSON.parse(localStorage.getItem("user")).role


    const ProductQuery = gql `
        query SearchProduct ($id : ID!){
  
  productByUserID(id:$id){
        id
        title
        priceHT
        category
        productStatus
  }
}
    `
        
     const { loading, error, data } = useQuery(ProductQuery ,{variables:{
         id:ID
     }});
     if(loading) UIResult = <p> loading</p>
     if(error) UIResult = <p> something want wrong</p>
     if(data){
         
       UIResult= <ProductList filter={filter} role={ROLE} data={data["productByUserID"]} /> 
       
     }

     
     return (
        <div style={{
         textAlign:'center',
         display:"flex",
         flexDirection:'column',
         justifyContent:"center",
         alignItems:"center"
     }}
     >
         
         <Navbar role={ROLE} />

            <h1> Mes ventes </h1>
            <button onClick ={()=>setFilter("all")}> tout les produit</button>
            <button onClick ={()=>setFilter("ToSell")}> produits à vendre</button>
            <button onClick ={()=>setFilter("SellingInProgress")}> produits en cours de vente</button>
            <button onClick ={()=>setFilter("Selled")}> produits vendus</button>                     
            {UIResult} 
            
        </div>
    );



};

export default ManageProduct;