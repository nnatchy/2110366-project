import React from "react";
import Floor from "./floor";

const Main = () => {
    return (
        <div id="main" className="w-full md:h-screen p-2 flex items-center py-8 bg-red-300">
            <div className="max-w-[1240px] m-auto md:grid grid-cols-3 gap-8">
                <div className="col-span-2 text-3xl">
                    <p className="uppercase text-xl tracking-widest text-red-400">TOILET</p>
                    <h2 className="py-4">TOOOO</h2>
                    <p className="py-2 text-grey-500">HELLOO</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                        Quibusdam tenetur laborum aspernatur explicabo repellendus, 
                        error reiciendis ratione atque quaerat sed reprehenderit excepturi
                         id totam sapiente molestiae iure? Minus, necessitatibus ea?
                    </p>
                    <Floor
                        floorNumber='1'
                        gender='male'
                    />
                    <Floor
                        floorNumber='1'
                        gender='female'
                    />
                    <Floor
                        floorNumber='2'
                        gender='male'
                    />
                    <Floor
                        floorNumber='2'
                        gender='female'
                    />
                    <Floor
                        floorNumber='3'
                        gender='male'
                    />
                    <Floor
                        floorNumber='3'
                        gender='female'
                    />
                    <Floor
                        floorNumber='4'
                        gender='male'
                    />
                    <Floor
                        floorNumber='4'
                        gender='female'
                    />
                </div>
            </div>
        </div>
    )
}

export default Main;