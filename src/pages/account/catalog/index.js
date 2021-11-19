import React, { useState } from 'react';
import Navbar from "../../../components/Account/Navbar"
import ProductList from '../../../components/admin/ProductList'
import { gql , useQuery} from '@apollo/client'
import withAuth from '../../../HOC/withAuth'
const index = () => {
    
    const [filterCategory , setFilter] = useState("all")
    let RESULT  =<p></p>
    const getProductsToSell = gql`
query{

      productCatalog{
         id
        title
        category
        priceHT
        imgUrl
        }
    }
`

const {loading , error , data } = useQuery(getProductsToSell)

if(loading) RESULT = <p> loading ...</p>
if(error) RESULT = <p> somehing want wrong</p>
if(data){
    RESULT = <ProductList role ="catalog" filterCategory={filterCategory}  data={data["productCatalog"]} />
}
    return (
        <div style={{display:"flex", justifyContent:"space-between"}}>
            <div>
                <Navbar role = "Buyer" />
            </div>
            <div>
            <button onClick={()=> setFilter("all")}>tout les produits</button>
            <button onClick={()=> setFilter("Shoes")}>Chaussure</button>
            <button onClick={()=> setFilter("TShirt")}>T-Shirt</button>
            <button onClick={()=> setFilter("Pants")}>Pantalon</button>
            <button onClick={()=> setFilter("Jacket")}>Veste</button>
            <button onClick={()=> setFilter("Coat")}>Manteau</button>
            <button onClick={()=> setFilter("Accessory")}>Accessoire</button>


            {RESULT}
            </div>
        </div>
    );
};

export default withAuth(index);