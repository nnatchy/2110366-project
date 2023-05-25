import React, { useState, useEffect } from "react"

type Props = {
    lastUpdateTime: Date;
};

const Time: React.FC<Props> = ({ lastUpdateTime }) => {
    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="container ml-10">
            <div id="currentTime" className="text-3xl">
                <div className="flex font-poppins text-blue-700">
                    <span className="w-80 font-bold">Current Time:</span>
                    <span className="text-blue-800">{currentDateTime.toLocaleDateString()} {currentDateTime.toLocaleTimeString()}</span>
                </div>
            </div>
            <div id="updatedTime" className="text-3xl mt-4">
                <div className="flex font-poppins text-blue-700">
                    <span className="w-80 font-bold">Last Updated Time:</span>
                    <span className="text-blue-800">{lastUpdateTime.toLocaleDateString()} {lastUpdateTime.toLocaleTimeString()}</span>
                </div>
            </div>
        </div>
    )
}

export default Time;
