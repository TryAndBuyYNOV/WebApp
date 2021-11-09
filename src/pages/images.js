import React, { useRef, useState } from 'react';
import axios from 'axios' 
const images = () => {

    const refImageButton = useRef(null)
    const [file , setFile] = useState(null)
    const onImageChangeHandler = (event)=>{

        
        setFile(event.target.files)
    }

    const uploadPicturHandler = ()=>{

       let picturArray = []       
        for (let index = 0; index < file.length; index++) {
            const element = file[index];
            picturArray.push(element)
        }

        picturArray.map(pictur=>{
            const data = new FormData()
            data.append("file", pictur )
            data.append("upload_preset" , "tryandbuy")

            return   axios.post("	https://api.cloudinary.com/v1_1/dr5vzrsj1/image/upload" , data).
         then(result=>{
        console.log(result["data"].public_id.split("/")[1]);
        }).catch(error=>{
        console.log(error);
            })})
         

     
    }
    

    return (
        <div>
            <input ref={refImageButton} style={{display:"none"}} multiple type="file" name="files" id="" onChange={onImageChangeHandler}  />

            <button onClick={()=>{
                refImageButton.current.click()
            }}> choose pictur</button>

            <button onClick={uploadPicturHandler}> upload pictur</button>
            
        </div>
    );
};

export default images;