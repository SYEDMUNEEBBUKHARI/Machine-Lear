import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";

import { MdPerson } from "react-icons/md";
import Register from "./Register";

import { browserHistory } from "react-router";

import { Router, Redirect } from "react-router-dom";
import Errorpop from "./errpop";

// import "../navbar/login.css"
const formvalid = (formErrors) => {
  let valid = true;

  Object.values(formErrors).forEach((val) => val.length > 0 && (valid = false));

  return valid;
};

class Login extends Component {
  SubmitData55 = this.SubmitData55.bind(this);

  state = {
    showsidedraw: false,
    showsign: true,
    showRegister: false,
    LoggedIn: false,
    Password: null,
    Name: "",
    ipfsHash: "",
    Emaili: "9",
    ipfsHashi: "",
    Namei: "",
    makedis: "",
    Email: "",
    password: "",
    uName: "",
    uIpfs: "",
    uEmail: "",
    emailflag: false,

    formErrors: {
      password: "",
    },
    showemerr: false,
    flag: false,
    chktoken: true,
    handleRegisterstate: false,
    errornotfound: "",
    errflag: false,
  };
  componentDidMount() {
    this.setState({ Email: "" });
    this.setState({ password: "" });
    this.setState({ makedis: true });
  }
  updateEmail = (e) => {
    e.preventDefault();

    const { Email, value } = e.target;
    console.log("Email", Email);
    console.log("value", value);
    this.setState({ Email: e.target.value });
  };

  // handleClose = () => setShow(false);
  //  handleShow = () => setShow(true);

  // handleRegister=()=> this.setState({showRegister: true,
  //     showsign: false});

  handelsubmit = (event) => {
    event.preventDefault();

    if (formvalid(this.state.formErrors)) {
      console.log(`
      --submitting--
      
      Password: ${this.state.password}
      
      
      `);
    } else {
      console.error("Form invalid");
    }
  };

  handelchange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = this.state.formErrors;
    console.log("name", name);
    console.log("value", value);

    switch (name) {
      case "password":
        if (value.length >= 0 && value.length < 5) {
          formErrors.password = "must be more than 5";

          this.setState({ flag: false });
          this.setState({ makedis: true });
        } else {
          `${(this.state.flag = true)}
            
            ${(this.state.formErrors.password = "")}
            
            `;
          this.setState({ password: e.target.value });
          this.setState({ makedis: false });
        }
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => {
      console.log("state chaangeeee", this.state.formErrors);
    });

    //   const{password, value}=e.target;
    //   console.log('Password', password);
    // console.log('value', value);
  };

  handleClose = () => this.setState({ showsign: false });
  handleHide = () => this.setState({ showsign: false });
  handleRegister = () => {
    browserHistory.push("/Register");
    this.setState({
      handleRegisterstate: true,
      showsign: false,
    });
  };

  SubmitData55(e) {
    e.preventDefault();

    // console.log("Email is settt", this.state.Email);
    if (this.state.Email.length === 0) {
      this.setState({ showemerr: true });
      return "error";
    }
    const finaldata = {
      password: this.state.password,

      Email: this.state.Email,
    };

    // var that=this;

    console.log("calling api");
    const token = axios
      .post("http://localhost:5000/api/login", finaldata)

      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("ipfsHash", res.data.ipfsHash);
        localStorage.setItem("Email", res.data.Email);
        localStorage.setItem("Name", res.data.Name);
        localStorage.setItem("Count", res.data.Count);
        this.setState({ LoggedIn: true });
      }).catch((err) => {
        // what now?

        console.log("error", err.response.data);

        this.setState({ errflag: true });


      });



    console.log("that", this.state.Emaili);

    console.log("tokeeennnnn", token);
    // localStorage.setItem("token", token);
  }
  close = () => {
    this.setState({ errflag: false });
  };

  render() {


    console.log("Hi");
    let emptymsg;
    if (this.state.showemerr) {
      emptymsg = (
        <span style={{ color: "red" }}>Email field can never be empty</span>
      );
      let makedis = this.state.makedis;
    }
    let chkdata;
    if (this.state.errflag) {
      chkdata = <span style={{ color: "red" }}>Email or password is not correct</span>
    }

    if (this.state.LoggedIn) {
      console.log("bye");

      // this.setState({

      //   password:"",
      //   Email: ""
      // ,showsign:false

      // });

      console.log("nameeeeeeeeeeeeeeeeeeee");

      return <Redirect to="/dashboard" />;
    }

    let takeComp;

    if (this.state.handleRegisterstate) {
      takeComp = <Register click={this.props.click} />;
    }

    return (
      <React.Fragment>
        <span style={{ backgroundColor: 'black' }}>{this.state.errornotfound}</span>
        <Modal
          show={this.state.showsign}
          onHide={() => this.setState({ showsign: false })}
          className=" setLogin"
        >

          <Modal.Header bsPrefix="modal-header" className="d-block">
            <Modal.Title>
              <MdPerson className="signup2" /> Sign-in
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form
              onSubmit={this.SubmitData55}
              handlehide={this.state.handleHide}
            >
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={this.state.Email}
                  onChange={this.updateEmail.bind(this)}
                  autoComplete="off"
                />
                {emptymsg}

                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  onChange={this.handelchange}
                  value={this.state.password}
                  placeholder="Password"
                  autoComplete="off"
                />
                {this.state.formErrors.password.length > 0 && (
                  <span className="clralert">
                    {this.state.formErrors.password}
                  </span>
                )}
                {this.state.flag === true && (
                  <span className="MakeGreen">oka</span>
                )}
              </Form.Group>
              <Form.Group>
                {chkdata}
              </Form.Group>

              <Button
                variant="primary"
                className="chkbtn"
                type="submit"
                disabled={this.state.makedis}
              >
                Submit
              </Button>
              <span style={{ color: "red" }}>{this.state.errornotfound}</span>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              className="chkbtn"
              onClick={this.props.click}
            >
              Close
            </Button>

            <Button
              variant="primary"
              className="chkbtn"
              onClick={this.handleRegister}
            >
              Register
            </Button>
          </Modal.Footer>
        </Modal>
        {takeComp}
      </React.Fragment>
    );
  }
}

export default Login;
