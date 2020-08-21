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
import { FaCheck } from "react-icons/fa";
import { FiCopy } from "react-icons/fi";
import VerifyResult from "./VerifyResult";
class CityViewArrange extends Component{

state={ 
  deleteid:"",
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
    approvewindow: false,
    copstatus:false,
    collectLandindata:[],
  collectLandin: [],


    counter:0,
    VerifyRes:false,
    Found:"",
    delete:false,
  


}
  LandFunction = (da) => {
    this.setState({ copstatus: true });
    this.setState({ copid: da });

    console.log("counti", da);
    var out = document.getElementById(da);

    out.select();
    document.execCommand("copy");
 


  }

  
async OnChain(meta,city,street,post,serial,province,landno,count,landarea){


  const transaction = await LandAbi.methods.LandRegistration(landno + " " + street + " " + post + " " + city + " " + province + " " + count, city, landarea, meta, serial).send({
    from: this.state.Account
  });
  if (!transaction) {
    console.log("Transaction Faild!!!");
  }
  else {
    console.log("Transaction succesful");
    this.setState({ red: true });
  }


}
  async onDelete(id){
    const del = await axios.get(`http://localhost:5000/api/deleteLand?id=${id}`);
console.log("Delete",del.data._id);
this.setState({deleteid: del.data._id});
this.setState({delete:true});
  }

