pragma solidity >=0.4.25;

pragma experimental ABIEncoderV2;
contract LandOwnership{

   
    
    function superuser() public view returns(uint)
    {
        address admin=0xa2C1ee3dd1ac4b8Ed475396Fd1EF044Bcd25A40A;
       if(admin == msg.sender)
{
    return 1;
}
else
{
    return 0;
}

        
    }
    
    
   
    
   struct individualLandList{
        bytes32[] noOfLand;   
        }
    
    
     mapping(address => individualLandList) profile;
    enum BuyersRequestStatus{empty,UnderCustody,Approved,Rejected}
    
    struct LandDetails{
 address currentOwner;
 string completeaddress;
 string city;
 string country;
 string LandArea;
 bytes32 Landalreadyornot;
 bool LandSaleable;
 bytes32 serialNo;
 bool verifyLand;
 // BuyersRequestStatus BuyersStatus;
mapping(bytes32=> red) ared;
 mapping (address=> bool) applyStatus;
 mapping(address=>BuyersRequestStatus) BuyersStatus;
 mapping(bytes32=>address[])willingaddresses;
    }
    
 struct red{
      mapping(address=> bool) willingClient;
 }
    mapping(bytes32=> uint) whtidis;
    
    uint  nonce=1;
mapping(bytes32=> LandDetails) Land;
mapping(bytes32=>bool) serialNoverification;
uint count=0;

mapping(string=>bytes32[]) companycontainLanid;

    function LandRegistration (string memory completeaddress, string memory city,string memory LandArea, address metaid, string memory ipfsh)   public  payable returns(bool ){
    
    require(cityappmeta[msg.sender].cityapp[city]==true,"this is not city's portal id");

    bytes32  d =sha256(abi.encodePacked("0x",completeaddress,metaid,count++));
        require(!(serialNoverification[d]==true),"this serial number already exist");
    require(! (Land[d].Landalreadyornot==d));
    Land[d].currentOwner=metaid;
    Land[d].completeaddress=completeaddress;
    Land[d].LandArea=LandArea;
    Land[d].serialNo=d;
    Land[d].city=city;
    
    companycontainLanid[city].push(d);
    Land[d].Landalreadyornot=d;
    profile[metaid].noOfLand.push(d);
    whtidis[d]=profile[metaid].noOfLand.length-1;
    
    serialNoverification[d]=true;
    
    return true;
    }
    
    function Cityandusers(string memory city) public view returns(bytes32[] memory)
    {
        
        return companycontainLanid[city];
    }
    

    
    function viewAssets()public view returns(bytes32[] memory)
    {
        return (profile[msg.sender].noOfLand);
    }
    
    
    
    
   
    
    function landInfoOwner(bytes32 enterid) public view returns(bytes32,address,string memory,string memory,bool  ){
        
    
        
        return(Land[enterid].serialNo , Land[enterid].currentOwner , Land[enterid].completeaddress,Land[enterid].LandArea , Land[enterid].LandSaleable);
    }

    function LandBuyer(bytes32 enterid) public view returns(address[] memory)
    {
        
    return Land[enterid].willingaddresses[enterid];
    }
     bytes32[] memsale ;
   mapping(bytes32=>uint)saleableid;

    function makeSaleable(bytes32 property)public returns(uint){
      require(Land[property].currentOwner == msg.sender);
        Land[property].LandSaleable=true;
         memsale.push(property);
      uint Landidlength=memsale.length-1;
       saleableid[property]=Landidlength;
       return Landidlength;
    } 
    
    
    function viewforsale() public view returns(bytes32[] memory)
{
    return memsale;
}

function deletesaleable( bytes32 lname) private returns(bool) {
    require(Land[lname].currentOwner==msg.sender);
    uint Landid= saleableid[lname];
    uint idd=memsale.length-1;
    memsale[Landid]= memsale[idd];
    memsale.length--;
    delete saleableid[lname];
    return true;
    
}

function requestToLandOwner(bytes32 id) public {
        
        
        require(Land[id].LandSaleable);
        
        
        
        Land[id].ared[id].willingClient[msg.sender]=true;
        
         Land[id].willingaddresses[id].push(msg.sender);
        
       Land[id].BuyersStatus[msg.sender] = BuyersRequestStatus.UnderCustody; //
        
        
    }
     struct ApproverNote{
        bytes32[] AddLand;
    }
    mapping(address=> ApproverNote) appnotifi;
     mapping(bytes32=> uint) appnotiid;
    
    function makeApproved(bytes32 Landid, address buyer) public returns(bool){
     bool chk= false;
   if(  Land[Landid].currentOwner == msg.sender)
   { 
       chk=true;
       
   }
   require(chk);
       
          
    Land[Landid].BuyersStatus[buyer]= BuyersRequestStatus.Approved;
    appnotifi[buyer].AddLand.push(Landid);
    uint takelength=appnotifi[buyer].AddLand.length-1;
    appnotiid[Landid]=takelength;
 
    delete Land[Landid].ared[Landid];
    delete Land[Landid].willingaddresses[Landid];
    
    return true;
        
    }
    
    
    function Landnotification ()public view returns(bytes32[] memory)
    {
    return appnotifi[msg.sender].AddLand;
    }
    
    
    function BuyLand(bytes32 Landid)public returns(bool){
        require( Land[Landid].BuyersStatus[msg.sender]== BuyersRequestStatus.Approved);
        //removeOwnership
        address previousOwner= Land[Landid].currentOwner;
        Land[Landid].currentOwner=msg.sender;
        uint findid=whtidis[Landid];
        //last property
        bytes32 lastproperty=profile[previousOwner].noOfLand[profile[previousOwner].noOfLand.length-1];
        //last property id
       profile[previousOwner].noOfLand[findid]=profile[previousOwner].noOfLand[profile[previousOwner].noOfLand.length-1];
       whtidis[lastproperty]=findid;
       delete   profile[previousOwner].noOfLand[profile[previousOwner].noOfLand.length-1];
      profile[previousOwner].noOfLand.length--;
        profile[msg.sender].noOfLand.push(Landid);
        Land[Landid].LandSaleable=false;
         bool value=  deletesaleable(Landid);
         uint index=appnotiid[Landid];
          appnotifi[msg.sender].AddLand[index]=appnotifi[msg.sender].AddLand[appnotifi[msg.sender].AddLand.length-1];
          delete appnotiid[Landid];
          delete appnotifi[msg.sender].AddLand[appnotifi[msg.sender].AddLand.length-1];
          appnotifi[msg.sender].AddLand.length--;
          
         return value;
        
    }
    
    
    struct Approverstruct{
        
        string phno;
        string city;
        string email;
        address metaid;
    }
    
    mapping(string => Approverstruct) makeapprover;
    address[] public approverlist;
    mapping(address=>uint)approverid;
   mapping(string=>bool) checkcity;
   mapping(address=>bool) addressstatus;
   struct approverchecker{
       mapping(string=>bool) cityapp;
   }
   mapping(address=>approverchecker) cityappmeta;
   string[] approverCities;
    function registerapprover(string memory phno,string memory city,string memory email,address metaid)public returns(bool){
        
        require(msg.sender==0xa2C1ee3dd1ac4b8Ed475396Fd1EF044Bcd25A40A,"you dont have access");
        require(!(checkcity[city]==true),"city already registered");
        require(!(addressstatus[metaid]==true),"city alreay covered");
     
     makeapprover[city].phno=phno;
     makeapprover[city].city=city;
     makeapprover[city].email=email;
     makeapprover[city].metaid=metaid;
     approverlist.push(metaid);
     uint apid=approverlist.length-1;
     approverid[metaid]=apid;
     checkcity[city]=true;
     addressstatus[metaid]=true;
     cityappmeta[metaid].cityapp[city]=true;
     approverCities.push(city);
     
        return true;
    }
    
  
    
    function approververify(bytes32 Landid) public returns(bool)
    {
        Land[Landid].verifyLand=true;
        require(Land[Landid].verifyLand);
    }
    function viewapprover(string memory city)public view returns(string memory,string memory,string memory,address)
    {
    require(msg.sender==0xa2C1ee3dd1ac4b8Ed475396Fd1EF044Bcd25A40A,"you dont have access");
        return (makeapprover[city].phno,makeapprover[city].city,makeapprover[city].email,makeapprover[city].metaid);
    }
    
    function approverdata()public returns(string[] memory)
    {
        require(msg.sender==0xa2C1ee3dd1ac4b8Ed475396Fd1EF044Bcd25A40A,"you dont have access");
        return approverCities;
    }
    
    function cityLand(string memory city) public view returns(bytes32[] memory)
    {
        return companycontainLanid[city];
    }
    
    function cityverify(address meta,string memory cicity)public returns(uint)
{
    if(cityappmeta[meta].cityapp[cicity]==true)
    {
        return 1;
    }
    else{
        return 0;
    }
    
}
    }






