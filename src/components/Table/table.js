import React, { useState } from 'react';
import styles from './table.module.scss'
const table = ({cart ,isBuyer , DecisionFunction}) => {

 const [cartStat , setCartStat] = useState(null) 

if(cartStat==null && cart!=null){
  setCartStat(cart)
}

const acceptCommand = (index, id , des)=>{
 
 DecisionFunction({variables: {
   id : id,
   decision : des
 }}).then(result=>{
  
  const newCart = [...cartStat]
  newCart[index].cartStatus = "Validated"
  setCartStat(newCart)

  }).catch(error=>{
    console.log(error);
  })

}


const refuseCommand = (index , id , des)=>{

  console.log(id);
  console.log(des);
 
 DecisionFunction({variables: {
   id : id,
   decision : des
 }}).then(result=>{
     const newCart = [...cartStat]
    newCart[index].cartStatus = "Rejected"
    setCartStat(newCart)
  }).catch(error=>{
    alert("erreur")
  })
 
}


  
  let UI = <p> loading ...</p>
  if(cartStat!=null){
   UI= cartStat.map((element , index)=>{
      let statusFrancais =""
      let DecisionSection = ""
      switch(element.cartStatus){
        case "Validated" : statusFrancais="validé" 
        DecisionSection = isBuyer ?
         <button className={styles.btnaccept}>Payer</button> :
         <div className={styles.acceptSection}>
           Accepté <span>&#10004;</span>
           </div> 
        break;
        case "ValidationInProgress" : statusFrancais="en attente"
        DecisionSection = isBuyer ? "en attente de validation" :<div className={styles.decisionButton}>
          <button onClick={()=>acceptCommand(index ,element.cartId ,"Validated")} className={styles.btnaccept}>accepter</button>
          <button onClick={()=>refuseCommand(index,element.cartId ,"Rejected")}  className={styles.btnrefuse}> réfuser</button>
          </div>
        break;
        case "Rejected" : statusFrancais="réfusé" 
          DecisionSection = 
          <div className={styles.refuseSection}>
           Réfusé <span>&#x2717;</span>
           </div>
        break;
      }

      return (
    <tr className={styles.tr}>
        <td className={styles.td} data-column="First Name">{element.firstName +" "+element.lastName} </td>
        <td className={styles.td} data-column="Last Name">{element["address"].localisation}</td>
        <td className={styles.td} data-column="Job Title">{element.title}</td>
        <td className={styles.td} data-column="Twitter">{element.priceHT+"€"}</td>
        <td className={styles.td} data-column="Twitter">{statusFrancais}</td>
        <td>
            {DecisionSection}
      </td>
    </tr>
      )

    })
  }

    return (
         <table className={styles.Table}> 

          <thead className={styles.thead}>
            <tr>
            <th className={styles.th}>Nom et prénom </th>
            <th className={styles.th}> Address</th>
            <th className={styles.th}>Produit commandé</th>
            <th className={styles.th}>Tarif total</th>
            <th className={styles.th}>Status</th>
            <th className={styles.th}>Décision</th>
            </tr>      
        </thead>   
        <tbody>
        {UI}
      </tbody>
          
        </table>
    );
};

export default table;