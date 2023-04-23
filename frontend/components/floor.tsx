import React from "react";
import Info from "./info"

const Floor = ({floorNumber, gender}: any) => {
    return (
        <div className="w-full bg-blue-500">
            <div>
                <h1>{floorNumber} && {gender} </h1>
                <Info/>
            </div>
            
        </div>
    )
}

export default Floor;