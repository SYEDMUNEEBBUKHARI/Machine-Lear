import React from 'react';
import LandAbi from "../LandAbi";
import web3 from "../web3";
import "./land.css"
import {GiIsland} from "react-icons/gi";
import socketIOClient from "socket.io-client";
import Logo from '../assets/Siacoin_logo_green.svg';
import {Navbar,Image,Col,Row,Nav} from "react-bootstrap";
import {Router as Router, Redirect} from 'react-router-dom';
import "./company.css";
import {browserHistory} from "react-router";
import Companyback from "./companyback";
import { FiLogOut } from 'react-icons/fi';
import { FaWpforms } from 'react-icons/fa';
import { IoMdLogOut } from 'react-icons/io';
import Addcoverage from "./addcoverga";

class Company extends React.Component{
    state={
        Account: "",
        showcomponent: false ,
        Asset: [],
        count: 0,
        itemlist: "",
        endpoint: "http://127.0.0.1:5000",
        flag: false,
        salelist: [],
        Address:"",
        logou:false,
        addcoverage:false
    }
    
    async componentDidMount(){
        const socket = socketIOClient(this.state.endpoint);
        
        await window.ethereum.enable();
       var Acc= await web3.eth.getAccounts();
       console.log("ACCo", Acc);
    this.setState({Account: Acc});
// const Asse= await LandAbi.methods.viewcities().call({from: Acc[0]});
// this.setState({Asset: Asse});
// console.log("Assets",this.Asset);
const endpoint = this.state.endpoint;
socket.on("ME",(data)=>{console.log("munib",data)})
socket.on("sendtonetwork",(data)=>console.log("data",data));
socket.on("chkbradcast",(so)=>{console.log("broadcast", so)})

}
async makesaleable(data){
    var Acc= await web3.eth.getAccounts();
    
    const val=  await LandAbi.methods.checkAdmins(data.item).call({from: Acc[0]});
    this.setState({Address: val});
    console.log("val", val);
    
   
    
}
showcoverage=()=>{
                
    this.setState((prevstate)=>{
                if(prevstate.addcoverage)
                {
                 return {addcoverage: false}
                
                }
                else{
                 return {addcoverage: true}
                
                }
                      
                     });
                   }
    
    
                   backaddclick =()=>
                   {this.setState({addcoverage: false})
                };
    
async chkcity(){
    var Acc= await web3.eth.getAccounts();
//    await LandAbi.methods.makeadmin("gujrat","0xa2C1ee3dd1ac4b8Ed475396Fd1EF044Bcd25A40A","naveed","jashdbja7tsdgj").call({from: Acc[0]});

   const resultcity= await LandAbi.methods.viewcities().call({from: Acc[0]});
console.log("resultcity",resultcity);
}
showComponentHandler=()=>{


    browserHistory.push("/sign-in");
    
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

LogOut=()=>{
    this.setState({logou:true});
}
render(){
    let addcity;
if(this.state.addcoverage)
{
addcity=<Addcoverage    click={this.backaddclick}  />;
}
    if(this.state.logou)
    {
        return <Redirect to="/" />;
    }
        
    this.state.count=1;
    return(
        <React.Fragment className=".companybg">
            <Navbar collapseOnSelect expand="lg" bgPrefix="bgcolors"  style={{background: 'rgba(3, 163, 128, 0.363)'}}  fixed="top" >
        <div className="container">
<Navbar.Brand href="#home"><span style={{color:'white'}}>  <Image src={Logo}  width= '25px' height='auto'/>SyLand</span></Navbar.Brand>
<Navbar.Toggle aria-controls="responsive-navbar-nav" />
<Navbar.Collapse id="responsive-navbar-nav">
  <Nav className="mr-auto">
      
    
  </Nav>
  <Nav>
 <button className=" btnsetback" onClick={()=>{this.showcoverage()}} ><FaWpforms style={{color: "rgba(21, 247, 149, 0.781)"}} /> Register The City</button>

  
    <Nav.Link eventKey={2} >
 <button className=" btnsetback" onClick={()=>{this.LogOut()}} ><IoMdLogOut style={{color: "rgba(21, 247, 149, 0.781)"}}/> Logout</button>
      
    </Nav.Link>
    
  </Nav>
</Navbar.Collapse>
</div>
</Navbar>
{addcity}
          <Companyback />


      

        
        </React.Fragment>
    );
    }

}
export default Company;