import GeoMap from 'components/GeoMap/GeoMap';
import React, { useRef, useState } from 'react';
import {FaMapMarkerAlt} from 'react-icons/fa' 
import {gql , useQuery} from '@apollo/client'
import {client} from '../../_app'
import ProductMarker from 'components/GeoMap/ProductMarker';
import styles from "../../../components/admin/SearchBar.module.css"
const GeoLocalisation = () => {
   

    const [markers , setMarkers] = useState(null)
    const refProduct = useRef()
    const [currentPosition , setcurrentPosition] = useState(null)
    const searchRef = useRef() 
    const getProducts = gql`
            query{
            productCatalog{
            id
            userId
            title
            priceHT
            description
            imgUrl
            category
            productStatus
    
                 }
                }
    `

    const getUserAddress = gql`
        query getUserAddress ($id : ID!){
  
            user(id:$id){address {lat lng localisation}}
    }
    
    `

     const {loading , error , data} = useQuery(getProducts)
  
    const getUserAddressFunction = async (userId , product)=>{
        const user = await  client.query({query : getUserAddress , variables :{id:userId} })
        const address = user["data"].user.address
       
        return { lat : address.lat , lng : address.lng , localisation : address.localisation}
    }

    const getAllData = ()=>{
        const arrayProduct = data["productCatalog"]
    const markerArray = []
     arrayProduct.map(product=>{

       const userId = product.userId
       const result = getUserAddressFunction(userId, product)
        
      result.then(data=>{

        const marker = <ProductMarker 
                            key={product.id}
                            lat ={data.lat} 
                            lng = {data.lng}
                            localisation = {data.localisation}
                            title={product.title}
                            price = {product.priceHT}
                            pictur= {product.imgUrl[0]}
                            id = {product.id}
                                        />
        
        markerArray.push(marker)
        if(markerArray.length==arrayProduct.length){
            refProduct.current = markerArray
            setMarkers(markerArray)
            
        }                                

      })
        
    })
    }
   
    if(data && markers==null){
       
    getAllData()
   
   
    }


    

    
    const setPosition = ()=>{
        
        if(currentPosition){
            setcurrentPosition(null)
        }
        else {
               navigator.geolocation.getCurrentPosition(position=>{
               setcurrentPosition( {
                    lat : position.coords.latitude,
                    lng : position.coords.longitude
                })
        })
        }
            


    }

    const searchProductByLocation = (event)=>{
        event.preventDefault()
        const searchWord = searchRef.current.value
         if(searchWord.replace(/\s/g, '')===""){
             
            //setMarkers(refProduct.current)
           
        }
        else{
            const newData = []
            refProduct.current.forEach(marker => {
                if( marker.props.localisation.toLowerCase().includes(searchWord.toLowerCase())){
                    newData.push(marker)
                }
            });
            
            setMarkers(newData)
        
    }
}

    return (
        <div>
            
            <form onSubmit={searchProductByLocation}> 
               <input ref={searchRef} className={styles.SearchAdmin} type="text" placeholder="chercher produit par  address , ville ..." />
                <button type="submit"> chercher</button>
            </form>
           <div style={{textAlign:"center" , margin:"1rem"}}>
                <label htmlFor="position"> votre position </label>
            <FaMapMarkerAlt name="position" style={{fontSize:"2rem" , color:"blue"}} />
            <label htmlFor="position">  position des produits </label>
            <FaMapMarkerAlt name="position" style={{fontSize:"2rem" , color:"red"}} />
            <button
            style={{display:"block" , textAlign:"center" , margin:"1rem auto"}}
            onClick={setPosition}> {currentPosition ?  "activer adress du compte" : "activer ma postion actuelle"} </button>
           </div>
            
          <GeoMap currentPosition = {currentPosition} products= {markers!=null ? markers : "" } />
        </div>
    );
};

export default GeoLocalisation;