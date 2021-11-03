import React from 'react';
import Navbar from '../../components/Account/Navbar';
import Buyer from '../../components/Buyer/Buyer';
import Seller from '../../components/Seller/Seller';

const index = () => {

    const role = JSON.parse(localStorage.getItem("user")).role

    let UserInterface = <p> erreur</p>

    if(role=="Buyer"){

        UserInterface = <Buyer />
    }

    if (role=="Seller"){
        UserInterface = <Seller />
    }

    return (
        <div>
            <Navbar role={role} />
            {UserInterface }
        </div>
    );
};

export default index;