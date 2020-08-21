import React, { Component } from 'react'
import "./Npti.css";
import { IoMdCloseCircleOutline } from "react-icons/io";
import web3 from "../../web3";
import { FiCopy } from "react-icons/fi"
export default class NotiDisplay extends Component {

    async componentDidMount() {
        const account = await web3.eth.getAccounts();
        await this.setState({ Account: account[0] });
        this.setState({ da: this.props.data });
        console.log("Acoount no", this.state.Account);

    }

    state = {
        Account: "",
        copid: ""
    }


    LandFunction = (da) => {

        this.setState({ copid: da });

        console.log("counti", da);
        var out = document.getElementById(da);

        out.select();
        document.execCommand("copy");



    }
    render() {

        return (
            <div className="note">
                <IoMdCloseCircleOutline onClick={this.props.close} className="close" />

                <br></br>
                <div>




                    <h5 className="Not">Notifications <hr></hr></h5>
                    <div className="notelist">          {this.props.data.map(item => (item.ToUser === this.state.Account ? <div className="notelistt container">You can Buy Land <input value={item.LandId} name="id" id={item.LandId} style={{ MozBorderRadius: '5px' }} /> <button onClick={() => { this.LandFunction(item.LandId) }}> <FiCopy style={{ color: 'white' }} /></button> </div> : ""))}


                    </div>
                </div>
            </div>
        )
    }
}
