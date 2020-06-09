import React from 'react';
import LandAbi from "../LandAbi";
import web3 from "../web3";
import "./land.css"
import {GiIsland} from "react-icons/gi";
import socketIOClient from "socket.io-client";
import axios from "axios";
import {Button, Form,Col} from "react-bootstrap";
import ipfs from "../ipfs";
class Landview extends React.Component{

  SubmitDatatoContract =this.SubmitDatatoContract.bind(this);

    state={
        Account: "",
        Asset: [],
        count: 0,
        itemlist: "",
        endpoint: "http://127.0.0.1:5000",
        flag: false,
        salelist: [],
        Email: "",
        LandNo: "",
        StreetNo: "",
        Province: "",
        sMap: "",
        pointx: "",
        pointy:"",
        ipfsHash:"",
        buffer:""
    }
    
    async componentDidMount(){
       
        
        await window.ethereum.enable();
       var Acc= await web3.eth.getAccounts();
       console.log("ACC", Acc);
    this.setState({Account: Acc});


}
async makesaleable(data){
     const socket = socketIOClient(this.state.endpoint);
    
    const val=  await LandAbi.methods.makeSaleable(data.item).call();
    console.log("val", val);
    
    socket.emit("sale", data);
    
}

updateEmail=(e)=>{
    e.preventDefault();
    const{Email, value}=e.target;
    console.log('Email', Email);
  console.log('value', value);
    this.setState({Email: e.target.value});
  }
  updateLandNo=(e)=>{
    e.preventDefault();
    const{LandNo, value}=e.target;
    console.log('LandNo', LandNo);
  console.log('value', value);
    this.setState({LandNo: e.target.value});
  }
  updateStreetNo=(e)=>{
    e.preventDefault();
    const{StreetNo, value}=e.target;
    console.log('StreetNo', StreetNo);
  console.log('value', value);
    this.setState({StreetNo: e.target.value});
  }
  updateProvince=(e)=>{
    e.preventDefault();
      
    const{Province, value}=e.target;
    console.log('Province', Province);
  console.log('value', value);
    this.setState({Province: e.target.value});
  }
  updatePostalCode=(e)=>{
      e.preventDefault();
      const{PostalCode, value}=e.target;
        console.log('PostalCode', PostalCode);
      console.log('value', value);
    this.setState({PostalCode: e.target.value});
  }

  updateCity=(e)=>{
    e.preventDefault();
    const{City, value}=e.target;
    console.log('City', City);
  console.log('value', value);
    this.setState({City: e.target.value});
  }
  updateCountry=(e)=>{
    e.preventDefault();
    const{Country, value}=e.target;
    console.log("Country", Country);
  console.log('value', value);
    this.setState({Country: e.target.value});
  }
//  checkmap(){
// console.log("coming");
//    const result= 'https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/' +
//     'pin-l-1+333(' + 99 + ',' + -83 + ')/' +
//     99 + ',' +  -83 +
//     ',14.25,0,0/600x600/' +
//     '?access_token=pk.eyJ1IjoibWF0dGZpY2tlIiwiYSI6ImNqNnM2YmFoNzAwcTMzM214NTB1NHdwbnoifQ.Or19S7KmYPHW8YjRz82v6g';
  
//   console.log("urll", result);
//   }

captureFile=(event)=>{

  console.log("Capture File");
  event.preventDefault();
  const file= event.target.files[0];
  const reader= new window.FileReader();
  reader.readAsArrayBuffer(file);
  reader.onloadend=()=>{
    this.setState({buffer: Buffer(reader.result)});
    console.log('buffer will storeee',this.state.buffer);
  }}



 

async CallABi(){
console.log("first");

const completeAddress= this.state.LandNo + " "+ this.state.StreetNo+" "+ this.state.PostalCode+" "+this.state.City+" "+this.state.Province+" "+this.state.Country;
 console.log("Complete Address",completeAddress); 
const val=   await LandAbi.methods.LandRegistration("44","55","Golra Shareef", completeAddress).call();
console.log("val",val);
}
  async  SubmitDatatoContract(e) {
    e.preventDefault();
    
    

    console.log('buffer datatdatdtadtatdtadtatd',this.state.buffer);
    
      ipfs.files.add(this.state.buffer,(error, result)=>{
     if(error)
     {
       console.error("error");
     }
     console.log('result',result);
     
     this.setState({ipfsHash: result[0].path});

    this.CallABi();



   });
   
    






//     let location= this.state.Address;
//     const geocoderUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
//     encodeURIComponent(location) +
//     '.json?access_token=' +
//     'pk.eyJ1IjoiY2hyaXM5MDYiLCJhIjoiY2s4aHE5bHRvMDJydzNtbXN3dXYzYmlsNyJ9.NzXgfUXDqSdJYZIpRypUNA';

//     const res = await axios.get(geocoderUrl).then(res => res.data);
//     const point = res.features[0].geometry;
// console.log("response",res.features[0]);
// console.log("point", point);
// console.log("point.coordinates[0]",point.coordinates[0]);
// this.setState({pointx: point.coordinates[0]});
// this.setState({pointy: point.coordinates[1]});




     

    




    
    // const geocoder = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
    // point.coordinates[0]+ ',' +  point.coordinates[1]+
    // '.json?&access_token=' +
    // 'pk.eyJ1IjoiY2hyaXM5MDYiLCJhIjoiY2s4aHE5bHRvMDJydzNtbXN3dXYzYmlsNyJ9.NzXgfUXDqSdJYZIpRypUNA';

    // const result1 = await axios.get(geocoder).then(res => res.data);
    // console.log("reverse geo",result1);







  }




