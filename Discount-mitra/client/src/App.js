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
import GiftCards from './components/gift-articles';
import EventsPage from './components/EventPage';
import LaundryPage from './components/LaundryPage'; 
import TailorPage from './components/TailorPage';
import SalonPage from './components/SalonPage';
import WineShopPage from './components/WineShopPage';
import BarPage from './components/BarPage';
import ConstructionPage from './components/ConstructionPage';

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
            <Route path ='/gift-articles' element={<GiftCards/>}/>
            <Route path ='/events' element={<EventsPage/>}/>
            <Route path ='/laundry' element={<LaundryPage/>}/> 
            <Route path ='/tailors' element={<TailorPage/>}/>
            <Route path ='/salons' element={<SalonPage/>}/>
            <Route path ='/wine-shops' element={<WineShopPage/>}/>
            <Route path ='/bars' element={<BarPage/>}/>
            <Route path ='/construction' element={<ConstructionPage/>}/>
            {/* Add more routes as needed */}
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;