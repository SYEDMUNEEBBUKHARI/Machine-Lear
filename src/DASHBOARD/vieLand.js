import React from 'react';
import LandAbi from "../LandAbi";
import web3 from "../web3";
import "./land.css"
import {GiIsland} from "react-icons/gi";
import socketIOClient from "socket.io-client";
import {Navbar,Image,Col,Row,Nav,NavDropdown} from "react-bootstrap";
import {FiCopy} from "react-icons/fi";
import SaleLand from "./Saleable/Saleable";
import {FaCheck} from "react-icons/fa";
import ViewRequest from "./viewRequestForLand/ViewRequestFor";
import Buyerpop  from "./buyerviewpop";
import {MdNotificationsActive} from "react-icons/md";
class Landview extends React.Component{
    state={
        Account: "",
        Asset: [],
        count: 0,
        itemlist: "",
        endpoint: "http://127.0.0.1:5000",
        flag: false,
        salelist: [],
        test:[],
        count:0,
        testforsale:[],
        copid:"",
        copstatus: false,
        showbuyerpop:false,
        lengthcount:[],
        flacount:0,
        Stan:1
    }
    
    LandFunction = (da) => {
      this.setState({copstatus: true});
      this.setState({copid: da});
      
      console.log("counti",da);
      var out = document.getElementById(da);
     
      out.select();
      document.execCommand("copy");
      


    }
    async componentDidMount(){
        const socket = socketIOClient(this.state.endpoint);
        socket.emit("web",(data)=>{console.log("munib",data)})
        socket.on("sendtonetwork",(data)=>console.log("data",data));
        socket.on("chkbradcast",(so)=>{console.log("broadcast",so)});
        // console.log("socketId",await socket.id);
        await window.ethereum.enable();
       var Acc= await web3.eth.getAccounts();
      //  console.log("ACCo", Acc);
    this.setState({Account: Acc});

const Asse= await LandAbi.methods.viewAssets().call({from: Acc[0]});
this.setState({Asset: Asse});


// console.log("Assets",this.Asset);
// const endpoint = this.state.endpoint;
// const saleableLands= await LandAbi.methods.viewforsale().call({from: Acc[0]});
// console.log("saleableLands",saleableLands);

Asse.map((Asse, i) => (
    <React.Fragment>{Asse}
    {
    this.landinfo(Asse)
    
    }
   
    </React.Fragment>
  ))
  

  Asse.map((Asse, i) => (
    <React.Fragment>{Asse}
    {
    this.buyer5(Asse)
    
    }
   
    </React.Fragment>
  ))
if(this.state.Asset.length==0)
{
this.setState({Stan: 0});
}



}




async landinfo(data){
    var Acc= await web3.eth.getAccounts();
    const contai=await LandAbi.methods.landInfoOwner(data).call({from: Acc[0]});
// console.log("landinfo",contai);
let floors = [...this.state.test];
floors.push({value: contai});
this.setState({test: floors});

// console.log("test kru", this.state.test[0]);
}
async makesaleable(data){
     const socket = socketIOClient(this.state.endpoint);
    // console.log(":datata",data);
     var Acc= await web3.eth.getAccounts();
    const value=  await LandAbi.methods.makeSaleable(data).send({from: Acc[0]});
    // console.log("valwe", value);
    
    socket.emit("sale", data);
    
}
async buyer5(data){
  var Acc= await web3.eth.getAccounts();
    const buyerv=  await LandAbi.methods.LandBuyer(data).call({from: Acc[0]});
    // console.log("buyervcount", buyerv);
   const len= buyerv.length;
   let flo= [...this.state.lengthcount];
flo.push(len);
this.setState({lengthcount: flo});

// console.log("test kru", this.state.lengthcount[0]);
//    console.log(":lencou",this.state.lengthcount);
}

async buyershow(data){
  
  var Acc= await web3.eth.getAccounts();
  
  await this.setState({buyerdata: data});
  this.setState({showbuyerpop: true});
  
  
  
}


showbuyer=()=>{
  this.setState({showbuyerpop: false});
}
updatefla=()=>{
  this.setState({flacount: this.state.flacount+1});

}
render(){
  let mvp;
  if(this.state.Stan==1)
  {
    mvp=<span style={{color: 'black'}}>Loading</span>
  }
  if(this.state.Stan==0)
  {
    mvp=<span style={{color: 'black'}}>No Land</span>
  }
  
  



let i=0;

    this.state.count=1;
    let copi;
    if(this.state.copstatus)
    {
      copi=<span><FaCheck /></span>;
    
    }
    let buyers;
    if(this.state.showbuyerpop)
    {
      buyers=<Buyerpop click={ ()=>{this.showbuyer()}}  data={this.state.buyerdata}/>;
    }
    return(

        <div  className="text leappadding">
            
       <span > Your MetaMask Id: </span>   <span style={{color: "orange"}}>{this.state.Account}</span>
            <br></br>
            <br></br>
            <br></br>


<div style={{textAlign:'center'}}>Land Details</div>

<Row style={{width:'100%'}}>
             
             
             <ul className="colorback" >
          
              
               {
                 (this.state.test.length==0)? <span style={{color: 'black'}}>{mvp}</span> :
                 
          this.state.test.map(item => (
              
          <li className="text colorback" style={{color: "#0EAD69 "}}> <Row><Col md={0.5}>{this.state.count++}</Col> &nbsp;
          {console.log("saleable",item)}
          <Col md={4}>{item.value[2]}</Col> &nbsp; 
          
        <Col md={4}><input  value={ item.value[0]} name="id" id={item.value[0]} style={{MozBorderRadius:'5px'}}/>
        <button onClick={()=>{this.LandFunction(item.value[0])}}><FiCopy style={{color: 'white'}}/></button></Col>
        &nbsp; {(this.state.copid == item.value[0]) ? copi : null} 
        <Col md={3}>
            <button className="setbtn" onClick={()=>{this.buyershow(item.value[0])}}><span className="setnote"><MdNotificationsActive /></span>view buyersStatus <span className="setnote">{this.state.lengthcount[i++]} </span> </button>
            </Col>
           
    

          &nbsp;  
          <Col md={4}> &nbsp; <button className="makebt" onClick={()=>{this.makesaleable(item.value[0])}}>make Saleable</button> </Col>
          
          </Row>
           </li> 
         
         
           

        
         )
         
         
          
         
         )
    
    
          }
          
          
        </ul>
   
           

        
       
      
       </Row>
{buyers}
            
       <br></br>
            <br></br>


<div style={{textAlign:'center'}}  id="viewLand">Saleable Lands </div>

<SaleLand />
<ViewRequest />

            

        </div>
    );
    }

}
export default Landview;