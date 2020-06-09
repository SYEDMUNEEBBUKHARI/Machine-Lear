


import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from "axios"
import {Modal,Button,Form,Col} from 'react-bootstrap';
import ReactMapGl from "react-map-gl";
import{MdPerson} from "react-icons/md"
import ViewMap from "../ViewMapPop";

import {browserHistory} from "react-router";

import {Router as Router, Redirect} from 'react-router-dom';
import LandAbi from "../../LandAbi";
import web3 from "../../web3";


// import "../navbar/login.css"
const formvalid=(formErrors)=>{
    let valid=true;
    
    Object.values(formErrors).forEach(val => val.length>0 && (valid=false));
    
    return valid;
      
    
    
    
    
    }


    
class CityViewArrangepop extends Component{


    async componentDidMount(){
        await window.ethereum.enable();
        var Acc= await web3.eth.getAccounts();

var sanaa= await LandAbi.methods.landInfoOwner(this.props.click2).call({from: Acc[0]});
console.log("sanaa",sanaa);
await this.setState({admindetail: sanaa});
    let location= this.state.admindetail[2];
    const geocoderUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
    encodeURIComponent(location) +
    '.json?access_token=' +
    'pk.eyJ1IjoiY2hyaXM5MDYiLCJhIjoiY2thYnkxM2hrMWJjZjJzcDRxeHVramh2dCJ9.MMhL69YIetURCtU1ZIuqqA';

    const res = await axios.get(geocoderUrl).then(res => res.data);
    console.log("look",res);
     const point = res.features[0].geometry;
console.log("response",res.features[0]);
console.log("point", point);
console.log("point.coordinates[0]",point.coordinates[0]);
 this.setState({pointx: point.coordinates[0]});
 this.setState({pointy: point.coordinates[1]});
this.setState({viewmap:true});
console.log("point.idd",res.features[0].id);
this.setState({Landid: res.features[0].id});
    }

  SubmitData55 =this.SubmitData55.bind(this);

    state = {
        showsidedraw: false,
        showsign: true,
        showRegister: false,
        LoggedIn: false,
        Password: null,
        Name: "",
        ipfsHash: "",
        Emaili: "9",
        ipfsHashi: "",
        Namei:"",

       
        password: "",
        uName:"",
        uIpfs:"",
        uEmail:"",
      
        formErrors:{

          password:" "
        },
        flag: false,
        chktoken: true,
        handleRegisterstate: false,
        admindetail:[],
        pointx:"",
        pointy:"",
        Landid:""
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






 async  SubmitData55 (e) {
    

  e.preventDefault();
  
  // console.log("Email is settt", this.state.Email);

  
  const finaldata = {
  
 
    
    password: this.state.password,
  
  Email: this.state.Email
  }

  // var that=this;

  console.log("calling api");
const token= await axios.post("http://localhost:5000/Register/login", finaldata)

  .then(res=>{
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("ipfsHash", res.data.ipfsHash);
    localStorage.setItem("Email", res.data.Email);
    localStorage.setItem("Name", res.data.Name); 
    localStorage.setItem("Count", res.data.Count); 
  }).then((result)=>{});

  this.setState({LoggedIn: true});
  





console.log("that",this.state.Emaili);
  
console.log("tokeeennnnn",token);
// localStorage.setItem("token", token);


 
  
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

if(this.state.viewmap)
{
 takeComp=<ViewMap lat={this.state.pointx} lon={this.state.pointy} Landid={this.state.Landid} />
}

return(
    <React.Fragment>

      

     

<Modal  show={this.state.showsign}  className=" setLogin" >
        <Modal.Header bsPrefix="modal-header" className="d-block">
          <Modal.Title><MdPerson className="signup2"  /> Admin Detail</Modal.Title>
         </Modal.Header>
         <Modal.Body>
           {takeComp}
         

       <span style={{color:' #0EAD69'}}> Land Owner</span> {this.state.admindetail[1]} 
         <br></br>
         <span style={{color:' #0EAD69'}}> SerialNo</span> {this.state.admindetail[0]}
         <br></br>
         <span style={{color:' #0EAD69'}}>Comlete Address: </span>{this.state.admindetail[2]}
        <br></br>
        <span style={{color:' #0EAD69'}}> Address: </span>{this.state.admindetail[3]}
         <br></br>
         <span style={{color:' #0EAD69'}}> Land Area:</span> {this.state.admindetail[4]}
         <br></br>
         <span style={{color:' #0EAD69'}}> Land Saleable: </span>{this.state.admindetail[5]}
         <br></br>
         <span style={{color:' #0EAD69'}}> BuyersStatus: </span>{this.state.admindetail[6]}

 
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








export default CityViewArrangepop;