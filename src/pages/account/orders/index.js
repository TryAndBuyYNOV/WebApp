import Navbar from 'components/Account/Navbar';
import React, { useState } from 'react';
import Table from '../../../components/Table/table'
import {gql , useQuery , useMutation} from '@apollo/client'
import {client} from '../../../pages/_app'
import withAuth from '../../../HOC/withAuth'

const Orders = () => {

    const [CartStat , setCart] = useState(null)
    const userID = JSON.parse(localStorage.getItem("user")).id
    const role = JSON.parse(localStorage.getItem("user")).role

    
    
    const getCartQuery = gql`
    query GetCartBuyer($id:ID!){
    cartsByBuyerID(id:$id){
            id
            sellerID
            productId
            cartStatus
                 }
}`

const getUserQuer = gql`
            query GetUser($id:ID!){
            
            user(id:$id){
                firstName
                lastName
                address{localisation}
            }
            }
`
const getProductQuery = gql`
    query GetProduct($id:ID!){
  
            product(id:$id){
            title
            priceHT
        }
}
`
const MakeDecision = gql`
mutation MakeDecision($id:ID! , $decision:String!){
  decisionCart(id:$id , decision:$decision){id}
}
`
const {loading , error , data} = useQuery(getCartQuery , {variables:{id:userID}})
const [DecisionFunctionMutation, { dataD, loadingD, errorD }] = useMutation(MakeDecision);
const getUserData = async (userID)=>{
    const user = await  client.query({query : getUserQuer , variables :{id:userID} })
    const data = user["data"].user
    return data
       
}


const getProductData = async (productId)=>{
     const product = await  client.query({query : getProductQuery , variables :{id:productId} })
        const data = product["data"].product
    return data
}

const GetAllCartData = (cartData)=>{
    
    const cartArray = []
    cartData.map(data=>{
         const cartId = data.id
         const sellerID = data.sellerID
         const productId = data.productId
         const cartStatus = data.cartStatus
         getUserData(sellerID).then(result=>{
             const cart = {cartId , cartStatus , ...result}
             getProductData(productId).then(result=>{
                 const CompleteCartObject = {...cart , ...result}
                 cartArray.push(CompleteCartObject)
                 if(cartArray.length==cartData.length){
                  setCart(cartArray)
                 }
             })
         })
    })
}

if(data && CartStat==null){
    const cartData = data["cartsByBuyerID"];
    GetAllCartData(cartData)
}


    return (
     
        <div style={{display :"flex"}}>
            
        <Navbar role={role} />

         <div>
             <div style={{margin :'0 auto' , width:"500px"}}>
                 <button> tout les orders</button>
                 <button>orders en attente</button>
                 <button> orders acceptés</button>
                 <button> orders réfusés</button>
             </div>
            <Table cart={CartStat} isBuyer={true} DecisionFunction={DecisionFunctionMutation} />     
        </div>   

        </div>

    );
};

export default withAuth(Orders);