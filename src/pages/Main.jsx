import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const Main = () => {
    const [name, setName] = useState("");
    const [surName, setSurName] = useState("");
    const [clickNo, setClickNo] = useState(false);

    const generateRandomPosition = () => {
        const top = Math.floor(Math.random() * 100) + 'vh';
        const left = Math.floor(Math.random() * 120) + 'vw';
        return { top, left };
    };

    const generateRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const [whyElements, setWhyElements] = useState(Array.from({ length: 37 }, (_, index) => ({
        id: index,
        position: generateRandomPosition(),
        color: generateRandomColor(),
    })));

    useEffect(() => {
        const interval = setInterval(() => {
            setWhyElements((elements) => elements.map(element => ({
                ...element,
                position: generateRandomPosition(),
            })));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className='w-screen h-screen flex flex-col justify-center items-center overflow-hidden'>
            {!surName && (
                <form onSubmit={(e) => { e.preventDefault(); setSurName(name) }}>
                    <input
                        type="text"
                        placeholder="Enter Your Name"
                        className="input input-bordered input-accent w-full max-w-xs"
                        onChange={(e) => setName(e.target.value)}
                    />
                </form>
            )}
            {surName && (
                <>
                    {!clickNo && (
                        <>
                            <p className=' font-semibold text-3xl tracking-wider text-gray-300 mx-3'>Hello <span className=' font-bold text-blue-400'>{surName}</span> , welcome to my Secret Page.</p>
                            <div className='mt-10'>
                                <p className='font-semibold text-xl tracking-wider'>Do You Wanna Go Next Slide ??</p>
                                <div className="flex justify-center items-center mt-10">
                                    <NavLink to="/textPage" className="btn btn-primary">Yes</NavLink>
                                    <button className='btn btn-primary ml-5' onClick={() => setClickNo(true)}>No</button>
                                </div>
                            </div>
                        </>
                    )}
                    {clickNo && (
                        <div className='relative w-full h-full'>
                            <img src="/sad.gif" alt="" className=' selection:mx-auto brightness-50 absolute top-[25%] left-[10%] md:top-[40%] md:left-[40%] lg:top-[30%] lg:left-[42%]' />
                            {whyElements.map(element => (
                                <span
                                    key={element.id}
                                    style={{
                                        position: 'absolute',
                                        fontSize: '1.1em',
                                        fontWeight: 'bold',
                                        top: element.position.top,
                                        left: element.position.left,
                                        color: element.color,
                                        transition: 'top 7s, left 8s',
                                        zIndex: 4,
                                    }}
                                >
                                    Why??
                                </span>
                            ))}
                            <button className='btn btn-primary ml-5 fixed bottom-[25%] left-[23%] md:bottom-[30%] md:left-[50%] lg:bottom-[25%] lg:left-[45%]' onClick={() => setClickNo(false)}>Choose Again Please !!!</button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Main;
