import { DollarSign, Calendar, Palette, CheckCircle, Utensils, Music, Globe } from 'lucide-react';
import '../assets/styles/Summary.css';

export default function ReviewSummary({ eventDetails }) {
  const getReadableValue = (field, value) => {
    if (field === 'date' && value) {
      return new Date(value).toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    }
    
    if (field === 'type') {
      const types = { wedding: 'Wedding', birthday: 'Birthday', corporate: 'Corporate Event' };
      return types[value] || value;
    }
    
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
    
    if (field === 'packageType') {
      const types = {
        standard: 'Standard Package',
        premium: 'Premium Package',
        deluxe: 'Deluxe Package'
      };
      return types[value] || value;
    }
    
    if (field === 'venue') {
      const venues = {
        luxury: 'Luxury Venue',
        standard: 'Standard Venue',
        budget: 'Budget-Friendly Venue'
      };
      return venues[value] || value;
    }
    
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
    
    if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No';
    }
    
    if (Array.isArray(value)) {
      if (value.length === 0) return 'None';
      
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
    
    if (field === 'transportation' || field === 'accommodation') {
      if (typeof value === 'object' && value !== null) {
        if (field === 'transportation') {
          const { vehicleType, numberOfVehicles } = value;
          return vehicleType && numberOfVehicles 
            ? `${numberOfVehicles} ${vehicleType.charAt(0).toUpperCase() + vehicleType.slice(1)}(s)`
            : 'Yes';
        }
        if (field === 'accommodation') {
          const { hotelPreference, numberOfRooms, checkInDate, checkOutDate } = value;
          return hotelPreference || numberOfRooms || checkInDate || checkOutDate
            ? `${hotelPreference || 'Hotel'} (${numberOfRooms || 'TBD'} rooms, ${checkInDate || 'TBD'} to ${checkOutDate || 'TBD'})`
            : 'Yes';
        }
      }
      return value ? 'Yes' : 'No';
    }
    
    return value || 'Not specified';
  };

  const eventSections = [
    {
      title: 'Event Basics',
      icon: <Calendar className="section-icon icon-event" />,
      items: [
        { label: 'Event Type', value: getReadableValue('type', eventDetails.type) },
        { label: 'Date', value: getReadableValue('date', eventDetails.date) },
        { label: 'Time', value: eventDetails.time || 'Not specified' },
        { label: 'Duration', value: `${eventDetails.duration} hours` },
        { label: 'Guest Count', value: `${eventDetails.guestCount} guests` },
        { label: 'Venue', value: getReadableValue('venue', eventDetails.venue) }
      ]
    },
    {
      title: 'Theme & Style',
      icon: <Palette className="section-icon icon-theme" />,
      items: [
        { label: 'Theme', value: eventDetails.theme || 'Not specified' },
        { label: 'Color Palette', value: eventDetails.colorPalette || 'Not specified' },
        { label: 'Cultural Style', value: getReadableValue('culturalOption', eventDetails.culturalOption) }
      ]
    },
    {
      title: 'Services & Package',
      icon: <CheckCircle className="section-icon icon-services" />,
      items: [
        { label: 'Selected Services', value: getReadableValue('services', eventDetails.services) },
        { label: 'Package Type', value: getReadableValue('packageType', eventDetails.packageType) }
      ]
    },
    {
      title: 'Food & Catering',
      icon: <Utensils className="section-icon icon-food" />,
      items: [
        { label: 'Cuisine', value: eventDetails.catering.cuisine || 'Not specified' },
        { label: 'Dietary Restrictions', value: getReadableValue('dietaryRestrictions', eventDetails.catering.dietaryRestrictions) },
        { label: 'Service Style', value: getReadableValue('serviceStyle', eventDetails.catering.serviceStyle) }
      ]
    },
    {
      title: 'Additional Services',
      icon: <Music className="section-icon icon-additional" />,
      items: [
        { label: 'Entertainment', value: getReadableValue('entertainment', eventDetails.additionalServices.entertainment) },
        { label: 'Transportation', value: getReadableValue('transportation', eventDetails.additionalServices.transportation) },
        { label: 'Accommodation', value: getReadableValue('accommodation', eventDetails.additionalServices.accommodation) }
      ]
    }
  ];

  const handleSubmit = () => {
    alert('Your event booking request has been submitted! Our team will contact you shortly.');
  };

  return (
    <div className="summary-container">
      <div className="summary-header">
        <h2 className="summary-title">Review Your Event</h2>
        <p className="summary-subtitle">Confirm all details before submitting your request.</p>
      </div>

      <div className="cost-banner">
        <div className="flex items-center flex-wrap gap-4">
          <DollarSign className="cost-icon" />
          <div className="cost-info">
            <h3 className="cost-title">Total Estimated Cost</h3>
            <p className="cost-note">This is an estimate and may change based on final details.</p>
          </div>
        </div>
        <div className="cost-amount">
          ${eventDetails.totalEstimate.toLocaleString()}
        </div>
      </div>

      <div className="sections-container space-y-8">
        {eventSections.map((section, index) => (
          <div key={index} className="summary-section">
            <div className="section-header">
              {section.icon}
              <h3 className="section-title">{section.title}</h3>
            </div>
            <div className="section-content">
              <div className="details-grid">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="detail-item">
                    <dt className="detail-label">{item.label}</dt>
                    <dd className="detail-value">{item.value}</dd>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {eventDetails.culturalNotes && (
        <div className="cultural-notes">
          <div className="section-header">
            <Globe className="section-icon icon-cultural" />
            <h3 className="section-title">Cultural Notes</h3>
          </div>
          <div className="cultural-notes-content">
            <p className="detail-value">{eventDetails.culturalNotes}</p>
          </div>
        </div>
      )}

      <div className="terms-container">
        <input
          id="terms"
          name="terms"
          type="checkbox"
          className="terms-checkbox"
          required
        />
        <label htmlFor="terms" className="terms-label">
          I agree to the <a href="/terms" className="text-teal-600 hover:underline">terms and conditions</a>
        </label>
      </div>

      <div className="submit-container">
        <button
          onClick={handleSubmit}
          className="submit-button"
        >
          Submit Event Request
        </button>
        <p className="submit-note">
          Our team will review your request and contact you within 24 hours.
        </p>
      </div>
    </div>
  );
}