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
import ipfs from "../ipfs";
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


    
class Addcoverage extends Component{

updateMeta=(e)=>{
  e.preventDefault();
  const{Email, value}=e.target;
  
this.setState({Meta: e.target.value});
}
updateCity=(e)=>{
  e.preventDefault();
  const{City, value}=e.target;
  console.log('City', City);
console.log('value', value);
this.setState({City: e.target.value});
}
updatePhone=(e)=>{
  e.preventDefault();
  const{Phone, value}=e.target;
  console.log('name', Phone);
console.log('value', value);
this.setState({Phone: e.target.value});
}

// captureFile=(event)=>{

//   console.log("Capture File");
//   event.preventDefault();
//   const file= event.target.files[0];
//   const reader= new window.FileReader();
//   reader.readAsArrayBuffer(file);
//   reader.onloadend=()=>{
//     this.setState({buffer: Buffer(reader.result)});
//     console.log('buffer will storeee',this.state.buffer);
//   }



// }


    async componentDidMount(){
        await window.ethereum.enable();
        var Acc= await web3.eth.getAccounts();
this.setState({Account: Acc[0]});
// var sanaa= await LandAbi.methods.checkAdminsdetail(this.props.click2).call({from: Acc[0]});
// console.log("sanaa",sanaa);
// await this.setState({admindetail: sanaa});
    }

  SubmitData4 =this.SubmitData4.bind(this);

    state = {
        showsidedraw: false,
        showsign: true,
        showRegister: false,
        LoggedIn: false,
        Password: null,
        buffer:"",
  Phone:"",
  Meta:"",
  City:"",
  Email:"",
      
        formErrors:{

          password:" "
        },
        flag: false,
        chktoken: true,
        handleRegisterstate: false,
        admindetail:[],
        Account:"",
        red:false
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





    async SubmitData4 (e) {
      e.preventDefault();
    
        console.log("Account",this.state.Account);





      
      const transaction = await LandAbi.methods.registerapprover(this.state.Phone, this.state.City, this.state.Email,this.state.Meta).send({
        from : this.state.Account });
       if(!transaction){
         console.log("Transaction Faild!!!");
       }
       else{
         console.log("Transaction succesful");
         this.setState({red: true});
       }
       

       

//      await   ipfs.files.add(this.state.buffer,(error, result)=>{
//         if(error)
//         {
//           console.error("error");
//         }
//         console.log('result',result);
        
//         this.setState({ipfsHash: result[0].path});
        

//       console.log("res", result[0].path);
     
        
// }
//      )

// )
        
        }


handleRegister=()=>{


  browserHistory.push("/Register");
this.setState({
handleRegisterstate: true,
showsign: false
})

}







render(){
  if(this.state.red)
  {
    return <Redirect to="/companyportal" />
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

if(this.state.handleRegisterstate)
{
 
}

return(

    <React.Fragment>

      

     

<Modal  show={this.state.showsign}  className=" setLogin" >
        <Modal.Header bsPrefix="modal-header" className="d-block">
          <Modal.Title><MdPerson className="signup2"  /> Add City Coverage</Modal.Title>
         </Modal.Header>
         <Modal.Body>
           
         
         <Form onSubmit={this.SubmitData4}>


<Form.Row>
<Form.Group as={Col} controlId="formGridEmail">
<Form.Label>City</Form.Label>
<Form.Control    
value={this.state.City} 
onChange={this.updateCity.bind(this)}   placeholder="City" />
</Form.Group>
<Form.Group as={Col} >
<Form.Label>PhoneNo</Form.Label>
<Form.Control  value={this.state.Phone} 
onChange={this.updatePhone.bind(this)} 
placeholder="Phone" />
</Form.Group>


</Form.Row>
<Form.Row>
<Form.Group as={Col} >
<Form.Label>MetaMask ID</Form.Label>
<Form.Control  value={this.state.Meta} 
onChange={this.updateMeta.bind(this)} 
placeholder="MetaMask Id" />
</Form.Group>

<Form.Group as={Col} controlId="formGridEmail">
<Form.Label>Email</Form.Label>
<Form.Control    
value={this.state.Email} 
onChange={this.updateEmail.bind(this)}   placeholder="City" />
</Form.Group>


</Form.Row>








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








export default Addcoverage;