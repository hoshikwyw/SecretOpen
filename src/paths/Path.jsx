import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Main from '../pages/Main'
import DragSlide from '../pages/DragSlide'
import TextPage from '../pages/TextPage'

const Path = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Main />} />
                <Route path='drag' element={<DragSlide />} />
                <Route path='/textPage' element={<TextPage />} />
            </Routes>
        </div>
    )
}

export default Path
