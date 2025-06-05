import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Footer from "./Components/common/Footer";
import Header from "./Components/common/Header";
import Carousels from "./Components/common/Carousels";
import EventSection from "./Components/common/EventSection";
import SubServicesSection from "./Components/common/SubServiceSection";
import ReviewsSection from "./Components/common/ReviewsSection";
import AboutUs from "./Components/common/AboutUs";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegistrationPage";
import UserDashboard from "./Pages/UserDashboard";
import AdminDashboard from "./Pages/AdminDashboard";
import BookEvent from "./Pages/BookEvent";
import MyBookings from "./Pages/MyBookings";
import PaymentPage from "./Pages/PaymentPage";
import AdminBookings from "./Pages/AdminBookings";
import AdminPayment from "./Pages/AdminPayment";
import AdminHome from "./Pages/AdminHome";
import AdminAlert from "./Pages/AdminAlert";
import AdminProfile from "./Pages/UserProfile";
import GalleryPage from "./Pages/GalleryPage";
import UserProfile from "./Pages/UserProfile";
import About from "./Pages/About";
import Services from "./Pages/Services";
import Contact from "./Pages/Contact";
import Review from "./Pages/Review";
import AdminBookingDetail from "./Pages/AdminBookingDetail";
import Headers from "./Components/common/Headers";
import ProtectedRoute from "./Components/ProtectedRoute";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const location = useLocation();
  const path = location.pathname;
  const isDashboardRoute = path.startsWith("/admin") || path.startsWith("/user");

  return (
    <>
      {isDashboardRoute ? <Headers /> : <Header />}
      <Routes>
        <Route path="/" element={
          <>
            <Carousels />
            <EventSection />
            <SubServicesSection />
            <ReviewsSection />
            <AboutUs />
          </>
        } />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/review" element={<Review />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/user/dashboard"
          element={<ProtectedRoute requiredRole="user"><UserDashboard /></ProtectedRoute>}
        />
        <Route
          path="/user/book-event"
          element={<ProtectedRoute requiredRole="user"><BookEvent /></ProtectedRoute>}
        />
        <Route
          path="/user/bookings"
          element={<ProtectedRoute requiredRole="user"><MyBookings /></ProtectedRoute>}
        />
        <Route
          path="/user/payments"
          element={<ProtectedRoute requiredRole="user"><PaymentPage /></ProtectedRoute>}
        />
        <Route
          path="/user/profile"
          element={<ProtectedRoute requiredRole="user"><UserProfile /></ProtectedRoute>}
        />
        <Route
          path="/admin/dashboard"
          element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>}
        />
        <Route
          path="/admin/bookings"
          element={<ProtectedRoute requiredRole="admin"><AdminBookings /></ProtectedRoute>}
        />
        <Route
          path="/admin/payments"
          element={<ProtectedRoute requiredRole="admin"><AdminPayment /></ProtectedRoute>}
        />
        <Route
          path="/admin/alerts"
          element={<ProtectedRoute requiredRole="admin"><AdminAlert /></ProtectedRoute>}
        />
        <Route
          path="/admin/profile"
          element={<ProtectedRoute requiredRole="admin"><AdminProfile /></ProtectedRoute>}
        />
        <Route
          path="/admin/booking/:id"
          element={<ProtectedRoute requiredRole="admin"><AdminBookingDetail /></ProtectedRoute>}
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;