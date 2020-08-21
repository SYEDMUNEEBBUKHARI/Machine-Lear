import React from 'react';
import LandAbi from "../../LandAbi";
import web3 from "../../web3";

import { GiIsland } from "react-icons/gi";
import socketIOClient from "socket.io-client";
import axios from "axios";
import { MdPerson } from "react-icons/md";

import { Button, Form, Col, Modal, Row } from "react-bootstrap";

class Whoowns extends React.Component {

    checkwhoowns = this.checkwhoowns.bind(this);

    state = {

        adress: "",
        showsign: true,
        totalowners: []

    }

    async componentDidMount() {


        await window.ethereum.enable();
        var Acc = await web3.eth.getAccounts();
        console.log("ACC", Acc);
        this.setState({ Account: Acc });


    }


    updateadress = (e) => {
        e.preventDefault();
        const { adress, value } = e.target;
        console.log('adress', adress);
        console.log('value', value);
        this.setState({ adress: e.target.value });
    }

    async checkwhoowns(e) {
        e.preventDefault();

        var Acc = await web3.eth.getAccounts();
        const WhooOwns = await LandAbi.methods.WhoOwns(this.state.adress).call({ from: Acc[0] });

        console.log("WhoOownsss", WhooOwns);

        this.setState({ totalowners: WhooOwns });
    };


















    render() {

        let count = 0;
        this.state.count = 1;
        return (
            <React.Fragment>
                <Modal show={this.state.showsign} className=" setLogin" >
                    <Modal.Header bsPrefix="modal-header" className="d-block">
                        <Modal.Title><MdPerson className="signup2" /> Who Owns</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>



                        <div className="text leappadding">

                            <ul>

                                <h2 className="text5" style={{ color: '#0EAD69' }}>Check Who Owns< GiIsland /></h2>

                                <div className="container">
                                    <Form onSubmit={this.checkwhoowns}>
                                        <Form.Row>
                                            <Form.Group as={Col} controlId="formGridEmail">
                                                <Form.Label>Address</Form.Label>
                                                <Form.Control placeholder="Enter Land Code" name="LandCode" onChange={this.updateadress} value={this.state.adress} />
                                            </Form.Group>





                                        </Form.Row>





                                        <Button style={{ backgroundColor: "#0EAD69" }} type="submit">
                                            Submit
  </Button>
                                    </Form>
                                </div>





                            </ul>







                        </div>
                        <ul>

                            {

                                this.state.totalowners.map(item => (
                                    <li style={{ color: 'black' }}>{count++}&nbsp;{item}</li>

                                ))
                            }
                        </ul>
                        {/* <ul className="colorback" >
                                    <span style={{ color: 'black' }}>  {msg}</span>

                                    {
                                        this.state.buyerdata.map(item => (

                                            <li style={{ color: "#0EAD69 " }}>  &nbsp;
                                                {console.log("te", item)}
          &nbsp;

        MetaId: <input value={item} name="id" id={item} style={{ MozBorderRadius: '5px' }} />
                                                <button onClick={() => { this.LandFunction(item) }}><FiCopy style={{ color: 'white' }} /></button>
        &nbsp; {(this.state.copid == item) ? copi : null}
                                                <button onClick={() => { this.Approve(item) }}><FiCopy style={{ color: 'white' }} /><FaCheck />Approve</button>
                                            </li>





                                        )




                                        )

                                    }
                                </ul> */}



                    </Modal.Body>
                    <Modal.Footer>

                        <Button variant="secondary" className="chkbtn" onClick={this.props.close()}>
                            Close
           </Button>


                    </Modal.Footer>
                </Modal>
            </React.Fragment>


        );
    }

}
export default Whoowns;