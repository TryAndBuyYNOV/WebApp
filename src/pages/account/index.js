import React, { useState  } from 'react';
import Navbar from '../../components/Account/Navbar';
import Buyer from '../../components/Buyer/Buyer';
import Seller from '../../components/Seller/Seller';
import withAuth from '../../HOC/withAuth'
const index = () => {

     const role = JSON.parse(localStorage.getItem("user")).role

    

    let UserInterface = <p> {role}</p>

    if(role=="Buyer"){

        UserInterface = <Buyer />
    }

    if (role=="Seller"){
        UserInterface = <Seller />
    }

    return (
        <div style={{display:"flex", justifyContent:"space-between"}}>
            <div>
            <Navbar role={role} />
            </div>
            <div> 
          {UserInterface }
            </div>
          
        </div>
    );

     
};




export default withAuth(index);