  async verifydata(Cnic,serial){
    console.log("verify");
    const Name="Abdul Mubeen";
    const csdata={Cnic: Cnic, serial: serial,Name:"Abdul Mubeen"};
    const dataa = await axios.get(`http://localhost:5000/api/VerifytheLand?serial=${serial}&cnic=${Cnic}&Name=${Name}`);
console.log("found or not",dataa);
if(dataa.data.length===0)
{
  this.setState({Found: 0});
  this.setState({VerifyRes:true});


}
else
{
  this.setState({ Found: dataa.data.length });


}
this.setState({VerifyRes:true});


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

           async loadload(){
             const ax92 = await axios.get("http://localhost:5000/api/fetchdataLandTobe?id=5");

             console.log("ax", ax92.data);
             let axvalue9 = [...this.state.collectLandin];


             ax92.data.map((item) => {
               console.log("::item", item);
               axvalue9.push({ value: item });
             })

             this.setState({ collectLandindata: axvalue9 });
           }
async componentDidMount(){


  let id=5;
 const ax= await axios.get("http://localhost:5000/api/fetchdataLandTobe?id=5");
 
 console.log("ax",ax.data);
  let axvalue = [...this.state.collectLandindata];
  

  ax.data.map((item)=>{
    console.log("::item",item);
    axvalue.push({ value: item });
  })


  
  this.setState({ collectLandindata:axvalue});
  console.log("this.", this.state.collectLandindata);
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

onClose=()=>{
  this.setState({VerifyRes: false});
  this.setState({delete:false});
  
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
  
  let copi;
  if (this.state.copstatus) {
    copi = <span><FaCheck /></span>;

  }
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

let verify;
if(this.state.VerifyRes)
{
  if(this.state.Found===0){
    verify = <VerifyResult len={this.state.Found} data="Data Not Found Delete It" onClose={this.onClose} />;
}
  else {
    verify = <VerifyResult data="found" len={this.state.Found} onClose={this.onClose} />;

  }

}

if(this.state.delete)
{
  verify = <VerifyResult data={`delete id ${this.state.deleteid}`} onClose={this.onClose} />;
this.loadload();

}

return(

    <React.Fragment>
      {verify}
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

          <Navbar collapseOnSelect expand="lg" bgprefix="bgcolors"  style={{background: 'rgba(3, 163, 128, 0.363)'}}  fixed="top" >
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
              <button className=" btnsetback" onClick={() => { this.LogOutview() }} ><IoMdLogOut style={{ color: "rgba(21, 247, 149, 0.781)" }} /> Logout</button>
      {/* <Nav.Link href="#deets">More deets</Nav.Link> */}
      <Nav.Link eventKey={2} >
  
        
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

    <h3 style={{ textAlign: 'center' }}><div className=" text-center"> <h4 style={{fontSize:'25px'}} >Registered cities < GiIsland className="islandcolor" /></h4>
    </div></h3>
<br></br>


    <div className="makeregisterlandcenter" >
             
             <ul className="colorback text-center" >
           
              
               {
          this.state.test.map(item => (
              
            <li className="text colorback" style={{ color: "#0EAD69 " }}>
              <Row><Col md={0.5}>{this.state.count++}</Col> &nbsp;
          {console.log("saleable", item)}
                <Col md={4}>{item.value[2]}</Col> &nbsp;

        <Col md={4}><input value={item.value[0]} name="id" id={item.value[0]} style={{ MozBorderRadius: '5px' }} />
                  <button onClick={() => { this.LandFunction(item.value[0]) }}><FiCopy style={{ color: 'white' }} /></button></Col>
        &nbsp; {(this.state.copid == item.value[0]) ? copi : null}
                <Col md={3}>
                  {item.value[1]}
                </Col>



          &nbsp;
         

              </Row>
            </li>
         

           

        
         )
         
         
         
         
         )
          
          }
        </ul>
   

    </div>

      

<div className="dataofLandstoberegistered">
<div className="landReg">Lands To Be Registered</div>
</div>



{logind}
<div >
  <ul>
        { 
        
        
        this.state.collectLandindata.map(item => (
          

          <li className="text-center" style={{ color: "black " }}>
         <div className="backgroundcolorflex">

              <div className="Nameflex"><div className="NameofClient">Name: <span className="fontName">{item.value.Name}</span></div></div>
              <div className="row aligncol">
                <div className="col-md-2"></div>
              <div className="col-md-3">
                  <span className="clrWhite">Id: </span>  {item.value._id}
              </div> 
                <div className="col-md-3">
                  <span className="clrWhite">MetaMask Id: </span> {item.value.Metamaskid}
                
                </div> <div className="col-md-3">
                  <span className="clrWhite">City: </span>  {item.value.City}
                </div>
            </div>

              <div className="row aligncol">
                <div className="col-md-2"></div>
                <div className="col-md-3">
                  <span className="clrWhite">Street-No: </span>  {item.value.StreetNo}
                </div>
                <div className="col-md-3">
                  <span className="clrWhite">Postal-code: </span>  {item.value.Postcode}
                </div>
                <div className="col-md-3">
                  <span className="clrWhite">Serial-No: </span>  {item.value.SerialNo}
                </div>

            </div>
              <div className="row aligncol">
                <div className="col-md-2"></div>
                <div className="col-md-3">
                  <span className="clrWhite">Province: </span>  {item.value.Province}
                </div>
                <div className="col-md-3">
                  <span className="clrWhite">Land-No: </span>  {item.value.LandNo}
                </div>
                <div className="col-md-3">
                  <span className="clrWhite">Country: </span>  {item.value.Country}
                </div>

              </div >
              <div className="row aligncol">
                <div className="col-md-2"></div>
                <div className="col-md-3">
                  <span className="clrWhite">Land Area: </span>  {item.value.LandArea}
                </div>
                <div className="col-md-3">
                  <span className="clrWhite">CNIC: </span>  {item.value.Cnic}
                </div>
                <div className="col-md-3"> <span className="clrWhite">Land Location: </span>  {item.value.LandLocation}</div>
              </div>
              <div className="VerifyDel">
                <div>                <button className="Verify" onClick={()=>this.verifydata(item.value.Cnic, item.value.SerialNo)}>Verify</button></div>
                <div>                <button className="Delete" onClick={()=>this.onDelete(item.value._id)}>Delete</button></div>
                <div>                <button className="chain" onClick={() => this.OnChain(item.value.Metamaskid, item.value.City, item.value.StreetNo, item.value.Postcode, item.value.SerialNo, item.value.Province, item.value.LandNo, item.value.Country,item.value.LandArea)}>OnChain</button></div>


              </div>





            </div>
            
           
          </li>
         


             



        )




        )}
  </ul>
 
</div>

</React.Fragment>);

}


}
export default CityViewArrange;