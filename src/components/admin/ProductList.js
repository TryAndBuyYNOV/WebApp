import React from 'react';
import ProductItem from './ProductItem';




const ProductList = (props) => {
    const data = props.data.map(product=>{
        if(props.filter =="all"){
           
                  return <ProductItem role={props.role} key={product.id} id={product.id}  title={product.title} priceHT = {product.priceHT} status={product.productStatus} category = {product.category} />
        } else if(product.productStatus ==props.filter){
                return <ProductItem role={props.role} key={product.id} id={product.id}  title={product.title} priceHT = {product.priceHT} status={product.productStatus} category = {product.category} />
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