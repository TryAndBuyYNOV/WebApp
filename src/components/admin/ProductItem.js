import React from 'react';
import styles from './ProductItem.module.css'
import Link from 'next/link'
const ProductItem = (props) => {
    console.log(props.role);
   let link =""

   if(props.role=="admin"){
       link =`/admin/products/${encodeURIComponent(props.id)}` 
   }
    if(props.role=="catalog"){
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
            
                  <div className={styles.ourTeam}>
            <div className={styles.picture}>
                <img className="img-fluid" src="https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy,c_fill,g_auto/a8080c6d00924b9f8673a9c300cf22f9_9366/Chaussure_U_Path_Run_Noir_G27636_01_standard.jpg"/>
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