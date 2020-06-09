import React from 'react';
import LandAbi from "../../LandAbi";
import web3 from "../../web3";


import socketIOClient from "socket.io-client";
import {Col,Row,Nav} from "react-bootstrap";
import {FiCopy} from "react-icons/fi"
import {FaCheck} from "react-icons/fa"
class Saleable extends React.Component{
    state={
        endpoint: "http://127.0.0.1:5000",
        flag: false,
        Account: null,
        test:[],
        count:0,
        tests:[],
        cop:"",
        copstatus:false,
        copid:"",
        showbtn:1,
        Stand:""
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
        
        await window.ethereum.enable();
       var Acc= await web3.eth.getAccounts();
      
this.setState({Account: Acc[0]});
this.setState({Stand: 1});

socket.on("sendtonetwork",(data)=>console.log("data",data));
socket.on("chkbradcast",(so)=>{console.log("broadcast", so)});
this.viewsaleable();

}
async viewsaleable(){
    var Acc= await web3.eth.getAccounts();
    const viewfor=await LandAbi.methods.viewforsale().call({from: Acc[0]});

viewfor.map((viewfor, i) => (
    <React.Fragment>{viewfor}
    {
    this.salein(viewfor)
    
    }
    </React.Fragment>
  ))
if(this.state.tests.length==0)
{
  this.setState({Stand: 0});
}

}


async salein(data){
    var Acc= await web3.eth.getAccounts();
    const salecontai=await LandAbi.methods.landInfoOwner(data).call({from: Acc[0]});
   

let sfloors = [...this.state.tests];
sfloors.push({value: salecontai});
this.setState({tests: sfloors});


this.setState({Stand: 0});


}


async landinfo(data){
    var Acc= await web3.eth.getAccounts();
    const contai=await LandAbi.methods.landInfoOwner(data).call({from: Acc[0]});

let floors = [...this.state.test];
floors.push({value: contai});
this.setState({test: floors});


}
async LandOwner(data){
    
     var Acc= await web3.eth.getAccounts();
    const value=  await LandAbi.methods.requestToLandOwner(data).send({from: Acc[0]});
    
    
    this.setState({showbtn: false});
    
}




render(){
  
  let mvp;
  if(this.state.Stand==1)
  {
    mvp=<span style={{color: 'black'}}>Loading</span>
  }
  if(this.state.Stand==0)
  {
    mvp=<span style={{color: 'black'}}>No Land</span>
  }
  
  let ce ="Your Land";
    let da=0;
        
    this.state.count=1;
    let copi;
    if(this.state.copstatus)
    {
      copi=<span><FaCheck /></span>;
    
    }
  

    return(

        <div  className="text leappadding">
      

<Row style={{width:'100%'}}>
             <Col md={4} >
             
             <ul className="colorback" >
         
               
    {    (this.state.tests.length==0)? <span style={{color: 'black'}}>{mvp}</span>:
          this.state.tests.map(it => (
              
          <li className="text colorback" style={{color: "#0EAD69 "}}><Row> <Col md={0.5}>{this.state.count++}</Col> &nbsp;
          {/* {console.log("saleable",it)} */}
        <Col md={4}>  {it.value[2]}</Col> &nbsp; 
        
       <Col md={4}> <input  value={ it.value[0]} name="id" id={it.value[0]+"0"} style={{MozBorderRadius:'5px'}}/>
        
        <button onClick={()=>{this.LandFunction(it.value[0]+"0")}}><FiCopy style={{color: 'white'}}/></button></Col>
        &nbsp; {(this.state.copid == it.value[0]+"0") ? copi : null} 
          
     <Col md={3}>       
      
     {(this.state.Account == it.value[1]) ? ce : <button className="makebt" onClick={()=>{this.LandOwner(it.value[0])}}>Request To LandOwner</button>} 
      
      {/* &nbsp; <button className="makebt" onClick={()=>{this.LandOwner(it.value[0])}}>Request To LandOwner</button>  */}
    
      
    
    </Col>
             </Row>
           </li> 
         

         
           

        
         )
         
         
         
         
         )
          
          }
          
        </ul>
   </Col>
           

        
       
      
       </Row>
            

        </div>
    );
    }

}
export default Saleable;