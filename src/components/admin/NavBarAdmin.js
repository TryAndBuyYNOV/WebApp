import React from 'react';
import styles from './NavBar.module.css'
import Link from 'next/link'

const NavBarAdmin = () => {
    return (
        <div>
            
            <div className={styles.adminContainer}>
            <Link href="/admin/users"> Utilisateurs</Link>
            <Link href="/admin/products">Produits</Link>
           </div>

        </div>
    );
};

export default NavBarAdmin;