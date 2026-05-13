import { Routes, Route } from "react-router-dom"
import Home from "@/pages/Home"
import DetailCity from "@/pages/DetailCity"
import Navbar from "./components/Navbar"

function App() {

  return (
    <>
    <Navbar/>
    <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/detail/:city" element={<DetailCity/>} />
  </Routes>
    </>
  )
}

export default App
