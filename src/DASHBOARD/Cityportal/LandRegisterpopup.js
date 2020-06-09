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
import web3 from "../../web3";
import LandAbi from "../../LandAbi";
import ipfs from "../../ipfs";
import {browserHistory} from "react-router";

import {Router as Router, Redirect} from 'react-router-dom';

    import {FaWpforms} from "react-icons/fa";
class LandRegistrationPopup extends Component{

updateMeta=(e)=>{
  e.preventDefault();
  const{Meta, value}=e.target;
  
this.setState({Meta: e.target.value});
}
updateCity=(e)=>{
  e.preventDefault();
  const{City, value}=e.target;
  console.log('City', City);
console.log('value', value);
this.setState({City: e.target.value});
}
updateLandArea=(e)=>{
  e.preventDefault();
  const{LandArea, value}=e.target;
  console.log('LandArea', LandArea);
console.log('value', value);
this.setState({LandArea: e.target.value});
}

updateProvince=(e)=>{
  e.preventDefault();
  const{Province, value}=e.target;
  console.log('Province', Province);
console.log('value', value);
this.setState({Province: e.target.value});
}

updateSerialNo=(e)=>{
  e.preventDefault();
  const{SerialNo, value}=e.target;
  console.log('SerialNo', SerialNo);
console.log('value', value);
this.setState({SerialNo: e.target.value});
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
  Street:"",
  Meta:"",
  City:"",
  LandArea:"",
  PostCode:"",
  Province:"",
  LandNo:"",
  Country:"",
  SerialNo:"",
  buffer:"",
  ipfsHash:"",
      
        flag: false,
        chktoken: true,
        handleRegisterstate: false,
        admindetail:[],
        Account:"",
        red:false,
        CompleteAddress:""
    };
     


    


    updateStreet=(e)=>{
      e.preventDefault();
        const{Street, value}=e.target;
        console.log('Street', Street);
      console.log('value', value);
      this.setState({Street: e.target.value});
    }

    updatePostCode=(e)=>{
      e.preventDefault();
        const{PostCode, value}=e.target;
        console.log('Street', PostCode);
      console.log('value', value);
      this.setState({PostCode: e.target.value});

    }

    updateLandNo=(e)=>{
      e.preventDefault();
        const{LandNo, value}=e.target;
        console.log('LandNo', LandNo);
      console.log('value', value);
      this.setState({LandNo: e.target.value});

    }

    updateCountry=(e)=>{
      e.preventDefault();
        const{Country, value}=e.target;
        console.log('LandNo', Country);
      console.log('value', value);
      this.setState({Country: e.target.value});

    }
  // handleClose = () => setShow(false);
  //  handleShow = () => setShow(true);

 
    // handleRegister=()=> this.setState({showRegister: true,
    //     showsign: false});

   
        
        


      
    handleClose = () => this.setState({showsign: false});





    async SubmitData4 (e) {
      e.preventDefault();
    
        console.log("Account",this.state.Account);
        // {house number} {street} {postcode} {city} {state}
        

  //       ipfs.files.add(this.state.buffer,(error, result)=>{
  //         if(error)
  //         {
  //           console.error("error");
  //         }
  //         console.log('result',result);
          
  //         this.setState({ipfsHash: result[0].path});
          
  
  //       console.log("res", result[0].path);
       
          
  // }
  //      )


      // await this.setState({CompleteAddress: this.state.LandNo+" "+this.state.Street+" "+this.state.PostCode+" "+this.state.City+" "+this.state.Province+" "+this.state.Country});
  
  


      
      const transaction = await LandAbi.methods.LandRegistration(this.state.LandNo+" "+this.state.Street+" "+this.state.PostCode+" "+this.state.City+" "+this.state.Province+" "+this.state.Country, this.state.City, this.state.LandArea,this.state.Meta,this.state.SerialNo).send({
        from : this.state.Account });
       if(!transaction){
         console.log("Transaction Faild!!!");
       }
       else{
         console.log("Transaction succesful");
         this.setState({red: true});
       }
       

       


        
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
          <Modal.Title><FaWpforms className="signup2"  /> Register The Land</Modal.Title>
         </Modal.Header>
         <Modal.Body>
           
         
         <Form onSubmit={this.SubmitData4}>

        
<Form.Row>
<Form.Row>


<Form.Group as={Col} >
<Form.Label>MetaMask ID</Form.Label>
<Form.Control  value={this.state.Meta} 
onChange={this.updateMeta.bind(this)} 
placeholder="MetaMask Id" />
</Form.Group>

<Form.Group as={Col} controlId="formGridEmail">
<Form.Label>City</Form.Label>
<Form.Control    
value={this.state.City} 
onChange={this.updateCity.bind(this)}   placeholder="City" />
</Form.Group>

</Form.Row>
<Form.Group as={Col} controlId="Street">
<Form.Label>StreetNo</Form.Label>
<Form.Control    
value={this.state.Street} 
onChange={this.updateStreet.bind(this)}   placeholder="Street" />
</Form.Group>
<Form.Group as={Col} >
<Form.Label>PostCode</Form.Label>
<Form.Control  value={this.state.PostCode} 
onChange={this.updatePostCode.bind(this)} 
placeholder="Phone" />
</Form.Group>
<Form.Group as={Col} controlId="formGridEmail">
<Form.Label>SerialNo</Form.Label>
<Form.Control    
value={this.state.SerialNo} 
onChange={this.updateSerialNo.bind(this)}   placeholder="Serial No" />
</Form.Group>

</Form.Row>
<Form.Row>

<Form.Group as={Col} >
<Form.Label>Province</Form.Label>
<Form.Control  value={this.state.Province} 
onChange={this.updateProvince.bind(this)} 
placeholder="Phone" />
</Form.Group>


</Form.Row>
<Form.Row>
<Form.Group as={Col} >
<Form.Label>Land-No</Form.Label>
<Form.Control  value={this.state.LandNo} 
onChange={this.updateLandNo.bind(this)} 
placeholder="MetaMask Id" />
</Form.Group>

<Form.Group as={Col} controlId="formGridEmail">
<Form.Label>Country</Form.Label>
<Form.Control    
value={this.state.Country} 
onChange={this.updateCountry.bind(this)}   placeholder="Country" />
</Form.Group>

<Form.Group as={Col} >
<Form.Label>LandArea</Form.Label>
<Form.Control  value={this.state.LandArea} 
onChange={this.updateLandArea.bind(this)} 
placeholder="OwnerName" />
</Form.Group>
</Form.Row>

<Form.Row>

{/* <Form.Group as={Col} controlId="formGridEmail">
<Form.Label>Email</Form.Label>
<Form.Control    
value={this.state.Email} 
onChange={this.updateEmail.bind(this)}   placeholder="City" />
</Form.Group> */}


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








export default LandRegistrationPopup;