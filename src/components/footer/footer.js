
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import styled from 'styled-components'
import {Modal,Container} from 'react-bootstrap'

const Style=styled.div`
.high{
    background-color:Black;
    color: white;
}

`
export default function Footer(){

return(
    <Style>
<Container fluid={true} className="high">
    <Modal.Footer className="justify-content-center">

        <p >LandOwnerShip313@yahoomail.com</p>
    </Modal.Footer>
</Container>
</Style>

);


} 