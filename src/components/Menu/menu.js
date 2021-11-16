import React from 'react';
import styles from './image.module.css'
const Menu = ({menu , closeMenu , title , price , validation}) => {
       

    return (
     
      <div style={{display:menu ? "block" :"none"}} className={styles.Menu}>

        <h1>{title}</h1>
        <p> prix du produit : {price} £</p>
        <p> prix du livraison : 50£</p>
        <p>total prix : {parseFloat(price) + 50}</p>
        <span onClick={closeMenu} className={styles.close}>&times;</span>
        <button onClick={validation}  className={styles.validate}>Valider</button>
      </div>
    );
};

export default Menu;