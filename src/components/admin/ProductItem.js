import React from 'react';
import styles from './ProductItem.module.css'
import Link from 'next/link'
const ProductItem = (props) => {
  

const IMAGE_URL = "https://res.cloudinary.com/dr5vzrsj1/image/upload/v1636476993/tryandbuy/"    
   let link =""

   if(props.role=="admin"){
       link =`/admin/products/${encodeURIComponent(props.id)}` 
   }
    else if(props.role=="catalog"){
     link = `/account/catalog/${encodeURIComponent(props.id)}`
   }

   else {
       link = `/account/products/manage/${encodeURIComponent(props.id)}`
   }

   let status =""

   switch(props.status){
       case "ToSell": 
       status = "à vendre"
       break;
       case "SellingInProgress" :
           status ="vente en cours"
            break;
       case "Selled" : 
       status = "vendu"
       break;
   }

   let category = ""

   switch(props.category){
       case "Shoes": category="Chaussure" 
       break;
       case "TShirt": category="T-Shirt" 
       break;
       case "Pants": category="Pantalon" 
       break;
        case "Jacket": category="Veste" 
       break;
        case "Coat": category="Manteau" 
       break;
        case "Accessory": category="Accessoire" 
       break;
   }
    return (
        <Link href={link}>
            
                  <div className={styles.Product}>
            <div className={styles.picture}>
                <img className="img-fluid" src={IMAGE_URL+props.pictur+".png"}/>
            </div>
            <div className="team-content">
                <h3 className={styles.name}>{props.title}</h3>
                <h3 className={styles.price}> {props.priceHT+"€"} </h3>
                <h4 className={styles.category}>{category}</h4>
                <h5 className={styles.title}>{status}</h5>
            </div>
            </div>

        </Link>
    );
};

export default ProductItem;