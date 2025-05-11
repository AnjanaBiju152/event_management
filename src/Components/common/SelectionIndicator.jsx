import React from 'react';
import { Check } from 'lucide-react';

/**
 * SelectionIndicator component to provide visual feedback for selected items
 * 
 * @param {Object} props
 * @param {boolean} props.isSelected - Whether the item is selected
 * @param {string} props.variant - Visual variant ('left-bar', 'corner-badge', 'check-circle', 'ribbon')
 * @param {string} props.color - Primary color (default: 'blue')
 * @param {string} props.size - Size variant ('sm', 'md', 'lg')
 * @param {React.ReactNode} props.children - Icon or content to show in the indicator
 */
const SelectionIndicator = ({ 
  isSelected = false, 
  variant = 'check-circle', 
  color = 'blue',
  size = 'md',
  children 
}) => {

  // Define color mapping
  const colorMap = {
    blue: {
      bg: 'bg-blue-500',
      border: 'border-blue-500',
      text: 'text-white',
      shadow: 'shadow-blue-200'
    },
    green: {
      bg: 'bg-green-500',
      border: 'border-green-500',
      text: 'text-white',
      shadow: 'shadow-green-200'
    },
    purple: {
      bg: 'bg-purple-500',
      border: 'border-purple-500',
      text: 'text-white',
      shadow: 'shadow-purple-200'
    },
    pink: {
      bg: 'bg-pink-500',
      border: 'border-pink-500',
      text: 'text-white',
      shadow: 'shadow-pink-200'
    }
  };

  // Size mapping
  const sizeMap = {
    sm: {
      checkCircle: 'h-4 w-4',
      icon: 'h-2 w-2',
      leftBar: 'w-1',
      cornerSize: 'h-3 w-3',
      ribbon: 'h-4'
    },
    md: {
      checkCircle: 'h-6 w-6',
      icon: 'h-3 w-3',
      leftBar: 'w-1.5',
      cornerSize: 'h-4 w-4',
      ribbon: 'h-6'
    },
    lg: {
      checkCircle: 'h-8 w-8',
      icon: 'h-4 w-4',
      leftBar: 'w-2',
      cornerSize: 'h-5 w-5',
      ribbon: 'h-8'
    }
  };

  // Set default colors if not provided or invalid
  const colorClasses = colorMap[color] || colorMap.blue;
  const sizeClasses = sizeMap[size] || sizeMap.md;

  if (!isSelected) {
    return null;
  }

  switch (variant) {
    case 'left-bar':
      return (
        <div 
          className={`absolute left-0 top-0 bottom-0 ${sizeClasses.leftBar} ${colorClasses.bg} transition-all duration-300`}
          style={{ 
            transform: 'scaleY(1)',
            transformOrigin: 'top'
          }}
        />
      );
    
    case 'corner-badge':
      return (
        <div 
          className={`absolute top-0 left-0 ${colorClasses.bg} transition-all duration-300`}
          style={{ 
            width: '24px',
            height: '24px',
            clipPath: 'polygon(0 0, 0% 100%, 100% 0)'
          }}
        >
          <div className={`absolute top-1 left-1 ${colorClasses.text} ${sizeClasses.icon}`}>
            {children || <Check />}
          </div>
        </div>
      );
    
    case 'ribbon':
      return (
        <div className={`absolute top-4 right-0 ${colorClasses.bg} ${sizeClasses.ribbon} px-3 flex items-center shadow-md`}>
          <div className={`${colorClasses.text} flex items-center`}>
            {children || <Check className={sizeClasses.icon} />}
            <span className="ml-1 text-xs font-medium">Selected</span>
          </div>
          <div 
            className={`absolute top-0 right-0 ${colorClasses.bg} h-2 w-2`} 
            style={{ 
              transform: 'translateX(8px) rotate(45deg)'
            }}
          />
        </div>
      );
    
    case 'check-circle':
    default:
      return (
        <div 
          className={`absolute top-2 right-2 ${sizeClasses.checkCircle} ${colorClasses.bg} rounded-full 
          flex items-center justify-center shadow-sm ${colorClasses.shadow} transform transition-transform duration-300`}
          style={{ 
            animation: 'scale-in 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards'
          }}
        >
          {children || <Check className={`${sizeClasses.icon} ${colorClasses.text}`} />}
        </div>
      );
  }
};

export default SelectionIndicator;