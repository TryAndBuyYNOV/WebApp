import React from 'react';
import ProductItem from './ProductItem';




const ProductList = (props) => {

    const data = props.data.map(product=>{
        return <ProductItem key={product.id} id={product.id}  title={product.title} priceHT = {product.priceHT} />
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