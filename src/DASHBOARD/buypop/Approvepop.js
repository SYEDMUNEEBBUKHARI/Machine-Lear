import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { Modal, Button, Col, Form } from "react-bootstrap";
import socketIOClient from "socket.io-client";

import { MdPerson } from "react-icons/md";
import web3 from "../../web3";
import LandAbi from "../../LandAbi";
import axios from "axios";
class Approvepop extends Component {
  SubmitDataapprove = this.SubmitDataapprove.bind(this);

  async componentDidMount() {
    await window.ethereum.enable();
    var Acc = await web3.eth.getAccounts();
    this.setState({ Account: Acc[0] });
    // var sanaa= await LandAbi.methods.checkAdminsdetail(this.props.click2).call({from: Acc[0]});
    // console.log("sanaa",sanaa);
    // await this.setState({admindetail: sanaa});
  }

  state = {
    showsidedraw: false,
    showsign: false,
    showRegister: false,
    showco: true,
    password: null,
    showcomponent: false,
    endpoint: "http://127.0.0.1:5000",
    buffer: "",
    shown: false,
    Landid: "",

    flag: false,
    Account: "",
  };

  updateLandid = (e) => {
    e.preventDefault();
    const { Landid, value } = e.target;
    console.log("Landid", Landid);
    console.log("value", value);
    this.setState({ Landid: e.target.value });
  };

  handleRegClose = () => this.setState({ showco: false });

  async SubmitDataapprove(e) {
    e.preventDefault();

    console.log("Account", this.state.Account);

    await window.ethereum.enable();
    var Acc = await web3.eth.getAccounts();

    const socket = socketIOClient(this.state.endpoint);

    const transaction = await LandAbi.methods
      .makeApproved(this.state.Landid, this.props.click2)
      .send({
        from: Acc[0],
      });
    if (!transaction) {
      console.log("Transaction Faild!!!");
    } else {
      console.log("Transaction succesful");
      this.setState({ red: true });
      socket.emit("Approved", [
        {
          approvedUser: this.props.click2,
          whoapprove: Acc[0],
          Landid: this.state.Landid,
          time: new Date(),
        },
      ]);

      socket.on("SendApprovedata", (data) => {
        console.log("SendApproverdata", data);
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        <Modal show={this.state.showco} className="setLogin">
          <Modal.Header bsPrefix="modal-header " className="d-block">
            <Modal.Title>
              <MdPerson className="signup2" /> Approve Buyer
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.SubmitDataapprove}>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>Land-ID: </Form.Label>
                  <Form.Control
                    value={this.state.Landid}
                    onChange={this.updateLandid.bind(this)}
                    placeholder="Enter Land-Id"
                  />
                </Form.Group>
              </Form.Row>

              <Button variant="primary" className="chkbtn" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                this.props.click();
                this.props.click3();
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

export default Approvepop;
