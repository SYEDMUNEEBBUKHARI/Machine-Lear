import React from "react";
import "../navbar/backdrop.css";


const backdrop=props=>(

    <div className="backdrop" onClick={props.click} />
);

export default backdrop;