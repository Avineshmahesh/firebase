import React from "react"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Demo from "./Components/demo"

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Demo />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
