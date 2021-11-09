import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import {gql , useQuery} from '@apollo/client'
import {FaMapMarkerAlt} from 'react-icons/fa' 
const AnyReactComponent =
 ({ text }) => <div style={{
   fontSize :"2.5rem",
   color : "purple"
 }}> 
  
  <FaMapMarkerAlt/> 
  
  </div>;

const Map  = ({userAdress})=> {

  
  let UserInterface = <p> </p>
     let center= {
      lat: 48.856613,
      lng: 2.352222
    }
 

  const getUserAdress = gql `
  query getUserAdress($id : ID!){
     user(id:$id){
     address{lat lng localisation}
            }
            }
  `

  const {loading , error , data} = useQuery(getUserAdress , {variables : {id : userAdress}})
  console.log("user id is "+userAdress);
  if(loading) UserInterface = <p> loading </p>
  if(error) UserInterface = <p> something want wrong </p>
  if(data){
      const result = data["user"].address

      center = {
        lat : result.lat,
        lng : result.lng
      }

  }

 
  console.log(center);
 
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '400px', width: '80%' , margin : "2rem auto " }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key:"AIzaSyAXcZLzg7Ut2hABj8Yo2ekpYuowcwKeBas"}}
          defaultZoom={13}
          center={center}
        >
          <AnyReactComponent
            lat={center.lat}
            lng={center.lng}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
    );
  
}

export default Map;