// import LocationManager from "./components/LocationManager"
import Home from './pages/Home'
import Help from './pages/Help'
import Feedback from './pages/Feedback'
import Contact from './pages/Contact'
import About from './pages/About'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import SearchLocation from "./components/SearchLocation"

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="contact" element={<Contact />} />
          <Route path="/about" element={<About />}/>
          <Route path="/help" element={<Help />}/>
          <Route path="/feedback" element={<Feedback />}/> */}
          {/* <SearchLocation /> */}
          {/* <LocationManager /> */}
        </Routes>
      </Router>
    </>
  )
}

export default App
