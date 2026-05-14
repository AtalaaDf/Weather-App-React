import { Routes, Route } from "react-router-dom"
import Home from "@/pages/Home"
import DetailCity from "@/pages/DetailCity"
import Navbar from "@/components/Navbar"
import About from "@/pages/About"
import SavedCity from "@/pages/SavedCity"

function App() {

  return (
    <>
    <Navbar/>
    <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/Tentang" element={<About/>} />
    <Route path="/Tersimpan" element={<SavedCity/>} />
    <Route path="/Detail/:Kota" element={<DetailCity/>} />
  </Routes>
    </>
  )
}

export default App
