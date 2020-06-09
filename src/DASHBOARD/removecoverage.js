// import React from "react";
// import "./adminbackdraw.css";


// const adminbackdraw=props=>(

//     <div className="backdrop" onClick={props.click} />
// );

// export default adminbackdraw;




import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from "axios"
import {Modal,Button,Form,Col} from 'react-bootstrap';

import{MdPerson} from "react-icons/md"


import {browserHistory} from "react-router";

import {Router as Router, Redirect} from 'react-router-dom';
import LandAbi from "../LandAbi";
import web3 from "../web3";


// import "../navbar/login.css"
const formvalid=(formErrors)=>{
    let valid=true;
    
    Object.values(formErrors).forEach(val => val.length>0 && (valid=false));
    
    return valid;
      
    
    
    
    
    }


    
class Removecoverage extends Component{
  updateCity=(e)=>{
    e.preventDefault();
    const{City, value}=e.target;
    console.log('City', City);
  console.log('value', value);
  this.setState({City: e.target.value});
  }

    async componentDidMount(){
      await window.ethereum.enable();
      var Acc= await web3.eth.getAccounts();
this.setState({Account: Acc[0]});
    }

  submit32=this.submit32.bind(this);

    state = {
        showsidedraw: false,
        showsign: true,
        showRegister: false,
        LoggedIn: false,
        Password: null,
        City:"",
      
        formErrors:{

          password:" "
        },
        flag: false,
        chktoken: true,
        handleRegisterstate: false,
        admindetail:[],
        Account:""
    };
     


    


    updateEmail=(e)=>{
      e.preventDefault();
        const{Email, value}=e.target;
        console.log('Email', Email);
      console.log('value', value);
      this.setState({Email: e.target.value});
    }

  // handleClose = () => setShow(false);
  //  handleShow = () => setShow(true);

 
    // handleRegister=()=> this.setState({showRegister: true,
    //     showsign: false});

    handelsubmit = (event)=>{
        event.preventDefault();
      
      if(formvalid(this.state.formErrors))
      {
      
      console.log(`
      --submitting--
      
      Password: ${this.state.password}
      
      
      `);
      
      
      
      }
      else{
        console.error("Form invalid");
      }
      }
      




    handelchange=(e)=>{
        e.preventDefault();
        const {name, value}=e.target;
        let formErrors= this.state.formErrors;
        console.log('name', name);
        console.log('value', value);
        
        
        switch(name){
        
          case 'password':
            
             if(value.length>=0 && value.length<5) 
            
            {formErrors.password="must be more than 5";
          
           
            this.setState({flag: false});
          
          }
            else{ `${this.state.flag=true}
            
            ${this.state.formErrors.password= ""}
            
            `
            this.setState({password: e.target.value});
          
          
          }
        break;
        default:
          break;
        
        }
        
        this.setState({formErrors, [name]: value},()=>{console.log("state chaangeeee", this.state.formErrors);});
        
      
       
      //   const{password, value}=e.target;
      //   console.log('Password', password);
      // console.log('value', value);
     
      
      
      }


      
    handleClose = () => this.setState({showsign: false});








handleRegister=()=>{


  browserHistory.push("/Register");
this.setState({
handleRegisterstate: true,
showsign: false
})

}






 async  submit32 (e) {
    

  e.preventDefault();
  
 const transaction= await LandAbi.methods.removeCitycoverage(this.state.City).send({from:this.state.Account});
  if(!transaction){
    console.log("Transaction Faild!!!");
  }
  else{
    console.log("Transaction succesful");
  }
  
  }


render(){
  
  console.log("Hi");
 

  if(this.state.LoggedIn){

console.log("bye");

  // this.setState({
  
  //   password:"",
  //   Email: ""
  // ,showsign:false
    
  
  // });


    console.log("nameeeeeeeeeeeeeeeeeeee");
   
    return <Redirect  to="/dashboard" />
    
    
    
    
   
 
 
 
  }





let takeComp;

if(this.state.handleRegisterstate)
{
 
}

return(
    <React.Fragment>

      

     

<Modal  show={this.state.showsign}  className=" setLogin" >
        <Modal.Header bsPrefix="modal-header" className="d-block">
          <Modal.Title><MdPerson className="signup2"  /> Admin Detail</Modal.Title>
         </Modal.Header>
         <Modal.Body>
         <Form onSubmit={this.submit32}>
<Form.Group as={Col} controlId="formGridEmail">
<Form.Label>City</Form.Label>
<Form.Control    
value={this.state.City} 
onChange={this.updateCity.bind(this)}   placeholder="City" />
</Form.Group>
         
{/* 
        <Col> city: {this.state.admindetail[0]}</Col><Col><img src={`https://ipfs.io/ipfs/${this.state.admindetail[1]}`} /></Col>
         <br></br>
         hash: {this.state.admindetail[1]}
         <br></br>
        Name : {this.state.admindetail[2]}
        <br></br>
         Address: {this.state.admindetail[3]} */}

<Button variant="primary"  className="chkbtn" type="submit" >
Submit
</Button>
</Form>
 
 </Modal.Body>
         <Modal.Footer>

           <Button variant="secondary" className="chkbtn" onClick={this.props.click  }>
             Close
           </Button>
           
           
         </Modal.Footer>
       </Modal>
       {takeComp}
    

        </React.Fragment>


);


}

}








export default Removecoverage;