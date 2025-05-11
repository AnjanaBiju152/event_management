import { Check } from 'lucide-react';
import '../assets/styles/Progress.css'
export default function ProgressBar({ currentStep, totalSteps }) {
  const steps = [
    { number: 1, name: 'Event Basics' },
    { number: 2, name: 'Theme Selection' },
    { number: 3, name: 'Cultural Options' },
    { number: 4, name: 'Services' },
    { number: 5, name: 'Food & Catering' },
    { number: 6, name: 'Additional Services' },
    
  ];
  
  return (
    <div className="progress-container py-6 mb-8 border-b border-gray-200">
      {/* Desktop progress bar */}
      <div className="hidden sm:block">
        <div className="flex justify-between w-full">
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col items-center relative z-10" style={{ width: '14%' }}>
              <div 
                className={`flex items-center justify-center w-10 h-10 rounded-full mb-2 
                  ${step.number < currentStep 
                    ? 'bg-blue-600 text-white' 
                    : step.number === currentStep 
                      ? 'bg-blue-600 text-white ring-2 ring-blue-300' 
                      : 'bg-gray-200 text-gray-600'}`}
              >
                {step.number < currentStep ? (
                  <Check className="w-6 h-6" />
                ) : (
                  <span className="font-medium">{step.number}</span>
                )}
              </div>
              
              {/* Step name */}
              <span 
                // className={`text-sm ${step.number === currentStep ? 'font-medium text-blue-600' : 'text-gray-600'}`}
              >
                {step.name}
              </span>
              
              {/* Connecting line - Moved to lower z-index */}
              {step.number < totalSteps && (
                <div className="absolute top-5 left-full w-full h-0.5 bg-gray-200 z-0" style={{ width: '100%', transform: 'translateX(-50%)' }}>
                  <div 
                    className="h-0.5 bg-blue-600"
                    style={{ 
                      width: step.number < currentStep ? '100%' : '0%',
                      transition: 'width 0.3s ease-in-out'
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Mobile progress bar */}
      <div className="block sm:hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            {/* Step {currentStep} of {totalSteps} */}
          </span>
          <span className="text-sm font-medium text-blue-600">
            {/* {steps.find(step => step.number === currentStep)?.name} */}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>
      
      {/* Current step text indicator */}
      <div className="mt-4 text-center">
        <p className="text-base font-medium">
          {/* Step {currentStep} of {totalSteps}: {steps.find(step => step.number === currentStep)?.name} */}
        </p>
      </div>
    </div>
  );
}