import React, { Component } from 'react';
import LandAbi from "../LandAbi";
import web3 from "../web3";
import 'bootstrap/dist/css/bootstrap.min.css'
import ViewLand from "./vieLand";
import {GoChevronDown} from "react-icons/go";
import { Col, Row, Button, Dropdown, Container, Navbar, Card } from 'react-bootstrap';
import { TiThMenu } from "react-icons/ti";
import socket from "socket.io-client";
import { Switch, Route, Router as Router } from "react-router-dom"
import history from '../Services/history';
import {AiOutlineBell} from "react-icons/ai";

import socketIOClient from 'socket.io-client';
import "./dashboard.css";         
import axios from 'axios';
import RegistrationOnBlockchain from "./RegisterLand";

import App from '../App';

import Drawer from "./Drawer";

import Isi from "../assets/giphy.gif"
import Bl from "../assets/Bl.gif"
import BuyLand from "./BuyLand";
class dashboard extends Component {

    constructor() {
        super();
        this.state = {

            logout: false,
            store: "hiiii",
            Emaild: "",
            Named: "",
            ipfsHashd: "",
            loggin: false,
            showdrawer: false,
            showflex: 'setflex',
            response: 0,
            endpoint: "http://127.0.0.1:5000",
            Count: "",
            notification:"",
            notificationLength:"",
            makered: false,
            how:"",
            Acoount:""

        }
    }



    async componentDidMount() {
        const account= await web3.eth.getAccounts;

 this.setState({how: [ {approvedUser:"oooo",
    whoapprove: "))))",
    Landid: "jjjj",
    time:  "p0p0p0"
    }]});
        const Email = localStorage.getItem("Email");
        const Name = localStorage.getItem("Name");
        const ipfsHash = localStorage.getItem("ipfsHash");
        const Count = localStorage.getItem("Count");

        this.setState({
            Emaild: Email,
            Named: Name,
            ipfsHashd: ipfsHash,
            Count: Count
            


        });
        
       this.setState({Acoount: account[0]});
        const socket = socketIOClient(this.state.endpoint);
        socket.on("SendApprovedata",async (data)=>{
            var Acc=  await web3.eth.getAccounts();
            
            console.log("data set app",data);
            console.log("data set appii",data[0].approvedUser);
            console.log("account",Acc[0]);
            

            if(data[0].approvedUser==Acc[0])
            {
                const finaldata = {
        
                    FromUser: data[0].whoapprove,
                    ToUser: data[0].approvedUser,
                    LandId: data[0].Landid
                }
                axios.post("http://localhost:5000/Register/addNotification", finaldata).
                then(res=>{console.log(res.data)});
                
                  console.log("you have a notification");
                  this.notification();
                  localStorage.setItem("Notification", data);
                  this.notification();
            }
            console.log("SendApproverdata", data);
        
        
        });

         var result = await LandAbi.methods.landInfoOwner("0x7deddbeee2923bb35d0990c8f66cc70c7ebcfb6d756c63bc7b3abe44159adbf7").call();
        // console.log("result", result);
        
        // console.log("Accounts", account);

        
        socket.on("outgoing data", data => console.log("ist",data));
        await window.ethereum.enable();
       
        // console.log("ACCo", Acc);
     
    this.notification();
//  console.log("data",da);

    }



