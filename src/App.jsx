import React, { useState } from 'react'

const App = () => {
  const [name, setName] = useState("")
  const [surName, setSurName] = useState("")
  console.log(surName);
  return (
    <div className=' w-screen h-screen flex flex-col justify-center items-center'>
      {!surName && (
        <form onSubmit={(e) => { e.preventDefault(); setSurName(name) }}>
          <input
            type="text"
            placeholder="Your Name"
            className="input input-bordered input-accent w-full max-w-xs" onChange={(e) => setName(e.target.value)} />
        </form>
      )}
      {surName && (
        <>
          <p>Hello {surName}, welcome to my Secret Page.</p>
          <div className=' mt-10'>
            <p>Do You Wanna Go Next Slide ??</p>
            <div className=" flex justify-center items-center">
              <button>Yes</button>
              <button>No</button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default App
