import { Check, Music, Car, Hotel, Camera, Activity, Video, Mic, Glasses } from 'lucide-react';
import '../assets/styles/Additional.css'

export default function AdditionalServices({ eventDetails, updateNestedEventDetails }) {
  const entertainmentOptions = [
    { id: 'dj', name: 'DJ Services', description: 'Professional DJ with sound equipment', icon: <Music className="h-6 w-6 text-indigo-500" /> },
    { id: 'liveband', name: 'Live Band', description: 'Live music performance', icon: <Mic className="h-6 w-6 text-red-500" /> },
    { id: 'performers', name: 'Performers', description: 'Dancers, singers, or specialty acts', icon: <Activity className="h-6 w-6 text-green-500" /> },
    { id: 'interactive', name: 'Interactive Entertainment', description: 'Photo booths, games, or activities', icon: <Glasses className="h-6 w-6 text-blue-500" /> },
    { id: 'none', name: 'No Entertainment', description: 'No entertainment services needed', icon: <Music className="h-6 w-6 text-gray-400" /> },
  ];

  const transportationOptions = {
    title: 'Guest Transportation',
    description: 'Arrange transportation for your guests',
    icon: <Car className="h-6 w-6 text-blue-500" />
  };

  const accommodationOptions = {
    title: 'Guest Accommodation',
    description: 'Help with hotel blocks or lodging arrangements',
    icon: <Hotel className="h-6 w-6 text-yellow-500" />
  };

  const photographyOptions = {
    title: 'Professional Photography',
    description: 'Event photography and videography services',
    icon: <Camera className="h-6 w-6 text-purple-500" />
  };

  const getServiceTitle = (key) => {
    switch(key) {
      case 'transportation': return transportationOptions.title;
      case 'accommodation': return accommodationOptions.title;
      case 'photography': return photographyOptions.title;
      default: return '';
    }
  };

  const getServiceIcon = (key) => {
    switch(key) {
      case 'transportation': return transportationOptions.icon;
      case 'accommodation': return accommodationOptions.icon;
      case 'photography': return photographyOptions.icon;
      default: return null;
    }
  };

  // Toggle boolean services
  const toggleService = (service) => {
    updateNestedEventDetails('additionalServices', service, !eventDetails.additionalServices[service]);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Additional Services</h2>
        <p className="mt-1 text-gray-500">Enhance your event with these optional services.</p>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900">Entertainment</h3>
        <p className="mt-1 text-sm text-gray-500">Choose the entertainment for your event</p>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {entertainmentOptions.map((option) => (
            <div
              key={option.id}
              className={`relative border rounded-lg p-4 cursor-pointer hover:bg-gray-50 ${
                eventDetails.additionalServices.entertainment === option.id ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              }`}
              onClick={() => updateNestedEventDetails('additionalServices', 'entertainment', option.id)}
            >
              <div className="flex items-center">
                <div className="mr-3">{option.icon}</div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">{option.name}</h4>
                  <p className="text-xs text-gray-500">{option.description}</p>
                </div>
              </div>
              {eventDetails.additionalServices.entertainment === option.id && (
                <div className="absolute top-2 right-2 h-5 w-5 bg-blue-500 rounded-full flex items-center justify-center">
                  <Check className="h-3 w-3 text-white" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900">Additional Services</h3>
        <p className="mt-1 text-sm text-gray-500">Select all that you need</p>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {['transportation', 'accommodation', 'photography'].map((service) => (
            <div
              key={service}
              className={`relative border rounded-lg p-4 cursor-pointer hover:bg-gray-50 ${
                eventDetails.additionalServices[service] ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              }`}
              onClick={() => toggleService(service)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="mr-3">{getServiceIcon(service)}</div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{getServiceTitle(service)}</h4>
                  </div>
                </div>
                <div className={`h-5 w-5 rounded-full border ${
                  eventDetails.additionalServices[service] ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                } flex items-center justify-center`}>
                  {eventDetails.additionalServices[service] && <Check className="h-3 w-3 text-white" />}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {eventDetails.additionalServices.entertainment && eventDetails.additionalServices.entertainment !== 'none' && (
        <div className="p-4 bg-blue-50 border border-blue-300 rounded-md">
          <h4 className="text-sm font-medium text-blue-800">Entertainment Details</h4>
          <p className="mt-1 text-sm text-blue-700">
            Our event coordinators will contact you to discuss your specific entertainment requirements,
            including song lists, performance times, and any special requests.
          </p>
        </div>
      )}

      {eventDetails.additionalServices.transportation && (
        <div className="p-4 bg-gray-50 border border-gray-300 rounded-md">
          <h4 className="text-sm font-medium text-gray-800">Transportation Options</h4>
          <div className="mt-2 space-y-2">
            <div className="flex items-center">
              <input 
                id="shuttle" 
                type="radio" 
                name="transportType" 
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <label htmlFor="shuttle" className="ml-2 block text-sm text-gray-700">Shuttle Service</label>
            </div>
            <div className="flex items-center">
              <input 
                id="valet" 
                type="radio" 
                name="transportType" 
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <label htmlFor="valet" className="ml-2 block text-sm text-gray-700">Valet Parking</label>
            </div>
            <div className="flex items-center">
              <input 
                id="luxury" 
                type="radio" 
                name="transportType" 
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <label htmlFor="luxury" className="ml-2 block text-sm text-gray-700">Luxury Vehicles</label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}