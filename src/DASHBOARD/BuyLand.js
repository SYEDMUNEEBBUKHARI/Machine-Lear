import React from 'react';
import LandAbi from "../LandAbi";
import web3 from "../web3";
import "./BuyLand.css"
import {GiIsland} from "react-icons/gi";

class BuyLand extends React.Component{
    state={
        Account: "",
      
        itemlist: "",
        dataa:""
    }
    async componentDidMount(){

        await window.ethereum.enable();
       var Acc= await web3.eth.getAccounts();
       console.log("ACC", Acc);
    this.setState({Account: Acc});
    const data=await LandAbi.methods.viewforsale().call({from: Acc[0]});
    console.log("dtatata",data);
this.setState({dataa: data});
console.log("dataa",this.state.dataa)

}
async makesaleable(data){
     await LandAbi.methods.makeSaleable(data.item).call();
    console.log("dtatata",data);
}
render(){
    this.state.count=1;
    return(

        <div  className="text leappadding">
       <span > Your MetaMask Id: </span>   <span style={{color: "orange"}}>{this.state.Account}</span>
            <br></br>
            <br></br>
            <br></br>
            <ul>

                <h2 className="text5">Lands for Sale< GiIsland  /></h2>
                   <div>{this.state.dataa}</div>


        </ul>

           

            

        </div>
    );
    }

}
export default BuyLand;