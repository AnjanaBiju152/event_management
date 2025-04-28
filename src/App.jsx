import { Routes, Route } from "react-router-dom"
import Footer from "./Components/common/Footer"
import Header from "./Components/common/Header"
import Carousels from "./Components/common/Carousels"
import EventSection from "./Components/common/EventSection"
import SubServicesSection from "./Components/common/SubServiceSection"
import ReviewsSection from "./Components/common/ReviewsSection"
import About from "./Components/common/About"
import LoginPage from "./Pages/LoginPage"
import RegisterPage from "./Pages/RegistrationPage"
import UserDashboard from "./Pages/UserDashboard"
import AdminDashboard from "./Pages/AdminDashboard"
import BookEvent from "./Pages/BookEvent"
import MyBookings from "./Pages/MyBookings"
import PaymentPage from "./Pages/PaymentPage"
import AdminBookings from "./Pages/AdminBookings"
import AdminPayment from "./Pages/AdminPayment"
import AdminHome from "./Pages/AdminHome"
import AdminAlert from "./Pages/AdminAlert"
import AdminProfile from "./Pages/AdminProfile"
import Gallery from "./Components/common/Gallery"
import GalleryPage from "./Pages/GalleryPage"

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={
          <>
            <Carousels />
            <EventSection />
            <SubServicesSection />
            <ReviewsSection />
            <Gallery/>
            <About />
          </>
        } />
        <Route path="/gallery" element={<GalleryPage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/user/dashboard" element={<UserDashboard/>} />
         <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/user/book-event" element={<BookEvent />} />
        <Route path="/user/bookings" element={<MyBookings/>} />
        <Route path="/user/payments" element={<PaymentPage />} />
        <Route path="/admin/bookings" element={<AdminBookings />} />
        <Route path="/admin/payments" element={<AdminPayment />} />
        <Route path="/admin/dashboard" element={<AdminHome />} />
        <Route path="/admin/alerts" element={<AdminAlert />} />
        <Route path="/admin/profile" element={<AdminProfile />} />

       


      </Routes>

      <Footer />
    </>
  );
}

export default App