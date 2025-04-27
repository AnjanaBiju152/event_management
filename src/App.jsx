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
            <About />
          </>
        } />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
      
      <Footer />
    </>
  );
}

export default App