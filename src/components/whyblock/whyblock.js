import React from 'react';
 import 'bootstrap/dist/css/bootstrap.css';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.
// import logoo from './logoo.jpg';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import {Col, CardGroup, Card} from 'react-bootstrap';
// import Carousel from 'react-bootstrap/Carousel';
//  import image from './image.jpg';
import Land1 from '../../assets/Land1.png';
import Land2 from '../../assets/land2.jpeg';
import Land3 from '../../assets/land3.jpeg';  
 // './About.js';
import  './whyblock.css';
// const BrowserRouter = require("react-router-dom").BrowserRouter;
// const Route = require("react-router-dom").Route;
// const Link = require("react-router-dom").Link;



// import Contact from './contact';
//  import maps from '/maps'

 

function Whyblock() {
  
  return (
    <div className="background">
      {
        
        /* <header className="App-header">
        <img src={logoo} className="App-logo" alt="logo" /> 
         
       </header> */}
      
      <h1 style={{fontSize:'30px', textAlign:'center'}}>Why BlockChain?</h1>
    
         
       <Row className='mt-5'>
        
    <Col sm={3}> 
    
    
    
    
    
     </Col>
    <Col sm={3}></Col>
  </Row>
  <Row>
    <Col sm={1}></Col> 
    <Col sm={10}>   
    </Col>
     <Col sm={1}></Col>   
  </Row>

   
    <Container>
   
 
  <CardGroup className="mt-sm-3">
    <Card className="overflow ml-sm-2">
      <Card.Img varient="top" src={Land1} className=' card-img-top '/>
      <Card.Body>
        <Card.Title className="float-left">BlockChain</Card.Title><br/><br/>
         <Card.Text> Blockchain technology enables 
           distributed public ledgers that hold immutable data in a
            secure and encrypted way and ensure that transactions can
             never be altered. <a href="https://www.investopedia.com/terms/b/blockchain.asp#what-is-blockchain">continue... </a></Card.Text>
      </Card.Body>
    
  
    </Card>
    <Card className=" overflow ml-sm-2" >
    
      <Card.Img varient="top" src={Land3}  className='card-img-top'/>
      <Card.Body>
        <Card.Title className="float-left">How BlockChain works?</Card.Title><br/><br/>
         <Card.Text> When a block stores new data it is added to the blockchain.
            Blockchain, as its name suggests, consists of multiple blocks strung
             together. In order for <a href="https://www.investopedia.com/terms/b/blockchain.asp#how-blockchain-works"> continue...</a></Card.Text>
      </Card.Body>
  
    </Card>
    <Card className="overflow ml-sm-2"  >
      <Card.Img varient="top" src={ Land2 }  className='card-img-top '/>
      <Card.Body>
        <Card.Title className="float-left">Is BlockChain secure ?</Card.Title><br/><br/>
         <Card.Text> Blockchain technology accounts for the issues 
                         of security and trust in several ways. First, new
                          blocks are always stored linearly and    
                         chronologically.That is, they are al <a href="https://www.investopedia.com/terms/b/blockchain.asp#is-blockchain-secure">continue...</a></Card.Text>
      </Card.Body>
      
  
    </Card>
  </CardGroup>
</Container>
 
 

  
 
   </div>
  );
}
 

export default Whyblock;
  