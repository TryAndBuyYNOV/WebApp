import React, { useRef, useState } from 'react';

import {gql , useQuery} from '@apollo/client'
import NavBarAdmin from '../../../Components/Admin/NavBarAdmin';
import SearchBarAdmin from '../../../Components/Admin/SearchBarAdmin';
import UserList from '../../../Components/Admin/UserList';

const users = () => {

    let [UIResult , setUIResult] = useState(<p></p>)
    const isUpdated = useRef(false) 
    const UsersQuery = gql `
        query {
             users{ id firstName lastName role}
        }
    `
        
    
     const { loading, error, data } = useQuery(UsersQuery);
     if(loading) UIResult = <p> loading</p>
     if(error) UIResult = <p> something want wrong</p>
     if(data && !isUpdated.current){

        UIResult= <UserList data={data["users"]} />
            
     }

     const onSearch = (event)=>{
        
              isUpdated.current = true
        const searchWord = event.target.value;
        const allData = data["users"]
        if(searchWord.replace(/\s/g, '')===""){
             
            setUIResult(<UserList data={allData} />)
        }
        else{
            const newData = []
            allData.forEach(element => {
                if( element.firstName.includes(searchWord) || element.lastName.includes(searchWord) ){
                    newData.push(element)
                }
            });
                
            setUIResult(<UserList data={newData} />)
            
        }

    }

    return (
        <div>
            <SearchBarAdmin onSearch={onSearch} />
              <div style={{
                display :"flex",
                
                alignItems:"flex-start",
                width :"100vw",
                height:"100vh",
                margin :'1rem'
            }}>

            <NavBarAdmin />
            {UIResult} 
            </div>

            
        </div>
    );
};

export default users;   