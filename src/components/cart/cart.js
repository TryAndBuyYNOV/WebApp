import React from 'react';
import {gql , useQuery} from '@apollo/client';

export default CartComponent = (props) => {
    const id = props.id;
    const CartQuery = gql`
        query CartById($id: ID!){
            cart(id: $id){
                id
                userId
                productId
                cartStatus
            }
        }
    `;
    const UserQuery = gql`
        query UserById($id: ID!){
            user(id: $id){
                id
                email
                role
            }
        }
    `;
    const ProductQuery = gql`
        query ProductById($id: ID!){
            product(id: $id){
                id
                title
                priceHT
            }
        }
`   ;
    const {dataCart, loadingCart, errorCart} = useQuery(CartQuery, {variables: {id: id}})
    if(loadingCart){
        return <p>Loading cart ...</p>
    }
    if(errorCart){
        return <p>Error while fetching cart : {errorCart}</p>
    }
    if(dataCart){
        const {dataProduct, loadingProduct, errorProduct} = useQuery(ProductQuery, {variables: {id: dataCart.productId}})
        const {dataUser, loadingUser, errorUser} = useQuery(UserQuery, {variables: {id: dataCart.userId}})

        return(
            <div>
                <h5>cart n°{dataCart.id}</h5>
                <p>product associated : {dataCart.productId}</p>
                {loadingProduct &&(
                    <p>Loading product ...</p>
                )}
                {errorProduct &&(
                    <p>Error while fetching product</p>
                )}
                {dataProduct &&(
                    <ul>
                        <li>{dataProduct.title}</li>
                        <li>{dataProduct.priceHT}</li>
                    </ul>
                )}
                <p>user: {dataCart.userId}</p>
                {loadingUser &&(
                    <p>Loading user ...</p>
                )}
                {errorUser &&(
                    <p>Error while fetching user</p>
                )}
                {dataUser &&(
                    <ul>
                        <li>username : {dataUser.email}</li>
                        <li>role :{dataUser.role}</li>
                    </ul>
                )}
            </div>
        );
    }

}