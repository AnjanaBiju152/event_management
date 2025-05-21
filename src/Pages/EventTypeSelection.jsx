import React from 'react';
import { Calendar, Clock, Users, Check, Gift, Cake, Briefcase, MapPin, Plus, Minus } from 'lucide-react';
import '../assets/styles/Eventtype.css';
import SelectionIndicator from '../Components/common/SelectionIndicator';

// Step 1: Event Type Selection
export default function EventTypeSelection({ eventDetails, updateEventDetails }) {
  const eventTypes = [
    { id: 'wedding', name: 'Wedding', icon: <Gift className="w-8 h-8 text-pink-500" />, description: 'A celebration of love and commitment' },
    { id: 'birthday', name: 'Birthday', icon: <Cake className="w-8 h-8 text-yellow-500" />, description: 'Mark another trip around the sun' },
    { id: 'corporate', name: 'Corporate', icon: <Briefcase className="w-8 h-8 text-blue-500" />, description: 'Professional events for your business' }
  ];

  const venues = [
    { id: 'luxury', name: 'Luxury Venue', image:'/luxary.jpg', description: 'Premium spaces with exceptional amenities and service' },
    { id: 'standard', name: 'Standard Venue', image: '/standard.jpg', description: 'Quality spaces with good amenities' },
    { id: 'budget', name: 'Budget-Friendly', image: '/friendly.jpg', description: 'Affordable spaces with essential amenities' },
  ];

  const today = new Date();
  const formatDate = (date) => date.toISOString().split('T')[0];
  
  // Function to increment/decrement guest count
  const handleGuestCountChange = (increment) => {
    const newCount = increment 
      ? Math.min(500, eventDetails.guestCount + 1)
      : Math.max(1, eventDetails.guestCount - 1);
      
    updateEventDetails('guestCount', newCount);
  };

  return (
    <div className="event-container">
      <div className="event-section">
        <h2 className="event-title">Event Basics</h2>
        <p className="event-subtitle">Let's start planning your special event.</p>
      </div>

      <div className="event-section">
        <h3 className="event-section-title">Event Type</h3>
        <p className="event-section-description">Choose the type of event you want to organize</p>
        
        <div className="event-type-grid">
          {eventTypes.map((type) => (
            <div
              key={type.id}
              className={`event-type-card ${eventDetails.type === type.id ? 'selected' : ''}`}
              onClick={() => updateEventDetails('type', type.id)}
              tabIndex="0"
              role="button"
              aria-pressed={eventDetails.type === type.id}
            >
              {eventDetails.type === type.id && (
                <SelectionIndicator
                  isSelected={true}
                  variant="left-bar"
                  color="blue"
                />
              )}
              
              <div className="event-type-content">
                <div className="event-type-icon">
                  {type.icon}
                </div>
                <div className="event-type-text">
                  <h4>{type.name}</h4>
                  <p>{type.description}</p>
                </div>
              </div>
              
              {eventDetails.type === type.id && (
                <div className="event-type-check">
                  <Check className="text-white" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="event-section">
        <h3 className="event-section-title">Event Details</h3>
        <p className="event-section-description">When and where will your event take place?</p>
        
        <div className="event-form-grid">
          <div className="event-form-group">
            <label htmlFor="date" className="event-form-label">
              Event Date
            </label>
            <div className="event-input-wrapper">
              
              <input
                type="date"
                name="date"
                id="date"
                min={formatDate(today)}
                value={eventDetails.date || ''}
                onChange={(e) => updateEventDetails('date', e.target.value)}
                className="event-input"
                placeholder="Select date"
                required
              />
            </div>
          </div>

          <div className="event-form-group">
            <label htmlFor="time" className="event-form-label">
              Event Time
            </label>
            <div className="event-input-wrapper">
             
              <input
                type="time"
                name="time"
                id="time"
                value={eventDetails.time || ''}
                onChange={(e) => updateEventDetails('time', e.target.value)}
                className="event-input"
                placeholder="Select time"
                required
              />
            </div>
          </div>
          
          <div className="event-form-group">
            <label htmlFor="location" className="event-form-label">
              Event Location
            </label>
            <div className="event-input-wrapper">
             
              <input
                type="text"
                name="location"
                id="location"
                placeholder="Enter event location"
                value={eventDetails.location || ''}
                onChange={(e) => updateEventDetails('location', e.target.value)}
                className="event-input"
                required
              />
            </div>
          </div>
        </div>
      </div>

      <div className="event-section">
        <div className="event-slider-container">
          <div className="event-slider-header">
            <label htmlFor="duration" className="event-slider-label">
              Duration
            </label>
            <span className="event-slider-value">{eventDetails.duration || 4} hours</span>
          </div>
          <input
            type="range"
            id="duration"
            name="duration"
            min="2"
            max="12"
            step="1"
            value={eventDetails.duration || 4}
            onChange={(e) => updateEventDetails('duration', parseInt(e.target.value))}
            className="event-slider"
            style={{'--value-percent': `${(((eventDetails.duration || 4) - 2) / 10) * 100}%`}}
          />
          <div className="event-slider-marks">
            <span>2h</span>
            <span>4h</span>
            <span>6h</span>
            <span>8h</span>
            <span>10h</span>
            <span>12h</span>
          </div>
        </div>

        
        <div className="event-form-group">
          <label htmlFor="guestCount" className="event-form-label">
            Guest Count
          </label>
          <div className="guest-input-container">
            <div className="event-input-icon">
              <Users size={20} />
            </div>
            <input
              type="number"
              name="guestCount"
              id="guestCount"
              min="1"
              max="500"
              value={eventDetails.guestCount || 1}
              onChange={(e) => updateEventDetails('guestCount', parseInt(e.target.value) || 1)}
              className="guest-input"
            />
            <div className="guest-controls">
              <button 
                type="button" 
                className="guest-control-btn" 
                onClick={() => handleGuestCountChange(false)}
                aria-label="Decrease guest count"
              >
                <Minus size={16} />
              </button>
              <button 
                type="button" 
                className="guest-control-btn" 
                onClick={() => handleGuestCountChange(true)}
                aria-label="Increase guest count"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
          
          <div className="guest-feedback">
            {(eventDetails.guestCount || 0) > 0 && (eventDetails.guestCount || 0) <= 50 && "Small gathering (best for intimate events)"}
            {(eventDetails.guestCount || 0) > 50 && (eventDetails.guestCount || 0) <= 150 && "Medium gathering (standard event size)"}
            {(eventDetails.guestCount || 0) > 150 && (eventDetails.guestCount || 0) <= 300 && "Large gathering (requires spacious venue)"}
            {(eventDetails.guestCount || 0) > 300 && "Very large gathering (special arrangements needed)"}
          </div>
        </div>
      </div>

      <div className="event-section">
        <h3 className="event-section-title">Venue Selection</h3>
        <p className="event-section-description">Choose the perfect location for your event</p>
        
        <div className="venue-grid">
          {venues.map((venue) => (
            <div
              key={venue.id}
              className={`venue-card ${eventDetails.venue === venue.id ? 'selected' : ''}`}
              onClick={() => updateEventDetails('venue', venue.id)}
              tabIndex="0"
              role="button"
              aria-pressed={eventDetails.venue === venue.id}
            >
              <div className="venue-image-container">
                <img src={venue.image} alt={venue.name} className="venue-image" />
                <div className="venue-badge">{venue.name}</div>
                
                {eventDetails.venue === venue.id && (
                  <div className="venue-check">
                    <Check size={20} />
                  </div>
                )}
              </div>
              
              <div className="venue-content">
                <div className="venue-header">
                  <MapPin className="venue-icon" size={18} />
                  <h4 className="venue-title">{venue.name}</h4>
                </div>
                <p className="venue-description">{venue.description}</p>
              </div>
              
              {eventDetails.venue === venue.id && (
                <SelectionIndicator
                  isSelected={true}
                  variant="corner-badge"
                  color="blue"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="event-section">
        <h3 className="event-section-title">Package Selection</h3>
        <p className="event-section-description">Select a package that fits your needs</p>
        
        <div className="package-grid">
          {[
            { 
              id: 'standard', 
              name: 'Standard Package', 
              price: 'Base Price', 
              description: 'Essential services for a successful event',
              features: ['Basic setup', 'Standard catering', 'Simple decorations']
            },
            { 
              id: 'premium', 
              name: 'Premium Package', 
              price: '+50%', 
              description: 'Enhanced services with premium options',
              features: ['Enhanced setup', 'Premium catering', 'Elegant decorations', 'Photography']
            },
            { 
              id: 'deluxe', 
              name: 'Deluxe Package', 
              price: '+80%', 
              description: 'Luxury experience with all premium services',
              features: ['Luxury setup', 'Gourmet catering', 'Premium decorations', 'Photography', 'Entertainment']
            }
          ].map((pkg) => (
            <div
              key={pkg.id}
              className={`package-card ${eventDetails.packageType === pkg.id ? 'selected' : ''}`}
              onClick={() => updateEventDetails('packageType', pkg.id)}
              tabIndex="0"
              role="button"
              aria-pressed={eventDetails.packageType === pkg.id}
            >
              <div className="package-header">
                <h4 className="package-title">{pkg.name}</h4>
                <span className="package-price">
                  {pkg.price}
                </span>
              </div>
              <p className="package-description">{pkg.description}</p>
              
              <div className="package-features">
                {pkg.features.map((feature, index) => (
                  <div key={index} className="package-feature">
                    <Check size={16} /> {feature}
                  </div>
                ))}
              </div>
              
              {eventDetails.packageType === pkg.id && (
                <div className="package-check">
                  <Check size={16} />
                </div>
              )}
              
              {eventDetails.packageType === pkg.id && (
                <SelectionIndicator
                  isSelected={true}
                  variant="ribbon"
                  color="blue"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}