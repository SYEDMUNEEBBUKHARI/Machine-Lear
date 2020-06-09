import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import styled from 'styled-components'
import {  Row , Col,  Jumbotron } from 'react-bootstrap';

import '../../../node_modules/font-awesome/css/font-awesome.min.css';

import {FaStamp ,FaFileContract} from 'react-icons/fa';

import {MdVerifiedUser} from 'react-icons/md'
 import {GiHouseKeys} from 'react-icons/gi'



const Style = styled.div`
.alertt{

    background-color: bg-light;
}
.adjust{
    height:100px;
}
.mre{
    margin-top: 50px
}
.lor{
    color: #0EAD69;
}
i.fa {
    display: inline-block;
    border-radius: 0px;
    box-shadow: 0px 0px 5px #0EAD69;
    padding: 25px 25px;
    background-color:white
  
  }
  p {
    text-align:left;
  }
  .reacticons{
    display: inline-block;
    border-radius: 0px;
    box-shadow: 0px 0px 5px #0EAD69;
    padding: 25px 25px;
    background-color:white
  }
    .martop{
        margin-top:15px;
    }
`
function Io(){
return(
    <Style >
        <Jumbotron className="bg-light !important ">
       <h1 className="text-center" id="turn">Services</h1>

   <Row noGutters={true} className="mre">
 <Col className="text-center"  md={4} lg={4} sm={12} >
 
 <i className="fa fa-shield  fa-5x lor" aria-hidden="true"></i>
 <h5 className="text-center martop">Security</h5>
 <p className="justify-content">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries</p>

 </Col>
 <Col  className="text-center" md={4} lg={4}  sm={12}>
 
 <i className="fa fa-cubes fa-5x lor" aria-hidden="true"></i>
 <h5 className="text-center martop">BlockChain</h5>
 <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries</p>

 </Col>

 <Col className="text-center" md={4} lg={4} sm={12}>
 <span className="reacticons">
 <FaStamp className=" lor fa-5x  "  />
 </span>
 <h5 className="text-center martop">POW</h5>
 <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries</p>

 </Col>


   </Row>



   <Row noGutters={true} className="mre">
 <Col className="text-center" md={4} lg={4} sm={12}>
 <span className="reacticons">       
 <FaFileContract className="  fa-5x lor" />
 </span>
 <h5 className="text-center martop">Smart Contracts</h5>
 <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries</p>
 
 </Col>
 <Col  className="text-center" md={4} lg={4} sm={12}>
 <span className="reacticons">   
 <GiHouseKeys className="fa fa-cubes fa-5x lor" />
 </span>
 <h5 className="text-center martop">Ownerships</h5>
 <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries</p>
 </Col>

 <Col className="text-center" md={4} lg={4} sm={12}>
 <span className="reacticons">
 <MdVerifiedUser className=" lor fa-5x  "  />
 </span>
 <h5 className="text-center martop">POE</h5>
 <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries</p>

 </Col>


   </Row>

    
</Jumbotron>

</Style>

);
}

export default Io;