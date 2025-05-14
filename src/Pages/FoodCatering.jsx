import { Check, Utensils, AlertCircle } from 'lucide-react';
import '../assets/styles/food.css';
import SelectionIndicator from '../Components/common/SelectionIndicator';

export default function FoodCatering({ eventDetails, updateNestedEventDetails, toggleDietaryRestriction }) {
  // Initialize catering object if undefined
  const catering = eventDetails.catering || {
    cuisine: '',
    dietaryRestrictions: [],
    serviceStyle: '',
    customization: ''
  };

  const cuisines = [
    { 
      id: 'international', 
      name: 'International Buffet', 
      description: 'Diverse selection of global dishes',
      examples: ['Sushi Rolls', 'Beef Wellington', 'Vegetable Curry', 'Pasta Primavera']
    },
    { 
      id: 'italian', 
      name: 'Italian', 
      description: 'Classic Italian dishes and flavors',
      examples: ['Margherita Pizza', 'Lasagna Bolognese', 'Tiramisu', 'Caprese Salad']
    },
    { 
      id: 'asian', 
      name: 'Asian Fusion', 
      description: 'Blend of various Asian cuisines',
      examples: ['Pad Thai', 'Kung Pao Chicken', 'Mango Sticky Rice', 'Spring Rolls']
    },
    { 
      id: 'mediterranean', 
      name: 'Mediterranean', 
      description: 'Fresh Mediterranean flavors',
      examples: ['Hummus with Pita', 'Grilled Lamb Kebabs', 'Baklava', 'Fattoush Salad']
    },
    { 
      id: 'indian', 
      name: 'Indian', 
      description: 'Traditional Indian cuisine',
      examples: ['Butter Chicken', 'Paneer Tikka', 'Gulab Jamun', 'Biryani']
    },
    { 
      id: 'middleeastern', 
      name: 'Middle Eastern', 
      description: 'Aromatic Middle Eastern dishes',
      examples: ['Falafel Wraps', 'Shish Tawook', 'Knafeh', 'Tabbouleh']
    },
    { 
      id: 'american', 
      name: 'American', 
      description: 'Classic American comfort food',
      examples: ['BBQ Ribs', 'Mac and Cheese', 'Apple Pie', 'Caesar Salad']
    },
    { 
      id: 'custom', 
      name: 'Custom Menu', 
      description: 'Create your own unique menu',
      examples: ['Chef’s Choice', 'Personalized Appetizers', 'Custom Desserts']
    }
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
    if (!eventDetails.culturalOption) return [];
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

  // Handle customization input change
  const handleCustomizationChange = (value) => {
    updateNestedEventDetails('catering', 'customization', value);
  };

  return (
    <div className="food-section space-y-8">
      <div>
        <h2 className="section-title text-2xl">Food & Catering</h2>
        <p className="section-subtitle mt-1">Choose and customize your catering preferences for the event.</p>
      </div>

      <div>
        <h3 className="section-title">Cuisine Selection</h3>
        <div className="cuisine-grid mt-4">
          {cuisines.map((cuisine) => (
            <div
              key={cuisine.id}
              className={`cuisine-card ${catering.cuisine === cuisine.id ? 'selected' : ''} ${
                recommendedCuisines.includes(cuisine.id) ? 'recommended' : ''
              }`}
              onClick={() => updateNestedEventDetails('catering', 'cuisine', cuisine.id)}
            >
              <SelectionIndicator
                isSelected={catering.cuisine === cuisine.id}
                variant="check-circle"
                color="blue"
                size="md"
              />
              <div className="card-content">
                <Utensils className="food-icon h-6 w-6" />
                <h4 className="card-title">{cuisine.name}</h4>
                <p className="card-description">{cuisine.description}</p>
                <ul className="example-dishes">
                  {cuisine.examples.map((dish, index) => (
                    <li key={`${cuisine.id}-dish-${index}`} className="example-dish">{dish}</li>
                  ))}
                </ul>
              </div>
              {recommendedCuisines.includes(cuisine.id) && (
                <span className="recommended-badge">Recommended</span>
              )}
              {catering.cuisine === cuisine.id && (
                <div onClick={(e) => e.stopPropagation()}>
                  <label className="customization-label">Customization Details</label>
                  <input
                    type="text"
                    className="customization-input"
                    placeholder="E.g., specific dishes, flavors, or allergies"
                    value={catering.customization || ''}
                    onChange={(e) => handleCustomizationChange(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="section-title">Dietary Restrictions</h3>
        <p className="section-subtitle mt-1">Select all that apply to your guests</p>
        <div className="dietary-grid mt-4">
          {dietaryRestrictions.map((restriction) => (
            <div
              key={restriction.id}
              className={`dietary-card ${catering.dietaryRestrictions.includes(restriction.id) ? 'selected' : ''}`}
              onClick={() => toggleDietaryRestriction(restriction.id)}
            >
              <SelectionIndicator
                isSelected={catering.dietaryRestrictions.includes(restriction.id)}
                variant="check-circle"
                color="blue"
                size="md"
              />
              <div className="card-content">
                <h4 className="card-title">{restriction.name}</h4>
                <p className="card-description">{restriction.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="section-title">Service Style</h3>
        <div className="service-style-grid mt-4">
          {serviceStyles.map((style) => (
            <div
              key={style.id}
              className={`service-style-card ${catering.serviceStyle === style.id ? 'selected' : ''}`}
              onClick={() => updateNestedEventDetails('catering', 'serviceStyle', style.id)}
            >
              <SelectionIndicator
                isSelected={catering.serviceStyle === style.id}
                variant="check-circle"
                color="blue"
                size="md"
              />
              <div className="card-content">
                <h4 className="card-title">{style.name}</h4>
                <p className="card-description">{style.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {eventDetails.guestCount > 200 && (
        <div className="dietary-alert">
          <AlertCircle className="alert-icon h-5 w-5 text-yellow-600 mt-0.5" />
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