import React ,{useState} from 'react';
import Navbar from 'components/Account/Navbar';
import styles from "./catalog.module.scss"
import Map from '../../../components/GoogleMap/map'
import {useRouter} from 'next/router'
import {gql , useQuery , useMutation} from '@apollo/client'
import {MdFavorite} from 'react-icons/md'
import Carousel from "react-multi-carousel";
import Menu from 'components/Menu/menu';
import withAuth from '../../../HOC/withAuth'
const Product = () => {

    let Product = {
        title : "",
        description : "",
        price : "",
        userId : null,
        imgUrl : []
    }
    const [menu , setMenu] = useState(false)
    const router = useRouter()
    const IDUSER = JSON.parse(localStorage.getItem("user")).id
    const ROLE  =  JSON.parse(localStorage.getItem("user")).role
    const idProduct = router.query.id
    const IMAGE_URL = "https://res.cloudinary.com/dr5vzrsj1/image/upload/v1636476993/tryandbuy/"

    // for carousel 

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        }
};
    
    // gql query 
    const QueryGetProduct = gql`
    query GetProduct($id:ID!){
  
            product(id : $id){
            id
            userId
            title
            priceHT
            description
            imgUrl
            category
            
                      }}`

    // gql mutation 
    
    const MutationAddToCart = gql `
    mutation AddToCart (
  			$buyerID :ID! , 
  			$sellerID : ID! ,
  			$productID : ID! ){
  
  createCart(buyerID: $buyerID ,
  		sellerID :$sellerID ,
  		productID:$productID
  ){id
  }}
`
// call gql api 
const {loading , error , data} = useQuery(QueryGetProduct , {variables : {id : idProduct}})
const [AddToCartMutation , {dataCart , loadingCart , errorCart }] = useMutation(MutationAddToCart)

const AddToCartHandler = ()=>{

    setMenu(true)
    
}

const validateCommand = ()=>{

    AddToCartMutation({
        variables:{
            buyerID :IDUSER,
            sellerID: Product.userId,
            productID: idProduct,

        }
    }).then(result=>{
        alert("produit ajouté à vos commandes")
        setMenu(false)
    }).catch(error=>{
        alert("something get wrong ")
        setMenu(false)
    })
    
  
}

if(loading) console.log(loading);
if(error) console.log(error);
if(data){
    const product = data["product"]

    Product = {
        title : product.title,
        description : product.description,
        price : product.priceHT,
        userId : product.userId,
        imgUrl : product.imgUrl
        

    }

}

let imageList = <div> loading...</div>

if(Product.imgUrl.length>0){

   imageList = Product.imgUrl.map(image=>{
        return  <div style={{width:"450px" , height:"450px"}}>
                                <img style={{width:"100%" , height:"100%"}} 
                                src={IMAGE_URL+image+".png"} 
                                alt="" srcset="" />
                            </div>
    })
}
    return (
        <div style={{display:"flex" , justifyContent:"space-between"}} >
            <div>
                 <Navbar role={ROLE}/> 
            </div>
           

                   <div className={styles.maincontainer}>
                   <div className={styles.container}>

                <div className={styles.productPictur}>

                      <Menu
                       menu={menu}
                       title={Product.title}
                       price = {Product.price}
                       closeMenu={()=>setMenu(false)}
                       validation = {validateCommand}
                       />
                    <Carousel
                        autoPlay={true}
                        autoPlaySpeed={2000}
                        infinite={true}  
                        showDots={true}
                        responsive={responsive}
                        >
                           
                            {imageList}           
                        
                    </Carousel>
          

              


                </div>

                <div className={styles.productInfo}>
                    <h1 className={styles.productTitle}> {Product.title} </h1>
                    <p className={styles.productDescription}> {Product.description}</p>
                    
                    <h3 className={styles.productPrice}>{Product.price} €</h3>
                   <div className={styles.buttonContainer}>

                        <button onClick={AddToCartHandler} className={styles.AddCart}> Ajouter à cart</button>
                   
                    <span> <MdFavorite className={styles.AddWish} />  </span>
                   </div>
                </div>

                    </div>
            
            {Product.userId ? <Map userAdress = {Product.userId}  /> : <p> loading ...</p>}
            </div>
           
         

             
        </div>
    );
};

export default withAuth(Product);