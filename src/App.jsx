import { Routes, Route } from "react-router-dom"
import Home from "@/pages/Home"
import DetailCity from "@/pages/DetailCity"

function App() {

  return (
    <>
    <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/detail/:city" element={<DetailCity/>} />
  </Routes>
    </>
  )
}

export default App
