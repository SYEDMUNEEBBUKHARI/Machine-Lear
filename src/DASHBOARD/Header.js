import React,{Component} from "react";
import {Image,Modal,Alert,Col,Row,Button,Nav,DropdownButton,Dropdown,NavDropdown,Navbar,Form,FormControl, NavItem} from 'react-bootstrap';
import Logoo from "./build.jpeg"
import "./header.css"
class Header extends Component {
render(){

return(


<React.Fragment>
<div className="bgimg">
<br></br>
<br></br>

<br></br>

<br></br>

<br></br>
<div className="fontii"> {localStorage.getItem('Name')} Welcome to SyLand</div>


</div>
    
</React.Fragment>


);

}


}



export default Header;