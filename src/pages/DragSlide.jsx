import interact from 'interactjs';
import React, { useEffect, useRef, useState } from 'react';
import { BsEmojiTear } from "react-icons/bs";
import "../styles/DragPage.css"

const DragSlide = () => {
    const position = { x: 0, y: 0 };
    const elementRef = useRef(null);
    const [isInsideDropZone, setIsInsideDropZone] = useState(false);
    const [clickedYes, setClickedYes] = useState(false)
    const [hovered, setHovered] = useState(false)
    const [noPosition, setNoPosition] = useState({ left: 52, top: 78 }); // Initial percentage values
    const [moveCount, setMoveCount] = useState(0)

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
        const newX = Math.random() * 90; // Random percentage for left
        const newY = Math.random() * 85; // Random percentage for top
        setNoPosition({ left: newX, top: newY });
        setMoveCount(prevCount => prevCount + 1)
        console.log("move>>>", moveCount)
        setHovered(!hovered)
    }

    const getImageSrc = () => {
        if (moveCount < 10) {
            return "/gifs/beMine.jpg"
        } else if (moveCount < 20) {
            return "/gifs/waiting.gif"
        } else if (moveCount < 36) {
            return "gifs/wait2.gif"
        } else if (moveCount < 50) {
            return "sadGifs/nono.gif"
        } else if (moveCount < 66) {
            return "sadGifs/cry.gif"
        } else if (moveCount < 70) {
            return "sadGifs/cry2.gif"
        } else {
            return "sadGifs/mad.gif"
        }
    }

    const getText = () => {
        if (moveCount < 10) {
            return "Please say Yes  "
        } else if (moveCount < 20) {
            return "Are you sure you don't want to be mine?"
        } else if (moveCount < 36) {
            return "Okay, I get it. But think again!"
        } else if (moveCount < 50) {
            return "No no no please don't pick no"
        } else if (moveCount < 66) {
            return "I'm gonna cry now"
        } else if (moveCount < 70) {
            return "Why? Why? Why?"
        } else {
            return "Now you can't reject me anymore !"
        }
    }


    return (
        <div className='w-screen h-screen overflow-hidden relative bg-black'>
            {!clickedYes && (
                <div className=" flex flex-col justify-center items-center">
                    <div className="textArea font-semibold text-3xl flex justify-center mt-20">
                        {createTextSpans("I  wanna  tell  you  something  .  I  am  really  like you  .  Can  you  be  mine  ?")}
                    </div>
                    <div className=" my-14 w-60 h-60">
                        <img src={getImageSrc()} alt="" className='main-img rounded-md' />
                    </div>
                    <p className=' flex items-center gap-2 font-semibold mb-10 text-xl'>{getText()}</p>
                    <div className="">
                        <button className={`random-button border-2 me-10 ${moveCount >= 70 ? 'w-[10%]' : ''} absolute left-[45%] top-[78%]`} onClick={() => setClickedYes(true)}>
                            Yes
                        </button>
                        <button className={`random-button ${hovered ? 'hovered' : ''} border-2 ${moveCount >= 70 ? 'hidden' : ''}`} style={{ left: `${noPosition.left}%`, top: `${noPosition.top}%` }} onMouseEnter={handleHover} onMouseLeave={handleHover}>
                            No
                        </button>
                    </div>
                </div>

            )}
            {clickedYes && (
                <div className=' min-w-screen min-h-screen overflow-hidden relative'>
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
