import React, { useState } from 'react';
import styles from './picture.module.scss'
import  {BsCamera} from 'react-icons/bs'

const ProfilPicture = ({profilePic , changeHandler}) => {



    return (
       <div className={styles.profilePic}>
  <label className={styles.label}  htmlFor="file">
    <BsCamera />
    <span>sélectionner une image</span>
  </label>
  <input id="file" type="file" onChange={changeHandler} />
  <img src={profilePic.pictur} id="output" width="200" />
</div>
    );
};

export default ProfilPicture;