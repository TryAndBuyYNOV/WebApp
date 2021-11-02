import React from 'react';
import styles from './ProductItem.module.css'
import Link from 'next/link'
const ProductItem = (props) => {
    return (
        <Link href={`/admin/products/${encodeURIComponent(props.id)}`}>
            
                  <div className={styles.ourTeam}>
            <div className={styles.picture}>
                <img className="img-fluid" src="https://picsum.photos/130/130?image=839"/>
            </div>
            <div className="team-content">
                <h3 className={styles.name}>{props.title+" "+props.priceHT+"€"}</h3>
                <h4 className={styles.title}>vendu</h4>
            </div>
            </div>

        </Link>
    );
};

export default ProductItem;