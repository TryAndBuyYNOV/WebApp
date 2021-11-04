import React, {useState } from 'react';
import {gql , useQuery} from '@apollo/client';

const index = () => {
    //Utiliser le component CartListComponent du buyer !
    const {data,loading,error} = useQuery();
    if(loading){
        return <p>Loading carts...</p>
    }
    if(error){
        return <p>Something goes wrong !</p>
    }
    return (
        <div>
            
        </div>
    );
};

export default index;