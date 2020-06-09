import React,{Component} from "react";
import Logo from '../../assets/Siacoin_logo_green.svg';
import {Navbar,Image,Col,Row,Nav,NavDropdown} from "react-bootstrap";
import {Router as Router, Redirect} from 'react-router-dom';
import "./cityviewarrrange.css";
import {MdSecurity} from "react-icons/md";
import LandRegistrationPopup from "./LandRegisterpopup";
import {FaWpforms} from "react-icons/fa";
import {IoMdLogOut} from "react-icons/io";
import web3 from '../../web3';
import LandAbi from "../../LandAbi";
import ShowMap from "../ViewMapPop";
import {GiIsland} from "react-icons/gi";
import Backdrop from "./cityviewArrangepop";
import axios from 'axios';
import CityMap from "./cityMAp";
import {Form,Button} from 'react-bootstrap'
import ApproverWindow from "./ApproveLand";
import {MdVerifiedUser} from "react-icons/md";
class CityViewArrange extends Component{

state={ 
    mycity:[],
    logout:false,
    showregisterwindow: false,
    Asset:[],
    count:0,
    approverdata:"",
    pointx:"",
    pointy:"",
    viewmap: false,
    Landid:"",
    Account:"",
    searchid:"",
    test:[],
    approvewindow: false


}


submitdataapprove=this.submitdataapprove.bind(this);





showComponentHandler(data){
    console.log("sana",data);
    
         
    // var Acc= await web3.eth.getAccounts();
        
    // const val=  await LandAbi.methods.viewapprover(data).call({from: Acc[0]});
        this.setState({approverdata: data});
            this.setState((prevstate)=>{
        if(prevstate.showcomponent)
        {
         return {showcomponent: false}
        
        }
        else{
         return {showcomponent: true}
        
        }
              
             });
           }
async componentDidMount(){
     
  var Ac= await web3.eth.getAccounts();
  console.log("AC", Ac);
  this.setState({Account: Ac[0]});
    const city=window.localStorage.getItem('CompanyCity');
    console.log("city",city);

const contain=await LandAbi.methods.Cityandusers(city).call({from: Ac[0]});

// this.setState({
//       Asset:  contain.map=> (
//   <div>        {this.landinfo(item)}

//   <li className="text colorback" style={{color: "#0EAD69 "}}  key={item}>{counti++}) {item}
  
//    &nbsp; <button className="makebt" onClick={()=>{this.showComponentHandler(item)}}>view detail</button> 
   
//    {/* &nbsp; <button className="makebt" onClick={()=>{this.showLands(item)}}>View Lands</button> <hr className="new1" /> */}
//    {/* <div>{takecityland}</div> */}
//    </li> 
 
//    </div>

   


//  )
//  )


  contain.map((contain, i) => (
    <React.Fragment>{contain}
    {
    this.landinfo(contain)
    
    }
    </React.Fragment>
  ))




console.log("Asset",this.state.Asset);

// let location= this.state.city+" " + "Pakistan";
//     const geocoderUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
//     encodeURIComponent(location) +
//     '.json?access_token=' +
//     'pk.eyJ1IjoiY2hyaXM5MDYiLCJhIjoiY2thYnkxM2hrMWJjZjJzcDRxeHVramh2dCJ9.MMhL69YIetURCtU1ZIuqqA';

//     const res = await axios.get(geocoderUrl).then(res => res.data);
//     console.log("look",res);
//      const point = res.features[0].geometry;
// console.log("response",res.features[0]);
// console.log("point", point);
// console.log("point.coordinates[0]",point.coordinates[0]);
//  this.setState({pointx: point.coordinates[0]});
//  this.setState({pointy: point.coordinates[1]});
// this.setState({viewmap:true});
// console.log("pointx",point.coordinates[0]);
// console.log("pointy",point.coordinates[1]);
// console.log("land id",res.features[0].id);
// this.setState({Landid: res.features[0].id});


}
async submitdataapprove(e){
e.preventDefault();
    const contain=await LandAbi.methods.approververify(this.state.searchid).call({from: this.state.Account});
console.log("approve status",contain);
}
openregisterwindow=()=>{
    this.setState({showregisterwindow: true});
}
showApprove=()=>{
  this.setState({approvewindow: true});
}
notshowapprove=()=>{
  this.setState({approvewindow: false});
}
async landinfo(data){
  
      const contai=await LandAbi.methods.landInfoOwner(data).call({from: this.state.Account});
  console.log("landinfo",contai);
  let floors = [...this.state.test];
  floors.push({value: contai});
  this.setState({test: floors});
  
  console.log("test kru", this.state.test[0]);
  }


updateLandid=(e)=>{
    e.preventDefault();
      const{searchid, value}=e.target;
      console.log('sarchid', searchid);
    console.log('value', value);
    this.setState({searchid: e.target.value});
  }
    LogOutview=()=>{
        this.setState({logout:true});
    }
    closeregister=()=>{
        this.setState({showregisterwindow: false});
    }
    backdropclick =()=>
                               {this.setState({showcomponent: false})
                            };
render(){
    if(this.state.logout)
    {
        return <Redirect to="/" />;
    }
let showtheRegisterWindow;
    if(this.state.showregisterwindow)
    {
        showtheRegisterWindow=<LandRegistrationPopup  click={()=>{this.closeregister()}}/>;

    }

    let logind;
if(this.state.showcomponent)
{
logind=<Backdrop  click={this.backdropclick} click2={this.state.approverdata}/>;
console.log("deatasend",this.state.approverdata);
}
let counti=0;
let latitude= this.state.pointx;
let longitude= this.state.pointy;
console.log("te",this.state.test);
let  approverwind;
if(this.state.approvewindow)
{
  approverwind=<ApproverWindow click={()=>{this.notshowapprove()}} />
}

return(

    <React.Fragment>
<div className="makebackground" >
    {/* <Navbar  bgPrefix="bgcolors"  style={{background: 'rgba(3, 163, 128, 0.363)'}}  fixed="top"  collapseOnSelect expand="xxl"   >
            <div className="container">
   <span style={{color:'white'}}>  <Image src={Logo}  width= '25px' height='auto'/>SyLand</span>
        
   <button className=" btnsetback" onClick={()=>{this.LogOutview()}} >Logout</button>
        <button className="offset-6 btnsetback" onClick={()=>{this.LogOutview()}} >Logout</button>
          <Navbar.Collapse id="responsive-navbar-nav">
            
          
        
          </Navbar.Collapse>
          </div>
          </Navbar> */}

          <Navbar collapseOnSelect expand="lg" bgPrefix="bgcolors"  style={{background: 'rgba(3, 163, 128, 0.363)'}}  fixed="top" >
          <div className="container">
  <Navbar.Brand href="#home"><span style={{color:'white'}}>  <Image src={Logo}  width= '25px' height='auto'/>SyLand</span></Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
        
      {/* <Nav.Link href="#features">Features</Nav.Link>
      <Nav.Link href="#pricing">Pricing</Nav.Link>
      <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown> */}
    </Nav>
    <Nav>
   <button className=" btnsetback" onClick={()=>{this.showApprove()}} ><MdVerifiedUser style={{color: "rgba(21, 247, 149, 0.781)"}} /> Approve The Land</button>

   <button className=" btnsetback" onClick={()=>{this.openregisterwindow()}} ><FaWpforms style={{color: "rgba(21, 247, 149, 0.781)"}} /> Register The Land</button>

      {/* <Nav.Link href="#deets">More deets</Nav.Link> */}
      <Nav.Link eventKey={2} href="#memes">
   <button className=" btnsetback" onClick={()=>{this.LogOutview()}} ><IoMdLogOut style={{color: "rgba(21, 247, 149, 0.781)"}}/> Logout</button>
        
      </Nav.Link>
      
    </Nav>
  </Navbar.Collapse>
  </div>
</Navbar>
{showtheRegisterWindow}
          <div className="maintitle">
              SyLand City Portal
              
          </div>
          <div className="headline">We Secure Your OwnerShip Of Land
          <br></br>
         <span className="icnon"> <MdSecurity /></span>
          </div>
               
        {approverwind}

</div>
<br></br>
<br></br>

<h3 style={{textAlign:'center'}}>Lands Information</h3>
<br></br>
<div className="textcolor"> <h4 >Registered cities < GiIsland  /></h4>
               </div>
<div style={{color:'black'}}><Row style={{width:'100%'}}><Col className="offset-1">Address</Col><Col >Serial No</Col></Row></div>

<Row style={{width:'100%'}}>
             <Col md={4} >
             
             <ul className="colorback" >
           
              
               {
          this.state.test.map(item => (
              
          <li className="text colorback" style={{color: "#0EAD69 "}}> {this.state.count++}) &nbsp;
          
          {
          
          item.value[0]} &nbsp; {
          
            item.value[2]} 
             &nbsp; <button className="makebt" onClick={()=>{this.showComponentHandler(item.value[0])}}>view Admin</button> 
           
          
           </li> 
         

           

        
         )
         
         
         
         
         )
          
          }
        </ul>
   </Col>
           

        
       
      
       </Row>

       

       <Col className="offset-5" md={2}>
        {/* <h4 style={{textAlign:'center'}} >Approve Land </h4>
        <Form onSubmit={this.submitdataapprove}>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Enter Land-id</Form.Label>
    <Form.Control type="Landid" onChange={this.updateLandid.bind(this)} placeholder="Enter Land-Id" />
    
  </Form.Group>

  
  <button variant="primary" className="offset-12 btnchk" type="submit">
    Submit
  </button>
</Form> */}

        
       
       </Col>
{logind}
</React.Fragment>);

}


}
export default CityViewArrange;