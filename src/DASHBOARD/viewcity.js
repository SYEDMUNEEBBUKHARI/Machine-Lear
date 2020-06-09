import React from 'react';
import LandAbi from "../LandAbi";
import web3 from "../web3";
import "./land.css"
import {GiIsland} from "react-icons/gi";
import socketIOClient from "socket.io-client";
import Logo from '../assets/Siacoin_logo_green.svg';
import {Navbar,Image,Col,Row} from "react-bootstrap";
import Backdrop from "./adminbackdraw";
import {browserHistory} from "react-router";
import "./viewcity.css"
class Viewcity extends React.Component{
    state={
        
       
       
    }
    
    async componentDidMount(){
        const socket = socketIOClient(this.state.endpoint);
      


}
 






       
render(){


    return(
        
       
    );
    }

}
export default Viewcity;