import { Check, Utensils, AlertCircle } from 'lucide-react';
import '../assets/styles/Food.css'

export default function FoodCatering({ eventDetails, updateNestedEventDetails, toggleDietaryRestriction }) {
  const cuisines = [
    { id: 'international', name: 'International Buffet', description: 'Diverse selection of global dishes' },
    { id: 'italian', name: 'Italian', description: 'Classic Italian dishes and flavors' },
    { id: 'asian', name: 'Asian Fusion', description: 'Blend of various Asian cuisines' },
    { id: 'mediterranean', name: 'Mediterranean', description: 'Fresh Mediterranean flavors' },
    { id: 'indian', name: 'Indian', description: 'Traditional Indian cuisine' },
    { id: 'middleeastern', name: 'Middle Eastern', description: 'Aromatic Middle Eastern dishes' },
    { id: 'american', name: 'American', description: 'Classic American comfort food' },
    { id: 'custom', name: 'Custom Menu', description: 'Create your own unique menu' }
  ];

  const dietaryRestrictions = [
    { id: 'vegetarian', name: 'Vegetarian', description: 'No meat or fish' },
    { id: 'vegan', name: 'Vegan', description: 'No animal products' },
    { id: 'glutenfree', name: 'Gluten-Free', description: 'No gluten-containing ingredients' },
    { id: 'dairyfree', name: 'Dairy-Free', description: 'No dairy products' },
    { id: 'nutfree', name: 'Nut-Free', description: 'No nuts or nut products' },
    { id: 'halal', name: 'Halal', description: 'Follows Islamic dietary laws' },
    { id: 'kosher', name: 'Kosher', description: 'Follows Jewish dietary laws' }
  ];

  const serviceStyles = [
    { id: 'buffet', name: 'Buffet Style', description: 'Self-serve food stations' },
    { id: 'plated', name: 'Plated Service', description: 'Formal, table service dining' },
    { id: 'familystyle', name: 'Family Style', description: 'Shared plates at each table' },
    { id: 'foodstations', name: 'Food Stations', description: 'Interactive chef-attended stations' },
    { id: 'cocktailstyle', name: 'Cocktail Style', description: 'Heavy hors d\'oeuvres with mingling' }
  ];
  
  // Show culturally appropriate cuisines based on event type and cultural option
  const getRecommendedCuisines = () => {
    if (eventDetails.culturalOption === 'indian' || eventDetails.culturalOption === 'hindu') {
      return ['indian', 'international'];
    } else if (['chinese', 'asian'].includes(eventDetails.culturalOption)) {
      return ['asian', 'international'];
    } else if (['middleeastern', 'muslim'].includes(eventDetails.culturalOption)) {
      return ['middleeastern', 'international'];
    } else if (['jewish'].includes(eventDetails.culturalOption)) {
      return ['mediterranean', 'international'];
    }
    return [];
  };
  
  const recommendedCuisines = getRecommendedCuisines();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Food & Catering</h2>
        <p className="mt-1 text-gray-500">Choose your catering preferences for the event.</p>
      </div>
      
      <div>
        <h3 className="text-lg font-medium text-gray-900">Cuisine Selection</h3>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cuisines.map((cuisine) => (
            <div
              key={cuisine.id}
              className={`relative border rounded-lg p-4 cursor-pointer hover:bg-gray-50 ${
                eventDetails.catering.cuisine === cuisine.id ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              } ${
                recommendedCuisines.includes(cuisine.id) ? 'ring-2 ring-yellow-300' : ''
              }`}
              onClick={() => updateNestedEventDetails('catering', 'cuisine', cuisine.id)}
            >
              <div className="flex items-center">
                <Utensils className="h-5 w-5 text-gray-400 mr-2" />
                <div>
                  <h4 className="text-sm font-medium text-gray-900">{cuisine.name}</h4>
                  <p className="text-xs text-gray-500">{cuisine.description}</p>
                </div>
              </div>
              {eventDetails.catering.cuisine === cuisine.id && (
                <div className="absolute top-2 right-2 h-5 w-5 bg-blue-500 rounded-full flex items-center justify-center">
                  <Check className="h-3 w-3 text-white" />
                </div>
              )}
              {recommendedCuisines.includes(cuisine.id) && (
                <div className="absolute bottom-2 right-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full">
                  Recommended
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium text-gray-900">Dietary Restrictions</h3>
        <p className="mt-1 text-sm text-gray-500">Select all that apply to your guests</p>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {dietaryRestrictions.map((restriction) => (
            <div
              key={restriction.id}
              className={`relative border rounded-lg p-3 cursor-pointer hover:bg-gray-50 ${
                eventDetails.catering.dietaryRestrictions.includes(restriction.id) ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              }`}
              onClick={() => toggleDietaryRestriction(restriction.id)}
            >
              <div className="flex items-center">
                <div className={`h-5 w-5 rounded-full border ${
                  eventDetails.catering.dietaryRestrictions.includes(restriction.id) ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                } flex items-center justify-center mr-3`}>
                  {eventDetails.catering.dietaryRestrictions.includes(restriction.id) && <Check className="h-3 w-3 text-white" />}
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">{restriction.name}</h4>
                  <p className="text-xs text-gray-500">{restriction.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium text-gray-900">Service Style</h3>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {serviceStyles.map((style) => (
            <div
              key={style.id}
              className={`relative border rounded-lg p-4 cursor-pointer hover:bg-gray-50 ${
                eventDetails.catering.serviceStyle === style.id ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              }`}
              onClick={() => updateNestedEventDetails('catering', 'serviceStyle', style.id)}
            >
              <h4 className="text-sm font-medium text-gray-900">{style.name}</h4>
              <p className="mt-1 text-xs text-gray-500">{style.description}</p>
              {eventDetails.catering.serviceStyle === style.id && (
                <div className="absolute top-2 right-2 h-5 w-5 bg-blue-500 rounded-full flex items-center justify-center">
                  <Check className="h-3 w-3 text-white" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {eventDetails.guestCount > 200 && (
        <div className="p-4 bg-yellow-50 border border-yellow-300 rounded-md flex items-start">
          <AlertCircle className="h-5 w-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-yellow-800">Large Event Notice</h4>
            <p className="text-sm text-yellow-700">
              For events with {eventDetails.guestCount} guests, we recommend multiple food stations or a combination of service styles.
              Our catering team will contact you to discuss options.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}