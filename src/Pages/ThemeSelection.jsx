import React from 'react';
import { Palette } from 'lucide-react';

import '../assets/styles/Theme.css';
import SelectionIndicator from '../Components/common/SelectionIndicator';

export default function ImprovedThemeSelection({ eventDetails, updateEventDetails }) {
  // Different themes based on event type
  const themesByEventType = {
    wedding: [
      { id: 'classic', name: 'Classic Elegance', imageUrl: '/classic2.jpg', description: 'Timeless sophistication with refined details' },
      { id: 'rustic', name: 'Rustic Charm', imageUrl: '/rustic5.jpeg', description: 'Warm, natural elements with countryside appeal' },
      { id: 'modern', name: 'Modern Minimalist', imageUrl: '/modern.jpg', description: 'Clean lines with contemporary styling' },
      { id: 'garden', name: 'Garden Romance', imageUrl: '/garden4.jpg', description: 'Floral abundance in a natural setting' },
      { id: 'beach', name: 'Beach Bliss', imageUrl: '/beach6.jpg', description: 'Seaside celebration with coastal elements' },
      { id: 'vintage', name: 'Vintage Grace', imageUrl: '/vintage.jpg', description: 'Nostalgic elements from bygone eras' },
    ],
    birthday: [
      { id: 'tropical', name: 'Tropical Paradise', imageUrl: '/tropical.jpg', description: 'Vibrant island vibes with exotic elements' },
      { id: 'retro', name: 'Retro Celebration', imageUrl: '/retro.jpg', description: 'Nostalgic elements from a specific decade' },
      { id: 'glamour', name: 'Glamour & Glitz', imageUrl: '/glam.jpg', description: 'Luxurious styling with sparkle and shine' },
      { id: 'carnival', name: 'Carnival Fun', imageUrl: '/carnival.jpg', description: 'Festive atmosphere with games and activities' },
      { id: 'superhero', name: 'Superhero Adventure', imageUrl: '/super.jpg', description: 'Action-packed celebration with hero elements' },
      { id: 'fantasy', name: 'Fantasy World', imageUrl: '/fantacy.jpg', description: 'Magical elements from your favorite stories' },
    ],
    corporate: [
      { id: 'professional', name: 'Professional & Sleek', imageUrl: '/Sleek.jpg', description: 'Refined styling for business excellence' },
      { id: 'creative', name: 'Creative & Inspiring', imageUrl: '/creative.jpg', description: 'Artistic elements to spark innovation' },
      { id: 'tech', name: 'Tech Forward', imageUrl: '/tech.png', description: 'Modern digital elements and innovation' },
      { id: 'traditional', name: 'Traditional Business', imageUrl: '/t.png', description: 'Classic corporate styling with timeless appeal' },
      { id: 'eco', name: 'Eco-Friendly', imageUrl: '/eco.jpg', description: 'Sustainable approach to corporate events' },
      { id: 'international', name: 'International Business', imageUrl: '/int.png', description: 'Global themes for multinational events' },
    ],
  };

  const colorPalettes = [
    { id: 'blush', name: 'Blush & Gold', colors: ['#F8C3CD', '#E2BF81', '#F2E6D8', '#ffffff'] },
    { id: 'blue', name: 'Navy & Silver', colors: ['#0A2463', '#A6A6A6', '#D8DBE2', '#ffffff'] },
    { id: 'earthy', name: 'Earthy Tones', colors: ['#5E3023', '#895737', '#B88C41', '#D8B863'] },
    { id: 'jewel', name: 'Jewel Tones', colors: ['#26532B', '#399E5A', '#5ABCB9', '#63E2C6'] },
    { id: 'pastel', name: 'Soft Pastels', colors: ['#DDCAD9', '#B1B7D1', '#7C90DB', '#9FBCFF'] },
    { id: 'vibrant', name: 'Vibrant Celebration', colors: ['#F71735', '#FF9F1C', '#2EC4B6', '#FDFFFC'] },
    { id: 'monochrome', name: 'Elegant Monochrome', colors: ['#000000', '#333333', '#777777', '#DDDDDD'] },
    { id: 'sunset', name: 'Sunset Glow', colors: ['#F9A826', '#F56038', '#D63447', '#772D8B'] },
  ];

  // Get themes for the selected event type
  const themes = eventDetails.type ? themesByEventType[eventDetails.type] : [];

  return (
    <div className="theme-selection-container">
      <div>
        <h2 className="section-heading">Theme Selection</h2>
        <p className="section-description">Choose a theme that reflects your event's style and mood</p>
      </div>

      {themes.length > 0 ? (
        <div className="mb-8">
          <h3 className="subsection-heading">Choose a Theme</h3>
          <p className="subsection-description">Select a visual theme for your event</p>
          
          <div className="themes-grid">
            {themes.map((theme) => (
              <div
                key={theme.id}
                className={`theme-card ${eventDetails.theme === theme.id ? 'selected' : ''}`}
                onClick={() => updateEventDetails('theme', theme.id)}
              >
                <div className="relative">
                  <img 
                    src={theme.imageUrl} 
                    alt={theme.name} 
                    className="theme-image"
                    style={{ height: '140px' }} // Reduced image size
                  />
                  
                  {eventDetails.theme === theme.id && (
                    <SelectionIndicator
                      isSelected={true} 
                      variant="check-circle"
                      color="blue"
                      size="md"
                    />
                  )}
                </div>
                
                <div className="theme-content">
                  <h4 className="theme-title">{theme.name}</h4>
                  <p className="theme-description">{theme.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="empty-state">
          <p>Please select an event type first to see themed options.</p>
        </div>
      )}

      <div>
        <h3 className="subsection-heading">Color Palette</h3>
        <p className="subsection-description">Choose colors that will define your event's visual identity</p>
        
        <div className="palette-grid">
          {colorPalettes.map((palette) => (
            <div
              key={palette.id}
              className={`palette-card ${eventDetails.colorPalette === palette.id ? 'selected' : ''}`}
              onClick={() => updateEventDetails('colorPalette', palette.id)}
            >
              <h4 className="palette-title">
                <Palette className="h-4 w-4 mr-2" />
                {palette.name}
              </h4>
              
              <div className="color-swatches">
                {palette.colors.map((color, index) => (
                  <div
                    key={index}
                    className="color-swatch"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              
              {eventDetails.colorPalette === palette.id && (
                <SelectionIndicator
                  isSelected={true} 
                  variant="corner-badge"
                  color="blue"
                  size="sm"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}