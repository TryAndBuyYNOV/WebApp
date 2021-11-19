import React from 'react';
import ProductItem from './ProductItem';




const ProductList = (props) => {

   
    const data = props.data.map(product=>{
        if(props.filter =="all"){
           
                  return <ProductItem role={props.role} key={product.id} id={product.id}  title={product.title} priceHT = {product.priceHT} status={product.productStatus} category = {product.category} pictur = {product.imgUrl[0]} />
        } else if(props.filter && product.productStatus ==props.filter){
                return <ProductItem role={props.role} key={product.id} id={product.id}  title={product.title} priceHT = {product.priceHT} status={product.productStatus} category = {product.category} pictur = {product.imgUrl[0]} />
        } else if(props.filterCategory && product.category ==props.filterCategory){
             return <ProductItem role={props.role} key={product.id} id={product.id}  title={product.title} priceHT = {product.priceHT} status={product.productStatus} category = {product.category} pictur = {product.imgUrl[0]} />
        } else if(props.filterCategory && props.filterCategory =="all"){
                 return <ProductItem role={props.role} key={product.id} id={product.id}  title={product.title} priceHT = {product.priceHT} status={product.productStatus} category = {product.category} pictur = {product.imgUrl[0]} />
        }
      
    })
  


    return (
        <div style={{
            display:"flex",
            justifyContent:"space-around",
            alignItems:"flex-start",
            flexWrap:"wrap"
        }}>
            {data}
        </div>
    );
};

export default ProductList;