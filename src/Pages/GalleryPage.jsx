import React from "react";
import { Link } from "react-router-dom";

const GalleryPage = () => {
  const allImages = [
    "https://images.pexels.com/photos/169203/pexels-photo-169203.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1268877/pexels-photo-1268877.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/196652/pexels-photo-196652.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/698907/pexels-photo-698907.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/587739/pexels-photo-587739.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1157557/pexels-photo-1157557.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/247932/pexels-photo-247932.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=600",
  ];

  return (
    <section className="py-16 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        
        
        <div className="mb-8">
          <Link 
            to="/" 
            className="text-blue-600 underline hover:text-blue-800 transition"
          >
            ← Back to Home
          </Link>
        </div>

        <h2 className="text-4xl font-bold text-center mb-12">Gallery</h2>

        {/* Full gallery flex grid */}
        <div className="flex flex-wrap justify-center gap-6">
          {allImages.map((img, index) => (
            <div
              key={index}
              className="w-32 h-32 md:w-40 md:h-40 overflow-hidden rounded-lg shadow-md"
            >
              <img
                src={img}
                alt={`Gallery ${index}`}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GalleryPage;
