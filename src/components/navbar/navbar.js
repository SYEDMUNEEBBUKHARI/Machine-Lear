import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { Button, Navbar } from "react-bootstrap";
import { TiThMenu } from "react-icons/ti";
import { MdPerson } from "react-icons/md";

import Backdrop from "../navbar/backdrop";
import Sdraw from "./sidedraw";

import SideMod from "../navbar/signupmod";
import "../navbar/navbar.css";
import axios from "axios";
import ipfs from "../../ipfs";
import Login from "./Login";
import { browserHistory } from "react-router";

const formvalid = (formErrors) => {
  let valid = true;

  Object.values(formErrors).forEach((val) => val.length > 0 && (valid = false));

  return valid;
};

class AlertDismissible extends Component {
  SubmitData5 = this.SubmitData5.bind(this);

  state = {
    showsidedraw: false,
    showsign: false,
    showRegister: false,
    password: null,
    showcomponent: false,
    shown: false,
    Name: "",
    Password: "",
    Email: "",
    Address: "",
    City: "",
    Country: "",
    ipfsHash: "",
    buffer: "",
    formErrors: {
      password: " ",
    },
    flag: false,
  };

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
    const { Password, value } = e.target;
    console.log("Password", Password);
    console.log("value", value);
    this.setState({ Password: e.target.value });
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

  SubmitData5(e) {
    e.preventDefault();
    ipfs.files.add(this.state.buffer, (error, result) => {
      if (error) {
        console.error("error");
      }
      console.log("result", result[0].path);

      this.setState({ ipfsHash: result[0].path });
    });

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

    axios.post("http://localhost:5000/Register/add", finaldata).then((res) => {
      console.log(res.data);
    });

    this.setState({
      Name: " ",
      Password: " ",
      Email: " ",
      Address: " ",
      City: " ",
      Country: " ",
      ipfsHash: " ",
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
      console.log("buffer", this.state.buffer);
    };
  };
  handelchange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let formErrors = this.state.formErrors;
    console.log("name", name);
    console.log("value", value);

    switch (name) {
      case "password":
        if (value.length >= 0 && value.length < 5) {
          formErrors.password = "must be more than 5";

          //change
          this.setState({ flag: false });
        } else {
          `${(this.state.flag = true)}
    
    ${(this.state.formErrors.password = "")}
    
    `;
        }
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => {
      console.log("state chaangeeee", this.state.formErrors);
    });
  };

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

  handleRegister = () => this.setState({ showRegister: true, showsign: false });
  handleRegClose = () => this.setState({ showRegister: false });
  handleClose = () => this.setState({ showsign: false });
  handleShow = () => this.setState({ showsign: true });

  drawerclickhand = () => {
    this.setState((prevstate) => {
      return { showsidedraw: !prevstate.showsidedraw };
    });
  };

  showComponentHandler = () => {
    browserHistory.push("/sign-in");

    this.setState((prevstate) => {
      if (prevstate.showcomponent) {
        return { showcomponent: false };
      } else {
        return { showcomponent: true };
      }
    });
  };

  backdropclick = () => {
    this.setState({ showsidedraw: false });
  };

  sdmd = () => {
    this.setState({ showsign: true });
  };
  makefalse = () => {
    browserHistory.push("/");
    this.setState({ showcomponent: false });
  };
  render() {
    let backdraw;
    if (this.state.showsidedraw) {
      backdraw = <Backdrop click={this.backdropclick} />;
    }

    let logind;
    if (this.state.showcomponent) {
      logind = <Login click={this.makefalse} />;
    }

    let signmodel;
    if (this.state.showsign) {
      signmodel = <SideMod />;
    }
    return (
      <React.Fragment>
        <Navbar fixed="top" collapseOnSelect expand="xxl">
          {backdraw}

          <Button
            bsPrefix="chkbtn"
            position="fixed"
            onClick={this.drawerclickhand}
          >
            <TiThMenu className="iconsy" />
          </Button>
          <Navbar.Collapse id="responsive-navbar-nav"></Navbar.Collapse>

          <Sdraw show={this.state.showsidedraw} />

          <div>
            <Button
              bsPrefix="btnsetting "
              className="btnsetting border border-dark"
              onClick={this.showComponentHandler}
            >
              <MdPerson className="signup" /> Sign-in
            </Button>
          </div>

          {logind}
        </Navbar>
      </React.Fragment>
    );
  }
}

export default AlertDismissible;
