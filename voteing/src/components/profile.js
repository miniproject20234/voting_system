import React, { useState } from 'react'
import {Row,Col,Button,Form} from "react-bootstrap"
import Profile from "../components/profile"
import {useDispath,useSelector} from " react-redux"
import ".css/profile.css";
import ErrorMessage from './ErrorMessage';

const profile = ({loation,history}) => {

const [name,setname]=useState("");
const [email,setEmail]=useState("");;
const [phone_no,setPhone_no]=useState("")
const [pic,setPic]=useState();
const [picMessage,setPicMessage]=useState();


const dispath =useDispath();

const userLogin =useSelector ((state)=> state.userUpdate);
const {userInfo}=userLogin;

const userUpdate =useSelector ((state)=> state.userUpdate);
const {loading,error,success}=userUpdate;

const PostDetails=(pics)=>{
  if (!pics){
    return setPicMessage("Please select an Image");
  }
  setPicMessage(null);
if (pics.type==="image/jpeg"|| pics.type==="image/png"){
   const data=new FormData();
   data.append("file", pics);
   data.append("upload_preset", "notezipper");
   data.append("cloud_name", "roadsidecoder");
   fetch ("https://api.cloudinary.com/v1_1/roadsidecoder/image/upload",{
    method:"post",
    body:data,
   })
   .then((res)=>res.json())
   .then((data)=>{
    console.log(data);
    setPic(data.url.toString());
   })
   .catch((err)=>{
    console.log(err);
   });
}else {
  return setPicMessage("Please select an Image");
}
};
const submitHandler=(e)=>{
  e.preventDefault();

  dispath(UpdateProfile({name,email,password,pic}));
}


  return (
   <>
      <Profile title="EDIT PROFILE"    >
        
        <div>
       <Row classname="profileContainer">
           <Col md={6}>
             <Form onSubmit={submitHandler}>
              {success &&(<ErrorMessage varient="success">Update successfully</ErrorMessage>)}
                <Form.Group controlId="name">
                  <Form.Label>Name</Form.Label>
                   <Form.Control
                   type="text"
                   value={name}
                   onChange={(e)=> setName(e.target.value)}>
                   </Form.Control>
                </Form.Group>
                <Form.Group controlId="email">
                  <Form.Label>Email Address</Form.Label>
                   <Form.Control
                   type="text"
                   value={email}
                   onChange={(e)=> setEmail(e.target.value)}>
                   </Form.Control>
                </Form.Group>
                <Form.Group controlId="phone_no">
                  <Form.Label>Phone_no</Form.Label>
                   <Form.Control
                   type="number"
                   value={phone_no}
                   onChange={(e)=> setname(e.target.value)}>
                   </Form.Control>
                </Form.Group>{""}
                {picMessage &&(<ErrorMessage varient="danger">{picMessage}</ErrorMessage>
                )}

                <Form.Group controlId="pic">
                  <Form.Label>Change Profile Picture</Form.Label>
                   <Form.File
                   onChange={(e)=> PostDetails(e.target.files[0])}
                   id="custom-file"
                   type="image/png"
                   label="Upload Profile Picture"
                   custom
                   />
                </Form.Group>
                <Button type="submit" varient="primary">Update</Button>
             </Form>
           
           </Col>
           <Col style={{
            display:"Flex",
            alignItems:"center",
            justifyContent:"center"


           }}>
            <img src={pic} alt={name} className="profilePic"/>
            </Col>
      </Row>
        </div>
        
        </Profile>  
      
        </>


   
  )
}

export default profile