    async notification(){
        console.log("calledd");
        var Acc= await web3.eth.getAccounts();
        const da= await LandAbi.methods.Landnotification().call({from: Acc[0]});
        this.setState({notification: da});
        
        const lengthnoti=da.length;
        if(lengthnoti>0)
        {
            this.setState({makered: true});
       
        }
        this.setState({notificationLength: lengthnoti});
        console.log("noti length",this.state.notificationLength);
    }



   
   
   
   
   
    FetchNotification=()=>{
        
        axios.get('http://localhost:9000/fetch',{
            data:{
                id: 0x7818f4Cf57Be909789c6922ACca491B5b9431e5D
            }
        })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          })
          .finally(function () {
            // always executed
          });  
        

    }










    drawerclickhand = (prevstate) => {

        console.log("how",this.state.how[0].approvedUser);

        // const socket = socketIOClient(this.state.endpoint);
        // socket.emit("incoming data", "coolcup");

        this.setState((prevstate) => {
            if (prevstate.showdrawer) {
                return { showdrawer: false }
            } else {
                return { showdrawer: true }

            }
        });

    }


    runLogout = () => {


        console.log("logging out ");

        localStorage.removeItem('token');
        localStorage.removeItem('Name');
        localStorage.removeItem('Email');
        localStorage.removeItem('ipfsHash');


        this.setState({ loggin: true })


    }




    render() {
        let takebell="iconbell";
        if(this.state.makered)
        {
            takebell="iconred";

        }
        let sidebar;
        let showflex = 'setflex';
        if (this.state.showdrawer) {
            sidebar = < Drawer click = { 'setAlign' }
            />;
            showflex = 'setflexx';

        } else {

            sidebar = < Drawer click = { 'setAlig' }
            />;

        }
        console.log("property", this.props.location);

        console.log("Emailil", localStorage.getItem("Name"));


        console.log("Email aya", this.state.Email);

        console.log(this.props);
        if (this.state.loggin) {
            return <Route path = "/"
            component = { App }
            />

        }

        return ( 
        <Router history = { history } >


            <React.Fragment >

            < Switch >

            < Route exact path = "/"
            component = { App }
            />



            </Switch> 
            <Container >

            < Navbar fixed = "top" collapseOnSelect expand = "xxl" >

            < Button bsPrefix = "chkbtn" position = "fixed" onClick = { this.drawerclickhand } > < TiThMenu className = "iconsy" / > </Button>
               
               
        <a style={{color: 'white',cursor:'pointer'}} onClick={this.FetchNotification} className="makenote offset-md-9 offset-3"><AiOutlineBell className={takebell} /><sup>{this.state.notificationLength}</sup>Notification</a>
        <span style={{color:'white'}}> |  </span> 

            <div class="dropdown">
  <button class="dropbtnnn">Welcome { this.state.Named }<GoChevronDown style={{color: 'white'}} /></button>
  <div class="dropdown-content">
    <a href="#">Link 1</a>
    <a href="#">Link 2</a>
    <a onClick = { this.runLogout } style={{color: 'black', cursor:'pointer'}} >Logout</a>
  </div>
</div>
            



            </Navbar>   </Container>


    
            { sidebar }

            <div className = { showflex } >
            <Container className = "makeDiv" >



            <Row >
            <Col md = { 4 } >

            <Card style = {
                { width: '15rem' } } >
            <Card.Img variant = "top"
            src = { Isi }
            style = {
                { height: '10rem' } }
            /> <Card.Body >

            <Card.Text >
            Connected Users { this.state.Count } </Card.Text>

            </Card.Body> </Card >  </Col>

            <
            Col md = { 4 } > < Card style = {
                { width: '15rem' } } >

            <
            iframe width = "240"
            height = "160"
            src = "http://www.youtube.com/embed/_BIsffqaW1M"
            allowFullScreen = "true"
            webkitallowfullscreen = "true"
            mozallowfullscreen = "true" >
            </iframe>

            <Card.Body >

            <Card.Text >
            What is BlockChain ?
            </Card.Text>

            </Card.Body> 
            </Card>
            </Col >

            <
            Col md = { 4 } > < Card style = {
                { width: '15rem' } } >
            <
            Card.Img variant = "top"
            src = { Bl }
            style = {
                { height: '10rem' } }
            /> < Card.Body >

            <Card.Text >
            How it Works!
            </Card.Text>

            </Card.Body> </Card></Col >

            </Row>


            555

           
            
            <ViewLand />
            {/* <BuyLand />

            <RegistrationOnBlockchain /> */}
            </Container>

            
            </div>






     




            </React.Fragment> </Router>

        );
    }


}

export default dashboard;