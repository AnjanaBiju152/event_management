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
import '../assets/styles/Bookevent.css'
// Main App Component
export default function BookEvent() {
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
      
      // Update price estimate for catering changes
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

  // Price calculation function
  const calculatePriceEstimate = (details) => {
    let basePrice = 0;
    
    // Base price by event type
    if (details.type === 'wedding') basePrice = 5000;
    else if (details.type === 'birthday') basePrice = 2000;
    else if (details.type === 'corporate') basePrice = 3500;
    
    // Per guest cost
    const perGuestCost = details.type === 'wedding' ? 100 : details.type === 'corporate' ? 80 : 50;
    
    // Package multipliers
    const packageMultiplier = 
      details.packageType === 'premium' ? 1.5 : 
      details.packageType === 'deluxe' ? 1.8 : 1.0;
    
    // Venue costs
    const venueCost = details.venue ? 
      (details.venue === 'luxury' ? 5000 : 
       details.venue === 'standard' ? 3000 : 
       details.venue === 'budget' ? 1500 : 1000) : 0;
    
    // Services cost
    const servicesCost = details.services.length * 500;
    
    // Additional services
    let additionalServicesCost = 0;
    if (details.additionalServices) {
      if (details.additionalServices.entertainment) additionalServicesCost += 1200;
      if (details.additionalServices.transportation) additionalServicesCost += 800;
      if (details.additionalServices.accommodation) additionalServicesCost += 1500;
      if (details.additionalServices.photography) additionalServicesCost += 1000;
    }
    
    // Calculate total
    const total = (basePrice + (details.guestCount * perGuestCost) + venueCost + servicesCost + additionalServicesCost) * packageMultiplier;
    
    return Math.round(total);
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
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
        return <ReviewSummary eventDetails={eventDetails} updateEventDetails={updateEventDetails} />;
      default:
        return <EventTypeSelection eventDetails={eventDetails} updateEventDetails={updateEventDetails} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Event Booking System</h1>
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
              className={`flex items-center px-4 py-2 border rounded-md text-sm font-medium ${
                currentStep === 1
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