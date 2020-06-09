import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from "axios"
import {Modal,Button,Form} from 'react-bootstrap';

import{MdPerson} from "react-icons/md"

import {browserHistory} from "react-router";

import {Router as Router, Redirect} from 'react-router-dom';
import LandAbi from "../../LandAbi";
import web3 from "../../web3";
import {GiModernCity} from "react-icons/gi";
class CityPortal extends Component{


  SubmitDatatobytecode =this.SubmitDatatobytecode.bind(this);

    state = {
        
        showsign: true,
        
        LoggedIn: false,
        flag: false,
        handleRegisterstate: false,
        City:" ",
        Meta: null,
        ShowCityview: false
        
    };
     


    


    updateMeta=(e)=>{
      e.preventDefault();
        const{Meta, value}=e.target;
        console.log('Meta', Meta);
      console.log('value', value);
      this.setState({Meta: e.target.value});
    }

    updateCity=(e)=>{
        e.preventDefault();
          const{City, value}=e.target;
          console.log('City', City);
        console.log('value', value);
        this.setState({City: e.target.value});
      }

  // handleClose = () => setShow(false);
  //  handleShow = () => setShow(true);

 
    // handleRegister=()=> this.setState({showRegister: true,
    //     showsign: false});

    
      




    

      
    handleClose = () => this.setState({showsign: false});



  async SubmitDatatobytecode (e) {
    e.preventDefault();
    var Acc= await web3.eth.getAccounts();
    console.log("city",this.state.City);
    console.log("Meta",this.state.Meta);

    console.log("ACCOunt NO",Acc[0]);
   const resultcity= await LandAbi.methods.cityverify(this.state.Meta,this.state.City).call({from: Acc[0]});
   this.setState({resultstate: resultcity});
  

   if(this.state.resultstate==1)
   {
     this.setState({ShowCityview: true});
     window.localStorage.setItem('CompanyCity', this.state.City);

   }
  
  console.log("completet datat",this.state.resultstate);
 }
  
  
render(){
  

  if(this.state.ShowCityview)
  {
       return <Redirect to="/cityviewportal" />;
  }
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


return(
    <React.Fragment>

      

     

<Modal  show={this.state.showsign}  className=" setLogin" >
        <Modal.Header bsPrefix="modal-header" className="d-block">
          <Modal.Title><GiModernCity className="signup2"  /> City Portal </Modal.Title>
         </Modal.Header>
         <Modal.Body>
           
           <Form   onSubmit={this.SubmitDatatobytecode}>
   <Form.Group controlId="formBasicEmail">
     <Form.Label>Meta</Form.Label>
     <Form.Control type="string" placeholder="Enter MetaMaskId" 
      value={this.state.Meta} 
      onChange={this.updateMeta.bind(this)}
     />
     
   </Form.Group>

   <Form.Group controlId="formBasicPassword">
     <Form.Label>City</Form.Label>
     <Form.Control type="string" name="City" onChange={this.updateCity.bind(this)} value={this.state.City} 
 placeholder="Password" />
  
  
   </Form.Group>
      <Button variant="primary" className="chkbtn"  type="submit" >
    Submit
   </Button>
 </Form>
 
 </Modal.Body>
         <Modal.Footer>
           <Button variant="secondary" className="chkbtn" onClick={this.props.click}>
             Close
           </Button>
           
         </Modal.Footer>
       </Modal>
       
    

        </React.Fragment>


);


}

}








export default CityPortal;