import React,{Component,useState} from "react";

import {Button,Modal} from "react-bootstrap"
function Example() {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  


    

    const apicall=()=>{

      const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
     
      console.log(response);
    }


    



    return (
      <React.Fragment>
        <Button variant="primary" onClick={handleShow}>
          Launch demo modal
        </Button>
  
        <Modal show={show} onHide={handleClose} >
          <Modal.Header closeButton>
            <Modal.Title>Register</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={apicall}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        </React.Fragment>
    );
  }
  
  export default Example;