import React from 'react';
import NavBarAdmin from '../../Components/Admin/NavBarAdmin';
import withAuth from 'HOC/withAuth';
const admin = () => {
    
    return (
        <div>
            <h1 style={{
                textAlign:'center'
            }}> Page admin </h1>

            <NavBarAdmin />
            
        </div>
    );
};

export default withAuth(admin);