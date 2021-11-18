import React from 'react';
 import styles from  './UserItem.module.css'
 import Link from 'next/link'
const UserItem = (props) => {

    const IMAGEURL = "https://res.cloudinary.com/dr5vzrsj1/image/upload/v1636461990/tryandbuy/"+props.avatar+".png"
    return (

        <Link href={`/admin/users/${encodeURIComponent(props.id)}`}>
            
            <div className={styles.ourTeam}>
            <div className={styles.picture}>
                <img className="img-fluid" src={IMAGEURL}/>
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