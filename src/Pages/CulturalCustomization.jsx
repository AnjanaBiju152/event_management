import { Globe, PenTool, Info, Check } from 'lucide-react';

import '../assets/styles/Cultural.css';

export default function CulturalCustomization({ eventDetails, updateEventDetails }) {
  // Cultural options based on event type
  const culturalOptionsByEventType = {
    wedding: [
      {
        id: 'hindu',
        name: 'Hindu Wedding',
        description: 'Traditional Hindu ceremonies with rituals honoring cultural customs',
        imageUrl: '/beachwedding.jpg',
      },
      { 
        id: 'christian', 
        name: 'Christian Wedding', 
        description: 'Traditional Christian ceremony with customary elements', 
        imageUrl: '/beachwedding.jpg' 
      },
      { 
        id: 'muslim', 
        name: 'Muslim Wedding', 
        description: 'Islamic Nikah ceremony with traditional customs', 
        imageUrl: '/beachwedding.jpg' 
      },
      { 
        id: 'jewish', 
        name: 'Jewish Wedding', 
        description: 'Traditional Jewish ceremony with Chuppah and customary elements', 
        imageUrl: '/beachwedding.jpg' 
      },
      { 
        id: 'chinese', 
        name: 'Chinese Wedding', 
        description: 'Traditional Chinese customs including tea ceremony', 
        imageUrl: '/beachwedding.jpg' 
      },
      { 
        id: 'fusion', 
        name: 'Fusion/Multicultural', 
        description: 'Blend multiple cultural traditions into one ceremony', 
        imageUrl: '/beachwedding.jpg' 
      },
      { 
        id: 'nonreligious', 
        name: 'Non-Religious/Civil', 
        description: 'Civil ceremony without religious elements', 
        imageUrl: '/beachwedding.jpg' 
      },
    ],
    birthday: [
      { 
        id: 'western', 
        name: 'Western Birthday', 
        description: 'Traditional cake, candles, gifts, and games', 
        imageUrl: '/beachwedding.jpg' 
      },
      { 
        id: 'quinceanera', 
        name: 'Quinceañera', 
        description: 'Traditional Latin American celebration for 15th birthday', 
        imageUrl: '/beachwedding.jpg' 
      },
      { 
        id: 'sweet16', 
        name: 'Sweet 16', 
        description: 'American tradition celebrating 16th birthday', 
        imageUrl: '/beachwedding.jpg' 
      },
      { 
        id: 'chinese', 
        name: 'Chinese Birthday', 
        description: 'Traditional Chinese customs with longevity symbols', 
        imageUrl: '/beachwedding.jpg' 
      },
      { 
        id: 'korean', 
        name: 'Korean Dol/Doljanchi', 
        description: 'Traditional first birthday celebration', 
        imageUrl: '/beachwedding.jpg' 
      },
      { 
        id: 'custom', 
        name: 'Custom Cultural', 
        description: 'Create your own cultural celebration', 
        imageUrl: '/beachwedding.jpg' 
      },
    ],
    corporate: [
      { 
        id: 'western', 
        name: 'Western Business', 
        description: 'Standard Western business protocols and customs', 
        imageUrl: '/beachwedding.jpg' 
      },
      { 
        id: 'asian', 
        name: 'Asian Business', 
        description: 'Business customs with respect to Asian protocols', 
        imageUrl: '/beachwedding.jpg' 
      },
      { 
        id: 'middleeastern', 
        name: 'Middle Eastern', 
        description: 'Business customs respectful of Middle Eastern traditions', 
        imageUrl: '/beachwedding.jpg' 
      },
      { 
        id: 'international', 
        name: 'International', 
        description: 'Multicultural approach accommodating global attendees', 
        imageUrl: '/beachwedding.jpg' 
      },
      { 
        id: 'custom', 
        name: 'Custom Protocol', 
        description: 'Design your own cultural approach', 
        imageUrl: '/beachwedding.jpg' 
      },
    ],
  };

  // Get cultural options for the selected event type
  const culturalOptions = eventDetails.type ? culturalOptionsByEventType[eventDetails.type] : [];

  return (
    <div className="cultural-container">
      <div>
        <h2 className="section-title">Cultural Customization</h2>
        <p className="section-description">
          Personalize your event with cultural elements that reflect your heritage and values.
          Select from our curated options below or specify custom requirements.
        </p>
      </div>

      {culturalOptions.length > 0 ? (
        <div>
          <h3 className="subsection-title">Choose Your Cultural Style</h3>
          <div className="cultural-options-grid">
            {culturalOptions.map((option) => {
              const isSelected = eventDetails.culturalOption === option.id;
              
              return (
                <div
                  key={option.id}
                  className={`cultural-option-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => updateEventDetails('culturalOption', option.id)}
                >
                  <div className="cultural-option-image-container">
                    <img src={option.imageUrl} alt={option.name} className="cultural-option-image" />
                    {isSelected && (
                      <div className="selected-badge">
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Check size={14} /> Selected
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="cultural-option-content">
                    <h4 className="cultural-option-title">{option.name}</h4>
                    <p className="cultural-option-description">{option.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="empty-state">
          <p className="empty-state-text">Please select an event type first to view cultural customization options.</p>
        </div>
      )}

      <div className="cultural-notes-container">
        <div className="cultural-notes-header">
          <PenTool className="cultural-notes-icon" size={20} />
          <label htmlFor="culturalNotes" className="cultural-notes-title">
            Custom Cultural Requirements
          </label>
        </div>
        <p className="cultural-notes-description">
          Tell us about any specific cultural elements, rituals, or accommodations needed for your event.
          Our team will work with you to ensure all traditions are respected.
        </p>
        <div>
          <textarea
            id="culturalNotes"
            name="culturalNotes"
            rows={4}
            value={eventDetails.culturalNotes}
            onChange={(e) => updateEventDetails('culturalNotes', e.target.value)}
            className="cultural-notes-textarea"
            placeholder="Describe any cultural elements or customs you'd like included in your event..."
          />
        </div>
      </div>

      {eventDetails.culturalOption && eventDetails.culturalOption === 'fusion' && (
        <div className="fusion-notification">
          <h3 className="fusion-notification-title">
            <Info size={18} />
            Special Fusion Event Notes
          </h3>
          <p className="fusion-notification-text">
            For multicultural or fusion events, our event specialists will contact you to discuss specific
            details and cultural requirements. We'll work together to blend traditions respectfully while
            creating a unique and memorable experience for you and your guests.
          </p>
        </div>
      )}
    </div>
  );
}