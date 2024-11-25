import "./App.css";
import { Outlet, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Form from "./pages/Form";
import DashBoard from "./pages/DashBoard";
import Navbar from "./components/Navbar";
import PriceTracking from "./pages/PriceTracking";
import Profile from "./pages/Profile";
import Notification from "./components/Notification";
import About from "./pages/About";

// Layout component that includes Navbar
const LayoutWithNavbar = () => (
  <div>
    <Navbar />
    <div className="content">
      <Outlet />
    </div>
  </div>
);

function App() {
  return (
    <div className="bg-white bg-whitedark:bg-darkGery h-screen">
      <Routes>
      {/* Route for Landing Page (without Navbar) */}
      <Route path="/" element={<Landing />} />
      <Route path="/form" element={<Form />} />

      {/* Layout with Navbar for all routes except Landing and Form */}
      <Route element={<LayoutWithNavbar />}>
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/pricetracking" element={<PriceTracking />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/notification" element={<Notification />} />
      </Route>
    </Routes>
    </div>
  );
}

export default App;
