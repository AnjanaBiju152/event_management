import React from "react";
import { Link } from "react-router-dom";

const Gallery = () => {
  const previewImages = [
    "https://images.pexels.com/photos/169203/pexels-photo-169203.jpeg?auto=compress&cs=tinysrgb&w=600",
    
  ];

  return (
    <section className="py-16 bg-white" id="gallery">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Event Gallery</h2>

        
        <div className="flex justify-center gap-6">
          {previewImages.map((img, index) => (
            <div key={index} className="w-32 h-32 overflow-hidden rounded-lg shadow-md">
              <img
                src={img}
                alt={`Preview ${index}`}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              />
            </div>
          ))}
        </div>


        <div className="text-center mt-8">
          <Link
            to="/gallery"
            className="text-black underline font-medium text-lg hover:text-gray-700"
          >
            View More ➔
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
