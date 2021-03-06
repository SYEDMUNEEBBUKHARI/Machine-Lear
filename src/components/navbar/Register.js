import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactDOM from "react-dom";

import { Modal, Button, Col, Form } from "react-bootstrap";

import { MdPerson } from "react-icons/md";
import "../navbar/login.css";
// import ipfs from "ipfs-api";
import ipfs from "../../ipfs";

// import {browserHistory} from "react-router";
import axios from "axios";
class Register extends Component {
  SubmitData5 = this.SubmitData5.bind(this);

  state = {
    showsidedraw: false,
    showsign: false,
    showRegister: false,
    showco: true,
    password: "",
    showcomponent: false,

    buffer: "",
    shown: false,
    Name: "",
    Password: "",
    Email: "",
    Address: "",
    City: "",
    Country: "",
    ipfsHash: "",
    formErrors: {
      password: "",
    },
    flag: false,
    makedis: "",
    makeflag: false,
    messagesucess: false,
    errflag: false,
    datasuccess: false
  };
  componentDidMount() { }
  updateName = (e) => {
    e.preventDefault();
    const { Name, value } = e.target;
    console.log("name", Name);
    console.log("value", value);
    this.setState({ Name: e.target.value });
  };

  updateEmail = (e) => {
    e.preventDefault();
    const { Email, value } = e.target;
    console.log("Email", Email);
    console.log("value", value);
    this.setState({ Email: e.target.value });
  };
  updatePassword = (e) => {
    e.preventDefault();
    const { password, value } = e.target;
    console.log("Password", password);
    console.log("value", value);
    this.setState({ password: e.target.value });
  };
  updateCity = (e) => {
    e.preventDefault();
    const { City, value } = e.target;
    console.log("City", City);
    console.log("value", value);
    this.setState({ City: e.target.value });
  };
  updateCountry = (e) => {
    e.preventDefault();
    const { Country, value } = e.target;
    console.log("Country", Country);
    console.log("value", value);
    this.setState({ Country: e.target.value });
  };

  updateAddress = (e) => {
    e.preventDefault();
    const { Address, value } = e.target;
    console.log("Address", Address);
    console.log("value", value);
    this.setState({ Address: e.target.value });
  };

  handleRegClose = () => this.setState({ showco: false });

  SubmitData5(e) {
    console.log("buffer datatdatdtadtatdtadtatd", this.state.buffer);
    e.preventDefault();
    ReactDOM.findDOMNode(this.messageForm).reset();
    if (
      this.state.City === "" ||
      this.state.Country === "" ||
      this.state.Email === "" ||
      this.state.password === "" ||
      this.state.buffer.length === 0
    ) {
      this.setState({ makeflag: true });
      return "fields can never be empty";
    } else {
      this.setState({ makedis: "on" });
    }
    ipfs.files.add(this.state.buffer, (error, result) => {
      if (error) {
        console.error("error");
      }
      console.log("result", result);

      this.setState({ ipfsHash: result[0].path });

      console.log("this.state.ipfsHash", this.state.ipfsHash);

      console.log(this.state.ipfsHash);

      const finaldata = {
        Name: this.state.Name,
        Email: this.state.Email,
        password: this.state.password,

        City: this.state.City,

        Country: this.state.Country,
        Address: this.state.Address,
        ipfsHash: this.state.ipfsHash,
      };

      axios.post("http://localhost:5000/api/add", finaldata).then((res) => {
        console.log("responsssss", res.data);
        this.setState({ datasuccess: true });
      }).catch((err) => {
        // what now?

        console.log("error", err);

        this.setState({ errflag: true });


      });

      this.setState({
        Name: "",
        password: "",
        Email: "",
        Address: "",
        City: "",
        Country: "",
        ipfsHash: "",
      });
    });
  }

  captureFile = (event) => {
    console.log("Capture File");
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) });
      console.log("buffer will storeee", this.state.buffer);
    };
  };

  render() {
    let message;
    if (this.state.makeflag) {
      message = <span style={{ color: "red" }}>Fields can never be empty</span>;
    }
    if (this.state.errflag) {
      message = <span style={{ color: "red" }}>Error terminate Registration</span>
    }

    if (this.state.datasuccess) {
      message = <span style={{ color: "green" }}>Register Successfully</span>
    }
    return (
      <React.Fragment>
        <Modal show={this.state.showco} onHide={() => this.setState({ showco: false })} className="setLogin">
          <Modal.Header bsPrefix="modal-header " className="d-block">
            <Modal.Title>
              <MdPerson className="signup2" /> Register
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form
              onSubmit={this.SubmitData5}
              id="myForm"
              className="form"
              ref={(form) => (this.messageForm = form)}
            >
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    value={this.state.Name}
                    onChange={this.updateName.bind(this)}
                    placeholder="Enter email"
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type="file"
                    placeholder="Image"
                    onChange={this.captureFile}
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={this.state.Email}
                    onChange={this.updateEmail.bind(this)}
                    placeholder="Enter email"
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={this.state.password}
                    onChange={this.updatePassword.bind(this)}
                    placeholder="Password"
                  />
                </Form.Group>
              </Form.Row>

              <Form.Group as={Col} controlId="formGridAddress1">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  value={this.state.Address}
                  onChange={this.updateAddress.bind(this)}
                  placeholder="1234 Main St"
                />
              </Form.Group>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridCountry">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    placeholder=""
                    value={this.state.Country}
                    onChange={this.updateCountry.bind(this)}
                  />
                </Form.Group>
                <Form.Group controlId="formGridCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    value={this.state.City}
                    onChange={this.updateCity.bind(this)}
                    placeholder=""
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                {" "}
                <span>{message}</span>
              </Form.Row>
              <Button
                variant="primary"
                className="chkbtn"
                type="submit"
                disabled={this.state.makedis}
              >
                Submit
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={this.props.click}
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

export default Register;
