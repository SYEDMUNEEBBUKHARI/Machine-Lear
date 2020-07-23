import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { Modal, Button, Col, Form } from "react-bootstrap";
import socketIOClient from "socket.io-client";

import { MdPerson } from "react-icons/md";

class Errorpop extends Component {
  componentDidMount() {
    console.log("error callllllll");
  }

  state = {
    showco: true,
  };

  render() {
    return (
      <React.Fragment>
        <Modal show={true} className="setLogin">
          <Modal.Header bsPrefix="modal-header " className="d-block">
            <Modal.Title>
              <MdPerson className="signup2" /> Message Box
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <span style={{ color: "red" }}>Your MetaId is not valid</span>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                this.props.Closepop();
              }}
              className="chkbtn"
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

export default Errorpop;
