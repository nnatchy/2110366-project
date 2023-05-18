import React, { useState, useEffect } from "React"

const Time = () => {
    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    const [updatedDateTime, setUpdatedDateTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Push button in 411 to update information ?
    useEffect(() => {
        const second = 1000;
        const minute = second * 60;
        const updatedDateTime = setInterval(() => {
            setUpdatedDateTime(new Date());
        }, minute * 30);
        return () => {
            clearInterval(updatedDateTime);
        }
    }, []) // updated value every 30 minutes (will change later)

    return (
        <div className="container ml-6 py-4 ml-10">
            <div id="currentTime" className="text-3xl">
                <div className="flex font-poppins text-blue-700">
                    <span className="w-80 font-bold">Current Time:</span>
                    <span className="text-blue-800">{currentDateTime.toLocaleDateString()} {currentDateTime.toLocaleTimeString()}</span>
                </div>
            </div>
            <div id="updatedTime" className="text-3xl mt-4">
                <div className="flex font-poppins text-blue-700">
                    <span className="w-80 font-bold">Last Updated Time:</span>
                    <span className="text-blue-800">{updatedDateTime.toLocaleDateString()} {updatedDateTime.toLocaleTimeString()}</span>
                </div>
            </div>
        </div>
    )
}

export default Time;