import interact from 'interactjs';
import React, { useEffect, useRef, useState } from 'react';

const DragSlide = () => {
    const position = { x: 0, y: 0 };
    const elementRef = useRef(null);
    const [isInsideDropZone, setIsInsideDropZone] = useState(false);

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

    return (
        <div className='w-screen h-screen relative'>
            <img src="/character.png" ref={elementRef} className='draggable border-yellow-200 w-32 h-33 z-30 absolute' />
            <h1 className="fixed bottom-0 font-semibold tracking-wider text-lg p-2">Drag Dino to the correct place to see my secret!!</h1>
            <div className="dropzone absolute w-48 h-48 left-[45%] top-[40%] z-10">
                <img src="/home.png" alt="" className='w-full h-full select-none pointer-events-none' />
            </div>
            {isInsideDropZone && (
                <div className="  bg-gray-100 fixed z-50 left-[20%] top-[20%] w-[60%] h-[60%]">
                    <img src="/rest.gif" alt="" className=' w-full h-full select-none pointer-events-none' />
                </div>
            )}
        </div>
    );
};

export default DragSlide;
