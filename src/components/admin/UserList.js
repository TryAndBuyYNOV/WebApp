import React from 'react';
import UserItem from './UserItem';




const UserList = (props) => {

    const data = props.data.map(user=>{
        return <UserItem key={user.id} id={user.id} firstName={user.firstName} lastName = {user.lastName} role = {user.role} avatar = {user.avatar} />
    })

    return (
        <div style={{
            display:"flex",
            justifyContent:"space-around",
            alignItems:"flex-start",
        flexWrap:'wrap'
        }}>

            {data}
            
        </div>
    );
};

export default UserList;