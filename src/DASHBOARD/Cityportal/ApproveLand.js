import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from "axios"
import {Modal,Button,Form} from 'react-bootstrap';

import{MdPerson} from "react-icons/md"


import {browserHistory} from "react-router";

import {Router as Router, Redirect} from 'react-router-dom';

import LandAbi from "../../LandAbi";
import web3 from "../../web3";



    
class ApproveLand extends Component{


    submitdataapprove=this.submitdataapprove.bind(this);

    state = {
        showsidedraw: false,
        showsign: true,
        showRegister: false,
       
    };
     


    


   
    

    

      
    handleClose = () => this.setState({showsign: false});



    updateLand=(e)=>{
        e.preventDefault();
          const{LandId, value}=e.target;
          console.log('Landid', LandId);
        console.log('value', value);
        this.setState({LandId: e.target.value});
      }


      async submitdataapprove(e){
        e.preventDefault();
        var Ac= await web3.eth.getAccounts();
        console.log("AC", Ac);
            const contain=await LandAbi.methods.approververify(this.state.LandId).call({from: Ac[0]});
        console.log("approve status",contain);
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





return(
    <React.Fragment>

      

     

<Modal  show={this.state.showsign}  className=" setLogin" >
        <Modal.Header bsPrefix="modal-header" className="d-block">
          <Modal.Title><MdPerson className="signup2"  /> Approve Land</Modal.Title>
         </Modal.Header>
         <Modal.Body>
           
           <Form   onSubmit={this.submitdataapprove}>
   <Form.Group controlId="formBasicEmail">
     <Form.Label>Enter Land Id</Form.Label>
     <Form.Control type="Land Id" placeholder="Enter Land Id" 
      value={this.state.LandId} 
      onChange={this.updateLand.bind(this)}
     />
   </Form.Group>


   
   <Form.Group controlId="formBasicCheckbox">
     <Form.Check type="checkbox" label="Check me out" />
   </Form.Group>
      <Button variant="primary" className="chkbtn"  type="submit" >
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
      
    

        </React.Fragment>


);


}

}








export default ApproveLand;