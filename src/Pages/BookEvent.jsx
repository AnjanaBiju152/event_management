import { useState } from 'react';
import { Calendar, ChevronRight, ChevronLeft, DollarSign } from 'lucide-react';
import EventTypeSelection from './EventTypeSelection';
import ThemeSelection from './ThemeSelection';
import CulturalCustomization from './CulturalCustomization';
import ServiceSelection from './ServiceSelection';
import FoodCatering from './FoodCatering';
import AdditionalServices from './AdditionalServices';
import ReviewSummary from './ReviewSummery';
import ProgressBar from './ProgressBar';
import '../assets/styles/Bookevent.css';
import { FaUserCircle, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { toast } from 'react-toastify'; // Import toast for notifications
import { bookEventApi } from '../services/allApi';
 // Import the new API function

// Main App Component
export default function BookEvent() {
  const navigate = useNavigate(); // Initialize useNavigate hook for redirection
  const [currentStep, setCurrentStep] = useState(1);
  const [eventDetails, setEventDetails] = useState({
    type: '',
    date: '',
    time: '',
    duration: 4,
    guestCount: 50,
    venue: '',
    theme: '',
    colorPalette: '',
    culturalOption: '',
    culturalNotes: '',
    services: [],
    catering: {
      cuisine: '',
      dietaryRestrictions: [],
      serviceStyle: '',
    },
    additionalServices: {
      entertainment: '',
      transportation: false,
      accommodation: false,
      photography: false,
    },
    packageType: 'standard',
    totalEstimate: 0
  });

  const totalSteps = 7;

  const updateEventDetails = (field, value) => {
    setEventDetails(prev => {
      const updated = {
        ...prev,
        [field]: value
      };

      // Update price estimate whenever relevant fields change
      if (['type', 'guestCount', 'venue', 'packageType', 'services'].includes(field)) {
        updated.totalEstimate = calculatePriceEstimate(updated);
      }

      return updated;
    });
  };

  const updateNestedEventDetails = (parent, field, value) => {
    setEventDetails(prev => {
      const updated = {
        ...prev,
        [parent]: {
          ...prev[parent],
          [field]: value
        }
      };

      // Update price estimate for catering and additional services changes
      if (parent === 'catering' || parent === 'additionalServices') {
        updated.totalEstimate = calculatePriceEstimate(updated);
      }

      return updated;
    });
  };

  const toggleService = (service) => {
    setEventDetails(prev => {
      const currentServices = [...prev.services];
      const serviceIndex = currentServices.indexOf(service);

      if (serviceIndex === -1) {
        currentServices.push(service);
      } else {
        currentServices.splice(serviceIndex, 1);
      }

      const updated = {
        ...prev,
        services: currentServices
      };

      // Update price estimate when services change
      updated.totalEstimate = calculatePriceEstimate(updated);

      return updated;
    });
  };

  const toggleDietaryRestriction = (restriction) => {
    setEventDetails(prev => {
      const currentRestrictions = [...prev.catering.dietaryRestrictions];
      const restrictionIndex = currentRestrictions.indexOf(restriction);

      if (restrictionIndex === -1) {
        currentRestrictions.push(restriction);
      } else {
        currentRestrictions.splice(restrictionIndex, 1);
      }

      return {
        ...prev,
        catering: {
          ...prev.catering,
          dietaryRestrictions: currentRestrictions
        }
      };
    });
  };

  // Price calculation function (Existing logic)
  const calculatePriceEstimate = (details) => {
    let basePrice = 0;

    if (details.type === 'wedding') basePrice = 5000;
    else if (details.type === 'birthday') basePrice = 2000;
    else if (details.type === 'corporate') basePrice = 3500;

    const perGuestCost = details.type === 'wedding' ? 100 : details.type === 'corporate' ? 80 : 50;

    const packageMultiplier =
      details.packageType === 'premium' ? 1.5 :
      details.packageType === 'deluxe' ? 1.8 : 1.0;

    const venueCost = details.venue ?
      (details.venue === 'luxury' ? 5000 :
        details.venue === 'standard' ? 3000 :
        details.venue === 'budget' ? 1500 : 1000) : 0;

    const servicesCost = details.services.length * 500; // Example cost per service

    let additionalServicesCost = 0;
    if (details.additionalServices) {
      if (details.additionalServices.entertainment) additionalServicesCost += 1200;
      if (details.additionalServices.transportation) additionalServicesCost += 800;
      if (details.additionalServices.accommodation) additionalServicesCost += 1500;
      if (details.additionalServices.photography) additionalServicesCost += 1000;
    }

    const total = (basePrice + (details.guestCount * perGuestCost) + venueCost + servicesCost + additionalServicesCost) * packageMultiplier;

    return Math.round(total);
  };

  // --- NEW: Function to handle event submission ---
  const handleSubmitEvent = async () => {
    const token = sessionStorage.getItem("token"); // Get JWT token from session storage
    if (!token) {
      toast.error("You need to be logged in to book an event.");
      navigate('/login'); // Redirect to login page if no token
      return;
    }

    // Prepare data to send to the backend, ensuring it matches your eventSchema
    const eventDataForAPI = {
      eventType: eventDetails.type,
      eventDate: eventDetails.date,
      eventTime: eventDetails.time,
      duration: eventDetails.duration,
      guestCount: eventDetails.guestCount,
      venue: eventDetails.venue,
      theme: eventDetails.theme,
      colorPalette: eventDetails.colorPalette,
      culturalOption: eventDetails.culturalOption,
      culturalNotes: eventDetails.culturalNotes,
      services: eventDetails.services,
      catering: eventDetails.catering,
      additionalServices: eventDetails.additionalServices,
      packageType: eventDetails.packageType,
      totalEstimate: eventDetails.totalEstimate,
    };

    try {
      // Call the bookEventApi with event data and token
      const result = await bookEventApi(eventDataForAPI, token);

      if (result.status === 201) {
        toast.success("Event request submitted successfully!");
        // Reset the form and redirect
        setEventDetails({
          type: '', date: '', time: '', duration: 4, guestCount: 50, venue: '',
          theme: '', colorPalette: '', culturalOption: '', culturalNotes: '', services: [],
          catering: { cuisine: '', dietaryRestrictions: [], serviceStyle: '' },
          additionalServices: { entertainment: '', transportation: false, accommodation: false, photography: false },
          packageType: 'standard', totalEstimate: 0
        });
        setCurrentStep(1); // Reset to the first step of the form
        navigate('/user/bookings'); // Redirect user to their bookings page
      } else {
        // Display error message from backend if available
        toast.error(`Failed to submit event: ${result.response?.data || 'Server error'}`);
      }
    } catch (error) {
      console.error("Error submitting event:", error);
      toast.error("An unexpected error occurred while submitting your event.");
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0); // Scroll to top on step change
    } else {
      // If it's the last step, call the submission function
      handleSubmitEvent();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0); // Scroll to top on step change
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <EventTypeSelection eventDetails={eventDetails} updateEventDetails={updateEventDetails} />;
      case 2:
        return <ThemeSelection eventDetails={eventDetails} updateEventDetails={updateEventDetails} />;
      case 3:
        return <CulturalCustomization eventDetails={eventDetails} updateEventDetails={updateEventDetails} />;
      case 4:
        return <ServiceSelection eventDetails={eventDetails} toggleService={toggleService} updateEventDetails={updateEventDetails} />;
      case 5:
        return <FoodCatering eventDetails={eventDetails} updateNestedEventDetails={updateNestedEventDetails} toggleDietaryRestriction={toggleDietaryRestriction} />;
      case 6:
        return <AdditionalServices eventDetails={eventDetails} updateNestedEventDetails={updateNestedEventDetails} />;
      case 7:
        // Pass eventDetails to ReviewSummary as props
        return <ReviewSummary eventDetails={eventDetails} updateEventDetails={updateEventDetails} />;
      default:
        return <EventTypeSelection eventDetails={eventDetails} updateEventDetails={updateEventDetails} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 " style={{ paddingTop: "90px" }}>
      <div className="mb-4">
        <a href="/user/dashboard" className="text-decoration-none text-secondary">
          <FaArrowLeft className="me-2" />
          Back
        </a>
      </div>
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 text-center">Event Booking System</h1>
          {eventDetails.totalEstimate > 0 && (
            <p className="text-lg text-blue-600 font-medium flex items-center mt-1">
              <DollarSign className="w-5 h-5 mr-1" />
              Estimated Total: ${eventDetails.totalEstimate.toLocaleString()}
            </p>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

        <div className="mt-8 bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6">
            {renderStep()}
          </div>

          <div className="px-6 py-4 bg-gray-50 flex justify-between">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`flex items-center px-4 py-2 border rounded-md text-sm font-medium ${currentStep === 1
                  ? 'border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                }`}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </button>
            <button
              onClick={nextStep}
              className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              {currentStep === totalSteps ? 'Request' : 'Next'}
              {currentStep !== totalSteps && <ChevronRight className="w-4 h-4 ml-2" />}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}