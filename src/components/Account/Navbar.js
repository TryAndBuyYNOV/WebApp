import React from 'react';
import Link from 'next/link'
import styles from  './Navbar.module.css'
import image from '.././../assets/team/member-1.png'
const Navbar = ({role}) => {

    let navbar = <nav>
        
    </nav>

    if(role=="Seller"){
        navbar =    <nav className={styles.menu} tabindex="0">
        <div className={styles.smartphone}></div>
                <header className={styles.avatar}>
                <img src={image} />
                <h2 className={styles.Name}>John D.</h2>
            </header>
            <ul className={styles.list}>
                <li> <Link href="/account/profile" > Mon profile </Link> </li>
                <li> <Link href="/account/products/add" > Ajouter produit </Link> </li>
                 <li> <Link href="/account/products/manage" > Mes ventes </Link> </li>
                <li> <Link href="" > Mes offres </Link> </li>
            </ul>
        </nav>
    }

        if(role=="Buyer"){
        navbar =<nav className={styles.menu} tabindex="0">
        <div className={styles.smartphone}></div>
                <header className={styles.avatar}>
                <img src={image} />
                <h2 className={styles.Name}>John D.</h2>
            </header>
            <ul className={styles.list}>
                <li> <Link href="/account/profile" > Mon profile </Link> </li>
                <li> <Link href="" > Mes commandes </Link> </li>
                <li> <Link href="/account/catalog" > Catalogues </Link> </li>
                <li> <Link href="/account/geolocalisation" > géolocalisation  </Link> </li>
             
            </ul>
        </nav>
    }
    return (
        <div>
            {navbar}
        </div>
    );
};

export default Navbar;