import React, { useRef, useState } from 'react';
import {gql , useQuery} from '@apollo/client'
import NavBarAdmin from '../../../Components/Admin/NavBarAdmin';
import SearchBarAdmin from '../../../Components/Admin/SearchBarAdmin';
import ProductList from '../../../Components/Admin/ProductList';
const products = () => {
  
    let [UIResult , setUIResult ]= useState(<p></p>)
    const isUpdated = useRef(false)
    const ProductQuery = gql `
        query {
             products{id  title priceHT description imgUrl}
        }
    `
        
     const { loading, error, data } = useQuery(ProductQuery);
     if(loading) UIResult = <p> loading</p>
     if(error) UIResult = <p> something want wrong</p>
     if(data && !isUpdated.current){
        UIResult= <ProductList data={data["products"]} />  
     }

     const onSearch = (event)=>{
        isUpdated.current = true
        const searchWord = event.target.value;
        const allData = data["products"]
        if(searchWord.replace(/\s/g, '')===""){
             
            setUIResult(<ProductList data={allData} />)
        }
        else{
            const newData = []
            allData.forEach(element => {
                if( element.title.includes(searchWord)){
                    newData.push(element)
                }
            });
                
            setUIResult(<ProductList data={newData} />)
            
        }
     }
     
        console.log(UIResult);
     return (
        <div>
            <SearchBarAdmin onSearch={onSearch} />

            <div style={{
                display :"flex",
                width :"100vw",
                height:"100vh",
                margin : "1rem"
            }}>
                <NavBarAdmin />
            {UIResult} 
            </div>
        </div>
    );



};

export default products;