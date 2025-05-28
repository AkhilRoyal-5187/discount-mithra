import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import NavBar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './components/Home';
import Services from './components/services';
import Downloadcard from './components/Downloadcard';
import HospitalCards from './components/Hospitals';
import FoodCards from './components/food';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-900 text-white">
        {/* Navbar */}
        <NavBar />

        {/* Main Content Area - No White Space */}
        <main className="flex-grow w-full">
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<HomePage />} />
            <Route path ='/services' element={<Services/>}/>
            <Route path='/download' element={<Downloadcard/>}/>
            <Route path ="/hospitals" element={<HospitalCards/>}/>
            <Route path ='/food' element={<FoodCards/>}/>
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;