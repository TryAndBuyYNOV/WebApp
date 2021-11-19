import React, { useState } from 'react';
import Navbar from '../../../components/Account/Navbar'
import withAuth from '../../../HOC/withAuth'
import {gql, useQuery} from '@apollo/client'
import {client} from '../../_app'
import ProductList from 'components/admin/ProductList';
const WishList = () => {

    const userId = JSON.parse(localStorage.getItem("user")).id

    const [productsStat , setProductStat] = useState(null)
const getWishList = gql`
    query GetWishList($userId:ID!){
    wishlist(userId:$userId){productId}
}
`
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
let UI = <p> pas d'info ...</p>
const {loading , error , data}= useQuery(getWishList , {variables:{userId :userId}})

    const getProductDetails = async (productId)=>{
        const query = await client.query({query :QueryGetProduct , variables:{id:productId}})
        const product = query["data"].product
        return product
    }
    if(data && productsStat==null){

        const wishlist = data["wishlist"]
        const wishArray = []
        wishlist.map(item=>{
           
            getProductDetails(item.productId).then(result=>{
                console.log("then ...");
                wishArray.push(result)
                if(wishArray.length==wishlist.length){
                    setProductStat(wishArray)
                }
            })
        })
    }

    if(productsStat!=null){
        console.log(productsStat);
        UI = <ProductList role ="catalog" data={productsStat} filterCategory={"all"} />
    }

    console.log(UI);

    return (
        <div style={{display:"flex"}}>
            <Navbar role = {"Buyer"} />
            <div>
                {UI}
            </div>
        </div>
    );
};

export default withAuth(WishList);