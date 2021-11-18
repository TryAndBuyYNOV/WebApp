import GoogleMapReact from 'google-map-react';
import { useState } from 'react';
import {FaMapMarkerAlt} from 'react-icons/fa' 

 
const MyPosition = ()=>{


    return(
    <div style={{
            fontSize :"2.5rem",
            color : "blue",
            position:"absolute",
           }}> 
 <FaMapMarkerAlt/>  
   
  </div>
    )
}

const GeoMap  = ({products , currentPosition})=> {
 
    const address = JSON.parse(localStorage.getItem('user')).address
    
   const center = {
       lat: address["lat"],
       lng: address["lng"]
      }

    return (
    
      <div style={{ height: '90vh', width: '90vw' , margin : "2rem auto"  }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key:"AIzaSyAXcZLzg7Ut2hABj8Yo2ekpYuowcwKeBas"}}
          defaultZoom={10}
          center={currentPosition ? currentPosition :center} 
          
        >
           <MyPosition
            lat={currentPosition ? currentPosition.lat : center.lat}
            lng={currentPosition ? currentPosition.lng :center.lng}
          /> 

          

          {products}
        </GoogleMapReact>
      </div>
    );
  
}

export default GeoMap;