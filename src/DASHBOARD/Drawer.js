import React,{Component} from 'react';
import  "./Drawer.css"

import {AiOutlineFileSearch} from "react-icons/ai"
import {FiSettings} from "react-icons/fi"
import {GiIsland} from "react-icons/gi";
import {AiOutlineDashboard} from "react-icons/ai"
import {FaPagelines} from "react-icons/fa"
import Buyer from "./buypop/Buypop";

class Drawer extends Component{
 state={
     flag: false
 }

     ColoredLine = ({ color }) => (
        <hr
            style={{
                color: color,
                backgroundColor: color,
                height: 5
            }}
        />
    );

clickfunc=()=>{
    console.log("clicked");
    this.setState({flag: true});
}
close=()=>{
    this.setState({flag: false});

}
render(){
    let sh;
if(this.state.flag)
{
sh=<Buyer  click={()=>this.close()} />;
}
    return(
        




       
<div className={this.props.click}>

<br></br>
<br></br>


{sh}


<a className="adjust" href=""><AiOutlineDashboard  className="adjustColors" /> <span className="dishide">  Dashboard </span> </a> <br></br>
<hr />

    <a className="adjust "  style={{cursor:'pointer'}} onClick={()=>this.clickfunc()}><FaPagelines  className="adjustColors"  />  <span className="dishide"> Buy Land </span>  </a>  <br></br>
<hr />

<a className="adjust " href="" ><AiOutlineFileSearch className="adjustColors"  /> <span className="dishide">Request Status</span>  </a>   <br></br>
<hr />

<a className="adjust "  href="#viewLand"><GiIsland className="adjustColors"  /> <span className="dishide"> Lands for sale  </span>     </a> <br></br>
<hr />

<a className="adjust "  href=""><FiSettings className="adjustColors"  />  <span className="dishide">Settings </span>  </a>  <br></br>








</div>







    );
}
}





export default Drawer;