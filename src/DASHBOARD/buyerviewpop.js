// import React from "react";
// import "./adminbackdraw.css";


// const adminbackdraw=props=>(

//     <div className="backdrop" onClick={props.click} />
// );

// export default adminbackdraw;




import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from "axios"
import {Modal,Button,Form,Col,Row} from 'react-bootstrap';
import ipfs from "../ipfs";
import{MdPerson} from "react-icons/md";
import {FaCheck} from "react-icons/fa";
import {FiCopy} from "react-icons/fi";

import Approvepop from "./buypop/Approvepop";

import {browserHistory} from "react-router";

import {Router as Router, Redirect} from 'react-router-dom';
import LandAbi from "../LandAbi";
import web3 from "../web3";





    
class  buyerpop extends Component{



    async componentDidMount(){
        await window.ethereum.enable();
        var Acc= await web3.eth.getAccounts();
this.setState({Account: Acc[0]});
var Acc= await web3.eth.getAccounts();
console.log("this.props.data",this.props.data);
    const buyervalue=  await LandAbi.methods.LandBuyer(this.props.data).call({from: Acc[0]});
    console.log("buyervalwe", buyervalue);
   this.setState({buyerdata: buyervalue});
// var sanaa= await LandAbi.methods.checkAdminsdetail(this.props.click2).call({from: Acc[0]});
// console.log("sanaa",sanaa);
// await this.setState({admindetail: sanaa});


    }

  
    state = {
       
        showsign: true,
        buyerdata:[],
        Account:null,
        copstatus: false,
        copid:"",
        count:"",
        transferdata:"",
        transferflag:false
    };
     

    LandFunction = (da) => {
      this.setState({copstatus: true});
      this.setState({copid: da});
      
      console.log("counti",da);
      var out = document.getElementById(da);
     
      out.select();
      document.execCommand("copy");
      


    }
     Approve=(da)=>{
     
      this.setState({transferdata: da});
      this.setState({transferflag: true});
      


    }
    

closetranfer=()=>{
  this.setState({transferflag: false});
}

   
render(){
let showApp;
  if(this.state.transferflag)
  {
    showApp=<Approvepop click={()=>this.closetranfer()} click2={this.state.transferdata} click3={()=>this.props.click}/>;
    
  }
  this.state.count=1;
    let copi;
    if(this.state.copstatus)
    {
      copi=<span><FaCheck /></span>;
    
    }
    let msg;
    if(this.state.buyerdata.length==0)
{
  msg="no buyer available yet";
}else{msg=""}

return(

    <React.Fragment>

      

     

<Modal  show={this.state.showsign}  className=" setLogin" >
        <Modal.Header bsPrefix="modal-header" className="d-block">
          <Modal.Title><MdPerson className="signup2"  /> buyers Detail</Modal.Title>
         </Modal.Header>
         <Modal.Body>
           {console.log("this.state.nuyer",this.state.buyerdata)}
           
         <Row style={{width:'100%'}}>
             <Col md={4} >
             
             <ul className="colorback" >
        <span style={{color: 'black'}}>  {msg}</span>
              
               {
          this.state.buyerdata.map(item => (
              
          <li  style={{color: "#0EAD69 "}}>  &nbsp;
          {console.log("te",item)}
          &nbsp; 
          
        MetaId: <input  value={ item} name="id" id={item} style={{MozBorderRadius:'5px'}}/>
        <button onClick={()=>{this.LandFunction(item)}}><FiCopy style={{color: 'white'}}/></button>
        &nbsp; {(this.state.copid == item) ? copi : null} 
        <button onClick={()=>{this.Approve(item)}}><FiCopy style={{color: 'white'}}/><FaCheck />Approve</button>
           </li> 
         

           

        
         )
         
         
         
         
         )
          
          }
        </ul>
   </Col>
           

        
       
      
       </Row>

 
 </Modal.Body>
         <Modal.Footer>

           <Button variant="secondary" className="chkbtn" onClick={this.props.click }>
             Close
           </Button>
           
           
         </Modal.Footer>
       </Modal>
       {showApp}

        </React.Fragment>


);


}

}








export default  buyerpop;