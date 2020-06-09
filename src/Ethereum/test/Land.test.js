const assert=require('assert');
const ganache = require ("ganache-cli");
const Web3 = require('web3');
const web3= new Web3(ganache.provider());
const{interface, bytecode} = require('../compile.js');
let accounts;
let Land;
require('events').EventEmitter.defaultMaxListeners = 15;
beforeEach( async ()=>{
accounts=await web3.eth.getAccounts();

Land = await new web3.eth.Contract(JSON.parse(interface))

.deploy({data: bytecode })
.send({from: accounts[1], gas: '3000000'});

})


describe('landRegistration', ()=>{

    it('deploys a contract', ()=>{



    })



    it('Registered', async ()=>{

const value=await Land.methods.LandRegistration("67l","67l","village","PAKISTAN").send({from: accounts[1] , gas: '3000000'});
       console.log("valueee", value);
        
            })




            it('View Assets', async ()=>{

                const value=await Land.methods.viewAssets().send({from: accounts[1] , gas: '3000000'});
                console.log("valueee", value);


            })

})