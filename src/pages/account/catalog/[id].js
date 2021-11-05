import React from 'react';
import Navbar from 'components/Account/Navbar';
import styles from "./catalog.module.scss"
const Product = () => {

    const IDUSER = JSON.parse(localStorage.getItem("user")).id
    const ROLE  =  JSON.parse(localStorage.getItem("user")).role
    console.log(ROLE);
    return (
        <div>
            <Navbar role = {ROLE} />

            <div className={styles.container}>

                <div className={styles.productPictur}>
                    <img className={styles.productImg} src="https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy,c_fill,g_auto/a8080c6d00924b9f8673a9c300cf22f9_9366/Chaussure_U_Path_Run_Noir_G27636_01_standard.jpg" alt="" />      
                </div>

                <div className={styles.productInfo}>
                    <h1 className={styles.productTitle}> new adidas shoes</h1>
                    <p className={styles.productDescription}> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus distinctio corporis libero! Hic magni labore vitae id debitis dolore. Natus maxime ut incidunt eveniet iusto similique velit soluta recusandae quasi.</p>
                    
                    <h3 className={styles.productPrice}>200£</h3>
                    <button className={styles.AddCart}> Ajouter à cart</button>
                    <button className={styles.AddWish}> ajouter sur wish list</button>
                </div>

            </div>

             
        </div>
    );
};

export default Product;