import React, { useEffect, useState, useRef } from 'react';

const Measurement = () => {
    const [isBelow, setIsBelow] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsBelow(!entry.isIntersecting);
            },
            { threshold: 0.5 } // Trigger when half of the "measurement" section is visible
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);
    return (
        <div id="measurement">
            <h2 className="text-2xl font-bold">Measurement</h2>
            <section id="temperature" className="py-8">
                <h2>Temperature</h2>
            </section>

            {/* Humidity component */}
            <section id="humidity" className="py-8">
                <h2>Humidity</h2>
            </section>

            {/* Windspeed Component */}
            <section id="windspeed" className="py-8">
                <h2>Windspeed</h2>
            </section>
            <div className=''>
                <a href={isBelow ? "#measurement" : "#"} className="fixed bottom-4 right-4 bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="transform transition-transform duration-200 h-6 w-6" style={{ transform: isBelow ? 'rotate(90deg)' : 'rotate(270deg)' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </a>
            </div>
        </div>

    )
}

export default Measurement