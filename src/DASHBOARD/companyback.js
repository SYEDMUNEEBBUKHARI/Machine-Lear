import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'

import {Container, Jumbotron as Jumbo,  Image, Button  } from 'react-bootstrap';

import Addcoverage from "./addcoverga";
import Removecoverage from "./removecoverage";
import {GiCubes} from "react-icons/gi";

import './companyback.css';
import Logo from '../assets/Siacoin_logo_green.svg';

import LandAbi from "../LandAbi";
import web3 from "../web3";
import "./land.css"
import {GiIsland} from "react-icons/gi";
import socketIOClient from "socket.io-client";

import {Navbar,Col,Row} from "react-bootstrap";
import Backdrop from "./adminbackdraw";
import {browserHistory} from "react-router";
import ShowMap from "./map/map";
import {FaUserTie} from "react-icons/fa";
class Companyback extends Component{

state={
addcoverage: false,
removecoverage:false,
showcomponent: false ,
Asset: [],
count: 0,
itemlist: "",

flag: false,
salelist: [],
Address:"",
detailadmin:"",
Adminflag:false,
datasend:[],
approverdata: [],
collectcities:[],
showLand:"",
CityLand:[]


}
async componentDidMount(){
this.renderPosts();

} 



renderPosts = async() => {
  try {
    await window.ethereum.enable();
    var Acc= await web3.eth.getAccounts();
    console.log("ACCo", Acc);
 this.setState({Account: Acc});
const Asse= await LandAbi.methods.approverdata().call({from : Acc[0]});
this.setState({Asset: Asse});
console.log("Assets",this.Asset);
  } catch (err) {
    console.log(err);
  }
}
       


async citycheck(data){
  
  var Ac= await web3.eth.getAccounts();
  console.log("AC", Ac);

  var sanaa= await LandAbi.methods.viewapprover(data).call({from: Ac[0]});
  console.log("sanaa",sanaa);

}





async citycheck(data){
  
  var Ac= await web3.eth.getAccounts();
  console.log("AC", Ac);

  const Cities= await LandAbi.methods.Cities().call({from : Ac[0]});
  console.log("Cities",Cities);

}



        
        
        
                      


        









                               async viewtheadmin(data){
                                this.setState({detailadmin: data.item});
                              await  this.setState({Adminflag: true});
                                console.log("AdminFlag",this.state.Adminflag);
                                
                                var Acc= await web3.eth.getAccounts();
                                
                                const val=  await LandAbi.methods.checkAdmins(data.item).call({from: Acc[0]});
                                this.setState({Address: val});
                                console.log("val", val);
                                
                               
                                
                            }
                            makefalse=()=>{
                                browserHistory.push("/");
                                 this.setState({showcomponent: false})
                               }
                            
                            async chkcity(data){

                              console.log("chkcity come",data);
                                
                            //    await LandAbi.methods.makeadmin("gujrat","0xa2C1ee3dd1ac4b8Ed475396Fd1EF044Bcd25A40A","naveed","jashdbja7tsdgj").call({from: Acc[0]});
                            
                              //  const resultcity= await LandAbi.methods.viewcities().call({from: Acc[0]});
                            // console.log("resultcity",resultcity);
                            }
                            backdropclick =()=>
                               {this.setState({showcomponent: false})
                            };
                              
                              




                           async showLands(data){
                              
                              if(this.state.showLand)
                              {
                              this.setState({showLand: false});
                                

                              }
                              else{
                                this.setState({showLand: true});

                              }
                              
                                   
                              var Acc= await web3.eth.getAccounts();
                                  
                              const val=  await LandAbi.methods.cityLand(data).call({from: Acc[0]});
                            await  this.setState({CityLand: val});
                              console.log("cityy",this.state.CityLand);
                                     }
                              
                              
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
                            
                            
                            
                            
                            

        render(){
          let takecityland;
          let co=0;
          if(this.state.showLand)
          {
                        takecityland=  this.state.CityLand.map(item => (
                      
              
                          <li className="text colorback" style={{color: "#0EAD69 "}}  key={item}>{co++}) {item} 
                          
                           
                           </li> 
                         
                
                           
                
                        
                         )
                         
                         
                         
                         );
          }
                


let logind;
if(this.state.showcomponent)
{
logind=<Backdrop  click={this.backdropclick} click2={this.state.approverdata}/>;
console.log("deatasend",this.state.approverdata);
}



        
    this.state.count=1;

return(
        
    <React.Fragment>       <div className="lets">
                
                
      

<div className="pad"><span className="adjusttitle"><Image src={Logo} className="adjustpic" width= '80px' height='auto'/>SyLand <span className="colorset">Company </span>Portal</span></div>

      
      
<div className="divcenter"><GiCubes className="setcube" /></div>  
      
        </div>
        <div className="colorback" >
{logind}
<br></br>
            <br></br>
    {/* <FaUserTie style={{color:"rgb(0, 128, 68);"}} /><span style={{color: "white"}}>{this.state.Account}</span> */}
           <br></br>
        
        
            <br></br>
            <br></br>
            
             <Row style={{width:'100%'}}>
             <Col md={4}>
             
               
            <ul className="colorback" >
            <div className="textcolor"> <h4 >Registered cities < GiIsland  /></h4>
               </div>
               {
          
          this.state.Asset.map(item => (
          
              
          <li className="text colorback" style={{color: "#0EAD69 "}}  key={item}>{this.state.count++}) {item} 
          
           &nbsp; <button className="makebt" onClick={()=>{this.showComponentHandler(item)}}>view Admin</button> 
           
           &nbsp; <button className="makebt" onClick={()=>{this.showLands(item)}}>View Lands</button> <hr className="new1" />
           <div>{takecityland}</div>
           </li> 
         

           

        
         )
         
         
         
         )
          
          }
        </ul>
   </Col>
           

        
       
       <Col className="offset-2" md={4}>
        
       <ShowMap />
       </Col>
       </Row>

        
            </div>

        </React.Fragment>
 

);
        }
}

export default Companyback;