import { DollarSign, Calendar, Clock, Users, Tag, Palette, Globe, CheckCircle, Utensils, Music, MapPin } from 'lucide-react';
import '../assets/styles/Summary.css'
// Step 7: Review Summary
export default function ReviewSummary({ eventDetails }) {
  // Helper function to convert event details to readable format
  const getReadableValue = (field, value) => {
    // Special case for date formatting
    if (field === 'date' && value) {
      return new Date(value).toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    }
    
    // Event type
    if (field === 'type') {
      const types = { wedding: 'Wedding', birthday: 'Birthday', corporate: 'Corporate Event' };
      return types[value] || value;
    }
    
    // Service style
    if (field === 'serviceStyle') {
      const styles = { 
        buffet: 'Buffet Style', 
        plated: 'Plated Service', 
        familystyle: 'Family Style',
        foodstations: 'Food Stations',
        cocktailstyle: 'Cocktail Style'
      };
      return styles[value] || value;
    }
    
    // Package type
    if (field === 'packageType') {
      const packages = {
        standard: 'Standard Package',
        premium: 'Premium Package',
        deluxe: 'Deluxe Package'
      };
      return packages[value] || value;
    }
    
    // Venue
    if (field === 'venue') {
      const venues = {
        luxury: 'Luxury Venue',
        standard: 'Standard Venue',
        budget: 'Budget-Friendly Venue'
      };
      return venues[value] || value;
    }
    
    // Entertainment
    if (field === 'entertainment') {
      const entertainment = {
        dj: 'DJ Services',
        liveband: 'Live Band',
        performers: 'Performers',
        interactive: 'Interactive Entertainment',
        none: 'No Entertainment'
      };
      return entertainment[value] || value;
    }
    
    // For boolean values
    if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No';
    }
    
    // For array values (like services or dietary restrictions)
    if (Array.isArray(value)) {
      if (value.length === 0) return 'None';
      
      // Services
      if (field === 'services') {
        const serviceNames = {
          decor: 'Decoration',
          photography: 'Photography',
          music: 'Music & DJ',
          flowers: 'Flowers & Bouquets',
          invitation: 'Invitations',
          emcee: 'Professional MC',
          cake: 'Custom Cake',
          entertainment: 'Entertainment',
          av: 'AV Equipment',
          printing: 'Printing Materials',
          speaker: 'Speaker Support',
          awards: 'Awards & Gifts'
        };
        return value.map(service => serviceNames[service] || service).join(', ');
      }
      
      // Dietary restrictions
      if (field === 'dietaryRestrictions') {
        const dietaryNames = {
          vegetarian: 'Vegetarian',
          vegan: 'Vegan',
          glutenfree: 'Gluten-Free',
          dairyfree: 'Dairy-Free',
          nutfree: 'Nut-Free',
          halal: 'Halal',
          kosher: 'Kosher'
        };
        return value.map(diet => dietaryNames[diet] || diet).join(', ');
      }
      
      return value.join(', ');
    }
    
    return value || 'Not specified';
  };

  // Group related details together for the summary
  const eventSections = [
    {
      title: 'Event Basics',
      icon: <Calendar className="h-5 w-5 text-blue-500" />,
      items: [
        { label: 'Event Type', value: getReadableValue('type', eventDetails.type) },
        { label: 'Date', value: getReadableValue('date', eventDetails.date) },
        { label: 'Time', value: eventDetails.time || 'Not specified' },
        { label: 'Duration', value: `${eventDetails.duration} hours` },
        { label: 'Guest Count', value: `${eventDetails.guestCount} people` },
        { label: 'Venue', value: getReadableValue('venue', eventDetails.venue) }
      ]
    },
    {
      title: 'Theme & Style',
      icon: <Palette className="h-5 w-5 text-purple-500" />,
      items: [
        { label: 'Theme', value: eventDetails.theme || 'Not specified' },
        { label: 'Color Palette', value: eventDetails.colorPalette || 'Not specified' },
        { label: 'Cultural Style', value: eventDetails.culturalOption || 'Not specified' }
      ]
    },
    {
      title: 'Services & Package',
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      items: [
        { label: 'Selected Services', value: getReadableValue('services', eventDetails.services) },
        { label: 'Package Type', value: getReadableValue('packageType', eventDetails.packageType) }
      ]
    },
    {
      title: 'Food & Catering',
      icon: <Utensils className="h-5 w-5 text-yellow-500" />,
      items: [
        { label: 'Cuisine', value: eventDetails.catering.cuisine || 'Not specified' },
        { label: 'Dietary Restrictions', value: getReadableValue('dietaryRestrictions', eventDetails.catering.dietaryRestrictions) },
        { label: 'Service Style', value: getReadableValue('serviceStyle', eventDetails.catering.serviceStyle) }
      ]
    },
    {
      title: 'Additional Services',
      icon: <Music className="h-5 w-5 text-red-500" />,
      items: [
        { label: 'Entertainment', value: getReadableValue('entertainment', eventDetails.additionalServices.entertainment) },
        { label: 'Transportation', value: getReadableValue('transportation', eventDetails.additionalServices.transportation) },
        { label: 'Accommodation', value: getReadableValue('accommodation', eventDetails.additionalServices.accommodation) },
        { label: 'Photography', value: getReadableValue('photography', eventDetails.additionalServices.photography) }
      ]
    }
  ];

  const handleSubmit = () => {
    // This would typically send the data to a server
    alert('Your event booking request has been submitted! Our team will contact you shortly.');
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Review Your Event</h2>
        <p className="mt-1 text-gray-500">Please review all details before submitting your request.</p>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 flex items-center justify-between">
        <div className="flex items-center">
          <DollarSign className="h-8 w-8 text-blue-600 mr-3" />
          <div>
            <h3 className="text-lg font-medium text-blue-800">Total Estimated Cost</h3>
            <p className="text-sm text-blue-600">This is an estimate and may change based on final details</p>
          </div>
        </div>
        <div className="text-2xl font-bold text-blue-600">
          ${eventDetails.totalEstimate.toLocaleString()}
        </div>
      </div>

      <div className="space-y-6">
        {eventSections.map((section, index) => (
          <div key={index} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center">
              {section.icon}
              <h3 className="ml-2 text-lg font-medium text-gray-900">{section.title}</h3>
            </div>
            <div className="p-4">
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">{item.label}</dt>
                    <dd className="mt-1 text-sm text-gray-900">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        ))}
      </div>

      {eventDetails.culturalNotes && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center">
            <Globe className="h-5 w-5 text-indigo-500" />
            <h3 className="ml-2 text-lg font-medium text-gray-900">Cultural Notes</h3>
          </div>
          <div className="p-4">
            <p className="text-sm text-gray-600">{eventDetails.culturalNotes}</p>
          </div>
        </div>
      )}

      <div className="pt-4">
        <div className="flex items-center">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
            I agree to the terms and conditions
          </label>
        </div>
      </div>

      <div className="pt-4">
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Submit Event Request
        </button>
        <p className="mt-2 text-sm text-gray-500 text-center">
          Our team will review your request and contact you within 24 hours.
        </p>
      </div>
    </div>
  );
}