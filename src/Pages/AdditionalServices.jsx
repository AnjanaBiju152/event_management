import React from 'react';
import { Check, Music, Car, Hotel, Activity, Video, Mic, Glasses } from 'lucide-react';
// import SelectionIndicator from './SelectionIndicator';
import '../assets/styles/Additional.css';
import SelectionIndicator from '../Components/common/SelectionIndicator';

export default function AdditionalServices({ eventDetails, updateNestedEventDetails }) {
  const entertainmentOptions = [
    { id: 'dj', name: 'DJ Services', description: 'Professional DJ with sound equipment', icon: <Music className="service-icon icon-music" /> },
    { id: 'liveband', name: 'Live Band', description: 'Live music performance', icon: <Mic className="service-icon icon-mic" /> },
    { id: 'performers', name: 'Performers', description: 'Dancers, singers, or specialty acts', icon: <Activity className="service-icon icon-activity" /> },
    { id: 'interactive', name: 'Interactive Entertainment', description: 'Photo booths, games, or activities', icon: <Glasses className="service-icon icon-glasses" /> },
    { id: 'none', name: 'No Entertainment', description: 'No entertainment services needed', icon: <Music className="service-icon icon-music-gray" /> },
  ];

  const additionalServices = [
    { id: 'transportation', title: 'Guest Transportation', description: 'Arrange transportation for your guests', icon: <Car className="service-icon icon-car" /> },
    { id: 'accommodation', title: 'Guest Accommodation', description: 'Help with hotel blocks or lodging arrangements', icon: <Hotel className="service-icon icon-hotel" /> },
  ];

  const entertainmentPreferences = [
    { id: 'playlist', name: 'Custom Playlist', description: 'Create a personalized song list', icon: <Music className="service-icon icon-music" /> },
    { id: 'lighting', name: 'Stage Lighting', description: 'Professional lighting setup', icon: <Video className="service-icon icon-video" /> },
    { id: 'special_effects', name: 'Special Effects', description: 'Fog machines, lasers, etc.', icon: <Activity className="service-icon icon-activity" /> },
  ];

  const toggleService = (service) => {
    updateNestedEventDetails('additionalServices', service, !eventDetails.additionalServices[service]);
  };

  const handleInputChange = (section, field, value) => {
    // Initialize nested section if it doesn't exist
    const updatedSection = {
      ...eventDetails.additionalServices[section],
      [field]: value,
    };
    updateNestedEventDetails('additionalServices', section, updatedSection);
  };

  return (
    <div className="services-container">
      <div>
        <h2 className="section-title">Additional Services</h2>
        <p className="section-description">Enhance your event with these optional services.</p>
      </div>

      <div>
        <h3 className="subsection-title">Entertainment</h3>
        <p className="subsection-description">Choose the entertainment for your event</p>

        <div className="grid grid-cols-1 sm-grid-cols-2 lg-grid-cols-3 gap-4">
          {entertainmentOptions.map((option) => (
            <div
              key={option.id}
              className={`option-card ${eventDetails.additionalServices.entertainment === option.id ? 'selected' : ''}`}
              onClick={() => updateNestedEventDetails('additionalServices', 'entertainment', option.id)}
            >
              <div className="flex items-center">
                <div className="mr-3">{option.icon}</div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">{option.name}</h4>
                  <p className="text-xs text-gray-500">{option.description}</p>
                </div>
              </div>
              <SelectionIndicator
                isSelected={eventDetails.additionalServices.entertainment === option.id} 
                variant="check-circle" 
                color="blue" 
                size="sm"
              />
            </div>
          ))}
        </div>
      </div>

      {eventDetails.additionalServices.entertainment && eventDetails.additionalServices.entertainment !== 'none' && (
        <div className="info-box info-box-blue">
          <h4 className="text-sm font-medium">Entertainment Preferences</h4>
          <p className="text-sm mt-1">Customize your entertainment experience</p>
          <div className="grid grid-cols-1 sm-grid-cols-3 gap-4 mt-4">
            {entertainmentPreferences.map((pref) => (
              <div
                key={pref.id}
                className={`option-card ${eventDetails.additionalServices[pref.id] ? 'selected' : ''}`}
                onClick={() => toggleService(pref.id)}
              >
                <div className="flex items-center">
                  <div className="mr-3">{pref.icon}</div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{pref.name}</h4>
                    <p className="text-xs text-gray-500">{pref.description}</p>
                  </div>
                </div>
                <SelectionIndicator
                  isSelected={eventDetails.additionalServices[pref.id]}
                  variant="check-circle"
                  color="blue"
                  size="sm"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="subsection-title">Additional Services</h3>
        <p className="subsection-description">Select all that you need</p>

        <div className="grid grid-cols-1 sm-grid-cols-2 gap-4">
          {additionalServices.map((service) => (
            <div
              key={service.id}
              className={`option-card ${eventDetails.additionalServices[service.id] ? 'selected' : ''}`}
              onClick={() => toggleService(service.id)}
            >
              <div className="flex items-center">
                <div className="mr-3">{service.icon}</div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">{service.title}</h4>
                  <p className="text-xs text-gray-500">{service.description}</p>
                </div>
              </div>
              <SelectionIndicator
                isSelected={eventDetails.additionalServices[service.id]}
                variant="check-circle"
                color="blue"
                size="sm"
              />
            </div>
          ))}
        </div>
      </div>

      {eventDetails.additionalServices.accommodation && (
        <div className="info-box info-box-gray">
          <h4 className="text-sm font-medium">Accommodation Details</h4>
          <p className="text-sm mt-1">Provide details for guest accommodation</p>
          <div className="mt-4 space-y-4">
            <div>
              <label htmlFor="hotelPreference" className="block text-sm font-medium text-gray-700">Hotel Preference</label>
              <input
                id="hotelPreference"
                type="text"
                className="input-field"
                value={eventDetails.additionalServices.accommodation?.hotelPreference || ''}
                onChange={(e) => handleInputChange('accommodation', 'hotelPreference', e.target.value)}
                placeholder="e.g., Marriott, Hilton"
              />
            </div>
            <div>
              <label htmlFor="numberOfRooms" className="block text-sm font-medium text-gray-700">Number of Rooms</label>
              <input
                id="numberOfRooms"
                type="number"
                min="1"
                className="input-field"
                value={eventDetails.additionalServices.accommodation?.numberOfRooms || ''}
                onChange={(e) => handleInputChange('accommodation', 'numberOfRooms', e.target.value)}
                placeholder="e.g., 10"
              />
            </div>
            <div className="grid grid-cols-1 sm-grid-cols-2 gap-4">
              <div>
                <label htmlFor="checkInDate" className="block text-sm font-medium text-gray-700">Check-In Date</label>
                <input
                  id="checkInDate"
                  type="date"
                  className="input-field"
                  value={eventDetails.additionalServices.accommodation?.checkInDate || ''}
                  onChange={(e) => handleInputChange('accommodation', 'checkInDate', e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="checkOutDate" className="block text-sm font-medium text-gray-700">Check-Out Date</label>
                <input
                  id="checkOutDate"
                  type="date"
                  className="input-field"
                  value={eventDetails.additionalServices.accommodation?.checkOutDate || ''}
                  onChange={(e) => handleInputChange('accommodation', 'checkOutDate', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {eventDetails.additionalServices.transportation && (
        <div className="info-box info-box-gray">
          <h4 className="text-sm font-medium">Transportation Details</h4>
          <p className="text-sm mt-1">Specify transportation requirements</p>
          <div className="mt-4 space-y-4">
            <div>
              <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-700">Vehicle Type</label>
              <select
                id="vehicleType"
                className="input-field"
                value={eventDetails.additionalServices.transportation?.vehicleType || ''}
                onChange={(e) => handleInputChange('transportation', 'vehicleType', e.target.value)}
              >
                <option value="">Select vehicle type</option>
                <option value="shuttle">Shuttle Bus</option>
                <option value="van">Passenger Van</option>
                <option value="limo">Limousine</option>
              </select>
            </div>
            <div>
              <label htmlFor="numberOfVehicles" className="block text-sm font-medium text-gray-700">Number of Vehicles</label>
              <input
                id="numberOfVehicles"
                type="number"
                min="1"
                className="input-field"
                value={eventDetails.additionalServices.transportation?.numberOfVehicles || ''}
                onChange={(e) => handleInputChange('transportation', 'numberOfVehicles', e.target.value)}
                placeholder="e.g., 2"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}