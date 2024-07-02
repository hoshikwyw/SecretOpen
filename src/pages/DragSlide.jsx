import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import "../styles/DragPage.css";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

const DragSlide = () => {
    const [clickedYes, setClickedYes] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [noPosition, setNoPosition] = useState({ left: 52, top: 78 });
    const [moveCount, setMoveCount] = useState(0);
    const [dragged, setDragged] = useState(false);
    const [vdEnd, setVdEnd] = useState(false)
    const imageRef = useRef(null);
    const dragContainerRef = useRef(null);


    useEffect(() => {
        if (imageRef.current && dragContainerRef.current) {
            Draggable.create(imageRef.current, {
                type: "x",
                bounds: dragContainerRef.current,
                inertia: true,
                onDragEnd() {
                    const draggableBounds = this.target.getBoundingClientRect();
                    const containerBounds = dragContainerRef.current.getBoundingClientRect();
                    if (draggableBounds.right >= containerBounds.right - 30) {
                        setDragged(true);
                    } else {
                        setDragged(false);
                    }
                }
            });
        }
    }, [clickedYes]);

    const createTextSpans = (text) => {
        return text.split('').map((char, index) => (
            <span key={index} className="textItem" style={{ '--i': index + 1 }}>{char}</span>
        ));
    };

    const handleHover = () => {
        const newX = Math.random() * 90;
        const newY = Math.random() * 85;
        setNoPosition({ left: newX, top: newY });
        setMoveCount(prevCount => prevCount + 1);
        setHovered(!hovered);
    };

    const handleTouchStart = () => {
        handleHover();
    };

    const getImageSrc = () => {
        if (moveCount < 10) {
            return "/gifs/beMine.jpg";
        } else if (moveCount < 20) {
            return "/gifs/waiting.gif";
        } else if (moveCount < 36) {
            return "/gifs/wait2.gif";
        } else if (moveCount < 50) {
            return "/sadGifs/nono.gif";
        } else if (moveCount < 66) {
            return "/sadGifs/cry.gif";
        } else if (moveCount < 70) {
            return "/sadGifs/cry2.gif";
        } else {
            return "/sadGifs/mad.gif";
        }
    };

    const getText = () => {
        if (moveCount < 10) {
            return "Please say Yes  ";
        } else if (moveCount < 20) {
            return "Are you sure you don't want to be mine?";
        } else if (moveCount < 36) {
            return "Okay, I get it. But think again!";
        } else if (moveCount < 50) {
            return "No no no please don't pick no";
        } else if (moveCount < 66) {
            return "I'm gonna cry now";
        } else if (moveCount < 70) {
            return "Why? Why? Why?";
        } else {
            return "Now you can't reject me anymore!";
        }
    };

    const handleVideoEnd = () => {
        setVdEnd(true);
    };

    return (
        <div className=' w-screen h-screen overflow-hidden relative bg-black'>
            {!clickedYes && (
                <div className="flex flex-col justify-center items-center">
                    <div className="textArea font-semibold text-3xl mt-20 invisible md:visible lg:visible">
                        {createTextSpans("I wanna tell you something. I really like you. Can you be mine?")}
                    </div>
                    <div className="my-14 w-60 h-60">
                        <img src={getImageSrc()} alt="" className='main-img rounded-md' />
                    </div>
                    <p className='flex items-center gap-2 font-semibold mb-10 text-xl'>{getText()}</p>
                    <div className="">
                        <button className={`random-button border-2 me-10 ${moveCount >= 70 ? 'w-[10%]' : ''} absolute left-[30%] top-[78%] md:left-[45%] md:top-[60%] lg:left-[45%] lg:top-[78%]`} onClick={() => setClickedYes(true)}>
                            Yes
                        </button>
                        <button
                            className={`random-button ${hovered ? 'hovered' : ''} border-2 ${moveCount >= 70 ? 'hidden' : ''}`}
                            style={{ left: `${noPosition.left}%`, top: `${noPosition.top}%` }}
                            onMouseEnter={handleHover}
                            onMouseLeave={handleHover}
                            onTouchStart={handleTouchStart}
                            onTouchEnd={handleTouchStart}>
                            No
                        </button>
                    </div>
                </div>
            )}
            {clickedYes && (
                <div className=" min-w-screen min-h-screen flex justify-center items-center">
                    <div className=' w-full h-full'>
                        {!dragged && (
                            <div className='flex items-center'>
                                <div ref={dragContainerRef} className="dragContainer w-[65%] h-[100px]">
                                    <img ref={imageRef} src="/water.png" alt="" className='w-24' draggable='false' />
                                </div>
                                <img src="/fire.png" alt="" className='w-24 -ms-9 mt-14' draggable='false' />
                                <p className=' fixed top-2 font-mono font-semibold text-xl left-2'>Drag the water to the fire....</p>
                            </div>
                        )}
                        {dragged && (
                            <div className=" flex items-center justify-center w-full h-full">
                                {!vdEnd && (
                                    <>
                                        <video className=' w-[70%]' autoPlay onEnded={handleVideoEnd} controls>
                                            <source src='/0702.mp4' type='video/mp4' />
                                        </video>
                                        <h2 className='text-animation absolute font-bold z-50 text-3xl top-[45%] left-[40%] text-orange-500 font-mono'>Enjoy the show my dear!!</h2>
                                    </>
                                )}
                                {vdEnd && (
                                    <div className=" w-full h-full flex flex-col justify-center items-center">
                                        <p className=' font-semibold font-mono text-xl text-green-400 uppercase'>Go Home</p>
                                        <p>go back to the start page</p>
                                    </div>
                                )}
                            </div>

                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DragSlide;