  captureFile=(event)=>{

    console.log("Capture File");
    event.preventDefault();
    const file= event.target.files[0];
    const reader= new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend=()=>{
      this.setState({buffer: Buffer(reader.result)});
      console.log('buffer will storeee',this.state.buffer);
    }}












render(){
    
        
    this.state.count=1;
    return(

        <div  className="text leappadding">
       <span > Your MetaMask Id: </span>   <span style={{color: "orange"}}>{this.state.Account}</span>
            <br></br>
            <br></br>
            <br></br>
            <ul>

                <h2 className="text5">Register Your Land< GiIsland  /></h2>

<div className="container">
<Form onSubmit={this.SubmitDatatoContract}>
  <Form.Row>
    <Form.Group as={Col} controlId="formGridEmail">
      <Form.Label>Email</Form.Label>
      <Form.Control type="email" placeholder="Enter email"  name="Email" onChange={this.updateEmail} value={this.state.Email} />
    </Form.Group>


    <Form.Group as={Col} controlId="formGridLand">
      <Form.Label>Land No / House No </Form.Label>
      <Form.Control type="LandNo" placeholder="Land No / House No"  name="Land" onChange={this.updateLandNo} value={this.state.LandNo} />
    </Form.Group>
    
   
  </Form.Row>
<Form.Row>  
  <Form.Group controlId="formGridAddress1">
    <Form.Label>Street No</Form.Label>
    <Form.Control placeholder="street No"  type="streetNo" name="StreetNo" onChange={this.updateStreetNo} value={this.state.StreetNo} 
 />

  </Form.Group>
  &nbsp;
  <Form.Group controlId="formGridprovince">
    <Form.Label>Province</Form.Label>
    <Form.Control placeholder="Province" type="Province" name="Province" onChange={this.updateProvince} value={this.state.Province} 
  />
  </Form.Group>
  &nbsp;
  <Form.Group controlId="formGridcity">
    <Form.Label>City</Form.Label>
    <Form.Control placeholder="City" type="City" name="City" onChange={this.updateCity} value={this.state.City} 
  />
  </Form.Group>
  &nbsp;
  <Form.Group controlId="formGridAddress2">
    <Form.Label>Choose Image</Form.Label>
    <Form.Control type="file"   onChange={this.captureFile} />
  </Form.Group>
  </Form.Row>


  <Form.Row>

  <Form.Group controlId="formGridAddress2">
    <Form.Label>Postal code</Form.Label>
    <Form.Control placeholder="Postal Code" type="country" name="country" onChange={this.updatePostalCode} value={this.state.PostalCode} 
  />
  </Form.Group>
    <Form.Group as={Col} controlId="formGridCity">
      <Form.Label>Country</Form.Label>
      <Form.Control  type="city" name="city" onChange={this.updateCountry} value={this.state.Country} 
 placeholder="Country"/>
    </Form.Group>

    
 
</Form.Row>
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
</div>
   



          {/* {
             
          
          this.state.Asset.map(item => (
              
          <li className="text" style={{color: "#0EAD69 "}}  key={item}>{this.state.count++}) {item}  
           &nbsp; <button className="makebtn" onClick={()=>this.makesaleable({item})}>Make Saleable</button>  <hr></hr></li>
          ))
          
          } */}
        </ul>

           

            
            
            

        </div>
    );
    }

}
export default Landview;