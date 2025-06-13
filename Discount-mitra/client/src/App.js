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
import LocationsPage from './components/LocationsPage';
import EducationCards from './components/Education';
import FreshCards from './components/Fresh';
import CarServiceCards from './components/Car_Bike';
import BankingCards from './components/Banking.';
import TravelCards from './components/Travels';
import ShoppingCards from './components/Shopping';
import WhatsAppButton from './components/WhatsAppButton.jsx';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-900 text-white">
        {/* Navbar */}
        <NavBar />

        {/* Main Content Area - No White Space */}
        <main className="flex-grow w-full">
          <Routes>
            {/* Public Routes */}
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<Services />} />
            <Route path="/download" element={<Downloadcard />} />
            <Route path="/hospitals" element={<HospitalCards />} />
            <Route path="/food" element={<FoodCards />} />
            <Route path="/gift-articles" element={<GiftCards />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/laundry" element={<LaundryPage />} />
            <Route path="/tailors" element={<TailorPage />} />
            <Route path="/salons" element={<SalonPage />} />
            <Route path="/wine-shops" element={<WineShopPage />} />
            <Route path="/bars" element={<BarPage />} />
            <Route path="/construction" element={<ConstructionPage />} />
            <Route path="/locations" element={<LocationsPage />} />
            <Route path="/education" element={<EducationCards />} />
            <Route path="/fresh" element={<FreshCards />} />
            <Route path="/car-bike-care" element={<CarServiceCards />} />
            <Route path="/banking"element={<BankingCards />} />
            <Route path="/travels" element={<TravelCards />} />
            <Route path="/shopping" element={<ShoppingCards />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />

        <WhatsAppButton />
      </div>
    </Router>
  );
}

export default App;