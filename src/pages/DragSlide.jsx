import interact from 'interactjs';
import React, { useEffect, useRef, useState } from 'react';
import "../styles/DragPage.css"

const DragSlide = () => {
    const position = { x: 0, y: 0 };
    const elementRef = useRef(null);
    const [isInsideDropZone, setIsInsideDropZone] = useState(false);
    const [clickedYes, setClickedYes] = useState(false)
    const [hovered, setHovered] = useState(false)
    const [noPosition, setNoPosition] = useState({ left: 0, top: 0 });

    useEffect(() => {
        const element = elementRef.current;

        if (!element) {
            console.error('Element reference is null.');
            return;
        }

        interact(element).draggable({
            listeners: {
                start(event) {
                    console.log('drag started', event);
                },
                move(event) {
                    position.x += event.dx;
                    position.y += event.dy;
                    element.style.transform = `translate(${position.x}px, ${position.y}px)`;
                },
                end(event) {
                    console.log('drag ended', event);
                },
            },
        });

        interact('.dropzone').dropzone({
            accept: element,
            overlap: 0.75,
            ondragenter: (event) => {
                setIsInsideDropZone(true);
                interact(element).draggable(false);
                console.log('dragenter', event);

            },
            ondragleave: (event) => {
                setIsInsideDropZone(false);
                interact(element).draggable(true);
                // console.log('dragleave', event);
            },
            ondrop: (event) => {
                console.log('drop', event);
            },
        });
    }, []);

    const createTextSpans = (text) => {
        return text.split('').map((char, index) => (
            <span key={index} className="textItem" style={{ '--i': index + 1 }}>{char}</span>
        ))
    }

    const handleHover = () => {
        const newX = Math.random() * (window.innerWidth - 100);
        const newY = Math.random() * (window.innerHeight - 150);
        setNoPosition({ left: newX, top: newY });
        setHovered(!hovered)
    }
    // if(hovered) {
    // }

    return (
        <div className='w-screen h-screen overflow-hidden relative bg-black'>
            {!clickedYes && (
                <div className=" flex flex-col justify-center items-center">
                    <div className="textArea font-semibold text-3xl flex justify-center mt-20">
                        {createTextSpans("I  wanna  tell  you  something  .  I  am  really  like you  .  Can  you  be  mine  ?")}
                    </div>
                    <div className=" my-14 w-60 h-60">
                        <img src="/gifs/beMine.jpg" alt="" className=' rounded-md' />
                    </div>
                    <div className="">
                        <button className=' border-2 w-[50px] h-[50px] ' onClick={() => setClickedYes(true)}>
                            {/* <img src="/character.png" alt="" className='w-32 h-33' /> */}
                            Yes
                        </button>
                        <button className={`random-button ${hovered ? 'hovered' : ''} border-2`} style={{ left: `${noPosition.left}px`, top: `${noPosition.top}px}` }} onMouseEnter={handleHover} onMouseLeave={handleHover}>
                            {/* <img src="/character.png" alt="" className='w-32 h-33' /> */}
                            No
                        </button>
                    </div>
                </div>

            )}
            {clickedYes && (
                <div className=' min-w-screen min-h-screen overflow-hidden relative'>
                    <img src="/character.png" ref={elementRef} className='draggable border-yellow-200 w-32 h-33 z-30 absolute' />
                    <p ref={elementRef} className='draggable border-2 border-yellow-200 w-32 h-33 z-30 absolute'>answer</p>
                    <h1 className="fixed bottom-0 font-semibold tracking-wider text-lg p-2">Drag Dino to the correct place to see my secret!!</h1>
                    <div className="dropzone absolute w-48 h-48 left-[30%] top-[60%] z-10">
                        <img src="/home.png" alt="" className='w-full h-full select-none pointer-events-none' />
                    </div>
                    {isInsideDropZone && (
                        <div className="  bg-gray-100 fixed z-50 left-[20%] top-[20%] w-[60%] h-[60%]">
                            <img src="/rest.gif" alt="" className=' w-full h-full select-none pointer-events-none' />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default DragSlide;

// I wanna tell you something . I am really like you . Can you be mine ?
{/* <span className='textItem' style={{ '--i': 1 }}>I</span>
                <span className='textItem' style={{ '--i': 2 }}>I</span>
                <span className='textItem' style={{ '--i': 3 }}>I</span>
                <span className='textItem' style={{ '--i': 4 }}>I</span>
                <span className='textItem' style={{ '--i': 5 }}>I</span>
                <span className='textItem' style={{ '--i': 6 }}>I</span>
                <span className='textItem' style={{ '--i': 7 }}>I</span>
                <span className='textItem' style={{ '--i': 8 }}>I</span>
                <span className='textItem' style={{ '--i': 9 }}>I</span>
                <span className='textItem' style={{ '--i': 10 }}>I</span>
                <span className='textItem' style={{ '--i': 11 }}>I</span>
                <span className='textItem' style={{ '--i': 12 }}>I</span>
                <span className='textItem' style={{ '--i': 13 }}>I</span>
                <span className='textItem' style={{ '--i': 14 }}>I</span>
                <span className='textItem' style={{ '--i': 15 }}>I</span>
                <span className='textItem' style={{ '--i': 16 }}>I</span>
                <span className='textItem' style={{ '--i': 17 }}>I</span>
                <span className='textItem' style={{ '--i': 18 }}>I</span>
                <span className='textItem' style={{ '--i': 19 }}>I</span>
                <span className='textItem' style={{ '--i': 20 }}>I</span>
                <span className='textItem' style={{ '--i': 21 }}>I</span>
                <span className='textItem' style={{ '--i': 22 }}>I</span>
                <span className='textItem' style={{ '--i': 23 }}>I</span>
                <span className='textItem' style={{ '--i': 24 }}>I</span>
                <span className='textItem' style={{ '--i': 25 }}>I</span>
                <span className='textItem' style={{ '--i': 26 }}>I</span>
                <span className='textItem' style={{ '--i': 27 }}>I</span>
                <span className='textItem' style={{ '--i': 28 }}>I</span>
                <span className='textItem' style={{ '--i': 29 }}>I</span>
                <span className='textItem' style={{ '--i': 30 }}>I</span>
                <span className='textItem' style={{ '--i': 31 }}>I</span>
                <span className='textItem' style={{ '--i': 32 }}>I</span>
                <span className='textItem' style={{ '--i': 33 }}>I</span>
                <span className='textItem' style={{ '--i': 34 }}>I</span>
                <span className='textItem' style={{ '--i': 35 }}>I</span>
                <span className='textItem' style={{ '--i': 36 }}>I</span>
                <span className='textItem' style={{ '--i': 37 }}>I</span>
                <span className='textItem' style={{ '--i': 38 }}>I</span>
                <span className='textItem' style={{ '--i': 39 }}>I</span>
                <span className='textItem' style={{ '--i': 40 }}>I</span>
                <span className='textItem' style={{ '--i': 41 }}>I</span>
                <span className='textItem' style={{ '--i': 42 }}>I</span>
                <span className='textItem' style={{ '--i': 43 }}>I</span>
                <span className='textItem' style={{ '--i': 44 }}>I</span>
                <span className='textItem' style={{ '--i': 45 }}>I</span>
                <span className='textItem' style={{ '--i': 46 }}>I</span>
                <span className='textItem' style={{ '--i': 47 }}>I</span>
                <span className='textItem' style={{ '--i': 48 }}>I</span>
                <span className='textItem' style={{ '--i': 49 }}>I</span>
                <span className='textItem' style={{ '--i': 50 }}>I</span> */}