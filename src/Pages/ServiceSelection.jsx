import { Check, Camera, Music, Sparkles, Flower, Award, ShoppingBag, Mic, Trophy } from 'lucide-react';
import '../assets/styles/Servicesselection.css';
import SelectionIndicator from '../Components/common/SelectionIndicator';


export default function ServiceSelection({ eventDetails, toggleService, updateEventDetails }) {
  // Service categories based on event type
  const servicesByEventType = {
    wedding: [
      { 
        id: 'decor', 
        name: 'Decoration', 
        description: 'Professional decor aligned with your theme', 
        details: 'Includes custom centerpieces, backdrops, and ambient lighting tailored to your wedding style.', 
        icon: <Sparkles className="h-8 w-8 text-purple-500" />, 
        color: 'purple', 
        premium: true 
      },
      { 
        id: 'photography', 
        name: 'Photography', 
        description: 'Professional photography services', 
        details: 'Full-day coverage with high-resolution images, including pre-wedding and candid shots.', 
        icon: <Camera className="h-8 w-8 text-blue-500" />, 
        color: 'blue' 
      },
      { 
        id: 'music', 
        name: 'Music & DJ', 
        description: 'Live music and DJ services', 
        details: 'Custom playlists, live band options, and professional sound systems for your reception.', 
        icon: <Music className="h-8 w-8 text-pink-500" />, 
        color: 'pink', 
        premium: true 
      },
      { 
        id: 'flowers', 
        name: 'Flowers & Bouquets', 
        description: 'Bridal bouquet and floral arrangements', 
        details: 'Seasonal flowers, custom bouquets, and venue floral decor matching your color scheme.', 
        icon: <Flower className="h-8 w-8 text-green-500" />, 
        color: 'green' 
      },
      { 
        id: 'invitation', 
        name: 'Invitations', 
        description: 'Custom designed invitations', 
        details: 'Elegant, personalized digital or printed invitations with RSVP management.', 
        icon: <ShoppingBag className="h-8 w-8 text-yellow-500" />, 
        color: 'yellow' 
      },
      { 
        id: 'emcee', 
        name: 'Professional MC', 
        description: 'Master of ceremonies to guide the event', 
        details: 'Experienced MC to manage timelines, announcements, and guest engagement.', 
        icon: <Mic className="h-8 w-8 text-red-500" />, 
        color: 'red' 
      },
    ],
    birthday: [
      { 
        id: 'decor', 
        name: 'Decoration', 
        description: 'Themed decorations and setup', 
        details: 'Custom balloons, banners, and table settings to match your birthday theme.', 
        icon: <Sparkles className="h-8 w-8 text-purple-500" />, 
        color: 'purple', 
        premium: true 
      },
      { 
        id: 'photography', 
        name: 'Photography', 
        description: 'Professional photography services', 
        details: 'Candid and posed shots with quick turnaround for digital photo albums.', 
        icon: <Camera className="h-8 w-8 text-blue-500" />, 
        color: 'blue' 
      },
      { 
        id: 'music', 
        name: 'Music & DJ', 
        description: 'DJ and music services', 
        details: 'Kid-friendly or adult-oriented playlists with interactive DJ entertainment.', 
        icon: <Music className="h-8 w-8 text-pink-500" />, 
        color: 'pink' 
      },
      { 
        id: 'cake', 
        name: 'Custom Cake', 
        description: 'Personalized birthday cake', 
        details: 'Multi-tiered cakes with custom designs and flavors to suit your preferences.', 
        icon: <ShoppingBag className="h-8 w-8 text-yellow-500" />, 
        color: 'yellow', 
        premium: true 
      },
      { 
        id: 'entertainment', 
        name: 'Entertainment', 
        description: 'Games and entertainment activities', 
        details: 'Magicians, clowns, or interactive games tailored to the age group.', 
        icon: <Trophy className="h-8 w-8 text-green-500" />, 
        color: 'green' 
      },
      { 
        id: 'invitation', 
        name: 'Invitations', 
        description: 'Custom designed invitations', 
        details: 'Fun, themed digital or printed invitations with easy RSVP tracking.', 
        icon: <ShoppingBag className="h-8 w-8 text-yellow-500" />, 
        color: 'yellow' 
      },
    ],
    corporate: [
      { 
        id: 'decor', 
        name: 'Decoration', 
        description: 'Professional corporate decor', 
        details: 'Branded backdrops, table arrangements, and professional venue styling.', 
        icon: <Sparkles className="h-8 w-8 text-purple-500" />, 
        color: 'purple', 
        premium: true 
      },
      { 
        id: 'photography', 
        name: 'Photography', 
        description: 'Event photography services', 
        details: 'Professional coverage for key moments, speeches, and networking.', 
        icon: <Camera className="h-8 w-8 text-blue-500" />, 
        color: 'blue' 
      },
      { 
        id: 'av', 
        name: 'AV Equipment', 
        description: 'Professional audio/visual setup', 
        details: 'High-quality projectors, microphones, and speakers for presentations.', 
        icon: <Music className="h-8 w-8 text-pink-500" />, 
        color: 'pink' 
      },
      { 
        id: 'printing', 
        name: 'Printing Materials', 
        description: 'Brochures, handouts, and signage', 
        details: 'Custom-branded materials for promotions and event information.', 
        icon: <ShoppingBag className="h-8 w-8 text-yellow-500" />, 
        color: 'yellow' 
      },
      { 
        id: 'speaker', 
        name: 'Speaker Support', 
        description: 'Coordination for keynote speakers', 
        details: 'Logistics, AV support, and scheduling for guest speakers.', 
        icon: <Mic className="h-8 w-8 text-red-500" />, 
        color: 'red' 
      },
      { 
        id: 'awards', 
        name: 'Awards & Gifts', 
        description: 'Recognition items and corporate gifts', 
        details: 'Custom trophies, plaques, and branded gift bags for attendees.', 
        icon: <Award className="h-8 w-8 text-green-500" />, 
        color: 'green' 
      },
    ],
  };

  // Get services for the selected event type
  const services = eventDetails.type ? servicesByEventType[eventDetails.type] : [];

  // Handle customization input changes
  const handleCustomizationChange = (serviceId, value) => {
    updateEventDetails('customizations', {
      ...eventDetails.customizations,
      [serviceId]: value,
    });
  };

  return (
    <div className="service-selection-container space-y-8">
      <div>
        <h2 className="section-title text-2xl">Service Selection</h2>
        <p className="section-subtitle mt-1">Choose and customize the services you need for your event.</p>
      </div>

      {services.length > 0 ? (
        <div>
          <div className="flex items-center justify-between">
            <h3 className="section-title">Available Services</h3>
            <span className="section-subtitle">Select and customize as needed</span>
          </div>
          <div className="services-grid mt-4">
            {services.map((service) => {
              const isSelected = eventDetails.services.includes(service.id);
              return (
                <div
                  key={service.id}
                  className={`service-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => toggleService(service.id)}
                >
                  <SelectionIndicator
                    isSelected={isSelected}
                    variant="check-circle"
                    color={service.color}
                    size="md"
                  />
                  <div className="service-card-content">
                    <div className="flex items-start">
                      <div className="service-icon">{service.icon}</div>
                      <div className="service-info">
                        <h4>{service.name}</h4>
                        <p>{service.description}</p>
                        <p className="service-details">{service.details}</p>
                        {service.premium && (
                          <span className="premium-badge">Premium Service</span>
                        )}
                      </div>
                    </div>
                    {isSelected && (
                      <div>
                        <label className="customization-label">Customization Details</label>
                        <input
                          type="text"
                          className="customization-input"
                          placeholder="E.g., specific colors, themes, or requests"
                          value={eventDetails.customizations?.[service.id] || ''}
                          onChange={(e) => handleCustomizationChange(service.id, e.target.value)}
                          onClick={(e) => e.stopPropagation()} // Prevent card click from toggling
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="empty-state">
          <p>Please select an event type first to see available services.</p>
        </div>
      )}
    </div>
  );
}