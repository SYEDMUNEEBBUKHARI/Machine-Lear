import React , { Component } from  "react"
import  "../navbar/sidebar.css"
import {Image, Col,Row} from "react-bootstrap";
import {GoHome, GoTag} from 'react-icons/go';
import {FiPocket} from "react-icons/fi";
import {GiTeacher} from 'react-icons/gi';
import {TiSocialGithubCircular,TiSocialYoutubeCircular,
  TiSocialFacebookCircular, TiSocialLinkedinCircular} from 'react-icons/ti'
import Logo from '../../assets/Siacoin_logo_green.svg'
// import web3 from "../../web3";
// import LandAbi from "../../LandAbi";
import {Router as Router, Redirect} from 'react-router-dom';
import Companyp from "../../DASHBOARD/company";
import {browserHistory} from "react-router";
import {Switch, Route} from "react-router-dom";
import LandAbi from "../../LandAbi";
import web3 from "../../web3";
import {GiModernCity} from "react-icons/gi";
import AuthenCityPortl from "../../DASHBOARD/Cityportal/Cityportal"

class mysidebar extends Component{
  state={
setflag:false,
setShow:false,
went: false,
resultstate:0,
setcitypor:false

  }
  // const [flag, setflag] = useState(false);
  //   const [show, setShow] = useState(false);

   handleClose = () => this.setState({setShow:false});
   handleShow = () => this.setState({setShow:true});
   showpopup(){
     this.setState({setcitypor: true});
   }
   async chkcity(){
    var Acc= await web3.eth.getAccounts();
   const resultcity= await LandAbi.methods.superuser().call({from: Acc[0]});
   this.setState({resultstate: resultcity});
  console.log("resultcity",resultcity);
  
  if(this.state.resultstate==1)
  {
    this.setState({went: true});
  }
  }

render(){
  if(this.state.went)
  { this.setState({resultstate: 0});
    return <Redirect to='/companyportal'  />
  }
  const closecitypor =()=>
   {this.setState({setcitypor: false})};
let CityportLogin;
  if(this.state.setcitypor)
  {
       CityportLogin=<AuthenCityPortl click={closecitypor} />
  }
  console.log("went",this.state.went);
let drawerclasses="setsidebar";
if(this.props.show){
    drawerclasses="setsidebaropen";
}
//  async function companyportal(){
//    console.log("flag",flag);
//   console.log("clicked");
  
//    const result = await LandAbi.methods.pak5().call();
//   console.log("result", result);
//   console.log("sflag",setflag);

//   if(result)
//   {
//     setflag(true);
    
//   }
// }



return(
    <React.Fragment>    
       
  {CityportLogin}
    <ul bsprefix="litext" className="navAlign">
    <div className={drawerclasses} >
    <br></br>
    <br></br>
         <Image src={Logo}  width= '75px' height='auto'/>
        <h2 className="text-center logocolorbrand " >SyLand</h2>
    
    <hr />
    <br></br>
    <br></br>
    <br></br>



<li> 
&nbsp;
&nbsp;

  <a href=""> <GoHome className="iconcolor" /> &nbsp;
&nbsp;Home          </a>
  
</li>
   

<li>
&nbsp;
&nbsp;
 <a href="#turn"> <GiTeacher  className="iconcolor" /> &nbsp;
&nbsp;Services          </a></li>

 <li>
&nbsp;
&nbsp;
 <a style={{color: 'black'}} onClick={()=>this.chkcity()} > <FiPocket  className="iconcolor" /> &nbsp;
&nbsp;Company Portal       </a></li>
 <li>
&nbsp;
&nbsp;
 <a style={{color: 'black'}}  onClick={()=>this.showpopup()} > <GiModernCity className="iconcolor" /> &nbsp;
&nbsp;City Portal        </a></li>
<br />
<br />
<br />

<Row>
  
<Col   >
<h4><TiSocialYoutubeCircular className="iconcolor1"/></h4>
</Col>

<Col  >
<h4><TiSocialGithubCircular className="iconcolor1"/></h4>
</Col>

<Col  >
<h4><TiSocialLinkedinCircular className="iconcolor1"/></h4>
</Col>
<Col  >
<h4><TiSocialFacebookCircular className="iconcolor1"/></h4>
</Col>




</Row>
<p className="text-center colorblack"> 

© 2015-2020 SyLand  (Lands Ledger)
All rights reserved Privacy Policy                     

</p>

</div>

    </ul>
    
    
    

    
    </React.Fragment>

);
}
};





export default mysidebar;