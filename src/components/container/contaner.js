import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'

import {Container, Jumbotron as Jumbo,  Image  } from 'react-bootstrap';

import Climage2 from '../../assets/1349937.svg';

import '../../../node_modules/font-awesome/css/font-awesome.min.css';
import '../container/container.css'



function Cont(){
return(
    
        <Jumbo  className="jumbo ">
       <h1 className="fonto offset-1"> Secure <span className="sapn1">Your </span> <span className="spland">Lands</span><span>   </span></h1>
       
       <p className="subtitle12 " > Land Ownership Through BlockChain </p>

       <Image src={Climage2} className="offset-3 " width= '102px' height='auto'/>
       
<Container className="remove-opacity">
   
   <div className="mouse">
				<a href="#" className="mouse-icon">
					<div className="mouse-wheel"><span className="ion-ios-arrow-round-down"></span></div>
                   
                </a>
			</div>
</Container>

    
</Jumbo>



);
}

export default Cont;