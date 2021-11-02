import React from 'react';
 import styles from  './UserItem.module.css'
 import Link from 'next/link'
const UserItem = (props) => {
    return (

        <Link href={`/admin/users/${encodeURIComponent(props.id)}`}>
            
            <div className={styles.ourTeam}>
            <div className={styles.picture}>
                <img className="img-fluid" src="https://picsum.photos/130/130?image=839"/>
            </div>
            <div className="team-content">
                <h3 className={styles.name}>{props.firstName+" "+props.lastName}</h3>
                <h4 className={styles.title}>{props.role=="Buyer"? "Acheteur" : "Vendeur"}</h4>
            </div>
            </div>

        </Link>
    
    );
};

export default UserItem;