import { Check, Camera, Music, Sparkles, Flower, Award, ShoppingBag, Mic, Trophy } from 'lucide-react';
import '../assets/styles/Servicesselection.css';
import SelectionIndicator from '../Components/common/SelectionIndicator';


export default function ServiceSelection({ eventDetails, toggleService, updateEventDetails }) {
  // Service categories based on event type
  const servicesByEventType = {
    wedding: [
      { id: 'decor', name: 'Decoration', description: 'Professional decor aligned with your theme', icon: <Sparkles className="h-8 w-8 text-purple-500" />, color: 'purple' },
      { id: 'photography', name: 'Photography', description: 'Professional photography services', icon: <Camera className="h-8 w-8 text-blue-500" />, color: 'blue' },
      { id: 'music', name: 'Music & DJ', description: 'Live music and DJ services', icon: <Music className="h-8 w-8 text-pink-500" />, color: 'pink' },
      { id: 'flowers', name: 'Flowers & Bouquets', description: 'Bridal bouquet and floral arrangements', icon: <Flower className="h-8 w-8 text-green-500" />, color: 'green' },
      { id: 'invitation', name: 'Invitations', description: 'Custom designed invitations', icon: <ShoppingBag className="h-8 w-8 text-yellow-500" />, color: 'yellow' },
      { id: 'emcee', name: 'Professional MC', description: 'Master of ceremonies to guide the event', icon: <Mic className="h-8 w-8 text-red-500" />, color: 'red' },
    ],
    birthday: [
      { id: 'decor', name: 'Decoration', description: 'Themed decorations and setup', icon: <Sparkles className="h-8 w-8 text-purple-500" />, color: 'purple' },
      { id: 'photography', name: 'Photography', description: 'Professional photography services', icon: <Camera className="h-8 w-8 text-blue-500" />, color: 'blue' },
      { id: 'music', name: 'Music & DJ', description: 'DJ and music services', icon: <Music className="h-8 w-8 text-pink-500" />, color: 'pink' },
      { id: 'cake', name: 'Custom Cake', description: 'Personalized birthday cake', icon: <ShoppingBag className="h-8 w-8 text-yellow-500" />, color: 'yellow' },
      { id: 'entertainment', name: 'Entertainment', description: 'Games and entertainment activities', icon: <Trophy className="h-8 w-8 text-green-500" />, color: 'green' },
      { id: 'invitation', name: 'Invitations', description: 'Custom designed invitations', icon: <ShoppingBag className="h-8 w-8 text-yellow-500" />, color: 'yellow' },
    ],
    corporate: [
      { id: 'decor', name: 'Decoration', description: 'Professional corporate decor', icon: <Sparkles className="h-8 w-8 text-purple-500" />, color: 'purple' },
      { id: 'photography', name: 'Photography', description: 'Event photography services', icon: <Camera className="h-8 w-8 text-blue-500" />, color: 'blue' },
      { id: 'av', name: 'AV Equipment', description: 'Professional audio/visual setup', icon: <Music className="h-8 w-8 text-pink-500" />, color: 'pink' },
      { id: 'printing', name: 'Printing Materials', description: 'Brochures, handouts, and signage', icon: <ShoppingBag className="h-8 w-8 text-yellow-500" />, color: 'yellow' },
      { id: 'speaker', name: 'Speaker Support', description: 'Coordination for keynote speakers', icon: <Mic className="h-8 w-8 text-red-500" />, color: 'red' },
      { id: 'awards', name: 'Awards & Gifts', description: 'Recognition items and corporate gifts', icon: <Award className="h-8 w-8 text-green-500" />, color: 'green' },
    ],
  };

  // Package definitions with colors for visual consistency
  const packages = [
    {
      id: 'standard',
      name: 'Standard Package',
      description: 'Basic services with essential quality',
      features: ['Core services', 'Standard equipment', 'Support during event'],
      price: 'Base Price',
      color: 'blue'
    },
    {
      id: 'premium',
      name: 'Premium Package',
      description: 'Enhanced services with premium quality',
      features: ['All standard features', 'Premium equipment', 'Additional staff', 'Pre-event consultation'],
      price: '+50%',
      color: 'indigo'
    },
    {
      id: 'deluxe',
      name: 'Deluxe Package',
      description: 'Comprehensive services with exceptional quality',
      features: ['All premium features', 'Top-tier equipment', 'Dedicated coordinator', 'Extended hours', 'VIP treatment'],
      price: '+80%',
      color: 'purple'
    }
  ];

  // Get services for the selected event type
  const services = eventDetails.type ? servicesByEventType[eventDetails.type] : [];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Service Selection</h2>
        <p className="mt-1 text-gray-500">Choose the services you need for your event.</p>
      </div>

      {services.length > 0 ? (
        <div>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Available Services</h3>
            <span className="text-sm text-gray-500">Select all that apply</span>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const isSelected = eventDetails.services.includes(service.id);
              return (
                <div
                  key={service.id}
                  className={`relative rounded-lg border p-5 cursor-pointer hover:bg-gray-50 overflow-hidden ${
                    isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                  }`}
                  onClick={() => toggleService(service.id)}
                >
                  {/* Selection indicator with left-bar variant */}
                  <SelectionIndicator
                    isSelected={isSelected} 
                    variant="left-bar" 
                    color={service.color} 
                  />
                  
                  <div className="flex items-start">
                    <div className="mr-4 flex-shrink-0">{service.icon}</div>
                    <div>
                      <h4 className="text-base font-medium text-gray-900">{service.name}</h4>
                      <p className="mt-1 text-sm text-gray-500">{service.description}</p>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 flex items-center">
                    <div className={`h-5 w-5 rounded-full border ${
                      isSelected ? `border-${service.color}-500 bg-${service.color}-500` : 'border-gray-300'
                    } flex items-center justify-center`}>
                      {isSelected && <Check className="h-3 w-3 text-white" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="text-center py-6">
          <p className="text-gray-500">Please select an event type first to see available services.</p>
        </div>
      )}

      <div>
        <h3 className="text-lg font-medium text-gray-900">Service Package</h3>
        <p className="mt-1 text-sm text-gray-500">Choose a package that suits your needs and budget</p>
        
        <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {packages.map((pkg) => {
            const isSelected = eventDetails.packageType === pkg.id;
            return (
              <div
                key={pkg.id}
                className={`relative rounded-lg border p-6 overflow-hidden ${
                  isSelected ? `border-${pkg.color}-500 ring-2 ring-${pkg.color}-500 bg-${pkg.color}-50` : 'border-gray-300'
                } cursor-pointer hover:shadow-md`}
                onClick={() => updateEventDetails('packageType', pkg.id)}
              >
                {/* Selection indicator with ribbon variant for packages */}
                <SelectionIndicator 
                  isSelected={isSelected} 
                  variant="ribbon" 
                  color={pkg.color} 
                />
                
                <div>
                  <h4 className="text-lg font-medium text-gray-900">{pkg.name}</h4>
                  <p className="mt-1 text-sm text-gray-500">{pkg.description}</p>
                  <div className="mt-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${pkg.color}-100 text-${pkg.color}-800`}>
                      {pkg.price}
                    </span>
                  </div>
                  <ul className="mt-4 space-y-2">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <Check className={`h-4 w-4 text-${pkg.color}-500 mr-2`} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                {isSelected && (
                  <div className={`absolute top-4 right-4 h-6 w-6 bg-${pkg.color}-500 rounded-full flex items-center justify-center`}>
                    <Check className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}