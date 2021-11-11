import React, { useRef, useState } from 'react';
import image from 'assets/team/member-1.png'
import styles from './image.module.css'
const images = () => {

    
    

    return (
      <nav className={styles.menu} tabindex="0">
	<div className={styles.smartphone}></div>
        <header className={styles.avatar}>
                <img src={image} />
            <h2>John D.</h2>
        </header>
	<ul>
    <li tabindex="0" className={styles.iconDashboard}><span>Dashboard</span></li>
    <li tabindex="0" className={styles.iconCustomers}><span>Customers</span></li>
    <li tabindex="0" className={styles.iconUsers}><span>Users</span></li>
    <li tabindex="0" className={styles.iconSettings}><span>Settings</span></li>
  </ul>
    </nav>
    );
};

export default images;