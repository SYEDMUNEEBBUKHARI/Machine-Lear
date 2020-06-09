import React,{useState} from 'react';
import ReactMapGl,{Marker} from "react-map-gl";
import "../ViewMap.css";
import { GoLocation} from "react-icons/go";
export default function ShowMap(){
    const [viewport, setviewport]=useState({
latitude:30.3753,
longitude:69.3451,
width:"40vw",
height:"50vh",
zoom:10
    });
    return(
<div>
    <h3 style={{textAlign:'center',fontFamily:"Roboto-condensed"}}>Geographic Location</h3>
<ReactMapGl  {...viewport} mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN} mapStyle="mapbox://styles/chris906/ckabws8gc1muw1ipry8b5y2dn"  onViewportChange={viewport=>{setviewport(viewport)}} >

<Marker key={'region.9883099804094110'} latitude={30.3753} longitude={69.3451}>
        <button className="iconmap"  ><GoLocation className="iconcolor" /></button>
        </Marker>
</ReactMapGl>
 hiiii

</div>
 


    );

}