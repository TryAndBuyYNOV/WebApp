import { useState } from "react";
import {FaMapMarkerAlt} from 'react-icons/fa' 
import {useRouter} from 'next/router'

const ProductMarker = ({ title , price , pictur , id }) => {
  const IMAGE_URL = "https://res.cloudinary.com/dr5vzrsj1/image/upload/v1636476993/tryandbuy/"+pictur+".png"

    const [window , setWindow] = useState(false)
    const router = useRouter()
    return (
      
    <div>
    <div style={{
   fontSize :"2.5rem",
   color : "red",
   position:"absolute",
   cursor:"pointer"
  
  
 }}> 
 <FaMapMarkerAlt onClick={()=>setWindow(!window)}/>  
   
  </div>
    
    <div style={{display: window ?"block" : "none", width:"250px" , height:"250px" , borderRadius:"4px"  , fontSize:"1rem" , position:"relative"  , top:"-270px" , background:"wheat" ,padding:"1rem" , textAlign:"center" }}>
    <img src={IMAGE_URL} style={{width:"100%" , height:"60%"}} />  
    <p>{title}</p>
    <p> {price +"€"} </p>
    <button onClick={()=> router.push('/account/catalog/'+id)}>consulter</button>
  </div>
 </div>
    )

 }

 ProductMarker.getInitialProps = async (ctx) => {

  
 }



 export default ProductMarker;