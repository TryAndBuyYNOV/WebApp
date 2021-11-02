import React from 'react';

const index = () => {

    const role = JSON.parse(localStorage.getItem("user")).role

    let UserInterface = <p> erreur</p>

    if(role=="Buyer"){

        UserInterface = <p> this is buyer</p>
    }

    if (role=="Seller"){
        UserInterface = <p> this is seller</p>
    }

    return (
        <div>
            {UserInterface }
        </div>
    );
};

export default index;