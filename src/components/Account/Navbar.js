import React from 'react';
import Link from 'next/link'
const Navbar = ({role}) => {

    let navbar = <nav>
        
    </nav>

    if(role=="Seller"){
        navbar = <nav>
            <ul>
                <li> <Link href="/account/profile" > Mon profile </Link> </li>
                <li> <Link href="/account/products/add" > Ajouter produit </Link> </li>
                 <li> <Link href="/account/products/manage" > Mes ventes </Link> </li>
                <li> <Link href="" > Mes offres </Link> </li>
            </ul>
        </nav>
    }

        if(role=="Buyer"){
        navbar = <nav>
            <ul>
                <li> <Link href="" > Mon profile </Link> </li>
                <li> <Link href="" > Mes commandes </Link> </li>
                <li> <Link href="" > Catalogues </Link> </li>
             
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