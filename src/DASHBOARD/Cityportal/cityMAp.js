import React,{useState} from 'react';
import ReactMapGl,{Marker,Popup} from "react-map-gl";
import { GoLocation} from "react-icons/go";
export default function CityMap(props){
    console.log("props lat",props.lat);
    const [showpop, setshowpop]=useState(false);
    const [viewport, setviewport]=useState({
latitude:props.lat,
longitude:props.lon,
width:"35vw",
height:"50vh",
zoom:10
    });
    const clickcheker=(e)=>{
        e.preventDefault();
        setshowpop(true);

    }
    return(
<div>
{console.log("Logg",props.Landid)}

<ReactMapGl  {...viewport}  mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN} mapStyle="mapbox://styles/chris906/ckabws8gc1muw1ipry8b5y2dn"  onViewportChange={viewport=>{setviewport(viewport)}} >
    <Marker key={props.Landid} latitude={props.lat} longitude={props.lon}>
        <button className="iconmap" onClick={(e)=>{e.preventDefault();
        setshowpop(true);
        }} ><GoLocation className="iconcolor" /></button>
        </Marker>markers
        {setshowpop ?(
         <Popup  latitude={props.lat} longitude={props.lon}>
            hiiiii
         </Popup>
    
        ): false}
</ReactMapGl>
 hiiii

</div>
 


    );

}